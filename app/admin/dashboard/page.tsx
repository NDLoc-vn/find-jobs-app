"use client"

import React from "react"
import axios from "axios"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { useAuth } from "@/app/contexts/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import Link from "next/link"
import { AdminDashboardSkeleton } from "@/app/ui/sketetons";

type MonthlyData = {
  month: number;
  year: number;
  count: number;
};

type UserData = {
  totalUsers: number;
  usersCreatedToday: number;
  usersCreatedEachMonth: MonthlyData[];
};

type RecruiterData = {
  totalRecruiters: number;
  recruitersCreatedToday: number;
  recruitersCreatedEachMonth: MonthlyData[];
};

type GrowthData = {
  users: UserData;
  recruiters: RecruiterData;
};

const Dashboard = () => {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("candidate")
  const [data, setData] = React.useState<GrowthData | null>(null)
  const { token } = useAuth();

  React.useEffect(() => {
    axios.get("https://user-service-job-system.onrender.com/api/statistics/growth/", {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error))
  }, [token])

  if (!data) {
    return (
      <AdminDashboardSkeleton />
    )
  }

  const chartData = data.users.usersCreatedEachMonth.map((item, index) => ({
    date: `${item.year}-${item.month.toString().padStart(2, "0")}-01`,
    candidate: item.count,
    recruiter: data.recruiters.recruitersCreatedEachMonth[index].count,
  })).reverse()

  const chartConfig = {
    views: {
      label: "Tạo mới",
    },
    candidate: {
      label: "Người tìm việc",
      color: "hsl(var(--chart-1))",
    },
    company: {
      label: "Công ty",
      color: "hsl(var(--chart-2))",
    },
    recruiter: {
      label: "Nhà tuyển dụng",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig

  const total = {
    candidate: data.users.totalUsers,
    company: 0,
    recruiter: data.recruiters.totalRecruiters,
  }

  return (
    <>
      <div className="flex flex-col container mx-auto gap-y-4 my-4">
        <div className="flex flex-row gap-x-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Người xin việc</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl">{total.candidate}</p>
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
              <CardTitle>Công ty</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl">{total.company}</p>
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
              <CardTitle>Nhà tuyển dụng</CardTitle>
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
        </div>

        <Card>
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle>Tài khoản cấp mới</CardTitle>
              <CardDescription>
                {/* Showing total created accounts for the last 3 months */}
              </CardDescription>
            </div>
            <div className="flex">
              {["candidate", "company", "recruiter"].map((key) => {
                const chart = key as keyof typeof chartConfig
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
                )
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
                    const date = new Date(value)
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                />
                <YAxis allowDecimals={false} />
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
                        })
                      }}
                    />
                  }
                />
                <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Dashboard