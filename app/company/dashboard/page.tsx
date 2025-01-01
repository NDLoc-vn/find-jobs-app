"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

const chartData = [
  //   { date: "2024-04-01", candidate: 222, company: 150 },
  //   { date: "2024-04-02", candidate: 97, company: 180 },
  //   { date: "2024-04-03", candidate: 167, company: 120 },
  //   { date: "2024-04-04", candidate: 242, company: 260 },
  //   { date: "2024-04-05", candidate: 373, company: 290 },
  //   { date: "2024-04-06", candidate: 301, company: 340 },
  //   { date: "2024-04-07", candidate: 245, company: 180 },
  //   { date: "2024-04-08", candidate: 409, company: 320 },
  //   { date: "2024-04-09", candidate: 59, company: 110 },
  //   { date: "2024-04-10", candidate: 261, company: 190 },
  //   { date: "2024-04-11", candidate: 327, company: 350 },
  //   { date: "2024-04-12", candidate: 292, company: 210 },
  //   { date: "2024-04-13", candidate: 342, company: 380 },
  //   { date: "2024-04-14", candidate: 137, company: 220 },
  //   { date: "2024-04-15", candidate: 120, company: 170 },
  //   { date: "2024-04-16", candidate: 138, company: 190 },
  //   { date: "2024-04-17", candidate: 446, company: 360 },
  //   { date: "2024-04-18", candidate: 364, company: 410 },
  //   { date: "2024-04-19", candidate: 243, company: 180 },
  //   { date: "2024-04-20", candidate: 89, company: 150 },
  //   { date: "2024-04-21", candidate: 137, company: 200 },
  //   { date: "2024-04-22", candidate: 224, company: 170 },
  //   { date: "2024-04-23", candidate: 138, company: 230 },
  //   { date: "2024-04-24", candidate: 387, company: 290 },
  //   { date: "2024-04-25", candidate: 215, company: 250 },
  //   { date: "2024-04-26", candidate: 75, company: 130 },
  //   { date: "2024-04-27", candidate: 383, company: 420 },
  //   { date: "2024-04-28", candidate: 122, company: 180 },
  //   { date: "2024-04-29", candidate: 315, company: 240 },
  //   { date: "2024-04-30", candidate: 454, company: 380 },
  //   { date: "2024-05-01", candidate: 165, company: 220 },
  //   { date: "2024-05-02", candidate: 293, company: 310 },
  //   { date: "2024-05-03", candidate: 247, company: 190 },
  //   { date: "2024-05-04", candidate: 385, company: 420 },
  //   { date: "2024-05-05", candidate: 481, company: 390 },
  //   { date: "2024-05-06", candidate: 498, company: 520 },
  //   { date: "2024-05-07", candidate: 388, company: 300 },
  //   { date: "2024-05-08", candidate: 149, company: 210 },
  //   { date: "2024-05-09", candidate: 227, company: 180 },
  //   { date: "2024-05-10", candidate: 293, company: 330 },
  //   { date: "2024-05-11", candidate: 335, company: 270 },
  //   { date: "2024-05-12", candidate: 197, company: 240 },
  //   { date: "2024-05-13", candidate: 197, company: 160 },
  //   { date: "2024-05-14", candidate: 448, company: 490 },
  //   { date: "2024-05-15", candidate: 473, company: 380 },
  //   { date: "2024-05-16", candidate: 338, company: 400 },
  //   { date: "2024-05-17", candidate: 499, company: 420 },
  //   { date: "2024-05-18", candidate: 315, company: 350 },
  //   { date: "2024-05-19", candidate: 235, company: 180 },
  //   { date: "2024-05-20", candidate: 177, company: 230 },
  //   { date: "2024-05-21", candidate: 82, company: 140 },
  //   { date: "2024-05-22", candidate: 81, company: 120 },
  //   { date: "2024-05-23", candidate: 252, company: 290 },
  //   { date: "2024-05-24", candidate: 294, company: 220 },
  //   { date: "2024-05-25", candidate: 201, company: 250 },
  //   { date: "2024-05-26", candidate: 213, company: 170 },
  //   { date: "2024-05-27", candidate: 420, company: 460 },
  //   { date: "2024-05-28", candidate: 233, company: 190 },
  //   { date: "2024-05-29", candidate: 78, company: 130 },
  //   { date: "2024-05-30", candidate: 340, company: 280 },
  //   { date: "2024-05-31", candidate: 178, company: 230 },
  //   { date: "2024-06-01", candidate: 178, company: 200 },
  //   { date: "2024-06-02", candidate: 470, company: 410 },
  //   { date: "2024-06-03", candidate: 103, company: 160 },
  //   { date: "2024-06-04", candidate: 439, company: 380 },
  //   { date: "2024-06-05", candidate: 88, company: 140 },
  //   { date: "2024-06-06", candidate: 294, company: 250 },
  //   { date: "2024-06-07", candidate: 323, company: 370 },
  //   { date: "2024-06-08", candidate: 385, company: 320 },
  //   { date: "2024-06-09", candidate: 438, company: 480 },
  //   { date: "2024-06-10", candidate: 155, company: 200 },
  //   { date: "2024-06-11", candidate: 92, company: 150 },
  //   { date: "2024-06-12", candidate: 492, company: 420 },
  //   { date: "2024-06-13", candidate: 81, company: 130 },
  //   { date: "2024-06-14", candidate: 426, company: 380 },
  //   { date: "2024-06-15", candidate: 307, company: 350 },
  //   { date: "2024-06-16", candidate: 371, company: 310 },
  //   { date: "2024-06-17", candidate: 475, company: 520 },
  //   { date: "2024-06-18", candidate: 107, company: 170 },
  //   { date: "2024-06-19", candidate: 341, company: 290 },
  //   { date: "2024-06-20", candidate: 408, company: 450 },
  //   { date: "2024-06-21", candidate: 169, company: 210 },
  //   { date: "2024-06-22", candidate: 317, company: 270 },
  { date: "2024-06-23", candidate: 480, company: 5, recruiter: 100 },
  { date: "2024-06-24", candidate: 132, company: 1, recruiter: 50 },
  { date: "2024-06-25", candidate: 141, company: 1, recruiter: 60 },
  { date: "2024-06-26", candidate: 434, company: 3, recruiter: 80 },
  { date: "2024-06-27", candidate: 448, company: 4, recruiter: 90 },
  { date: "2024-06-28", candidate: 149, company: 2, recruiter: 70 },
  { date: "2024-06-29", candidate: 103, company: 1, recruiter: 40 },
  { date: "2024-06-30", candidate: 446, company: 4, recruiter: 120 },
];

