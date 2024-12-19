import { useState, useEffect } from "react";
import axios from "axios";

interface LocationData {
  location: string;
  count: number;
}

export const useUserLocations = (token: string) => {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("https://user-service-job-system.onrender.com/api/statistics/demographic/", {
          headers: {
            Authorization: `${token}`,
          },
        });
        setLocations(response.data);
      } catch (error) {
        console.error("Failed to fetch user locations", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, [token]);

  return { locations, isLoading };
};
