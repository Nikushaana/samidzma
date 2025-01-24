"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function DocsUploader({
  name,
  setAllValues,
  multiple,
  render,
}: any) {
  const [files, setFiles] = useState<File[]>([]);
  const inputElement = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles(multiple ? [...files, ...newFiles] : [newFiles[0]]);
    }
  };

  useEffect(() => {
    if (render) {
      setFiles([]);
    }
  }, [render]);

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (setAllValues) {
      setAllValues((prev: any) => ({ ...prev, [name]: files }));
    }
  }, [files, setAllValues, name]);

  return (
    <div className="flex flex-col gap-y-[10px]">
      <div
        onClick={() => inputElement.current?.click()}
        className="flex items-center gap-[5px] cursor-pointer mx-[20px]"
      >
        <ImAttachment className="text-myGreen text-[18px]" />
        <p className="text-[14px]">ატვირთე CV</p>
      </div>
      <input
        name={name}
        ref={inputElement}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.txt"
        multiple={multiple}
      />

      {files.map((file, index) => (
        <div
          key={index}
          className="group shadow-md rounded-[8px] p-3 bg-[white] relative flex flex-col items-start w-full"
        >
          <p className="text-sm truncate w-full" title={file.name}>
            {file.name}
          </p>
          <p className="text-xs text-gray-500">
            {(file.size / 1024).toFixed(2)} KB
          </p>
          <div
            className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded-full cursor-pointer"
            onClick={() => removeFile(index)}
          >
            <AiOutlineClose className="text-red-500 text-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
