import React from "react";
import Link from "next/link";

const categories = [
  { name: "Graphics & Design", positions: 357 },
  { name: "Code & Programming", positions: 312 },
  { name: "Digital Marketing", positions: 287 },
  { name: "Video & Animation", positions: 247 },
];

const Categories = () => {
  return (
    <div className="mt-12">
      {/* Header của Categories */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Danh mục phổ biến</h2>
        <Link className="text-xanhduong-600 hover:underline" href="#">
          Xem tất cả &#8594;
        </Link>
      </div>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="p-4 border rounded text-center">
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
