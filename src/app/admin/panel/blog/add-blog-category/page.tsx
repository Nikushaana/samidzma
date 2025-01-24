"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import useBlogCategory from "../../../../../../dataFetchs/blogCategoryGetFetch";
import { ContextForSharingStates } from "../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../dataFetchs/AxiosToken";

export default function Page() {
  const { fetchBlogCategory } = useBlogCategory();
  const router = useRouter();

  const { setAlertShow, setAlertStatus, setAlertText, status } = useContext(
    ContextForSharingStates
  );

  const [loaderAddBlogCateg, setLoaderAddBlogCateg] = useState<boolean>(false);

  const [addBlogCategValues, setAddBlogCategValues] = useState({
    name: "",
    name_eng: "",
    name_rus: "",
    meta_name: "",
    meta_description: "",
    color: "",
    sort: 0,
    status: "",
  });

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      HandleAddBlogCateg();
    }
  };

  const HandleAddBlogCateg = () => {
    setLoaderAddBlogCateg(true);
    if (addBlogCategValues.name && addBlogCategValues.name_eng) {
      axiosAdmin
        .post("admin/blogCategory", {
          name: addBlogCategValues.name,
          name_eng: addBlogCategValues.name_eng,
          name_rus: addBlogCategValues.name_rus,
          meta_name: addBlogCategValues.meta_name,
          meta_description: addBlogCategValues.meta_description,
          color: addBlogCategValues.color,
          sort: addBlogCategValues.sort,
          status: status.find(
            (item: any) => item.name === addBlogCategValues.status
          )?.id,
        })
        .then((res) => {
          router.push("/admin/panel/blog/blog-category");
          fetchBlogCategory();
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("წარმატებით აიტვირთა");
        })
        .catch((err) => {
          setLoaderAddBlogCateg(false);
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("ვერ აიტვირთა!");
        })
        .finally(() => {});
    } else {
      setLoaderAddBlogCateg(false);
    }
  };

  return (
    <div
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderAddBlogCateg && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">ბლოგის კატეგორიის დამატება</h1>
      <div className="grid grid-cols-3 gap-[20px] w-full">
        <Input1
          title="კატეგორია"
          name="name"
          type="text"
          setAllValues={setAddBlogCategValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="კატეგორია EN"
          name="name_eng"
          type="text"
          setAllValues={setAddBlogCategValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="კატეგორია Рус"
          name="name_rus"
          type="text"
          setAllValues={setAddBlogCategValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="მეტა სახელი"
          name="meta_name"
          type="text"
          setAllValues={setAddBlogCategValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="მეტა აღწერა"
          name="meta_description"
          type="text"
          setAllValues={setAddBlogCategValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />

        <Input1
          title="ფერი"
          name="color"
          type="color"
          setAllValues={setAddBlogCategValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />

        <Input1
          title="სორტირება (მიუთითეთ სასურველი რიცხვი)"
          digit={true}
          name="sort"
          type="text"
          setAllValues={setAddBlogCategValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <DropDown1value
          title="სტატუსი"
          data={status}
          name="status"
          setAllValues={setAddBlogCategValues}
          error={false}
        />
      </div>
      <div className="w-[200px]">
        <GreenButton
          name="დამატება"
          action={HandleAddBlogCateg}
          loader={loaderAddBlogCateg}
          style="h-[50px] text-[18px]"
        />
      </div>
    </div>
  );
}
