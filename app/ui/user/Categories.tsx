import { categories } from "@/app/lib/data";
import React, { useState } from "react";

// type Category = {
//   name: string;
// };

type CategoriesProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

const allCategories = categories;

const Categories: React.FC<CategoriesProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const [showAll, setShowAll] = useState<boolean>(false);

  const categoriesToShow = showAll ? allCategories : allCategories.slice(0, 4);

  const toggleShowMore = () => setShowAll((prev) => !prev);

  const handleCategorySelect = (categoryName: string) => {
    onCategoryChange(categoryName);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Danh mục</h2>
      </div>

      <div className="flex flex-col space-y-4">
        {categoriesToShow.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategorySelect(category.name)}
            className={`cursor-pointer p-4 border rounded text-center ${
              selectedCategory === category.name
                ? "border-blue-500 bg-blue-100"
                : "border-gray-300"
            }`}
          >
            <p className="font-semibold text-sm sm:text-base lg:text-lg">
              {category.name}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={toggleShowMore}
        className="mt-4 text-blue-500 hover:underline"
      >
        {showAll ? "Show less" : "Show more"}
      </button>
    </div>
  );
};

export default Categories;
