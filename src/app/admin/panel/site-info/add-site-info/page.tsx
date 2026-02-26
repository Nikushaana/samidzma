"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import React, { useContext, useState } from "react";
import { axiosAdmin } from "../../../../../../dataFetchs/AxiosToken";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../../dataFetchs/sharedStates";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Page() {
  const router = useRouter();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    setAllSiteInfoRender,
    siteInfoPages,
  } = useContext(ContextForSharingStates);

  const [loaderAddSiteInfo, setLoaderAddSiteInfo] = useState<boolean>(false);

  const [addSiteInfoValues, setAddSiteInfoValues] = useState({
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

  const validationSchema = Yup.object({
    type: Yup.string().required("გვერდის სახელი სავალდებულოა"),
    description: Yup.string().required("გვერდის ინფორმაცია სავალდებულოა"),
  });

  const handleAddSiteInfoValidation = () => {
    validationSchema
      .validate(addSiteInfoValues, { abortEarly: false })
      .then(() => {
        setErrors({});
        HandleAddSiteInfo();
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

  const HandleAddSiteInfo = () => {
    setLoaderAddSiteInfo(true);

    axiosAdmin
      .post("admin/siteInfo", {
        description: addSiteInfoValues.description,
        type: siteInfoPages.find(
          (item: any) => item.name == addSiteInfoValues.type,
        )?.id,
      })
      .then((res) => {
        router.push("/admin/panel/site-info");
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით დაემატა");
        setAllSiteInfoRender(res);
      })
      .catch((err) => {
        setLoaderAddSiteInfo(false);
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ დაემატა!");
      })
      .finally(() => {});
  };

  return (
    <div
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderAddSiteInfo && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">საიტის ინფორმაცია დამატება</h1>
      <div className="flex flex-col gap-[20px] w-full">
        <div className="flex flex-col gap-[20px]">
          <div className="w-[300px]">
            <DropDown1value
              title="გვერდი"
              data={siteInfoPages}
              name="type"
              setAllValues={setAddSiteInfoValues}
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
                value={addSiteInfoValues.description}
                onChange={(content: string) =>
                  setAddSiteInfoValues((prev) => ({
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
          action={handleAddSiteInfoValidation}
          loader={loaderAddSiteInfo}
          style="h-[50px] text-[18px]"
        />
      </div>
    </div>
  );
}
