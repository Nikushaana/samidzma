"use client";

import { useEffect, useState } from "react";
import { axiosAdmin, axiosUser } from "./AxiosToken";

const useBlogEmployee = () => {
  const [allBlogEmployeeData, setAllBlogEmployeeData] = useState<any[]>([]);
  const [allBlogEmployeeLoader, setAllBlogEmployeeLoader] = useState<boolean>(true);

  const fetchBlogEmployee = () => {
    setAllBlogEmployeeLoader(true);
    axiosAdmin
      .get("admin/employee")
      .then((res) => {
        setAllBlogEmployeeData(res.data.data);
        setAllBlogEmployeeLoader(false);
      })
      .finally(() => {
        setAllBlogEmployeeLoader(false);
      });
  };

  useEffect(() => {
    fetchBlogEmployee();
  }, []);

  return {
    allBlogEmployeeData,
    allBlogEmployeeLoader,
    fetchBlogEmployee,
  };
};

export default useBlogEmployee;
