"use client";

import { useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";

const useBlogCategory = () => {
  const [allBlogCategData, setAllBlogCategData] = useState<any[]>([]);
  const [allBlogCategLoader, setAllBlogCategLoader] = useState<boolean>(true);

  const fetchBlogCategory = () => {
    setAllBlogCategLoader(true);
    axiosUser
      .get("admin/blogCategory")
      .then((res) => {
        setAllBlogCategData(res.data.data);
        setAllBlogCategLoader(false);
      })
      .finally(() => {
        setAllBlogCategLoader(false);
      });
  };

  useEffect(() => {
    fetchBlogCategory();
  }, []);

  return {
    allBlogCategData,
    allBlogCategLoader,
    fetchBlogCategory
  };
};

export default useBlogCategory;
