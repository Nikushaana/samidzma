"use client";

import { useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";

const useFrontBranches = () => {
  const [FrontBranchesData, setFrontBranchesData] = useState<any>([]);
  const [FrontBranchesLoader, setFrontBranchesLoader] = useState<boolean>(true);

  const fetchFrontBranches = () => {
    setFrontBranchesLoader(true);
    axiosUser
      .get("front/info/branchAll")
      .then((res) => {
        setFrontBranchesData(res.data.data);
      })
      .finally(() => {
        setFrontBranchesLoader(false);
      });
  };

  useEffect(() => {
    fetchFrontBranches();
  }, []);

  return {
    FrontBranchesData,
    FrontBranchesLoader,
    setFrontBranchesLoader,
    fetchFrontBranches,
  };
};

export default useFrontBranches;