const chartConfig = {
  views: {
    label: "Tạo mới",
  },
  candidate: {
    label: "Candidate",
    color: "hsl(var(--chart-1))",
  },
  company: {
    label: "Company",
    color: "hsl(var(--chart-2))",
  },
  recruiter: {
    label: "Recruiter",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const Dashboard = () => {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("candidate");

  const total = React.useMemo(
    () => ({
      candidate: chartData.reduce((acc, curr) => acc + curr.candidate, 0),
      company: chartData.reduce((acc, curr) => acc + curr.company, 0),
      recruiter: chartData.reduce((acc, curr) => acc + curr.recruiter, 0),
    }),
    []
  );

  return (
    <>
      <Header />
      <div className="flex flex-col container mx-auto gap-y-4 my-4">
        <div className="flex flex-row gap-x-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Total Candidate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl">12345</p>
            </CardContent>
            <CardFooter>
              <Link href="/admin/candidate-manager">
                <button className="px-4 py-2 bg-xanhduong-500 text-white rounded-md hover:bg-xanhduong-600 transition duration-300">
                  View
                </button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Total Company</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl">30</p>
            </CardContent>
            <CardFooter>
              <Link href="/admin/company-manager">
                <button className="px-4 py-2 bg-xanhduong-500 text-white rounded-md hover:bg-xanhduong-600 transition duration-300">
                  View
                </button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle></CardTitle>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle>New Accounts Created</CardTitle>
              <CardDescription>
                Showing total created accounts for the last 3 months
              </CardDescription>
            </div>
            <div className="flex">
              {["candidate", "company", "recruiter"].map((key) => {
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

export default withAuth(Dashboard, ["company"]);
// export default Dashboard;
