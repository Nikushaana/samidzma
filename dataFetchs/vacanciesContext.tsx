"use client";

import { useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";

const useVacancies = () => {
  const [vacancyData, setVacancyData] = useState<any[]>([]);
  const [vacancyLoader, setVacancyLoader] = useState<boolean>(true);

  const fetchVacancies = () => {
    setVacancyLoader(true);
    axiosUser
      .get("front/vacancy")
      .then(({ data }) => {
        const updatedData = data.data.map((item: VacanciesType) => ({
          ...item,
          name: item.position,
        }));
        setVacancyData(updatedData);
      })
      .finally(() => {
        setVacancyLoader(false);
      });
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  return {
    vacancyData,
    vacancyLoader,
    fetchVacancies,
  };
};

export default useVacancies;
