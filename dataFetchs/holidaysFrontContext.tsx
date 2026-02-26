"use client";

import { useEffect, useState } from "react";
import { axiosAdmin } from "./AxiosToken";

const useHolidaysFront = () => {
  const [HolidaysFrontData, setHolidaysFrontData] = useState<any[]>([]);
  const [HolidaysFrontLoader, setHolidaysFrontLoader] = useState<boolean>(true);

  const fetchHolidaysFront = () => {
    setHolidaysFrontLoader(true);
    axiosAdmin
      .get("front/getAllHoliday")
      .then(({ data }) => {
        setHolidaysFrontData(data);
      })
      .finally(() => {
        setHolidaysFrontLoader(false);
      });
  };

  useEffect(() => {
    fetchHolidaysFront();
  }, []);

  return {
    HolidaysFrontData,
    HolidaysFrontLoader,
    fetchHolidaysFront,
  };
};

export default useHolidaysFront;
