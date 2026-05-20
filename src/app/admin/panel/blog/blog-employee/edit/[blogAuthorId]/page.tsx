"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import ImgUploader from "@/app/components/Uploaders/ImgUploader";
import Image from "next/image";
import * as Yup from "yup";
import TextEditor2 from "@/app/components/Inputs/TextEditor2";
import { ContextForSharingStates } from "../../../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../../../dataFetchs/AxiosToken";

export default function Page({ params }: { params: { blogAuthorId: string } }) {
  const router = useRouter();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    status,
    setAllBlogAuthorRender,
  } = useContext(ContextForSharingStates);
  const [loaderEditBlogAuthor, setLoaderEditBlogAuthor] =
    useState<boolean>(true);

  const [oneBlogAuthorValues, setOneBlogAuthorValues] = useState({
    name: "",
    img: "",
    img_alt: "",
    status: 0,
  });
  const [editBlogAuthorValues, setEditBlogAuthorValues] = useState({
    name: "",
    employee_img: "",
    img_alt: "",
    status: "",
  });

  const [errors, setErrors] = useState<any>({});

  const validationSchema = Yup.object({
    name: Yup.string().required("სახელი სავალდებულოა"),
  });

  const handleAddBlogAuthorValidation = (e: any) => {
    e.preventDefault();
    validationSchema
      .validate(editBlogAuthorValues, { abortEarly: false })
      .then(() => {
        setErrors({});
        HandleEditBlogAuthor(e);
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
    setLoaderEditBlogAuthor(true);
    axiosAdmin
      .get(`admin/employee/${params.blogAuthorId}`)
      .then((res) => {
        setOneBlogAuthorValues(res.data);
        setLoaderEditBlogAuthor(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.blogAuthorId]);

  const HandleEditBlogAuthor = (e: any) => {
    e.preventDefault();

    setLoaderEditBlogAuthor(true);
    const form = e.target;
    const formData = new FormData(form);

    formData.append(
      "status",
      status.find((item: any) => item.name === editBlogAuthorValues.status)?.id,
    );

    axiosAdmin
      .post(`admin/employee/${params.blogAuthorId}`, formData)
      .then((res) => {
        router.push("/admin/panel/blog/blog-employee");
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით რედაქტირდა");
        setAllBlogAuthorRender(res);
      })
      .catch((err) => {
        setLoaderEditBlogAuthor(false);
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ რედაქტირდა!");
      })
      .finally(() => {});
  };

  return (
    <form
      onSubmit={handleAddBlogAuthorValidation}
      encType="multipart/form-data"
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderEditBlogAuthor && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">ბლოგის ავტორის რედაქტირება</h1>
      <div className="grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4 items-center w-full">
        <div className="relative w-full aspect-video bg-white rounded-[12px] overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${oneBlogAuthorValues?.img}`}
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
        name="employee_img"
        multiple={false}
        setAllValues={setEditBlogAuthorValues}
      />
      <Input1
        title="სურათის alt"
        name="img_alt"
        type="text"
        firstValue={oneBlogAuthorValues.img_alt}
        setAllValues={setEditBlogAuthorValues}
        error={false}
      />
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[20px] w-full">
        <Input1
          title="სახელი"
          name="name"
          type="text"
          firstValue={oneBlogAuthorValues.name}
          setAllValues={setEditBlogAuthorValues}
          error={errors.name}
        />
        <DropDown1value
          title="სტატუსი"
          data={status}
          name="status"
          firstValue={
              status.find((item: any) => item.id === oneBlogAuthorValues.status)?.name
            }
          setAllValues={setEditBlogAuthorValues}
          error={false}
        />
      </div>
      <div className="w-[200px] ">
        <GreenButton
          name="რედაქტირება"
          button={true}
          loader={loaderEditBlogAuthor}
          style="h-[50px] text-[18px]"
        />
      </div>
    </form>
  );
}
