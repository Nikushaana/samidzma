"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../dataFetchs/AxiosToken";
import useBlogGallery from "../../../../../../dataFetchs/blogGalleryGetFetch";
import ImgUploader from "@/app/components/Uploaders/ImgUploader";

export default function Page() {
  const router = useRouter();

  const { setAlertShow, setAlertStatus, setAlertText, setAllBlogGalleryRender } = useContext(
    ContextForSharingStates,
  );

  const [loaderAddBlogGallery, setLoaderAddBlogGallery] =
    useState<boolean>(false);

  const HandleAddBlogGallery = (e: any) => {
    e.preventDefault();

    setLoaderAddBlogGallery(true);
    const form = e.target;
    const formData = new FormData(form);

    axiosAdmin
      .post("admin/gallery", formData)
      .then((res) => {
        router.push("/admin/panel/blog/blog-gallery");
        setAllBlogGalleryRender(res);
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით აიტვირთა");
      })
      .catch((err) => {
        setLoaderAddBlogGallery(false);
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ აიტვირთა!");
      })
      .finally(() => {});
  };

  return (
    <form
      onSubmit={HandleAddBlogGallery}
      encType="multipart/form-data"
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderAddBlogGallery && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">ბლოგის გალერეის დამატება</h1>
      <div className="w-full">
        <ImgUploader name="images" multiple={true} />
      </div>
      <div className="w-[200px] mt-[50px]">
        <GreenButton
          name="დამატება"
          button={true}
          loader={loaderAddBlogGallery}
          style="h-[50px] text-[18px]"
        />
      </div>
    </form>
  );
}
