/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useContext, useEffect, useState } from "react";
import { axiosAdmin } from "../../../../../../dataFetchs/AxiosToken";
import { ContextForSharingStates } from "../../../../../../dataFetchs/sharedStates";
import ImgUploader from "@/app/components/Uploaders/ImgUploader";
import GreenButton from "@/app/components/buttons/greenButton";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";

export default function Page() {
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates,
  );

  const [branchImagesData, setBranchImagesData] = useState([]);
  const [branchImagesLoader, setBranchImagesLoader] = useState(true);
  const [branchImagesRender, setBranchImagesRender] = useState<any>();

  const [addLoaderBranchImages, setAddLoaderBranchImages] = useState(false);

  useEffect(() => {
    setBranchImagesLoader(true);
    axiosAdmin
      .get(`admin/branchPage`)
      .then((res) => {
        setBranchImagesData(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setBranchImagesLoader(false);
      });
  }, [branchImagesRender]);

  const HandleAddBranchImages = (e: any) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    setAddLoaderBranchImages(true);

    axiosAdmin
      .post(`admin/branchPage`, formData)
      .then((res) => {
        setBranchImagesRender(res);
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით დაემატა");
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ დაემატა!");
      })
      .finally(() => {
        setAddLoaderBranchImages(false);
      });
  };

  const HandleDeleteBranchImage = (id: any) => {
    setBranchImagesLoader(true);
    axiosAdmin
      .delete(`admin/branchPage/${id}`)
      .then((res) => {
        setBranchImagesRender(res);
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით წაიშალა");
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ წაიშალა!");
      })
      .finally(() => {
        setBranchImagesLoader(false);
      });
  };

  return (
    <div className={`flex flex-col gap-y-[20px] `}>
      <h1>სამიძმის ფილიალების ფოტოების დამატება</h1>
      <hr />

      {branchImagesData.length > 0 && (
        <div className=" grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4">
          {branchImagesData.map((item: any) => (
            <div
              key={item.id}
              className="relative w-full aspect-video bg-white rounded-[8px] overflow-hidden"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.url}`}
                alt={""}
                sizes="500px"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
              <div
                className="rounded-[8px] absolute flex top-[7px] right-[10px] w-8 h-8 bg-gray-100 cursor-pointer items-center justify-center"
                onClick={() => HandleDeleteBranchImage(item.id)}
              >
                <AiOutlineClose className="text-[red] text-2xl" />
              </div>
            </div>
          ))}
        </div>
      )}
      <form
        onSubmit={HandleAddBranchImages}
        encType="multipart/form-data"
        className={`flex flex-col gap-y-[20px] items-end duration-100 ${
          branchImagesLoader && "pointer-events-none opacity-[0.5]"
        }`}
      >
        <ImgUploader
          name="branch_images"
          multiple={true}
          render={branchImagesData}
        />
        <div className="w-[200px]">
          <GreenButton
            name="დამატება"
            loader={addLoaderBranchImages}
            style="h-[50px] text-[18px]"
            button={true}
          />
        </div>
      </form>
    </div>
  );
}
