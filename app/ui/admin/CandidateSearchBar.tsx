import { useState } from "react";
import ProvinceInput from "../ProvinceInput";

type CandidateSearchBarProps = {
  onSearch: (query: string, location: string) => void;
  initialSearch: string;
  initialLocation: string;
};

const CandidateSearchBar = ({ onSearch, initialSearch, initialLocation }: CandidateSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [location, setLocation] = useState(initialLocation);

  const handleSearch = () => {
    onSearch(searchQuery, location);
  };

  const handleLocationChange = (loc: string) => {
    setLocation(loc);
  }

  return (
    <div className="flex flex-nowrap flex-col md:flex-row justify-center mt-8">
      <div className="relative md:w-1/3 w-full mr-2">
        <input
          type="text"
          placeholder="Tìm theo tên và email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="relative md:w-1/6 w-full mr-2">
        <ProvinceInput value={location} onChange={handleLocationChange} />
      </div>
      {/* <div className="relative md:w-1/3 w-full mr-2">
        <input
          type="text"
          placeholder=""
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div> */}
      <button
        onClick={handleSearch}
        className="px-6 py-2 bg-xanhduong-600 text-white rounded md:ml-2 md:mt-0 mt-6"
      >
        Tìm kiếm
      </button>
    </div>
  );
};

export default CandidateSearchBar;
