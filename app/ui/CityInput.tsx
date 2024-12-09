import { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";

interface CityInputProps {
  onCityInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeCityValid: (isValid: boolean) => void;
  className?: string;
}

export default function CityInput({ onCityInput, changeCityValid, className }: CityInputProps) {
  const [suggestions, setSuggestions] = useState<{ name: string; code: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityNames, setCityNames] = useState<string[]>([]);
  const [isValidCity, setIsValidCity] = useState<boolean>(false);
  const excludeCity = ['Thành phố Hồ Chí Minh'];

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
      const cityNames = data.map((city: { name: string; code: number }) => {
        if (excludeCity.includes(city.name)) {
          return city.name;
        }
        city.name.replace(/(Thành phố) |(Tỉnh) /g, '');
      });
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
      data.map((city: { name: string; code: number }) => {
        if (!excludeCity.includes(city.name)) {
          city.name = city.name.replace(/(Thành phố) |(Tỉnh) /g, '');
        }
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
        className={clsx(
          className ? className : "w-full p-2 border border-gray-300 rounded-lg",
          !isValidCity && searchQuery !== "" ? "text-red-300" : "text-black",
        )}
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
        <div className="absolute z-9 mt-1 max-h-40 overflow-y-auto text-red-500 text-sm">
          Thành phố không hợp lệ
        </div>
      )}
    </>
  );
}

