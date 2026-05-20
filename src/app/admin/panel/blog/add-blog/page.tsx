"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import ImgUploader from "@/app/components/Uploaders/ImgUploader";
import useBlogCategory from "../../../../../../dataFetchs/blogCategoryGetFetch";
import { ContextForSharingStates } from "../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../dataFetchs/AxiosToken";
import * as Yup from "yup";
import TextEditor2 from "@/app/components/Inputs/TextEditor2";
import BlogCategorySelector from "@/app/components/Inputs/blogCategorySelector";
import useBlogEmployee from "../../../../../../dataFetchs/blogEmployeeGetFetch";
import NormalCalendar from "@/app/components/Inputs/NormalCalendar";

export default function Page() {
  const router = useRouter();
  const { allBlogCategData } = useBlogCategory();
  const { allBlogEmployeeData } = useBlogEmployee();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    blogStatus,
    setAllBlogRender,
  } = useContext(ContextForSharingStates);

  const [loaderAddBlog, setLoaderAddBlog] = useState<boolean>(false);

  const [addBlogValues, setAddBlogValues] = useState({
    employee_id: "",
    blogs_category_ids: [],
    link: "",
    publication_date: "",
    reading_minute: "",
    name: "",
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
    blogs_main_imgs_alt: "",
    status: "",
    sort: "",
  });

  const [errors, setErrors] = useState<any>({});

  const validationSchema = Yup.object({
    name: Yup.string().required("სათაური სავალდებულოა"),
    employee_id: Yup.string().required("ავტორი სავალდებულოა"),
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
        setAlertText(newErrors.name || newErrors.employee_id);
      });
  };

  const HandleAddBlog = (e: any) => {
    e.preventDefault();

    setLoaderAddBlog(true);
    const form = e.target;
    const formData = new FormData(form);

    formData.append("description2", addBlogValues.description2);

    formData.append("publication_date", addBlogValues.publication_date);

    formData.append(
      "blogs_category_ids",
      JSON.stringify(addBlogValues.blogs_category_ids),
    );

    formData.append(
      "status",
      blogStatus.find((item: any) => item.name === addBlogValues.status)?.id,
    );

    formData.append(
      "employee_id",
      allBlogEmployeeData.find(
        (item: any) => item.name === addBlogValues.employee_id,
      )?.id,
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

  console.log(addBlogValues.publication_date);
  
  
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
      <Input1
        title="მთავარი სურათის alt"
        name="blogs_main_imgs_alt"
        type="text"
        setAllValues={setAddBlogValues}
        error={false}
      />
      <BlogCategorySelector
        title="ბლოგის კატეგორიები"
        data={allBlogCategData}
        name="blogs_category_ids"
        setAllValues={setAddBlogValues}
        error={false}
      />
      <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-[20px] w-full">
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
        <Input1
          title="ლინკი"
          name="link"
          type="text"
          setAllValues={setAddBlogValues}
          error={false}
        />
        <Input1
          title="წაკითხვის დრო"
          name="reading_minute"
          type="text"
          setAllValues={setAddBlogValues}
          error={false}
        />
        <NormalCalendar
          title="გამიქვეყნების თარიღი"
          placeholder="აირჩიე.."
          name="publication_date"
          setAllValues={setAddBlogValues}
        />
        <DropDown1value
          title="ავტორი"
          data={allBlogEmployeeData}
          name="employee_id"
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
        <TextEditor2
          title="ბლოგი"
          name="description2"
          setAllValues={setAddBlogValues}
          error={false}
        />
      </div>
      <hr className="h-[1px] w-full" />
      <div className="w-full">
        <div className="w-[200px] pb-[50px]">
          <DropDown1value
            title="სტატუსი"
            data={blogStatus}
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
