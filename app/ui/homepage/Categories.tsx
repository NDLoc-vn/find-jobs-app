"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getListCardJobs } from "@/app/services/jobService";
import { useRouter } from "next/navigation";

// const categories = [
//   { name: "Graphics & Design", positions: 357 },
//   { name: "Code & Programming", positions: 312 },
//   { name: "Digital Marketing", positions: 287 },
//   { name: "Video & Animation", positions: 247 },
// ];

const Categories = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<
    { name: string; positions: number }[]
  >([]);

  useEffect(() => {
    getListCardJobs()
      .then((jobs) => {
        const categoryCounts = jobs.reduce(
          (acc: Record<string, number>, job) => {
            const categoryName = job.category.name;
            if (!acc[categoryName]) {
              acc[categoryName] = 0;
            }
            acc[categoryName]++;
            return acc;
          },
          {}
        );

        const sortedCategories = Object.entries(categoryCounts)
          .map(([name, positions]) => ({ name, positions }))
          .sort((a, b) => b.positions - a.positions);

        setCategories(sortedCategories.slice(0, 4));
      })
      .catch((err) => {
        console.log("Error fetching jobs:", err);
      });
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/search-job?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Danh mục phổ biến</h2>
        <Link className="text-xanhduong-600 hover:underline" href="/search-job">
          Xem tất cả &#8594;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="cursor-pointer p-4 border rounded text-center gradient-hover"
            onClick={() => handleCategoryClick(category.name)}
          >
            <p className="font-semibold text-sm sm:text-base lg:text-lg">
              {category.name}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              {category.positions} Open positions
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
