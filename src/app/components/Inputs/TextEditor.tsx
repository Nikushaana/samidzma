"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function TextEditor({
  firstValue,
  name,
  setAllValues,
  title,
}: any) {
  const [inputText, setInputText] = useState<string>("");

  useEffect(() => {
    if (setAllValues) {
      setAllValues((prev: any) => ({ ...prev, [name]: inputText }));
    }
  }, [inputText]);

  useEffect(() => {
    setInputText(firstValue);
  }, [firstValue]);

  const modules = {
    toolbar: [
      [
        { size: ["small", false, "large", "huge"] },
        { header: [1, 2, 3, 4, 5, 6, false] },
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        { list: "ordered" },
        { list: "bullet" },
        { script: "sub" },
        { script: "super" },
        { color: [] },
        { background: [] },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
        "clean",
      ],
    ],
  };

  return (
    <div className="flex flex-col gap-y-[5px] w-full">
      {title && <p className="text-[12px] mx-[20px]">{title}</p>}
      <div>
        <ReactQuill
          value={inputText}
          onChange={setInputText}
          modules={modules}
        />
        <textarea
          name={name}
          style={{ display: "none" }}
          value={inputText}
          readOnly
        />
      </div>
    </div>
  );
}
