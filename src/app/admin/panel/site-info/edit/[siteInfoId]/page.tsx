"use client";

import React, { useContext, useEffect, useState } from "react";
import { ContextForSharingStates } from "../../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../../dataFetchs/AxiosToken";
import { useRouter } from "next/navigation";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import GreenButton from "@/app/components/buttons/greenButton";
import dynamic from "next/dynamic";
import * as Yup from "yup";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Page({ params }: { params: { siteInfoId: string } }) {
  const router = useRouter();
  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    setAllSiteInfoRender,
    siteInfoPages,
  } = useContext(ContextForSharingStates);

  const [oneSiteInfoLoader, setOneSiteInfoLoader] = useState<boolean>(true);

  const [siteInfoValues, setSiteInfoValues] = useState({
    type: "",
  });
  const [editSiteInfoValues, setEditSiteInfoValues] = useState({
    description: "",
    type: "",
  });

  const [errors, setErrors] = useState<any>({});

  const modules = {
    toolbar: [
      [{ size: ["small", "normal", "large", "huge"] }],
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "size",
  ];

  useEffect(() => {
    setOneSiteInfoLoader(true);
    axiosAdmin
      .get(`admin/siteInfo/${params.siteInfoId}`)
      .then((res) => {
        setEditSiteInfoValues({
          description: res.data.description,
          type: siteInfoPages.find((item: any) => item.id == res.data.type)
            ?.name,
        });
        setSiteInfoValues({
          type: siteInfoPages.find((item: any) => item.id == res.data.type)
            ?.name,
        });
      })
      .catch((err) => {})
      .finally(() => {
        setOneSiteInfoLoader(false);
      });
  }, [params.siteInfoId]);

  const validationSchema = Yup.object({
    type: Yup.string().required("გვერდის სახელი სავალდებულოა"),
    description: Yup.string().required("გვერდის ინფორმაცია სავალდებულოა"),
  });

  const handleEditSiteInfoValidation = () => {
    validationSchema
      .validate(editSiteInfoValues, { abortEarly: false })
      .then(() => {
        setErrors({});
        HandleEditSiteInfo();
      })
      .catch((err) => {
        const newErrors: any = {};
        err.inner.forEach((error: any) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);

        setAlertShow(true);
        setAlertStatus(false);
        setAlertText(newErrors.type || newErrors.description);
      });
  };

  const HandleEditSiteInfo = () => {
    setOneSiteInfoLoader(true);
    axiosAdmin
      .post(`admin/siteInfo/${params.siteInfoId}`, {
        description: editSiteInfoValues.description,
        type: siteInfoPages.find(
          (item: any) => item.name == editSiteInfoValues.type,
        )?.id,
      })
      .then((res) => {
        setAllSiteInfoRender(res);
        router.push("/admin/panel/site-info");
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით შეიცვალა");
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ შეიცვალა!");
      });
  };

  return (
    <div
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        oneSiteInfoLoader && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">საიტის ინფორმაცია ცვლილება</h1>
      <div className="flex flex-col gap-[20px] w-full">
        <div className="flex flex-col gap-[20px]">
          <div className="w-[300px]">
            <DropDown1value
              title="გვერდი"
              data={siteInfoPages}
              firstValue={siteInfoValues.type}
              name="type"
              setAllValues={setEditSiteInfoValues}
              error={errors.type}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[12px] mx-[20px]">გვერდის აღწერა</p>
            <div
              className={`${errors.description && "border border-[red]"} rounded-[10px]`}
            >
              <ReactQuill
                theme="snow"
                value={editSiteInfoValues.description}
                onChange={(content: string) =>
                  setEditSiteInfoValues((prev) => ({
                    ...prev,
                    description: content,
                  }))
                }
                placeholder="შეავსე გვერდის ინფორმაცია..."
                modules={modules}
                formats={formats}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[200px]">
        <GreenButton
          name="დამატება"
          action={handleEditSiteInfoValidation}
          loader={oneSiteInfoLoader}
          style="h-[50px] text-[18px]"
        />
      </div>
    </div>
  );
}
