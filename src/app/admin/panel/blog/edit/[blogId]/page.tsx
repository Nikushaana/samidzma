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
import useBlogCategory from "../../../../../../../dataFetchs/blogCategoryGetFetch";
import ImgUploader from "@/app/components/Uploaders/ImgUploader";
import Image from "next/image";
import { BiTrash } from "react-icons/bi";
import * as Yup from "yup";

export default function Page({ params }: { params: { blogId: string } }) {
  const router = useRouter();
  const { allBlogCategData } = useBlogCategory();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    status,
    setAllBlogRender,
  } = useContext(ContextForSharingStates);
  const [loaderEditBlog, setLoaderEditBlog] = useState<boolean>(true);

  const [oneBlogValues, setOneBlogValues] = useState({
    blogs_category_id: "",
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
    main_img: "",
    status: 0,
    sort: 0,
  });
  const [editBlogValues, setEditBlogValues] = useState({
    blogs_category_id: "",
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
    main_img: "",
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
      .validate(editBlogValues, { abortEarly: false })
      .then(() => {
        setErrors({});
        HandleEditBlog(e);
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
    setLoaderEditBlog(true);
    axiosAdmin
      .get(`admin/Blog/${params.blogId}`)
      .then((res) => {
        setOneBlogValues(res.data);
        setLoaderEditBlog(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.blogId]);

  const HandleEditBlog = (e: any) => {
    e.preventDefault();

    setLoaderEditBlog(true);
    const form = e.target;
    const formData = new FormData(form);

    formData.append(
      "blogs_category_id",
      allBlogCategData?.find(
        (item: any) => item.name == editBlogValues.blogs_category_id
      )?.id
    );
    formData.append(
      "status",
      status.find((item: any) => item.name === editBlogValues.status)?.id
    );

    axiosAdmin
      .post(`admin/Blog/${params.blogId}`, formData)
      .then((res) => {
        router.push("/admin/panel/blog");
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით რედაქტირდა");
        setAllBlogRender(res);
      })
      .catch((err) => {
        setLoaderEditBlog(false);
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ რედაქტირდა!");
      })
      .finally(() => {});
  };

  return (
    <form
      onSubmit={handleAddBlogValidation}
      encType="multipart/form-data"
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderEditBlog && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">ბლოგის რედაქტირება</h1>
      <div className="grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4 items-center w-full">
        <div className="relative w-full aspect-video bg-white rounded-[12px] overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${oneBlogValues?.main_img}`}
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      <ImgUploader
        name="blogs_main_imgs"
        multiple={false}
        setAllValues={setEditBlogValues}
      />
      <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-[20px] w-full">
        <DropDown1value
          title="ბლოგის კატეგორია"
          data={allBlogCategData}
          name="blogs_category_id"
          firstValue={
            allBlogCategData.find(
              (item: any) => item.id === oneBlogValues.blogs_category_id
            )?.name
          }
          setAllValues={setEditBlogValues}
          error={false}
        />
        <Input1
          title="მეტა სახელი"
          name="meta_name"
          type="text"
          firstValue={oneBlogValues.meta_name}
          setAllValues={setEditBlogValues}
          error={false}
        />
        <Input1
          title="მეტა აღწერა"
          name="meta_description"
          type="text"
          firstValue={oneBlogValues.meta_description}
          setAllValues={setEditBlogValues}
          error={false}
        />
      </div>
      <hr className="h-[1px] w-full" />
      <div className="grid grid-cols-1 gap-[20px] w-full">
        <Input1
          title="სათაური"
          name="name"
          type="text"
          firstValue={oneBlogValues.name}
          setAllValues={setEditBlogValues}
          error={errors.name}
        />
        <TextArea1
          title="მოკლე აღწერა"
          name="description"
          firstValue={oneBlogValues.description}
          setAllValues={setEditBlogValues}
          error={false}
        />
        <TextEditor
          title="ბლოგი"
          name="description2"
          firstValue={oneBlogValues.description2}
          setAllValues={setEditBlogValues}
          error={false}
        />
        <hr className="h-[1px] w-full" />
        <Input1
          title="სათაური EN"
          name="name_eng"
          type="text"
          firstValue={oneBlogValues.name_eng}
          setAllValues={setEditBlogValues}
          error={false}
        />
        <TextArea1
          title="მოკლე აღწერა"
          name="description_eng"
          firstValue={oneBlogValues.description_eng}
          setAllValues={setEditBlogValues}
          error={false}
        />
        <TextEditor
          title="ბლოგი EN"
          name="description2_eng"
          firstValue={oneBlogValues.description2_eng}
          setAllValues={setEditBlogValues}
          error={false}
        />
        <hr className="h-[1px] w-full" />
        <Input1
          title="სათაური Рус"
          name="name_rus"
          type="text"
          firstValue={oneBlogValues.name_rus}
          setAllValues={setEditBlogValues}
          error={false}
        />
        <TextArea1
          title="მოკლე აღწერა"
          name="description_rus"
          firstValue={oneBlogValues.description_rus}
          setAllValues={setEditBlogValues}
          error={false}
        />
        <TextEditor
          title="ბლოგი Рус"
          name="description2_rus"
          firstValue={oneBlogValues.description2_rus}
          setAllValues={setEditBlogValues}
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
            firstValue={
              status.find((item: any) => item.id === oneBlogValues.status)?.name
            }
            setAllValues={setEditBlogValues}
            error={false}
          />
        </div>
      </div>
      <div className="w-[200px] ">
        <GreenButton
          name="რედაქტირება"
          button={true}
          loader={loaderEditBlog}
          style="h-[50px] text-[18px]"
        />
      </div>
    </form>
  );
}
