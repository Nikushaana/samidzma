"use client";

import { useEffect, useState } from "react";
import { axiosAdmin, axiosUser } from "./AxiosToken";

const useBlogGallery = () => {
  const [allBlogGalleryData, setAllBlogGalleryData] = useState<any[]>([]);
  const [allBlogGalleryLoader, setAllBlogGalleryLoader] = useState<boolean>(true);

  const fetchBlogGallery = () => {
    setAllBlogGalleryLoader(true);
    axiosAdmin
      .get("admin/gallery")
      .then((res) => {
        setAllBlogGalleryData(res.data.data);
        setAllBlogGalleryLoader(false);
      })
      .finally(() => {
        setAllBlogGalleryLoader(false);
      });
  };

  useEffect(() => {
    fetchBlogGallery();
  }, []);

  return {
    allBlogGalleryData,
    allBlogGalleryLoader,
    fetchBlogGallery,
  };
};

export default useBlogGallery;
