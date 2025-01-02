"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Header from "@/app/ui/company/Header";
import Link from "next/link";
import withAuth from "@/app/lib/withAuth";
import { useAuth } from "@/app/contexts/auth-context";

const Dashboard = () => {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("recruiter");
  const [chartData, setChartData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { user, token } = useAuth();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/recruiter/getByCompany/${user?.userId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const recruiters = response.data;
        const recruiterCount = recruiters.length;
        const postCount = recruiters.reduce((acc, recruiter) => acc + recruiter.posts.length, 0);

        const data = recruiters.map((recruiter) => ({
          date: new Date().toISOString().split("T")[0], // Use current date for simplicity
          recruiter: recruiter.posts.length,
          posts: recruiter.posts.length,
        }));

        setChartData(data);
      } catch (error) {
        console.error("Error fetching recruiter data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, token]);

  const total = React.useMemo(
    () => ({
      recruiter: chartData.reduce((acc, curr) => acc + curr.recruiter, 0),
      posts: chartData.reduce((acc, curr) => acc + curr.posts, 0),
    }),
    [chartData]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col container mx-auto gap-y-4 my-4">
        <div className="flex flex-row gap-x-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Total Recruiters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl">{total.recruiter}</p>
            </CardContent>
            <CardFooter>
              <Link href="/admin/recruiter-manager">
                <button className="px-4 py-2 bg-xanhduong-500 text-white rounded-md hover:bg-xanhduong-600 transition duration-300">
                  View
                </button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl">{total.posts}</p>
            </CardContent>
            <CardFooter>
              <Link href="/admin/post-manager">
                <button className="px-4 py-2 bg-xanhduong-500 text-white rounded-md hover:bg-xanhduong-600 transition duration-300">
                  View
                </button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle>Company Statistics</CardTitle>
              <CardDescription>
                Showing total recruiters and posts for the last 3 months
              </CardDescription>
            </div>
            <div className="flex">
              {["recruiter", "posts"].map((key) => {
                const chart = key as keyof typeof chartConfig;
                return (
                  <button
                    key={chart}
                    data-active={activeChart === chart}
                    className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                    onClick={() => setActiveChart(chart)}
                  >
                    <span className="text-xs text-muted-foreground">
                      {chartConfig[chart].label}
                    </span>
                    <span className="text-lg font-bold leading-none sm:text-3xl">
                      {total[key as keyof typeof total].toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="views"
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });
                      }}
                    />
                  }
                />
                <Bar
                  dataKey={activeChart}
                  fill={`var(--color-${activeChart})`}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const chartConfig = {
  recruiter: {
    label: "Recruiters",
    color: "hsl(var(--chart-1))",
  },
  posts: {
    label: "Posts",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default withAuth(Dashboard, ["company"]);