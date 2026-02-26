"use client";

import { useEffect, useState } from "react";
import { axiosAdmin } from "./AxiosToken";

const useSamidzmaBranches = () => {
  const [allSamidzmaBranchesData, setAllSamidzmaBranchesData] = useState<any[]>(
    []
  );
  const [allSamidzmaBranchesLoader, setAllSamidzmaBranchesLoader] =
    useState<boolean>(true);

  const fetchSamidzmaBranches = () => {
    setAllSamidzmaBranchesLoader(true);
    axiosAdmin
      .get("admin/branch")
      .then((res) => {
        setAllSamidzmaBranchesData(res.data.data);
        setAllSamidzmaBranchesLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  };

  useEffect(() => {
    fetchSamidzmaBranches();
  }, []);

  return {
    allSamidzmaBranchesData,
    allSamidzmaBranchesLoader,
    fetchSamidzmaBranches,
  };
};

export default useSamidzmaBranches;
