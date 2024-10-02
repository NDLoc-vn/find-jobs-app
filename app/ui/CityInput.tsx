import { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";

interface CityInputProps {
  onCityInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeCityValid: (isValid: boolean) => void;
}

export default function CityInput({onCityInput, changeCityValid}: CityInputProps) {
  const [suggestions, setSuggestions] = useState<{ name: string; code: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityNames, setCityNames] = useState<string[]>([]);
  const [isValidCity, setIsValidCity] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("click", () => {
      setSuggestions([]);
    });
    fetchAllCity();
  }, []);

  useEffect(() => {
    changeCityValid(isValidCity);
  }, [isValidCity])

  const fetchAllCity = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_LOCATION_ALL}`);
      const cityNames = data.map((city: any) => city.name.replace(/(Thành phố) |(Tỉnh) /g, ''));
      setCityNames(cityNames);
    } catch (err) {
      console.error("Error fetching city names: ", err);
    }
  }

  const fetchSuggestions = async (searchQuery: string): Promise<void> => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_LOCATION}${searchQuery}`);
      data.map((city: any) => {
        city.name = city.name.replace(/(Thành phố) |(Tỉnh) /g, '');
      })
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching city suggestions: ", error);
      setSuggestions([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);
    if (cityNames.includes(searchQuery)) {
      setIsValidCity(true);
    } else {
      setIsValidCity(false);
    }
    fetchSuggestions(searchQuery);
    onCityInput(e);
  }

  const handleSuggestionClick = (city: { name: string; code: number }) => {
    setSearchQuery(city.name);
    setIsValidCity(true);
    setSuggestions([]);
  };

  return (
    <>
      <input
        type="text"
        className={clsx("w-full p-2 border border-gray-300 rounded-lg mb-4", isValidCity ? "text-black" : "text-red-300")}
        name="city"
        value={searchQuery}
        onChange={handleInputChange} 
        placeholder="Thành phố"
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
          {suggestions.map((city, index) => (
            <li key={index} onClick={() => handleSuggestionClick(city)} className="p-2 hover:bg-gray-200 cursor-pointer">
              {city.name}
            </li>
          ))}
        </ul>
      )}
      {!isValidCity && searchQuery !== "" && (
        <div className="text-red-500 text-sm -mt-4 ml-2">Địa điểm không phù hợp</div>
      )}
    </>
  );
}

