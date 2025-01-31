"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import TextEditor from "@/app/components/Inputs/TextEditor";
import ImgUploader from "@/app/components/Uploaders/ImgUploader";
import useBlogCategory from "../../../../../../dataFetchs/blogCategoryGetFetch";
import { ContextForSharingStates } from "../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../dataFetchs/AxiosToken";
import * as Yup from "yup";

export default function Page() {
  const router = useRouter();
  const { allBlogCategData } = useBlogCategory();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    status,
    setAllBlogRender,
  } = useContext(ContextForSharingStates);

  const [loaderAddBlog, setLoaderAddBlog] = useState<boolean>(false);

  const [addBlogValues, setAddBlogValues] = useState({
    blogs_category_id: "",
    name: "", // is mandatory
    name_eng: "",
    name_rus: "",
    description: "",
    description_eng: "",
    description_rus: "",
    description2: "",
    description2_eng: "",
    description2_rus: "",
    description3: "",
    description3_eng: "",
    description3_rus: "",
    meta_name: "",
    meta_description: "",
    blogs_main_imgs: "",
    status: "",
    sort: "",
  });

  const [errors, setErrors] = useState<any>({});

  const validationSchema = Yup.object({
    name: Yup.string().required("სათაური სავალდებულოა"),
  });

  const handleAddBlogValidation = (e: any) => {
    e.preventDefault();
    validationSchema
      .validate(addBlogValues, { abortEarly: false })
      .then(() => {
        setErrors({});
        HandleAddBlog(e);
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

  const HandleAddBlog = (e: any) => {
    e.preventDefault();

    setLoaderAddBlog(true);
    const form = e.target;
    const formData = new FormData(form);

    allBlogCategData?.find(
      (item: any) => item.name == addBlogValues.blogs_category_id
    )?.id &&
      formData.append(
        "blogs_category_id",
        allBlogCategData?.find(
          (item: any) => item.name == addBlogValues.blogs_category_id
        )?.id
      );
    formData.append(
      "status",
      status.find((item: any) => item.name === addBlogValues.status)?.id
    );

    axiosAdmin
      .post("admin/blog", formData)
      .then((res) => {
        router.push("/admin/panel/blog");
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით აიტვირთა");
        setAllBlogRender(res);
      })
      .catch((err) => {
        setLoaderAddBlog(false);
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ აიტვირთა!");
      })
      .finally(() => {});
  };

  return (
    <form
      onSubmit={handleAddBlogValidation}
      encType="multipart/form-data"
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderAddBlog && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">ბლოგის დამატება</h1>
      <ImgUploader
        name="blogs_main_imgs"
        multiple={false}
        setAllValues={setAddBlogValues}
      />
      <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-[20px] w-full">
        <DropDown1value
          title="ბლოგის კატეგორია"
          data={allBlogCategData}
          name="blogs_category_id"
          setAllValues={setAddBlogValues}
          error={false}
        />
        <Input1
          title="მეტა სახელი"
          name="meta_name"
          type="text"
          setAllValues={setAddBlogValues}
          error={false}
        />
        <Input1
          title="მეტა აღწერა"
          name="meta_description"
          type="text"
          setAllValues={setAddBlogValues}
          error={false}
        />
      </div>
      <hr className="h-[1px] w-full" />
      <div className="grid grid-cols-1 gap-[20px] w-full">
        <Input1
          title="სათაური"
          name="name"
          type="text"
          setAllValues={setAddBlogValues}
          error={errors.name}
        />
        <TextArea1
          title="მოკლე აღწერა"
          name="description"
          setAllValues={setAddBlogValues}
          error={false}
        />
        <TextEditor
          title="ბლოგი"
          name="description2"
          setAllValues={setAddBlogValues}
          error={false}
        />
        <hr className="h-[1px] w-full" />
        <Input1
          title="სათაური EN"
          name="name_eng"
          type="text"
          setAllValues={setAddBlogValues}
          error={false}
        />
        <TextArea1
          title="მოკლე აღწერა EN"
          name="description_eng"
          setAllValues={setAddBlogValues}
          error={false}
        />
        <TextEditor
          title="ბლოგი EN"
          name="description2_eng"
          setAllValues={setAddBlogValues}
          error={false}
        />
        <hr className="h-[1px] w-full" />
        <Input1
          title="სათაური Рус"
          name="name_rus"
          type="text"
          setAllValues={setAddBlogValues}
          error={false}
        />
        <TextArea1
          title="მოკლე აღწერა Рус"
          name="description_rus"
          setAllValues={setAddBlogValues}
          error={false}
        />
        <TextEditor
          title="ბლოგი Рус"
          name="description2_rus"
          setAllValues={setAddBlogValues}
          error={false}
        />
      </div>
      <hr className="h-[1px] w-full" />
      <div className="w-full">
        <div className="w-[200px] pb-[50px]">
          <DropDown1value
            title="სტატუსი"
            data={status}
            name="status"
            firstValue="აქტიური"
            setAllValues={setAddBlogValues}
            error={false}
          />
        </div>
      </div>
      <div className="w-[200px] ">
        <GreenButton
          name="დამატება"
          button={true}
          loader={loaderAddBlog}
          style="h-[50px] text-[18px]"
        />
      </div>
    </form>
  );
}
