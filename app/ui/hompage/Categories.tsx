import React from "react";

const categories = [
  { name: "Graphics & Design", positions: 357 },
  { name: "Code & Programming", positions: 312 },
  { name: "Digital Marketing", positions: 287 },
];

const Categories = () => {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-4">Danh mục phổ biến</h2>
      <div className="grid grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="p-4 border rounded text-center">
            <p className="font-semibold">{category.name}</p>
            <p className="text-gray-500">{category.positions} Open positions</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
