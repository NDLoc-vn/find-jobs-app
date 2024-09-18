import React from "react";

const SearchBar = () => {
  return (
    <div className="flex justify-center mt-8">
      <input
        type="text"
        placeholder="Chức danh, kĩ năng, ..."
        className="border px-4 py-2 w-96 rounded-l-md"
      />
      <input
        type="text"
        placeholder="Vị trí"
        className="border px-4 py-2 w-64 rounded-r-md"
      />
      <button className="px-6 py-2 bg-blue-500 text-white rounded ml-2">
        Tìm kiếm
      </button>
    </div>
  );
};

export default SearchBar;
