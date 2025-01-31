"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../../dataFetchs/AxiosToken";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import TextEditor from "@/app/components/Inputs/TextEditor";
import ImgUploader from "@/app/components/Uploaders/ImgUploader";
import Image from "next/image";
import * as Yup from "yup";

export default function Page({ params }: { params: { bannersId: string } }) {
  const router = useRouter();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    setAllBannerRender,
    status,
  } = useContext(ContextForSharingStates);

  const [loaderEditBanner, setLoaderEditBanner] = useState<boolean>(true);

  const [oneBannerValues, setOneBannerValues] = useState<any>({
    large_url: "",
    large_mobile_url: "",
    medium_url: "",
    medium_mobile_url: "",
    small1_url: "",
    small1_mobile_url: "",
    small2_url: "",
    small2_mobile_url: "",
    large_title: "",
    large_redirect_link: "",
    medium_title: "",
    medium_redirect_link: "",
    small1_title: "",
    small1_redirect_link: "",
    small2_title: "",
    small2_redirect_link: "",
    type: "",
    status: "",
    sort: "",
    page: "",
  });
  const [editBannerValues, setEditBannerValues] = useState<any>({
    large_url: "",
    large_mobile_url: "",
    medium_url: "",
    medium_mobile_url: "",
    small1_url: "",
    small1_mobile_url: "",
    small2_url: "",
    small2_mobile_url: "",
    large_title: "",
    large_redirect_link: "",
    medium_title: "",
    medium_redirect_link: "",
    small1_title: "",
    small1_redirect_link: "",
    small2_title: "",
    small2_redirect_link: "",
    type: "",
    status: "",
    sort: "",
    page: "",
  });

  const [errors, setErrors] = useState<any>({});

  const validationSchema = Yup.object({
    sort: Yup.string().required("სორტირება სავალდებულოა"),
  });

  const handleEditBannerValidation = (e: any) => {
    e.preventDefault();
    validationSchema
      .validate(editBannerValues, { abortEarly: false })
      .then(() => {
        setErrors({});
        HandleEditBanner(e);
      })
      .catch((err) => {
        const newErrors: any = {};
        err.inner.forEach((error: any) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);

        setAlertShow(true);
        setAlertStatus(false);
        setAlertText(newErrors.sort);
      });
  };

  useEffect(() => {
    setLoaderEditBanner(true);
    axiosAdmin
      .get(`admin/mainBanner/${params.bannersId}`)
      .then((res) => {
        setOneBannerValues(res.data);
        setLoaderEditBanner(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.bannersId]);

  const HandleEditBanner = (e: any) => {
    e.preventDefault();
    setLoaderEditBanner(true);

    const form = e.target;
    const formData = new FormData(form);

    formData.append(
      "status",
      status.find((item: any) => item.name === editBannerValues.status)?.id
    );

    axiosAdmin
      .post(`admin/mainBanner/${params.bannersId}`, formData)
      .then((res) => {
        router.push("/admin/panel/main-banners");
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით რედაქტირდა");
        setAllBannerRender(res);
      })
      .catch((err) => {
        setLoaderEditBanner(false);
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ რედაქტირდა!");
      })
      .finally(() => {});
  };

  return (
    <form
      onSubmit={handleEditBannerValidation}
      encType="multipart/form-data"
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderEditBanner && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">მთავარი ბანერის რედაქტირება</h1>
      <div className="grid grid-cols-1 gap-[20px] w-full">
        <div className="grid grid-cols-1 gap-[20px] w-full">
          <ImgUploader
            name="large_url"
            title="დეკსტოპის დიდი ბანერი"
            multiple={false}
            setAllValues={setEditBannerValues}
          />
          {oneBannerValues?.large_url && (
            <div className=" grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4">
              <div className="relative w-full aspect-video bg-white rounded-[8px] overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${oneBannerValues?.large_url}`}
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          )}
          <ImgUploader
            name="large_mobile_url"
            title="მობილურის დიდი ბანერი"
            multiple={false}
            setAllValues={setEditBannerValues}
          />
          {oneBannerValues?.large_mobile_url && (
            <div className=" grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4">
              <div className="relative w-full aspect-video bg-white rounded-[8px] overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${oneBannerValues?.large_mobile_url}`}
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          )}
          <Input1
            title="დიდი ბანერის ტექსტი"
            name="large_title"
            firstValue={oneBannerValues?.large_title}
            type="text"
            setAllValues={setEditBannerValues}
            error={false}
          />
          <Input1
            title="დიდი ბანერის ლინკი"
            name="large_redirect_link"
            firstValue={oneBannerValues?.large_redirect_link}
            type="text"
            setAllValues={setEditBannerValues}
            error={false}
          />
          <hr />
          <ImgUploader
            name="medium_url"
            title="დეკსტოპის საშუალო ბანერი"
            multiple={false}
            setAllValues={setEditBannerValues}
          />
          {oneBannerValues?.medium_url && (
            <div className=" grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4">
              <div className="relative w-full aspect-video bg-white rounded-[8px] overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${oneBannerValues?.medium_url}`}
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          )}
          <ImgUploader
            name="medium_mobile_url"
            title="მობილურის საშუალო ბანერი"
            multiple={false}
            setAllValues={setEditBannerValues}
          />
          {oneBannerValues?.medium_mobile_url && (
            <div className=" grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4">
              <div className="relative w-full aspect-video bg-white rounded-[8px] overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${oneBannerValues?.medium_mobile_url}`}
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          )}
          <Input1
            title="საშუალო ბანერის ტექსტი"
            name="medium_title"
            firstValue={oneBannerValues?.medium_title}
            type="text"
            setAllValues={setEditBannerValues}
            error={false}
          />
          <Input1
            title="საშუალო ბანერის ლინკი"
            name="medium_redirect_link"
            firstValue={oneBannerValues?.medium_redirect_link}
            type="text"
            setAllValues={setEditBannerValues}
            error={false}
          />
          <hr />
          <ImgUploader
            name="small1_url"
            title="დეკსტოპის პატარა 1 ბანერი"
            multiple={false}
            setAllValues={setEditBannerValues}
          />
          {oneBannerValues?.small1_url && (
            <div className=" grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4">
              <div className="relative w-full aspect-video bg-white rounded-[8px] overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${oneBannerValues?.small1_url}`}
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          )}
          <ImgUploader
            name="small1_mobile_url"
            title="მობილურის პატარა 1 ბანერი"
            multiple={false}
            setAllValues={setEditBannerValues}
          />
          {oneBannerValues?.small1_mobile_url && (
            <div className=" grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4">
              <div className="relative w-full aspect-video bg-white rounded-[8px] overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${oneBannerValues?.small1_mobile_url}`}
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          )}
          <Input1
            title="პატარა 1 ბანერის ტექსტი"
            name="small1_title"
            firstValue={oneBannerValues?.small1_title}
            type="text"
            setAllValues={setEditBannerValues}
            error={false}
          />
          <Input1
            title="პატარა 1 ბანერის ლინკი"
            name="small1_redirect_link"
            firstValue={oneBannerValues?.small1_redirect_link}
            type="text"
            setAllValues={setEditBannerValues}
            error={false}
          />
          <hr />
          <ImgUploader
            name="small2_url"
            title="დეკსტოპის პატარა 2 ბანერი"
            multiple={false}
            setAllValues={setEditBannerValues}
          />
          {oneBannerValues?.small2_url && (
            <div className=" grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4">
              <div className="relative w-full aspect-video bg-white rounded-[8px] overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${oneBannerValues?.small2_url}`}
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          )}
          <ImgUploader
            name="small2_mobile_url"
            title="მობილურის პატარა 2 ბანერი"
            multiple={false}
            setAllValues={setEditBannerValues}
          />
          {oneBannerValues?.small2_mobile_url && (
            <div className=" grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4">
              <div className="relative w-full aspect-video bg-white rounded-[8px] overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${oneBannerValues?.small2_mobile_url}`}
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          )}
          <Input1
            title="პატარა 2 ბანერის ტექსტი"
            name="small2_title"
            firstValue={oneBannerValues?.small2_title}
            type="text"
            setAllValues={setEditBannerValues}
            error={false}
          />
          <Input1
            title="პატარა 2 ბანერის ლინკი"
            name="small2_redirect_link"
            firstValue={oneBannerValues?.small2_redirect_link}
            type="text"
            setAllValues={setEditBannerValues}
            error={false}
          />
          <hr />
          <DropDown1value
            title="სტატუსი"
            data={status}
            name="status"
            firstValue={
              status.find((item: any) => item.id === oneBannerValues.status)
                ?.name
            }
            setAllValues={setEditBannerValues}
            error={false}
          />
          <Input1
            title="სორტირება (მიუთითეთ სასურველი რიცხვი)"
            digit={true}
            name="sort"
            firstValue={oneBannerValues?.sort}
            type="text"
            setAllValues={setEditBannerValues}
            error={errors.sort}
          />
        </div>
      </div>
      <div className="w-[200px]">
        <GreenButton
          name="რედაქტირება"
          button={true}
          loader={loaderEditBanner}
          style="h-[50px] text-[18px]"
        />
      </div>
    </form>
  );
}
