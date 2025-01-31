"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useState } from "react";
import { axiosAdmin } from "../../../../../../dataFetchs/AxiosToken";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../../dataFetchs/sharedStates";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import TextEditor from "@/app/components/Inputs/TextEditor";
import ImgUploader from "@/app/components/Uploaders/ImgUploader";

export default function Page() {
  const router = useRouter();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    setAllBannerRender,
    status,
  } = useContext(ContextForSharingStates);

  const [loaderAddBanner, setLoaderAddBanner] = useState<boolean>(false);
  const [addBannerError, setAddBannerError] = useState<boolean>(false);

  const [addBannerValues, setAddBannerValues] = useState({
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

  const HandleAddBanner = (e: any) => {
    e.preventDefault();
    setLoaderAddBanner(true);
    setAddBannerError(false);
    if (addBannerValues.sort && addBannerValues.status) {
      const form = e.target;
      const formData = new FormData(form);

      formData.append(
        "status",
        status.find((item: any) => item.name === addBannerValues.status)?.id
      );

      axiosAdmin
        .post("admin/mainBanner", formData)
        .then((res) => {
          router.push("/admin/panel/main-banners");
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("წარმატებით აიტვირთა");
          setAllBannerRender(res);
        })
        .catch((err) => {
          setLoaderAddBanner(false);
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("ვერ აიტვირთა!");
        })
        .finally(() => {});
    } else {
      setLoaderAddBanner(false);
      setAlertShow(true);
      setAlertStatus(false);
      setAlertText("სტატუსი და სორტირება აუცილებელი ველებია!");
      setAddBannerError(true);
    }
  };

  return (
    <form
      onSubmit={HandleAddBanner}
      encType="multipart/form-data"
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderAddBanner && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">მთავარი ბანერის დამატება</h1>
      <div className="grid grid-cols-1 gap-[20px] w-full">
        <ImgUploader
          name="large_url"
          title="დეკსტოპის დიდი ბანერი"
          multiple={false}
          setAllValues={setAddBannerValues}
        />
        <ImgUploader
          name="large_mobile_url"
          title="მობილურის დიდი ბანერი"
          multiple={false}
          setAllValues={setAddBannerValues}
        />
        <Input1
          title="დიდი ბანერის ტექსტი"
          name="large_title"
          type="text"
          setAllValues={setAddBannerValues}
          error={false}
        />
        <Input1
          title="დიდი ბანერის ლინკი"
          name="large_redirect_link"
          type="text"
          setAllValues={setAddBannerValues}
          error={false}
        />
        <hr />
        <ImgUploader
          name="medium_url"
          title="დეკსტოპის საშუალო ბანერი"
          multiple={false}
          setAllValues={setAddBannerValues}
        />
        <ImgUploader
          name="medium_mobile_url"
          title="მობილურის საშუალო ბანერი"
          multiple={false}
          setAllValues={setAddBannerValues}
        />
        <Input1
          title="საშუალო ბანერის ტექსტი"
          name="medium_title"
          type="text"
          setAllValues={setAddBannerValues}
          error={false}
        />
        <Input1
          title="საშუალო ბანერის ლინკი"
          name="medium_redirect_link"
          type="text"
          setAllValues={setAddBannerValues}
          error={false}
        />
        <hr />
        <ImgUploader
          name="small1_url"
          title="დეკსტოპის პატარა 1 ბანერი"
          multiple={false}
          setAllValues={setAddBannerValues}
        />
        <ImgUploader
          name="small1_mobile_url"
          title="მობილურის პატარა 1 ბანერი"
          multiple={false}
          setAllValues={setAddBannerValues}
        />
        <Input1
          title="პატარა 1 ბანერის ტექსტი"
          name="small1_title"
          type="text"
          setAllValues={setAddBannerValues}
          error={false}
        />
        <Input1
          title="პატარა 1 ბანერის ლინკი"
          name="small1_redirect_link"
          type="text"
          setAllValues={setAddBannerValues}
          error={false}
        />
        <hr />
        <ImgUploader
          name="small2_url"
          title="დეკსტოპის პატარა 2 ბანერი"
          multiple={false}
          setAllValues={setAddBannerValues}
        />
        <ImgUploader
          name="small2_mobile_url"
          title="მობილურის პატარა 2 ბანერი"
          multiple={false}
          setAllValues={setAddBannerValues}
        />
        <Input1
          title="პატარა 2 ბანერის ტექსტი"
          name="small2_title"
          type="text"
          setAllValues={setAddBannerValues}
          error={false}
        />
        <Input1
          title="პატარა 2 ბანერის ლინკი"
          name="small2_redirect_link"
          type="text"
          setAllValues={setAddBannerValues}
          error={false}
        />
        <hr />
        <DropDown1value
          title="სტატუსი"
          data={status}
          name="status"
          setAllValues={setAddBannerValues}
          error={addBannerError}
        />
        <Input1
          title="სორტირება (მიუთითეთ სასურველი რიცხვი)"
          digit={true}
          name="sort"
          type="text"
          setAllValues={setAddBannerValues}
          error={addBannerError}
        />
      </div>
      <div className="w-[200px]">
        <GreenButton
          name="დამატება"
          button={true}
          loader={loaderAddBanner}
          style="h-[50px] text-[18px]"
        />
      </div>
    </form>
  );
}
