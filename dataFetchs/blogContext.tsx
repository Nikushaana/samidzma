"use client";

import { useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";

const useBlog = () => {
  const [blogData, setBlogData] = useState<BlogType[]>([]);
  const [blogLoader, setBlogLoader] = useState<boolean>(true);

  const fetchBlog = () => {
    setBlogLoader(true);
    axiosUser
      .get("front/info/blog")
      .then((res) => {
        setBlogData(res.data.data);
        setBlogLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return {
    blogData,
    blogLoader,
    fetchBlog,
  };
};

export default useBlog;
