"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import ImgUploader from "@/app/components/Uploaders/ImgUploader";
import { ContextForSharingStates } from "../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../dataFetchs/AxiosToken";
import * as Yup from "yup";

export default function Page() {
  const router = useRouter();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    status,
    setAllBlogAuthorRender,
  } = useContext(ContextForSharingStates);

  const [loaderAddBlogAuthor, setLoaderAddBlogAuthor] =
    useState<boolean>(false);

  const [addBlogAuthorValues, setAddBlogAuthorValues] = useState({
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
      .validate(addBlogAuthorValues, { abortEarly: false })
      .then(() => {
        setErrors({});
        HandleAddBlogAuthor(e);
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

  const HandleAddBlogAuthor = (e: any) => {
    e.preventDefault();

    setLoaderAddBlogAuthor(true);
    const form = e.target;
    const formData = new FormData(form);

    formData.append(
      "status",
      status.find((item: any) => item.name === addBlogAuthorValues.status)?.id,
    );

    axiosAdmin
      .post("admin/employee", formData)
      .then((res) => {
        router.push("/admin/panel/blog/blog-employee");
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით აიტვირთა");
        setAllBlogAuthorRender(res);
      })
      .catch((err) => {
        setLoaderAddBlogAuthor(false);
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ აიტვირთა!");
      })
      .finally(() => {});
  };

  return (
    <form
      onSubmit={handleAddBlogAuthorValidation}
      encType="multipart/form-data"
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderAddBlogAuthor && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">ბლოგის ავტორის დამატება</h1>
      <ImgUploader
        name="employee_img"
        multiple={false}
        setAllValues={setAddBlogAuthorValues}
      />
      <Input1
        title="სურათის alt"
        name="img_alt"
        type="text"
        setAllValues={setAddBlogAuthorValues}
        error={false}
      />

      <hr className="h-[1px] w-full" />
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[20px] w-full">
        <Input1
          title="სახელი"
          name="name"
          type="text"
          setAllValues={setAddBlogAuthorValues}
          error={errors.name}
        />
        <DropDown1value
          title="სტატუსი"
          data={status}
          name="status"
          firstValue="აქტიური"
          setAllValues={setAddBlogAuthorValues}
          error={false}
        />
      </div>
      <div className="w-[200px] ">
        <GreenButton
          name="დამატება"
          button={true}
          loader={loaderAddBlogAuthor}
          style="h-[50px] text-[18px]"
        />
      </div>
    </form>
  );
}
