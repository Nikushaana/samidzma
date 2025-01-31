"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../../../dataFetchs/AxiosToken";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import useBlogCategory from "../../../../../../../../dataFetchs/blogCategoryGetFetch";
import * as Yup from "yup";

export default function Page({ params }: { params: { blogcategId: string } }) {
  const router = useRouter();

  const { setAlertShow, setAlertStatus, setAlertText, status } = useContext(
    ContextForSharingStates
  );

  const { fetchBlogCategory } = useBlogCategory();

  const [loaderEditBlogCateg, setLoaderEditBlogCateg] = useState<boolean>(true);

  const [oneBlogCategValues, setOneBlogCategValues] = useState({
    name: "",
    name_eng: "",
    name_rus: "",
    meta_name: "",
    meta_description: "",
    color: "",
    sort: 0,
    status: 0,
  });
  const [editBlogCategValues, setEditBlogCategValues] = useState({
    name: "",
    name_eng: "",
    name_rus: "",
    meta_name: "",
    meta_description: "",
    color: "",
    sort: 0,
    status: "",
  });

  const [errors, setErrors] = useState<any>({});

  const validationSchema = Yup.object({
    name: Yup.string().required("კატეგორია სავალდებულოა"),
  });

  const handleEditBlogCategValidation = () => {
    validationSchema
      .validate(editBlogCategValues, { abortEarly: false })
      .then(() => {
        setErrors({});
        HandleEditBlogCateg();
      })
      .catch((err) => {
        const newErrors: any = {};
        err.inner.forEach((error: any) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);

        setAlertShow(true);
        setAlertStatus(false);
        setAlertText(newErrors.name);
      });
  };

  useEffect(() => {
    setLoaderEditBlogCateg(true);
    axiosAdmin
      .get(`admin/blogCategory/${params.blogcategId}`)
      .then((res) => {
        setOneBlogCategValues(res.data);
        setLoaderEditBlogCateg(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.blogcategId]);

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleEditBlogCategValidation();
    }
  };

  const HandleEditBlogCateg = () => {
    setLoaderEditBlogCateg(true);
    axiosAdmin
      .post(`admin/blogCategory/${params.blogcategId}`, {
        name: editBlogCategValues.name,
        name_eng: editBlogCategValues.name_eng,
        name_rus: editBlogCategValues.name_rus,
        meta_name: editBlogCategValues.meta_name,
        meta_description: editBlogCategValues.meta_description,
        color: editBlogCategValues.color,
        sort: editBlogCategValues.sort,
        status: status.find(
          (item: any) => item.name === editBlogCategValues.status
        )?.id,
      })
      .then((res) => {
        router.push("/admin/panel/blog/blog-category");
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით რედაქტირდა");
        fetchBlogCategory();
      })
      .catch((err) => {
        setLoaderEditBlogCateg(false);
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ რედაქტირდა!");
      })
      .finally(() => {});
  };

  return (
    <div
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderEditBlogCateg && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">ბლოგის კატეგორიის რედაქტირება</h1>
      <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-[20px] w-full">
        <Input1
          title="კატეგორია"
          name="name"
          type="text"
          firstValue={oneBlogCategValues.name}
          setAllValues={setEditBlogCategValues}
          error={errors.name}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="კატეგორია EN"
          name="name_eng"
          type="text"
          firstValue={oneBlogCategValues.name_eng}
          setAllValues={setEditBlogCategValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="კატეგორია Рус"
          name="name_rus"
          type="text"
          firstValue={oneBlogCategValues.name_rus}
          setAllValues={setEditBlogCategValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="მეტა სახელი"
          name="meta_name"
          type="text"
          firstValue={oneBlogCategValues.meta_name}
          setAllValues={setEditBlogCategValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="მეტა აღწერა"
          name="meta_description"
          type="text"
          firstValue={oneBlogCategValues.meta_description}
          setAllValues={setEditBlogCategValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />

        <Input1
          title="ფერი"
          name="color"
          firstValue={oneBlogCategValues.color}
          type="color"
          setAllValues={setEditBlogCategValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />

        <Input1
          title="სორტირება (მიუთითეთ სასურველი რიცხვი)"
          digit={true}
          name="sort"
          type="text"
          firstValue={oneBlogCategValues.sort}
          setAllValues={setEditBlogCategValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <DropDown1value
          title="სტატუსი"
          data={status}
          name="status"
          firstValue={
            status.find((item: any) => item.id === oneBlogCategValues.status)
              ?.name
          }
          setAllValues={setEditBlogCategValues}
          error={false}
        />
      </div>
      <div className="w-[200px] mt-[50px]">
        <GreenButton
          name="რედაქტირება"
          action={handleEditBlogCategValidation}
          loader={loaderEditBlogCateg}
          style="h-[50px] text-[18px]"
        />
      </div>
    </div>
  );
}
