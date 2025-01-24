"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function ImgUploader({
  name,
  setAllValues,
  multiple,
  title,
}: any) {
  const [files, setFiles] = useState<File[]>([]);
  const inputElement = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles(multiple ? newFiles : [newFiles[0]]);
    }
  };

  const removePhoto = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (setAllValues) {
      setAllValues((prev: any) => ({ ...prev, [name]: files }));
    }
  }, [files]);

  return (
    <div className="flex flex-col gap-y-[5px] w-full">
      {title && <p className="text-[12px] mx-[20px]">{title}</p>}
      <div className="grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4 items-center w-full h-full">
        {files.length > 0 &&
          files.map((file, index) => (
            <div
              key={index}
              className="group shadow-md rounded-[8px] overflow-hidden bg-[white] relative flex items-center aspect-video w-full"
            >
              <Image
                src={file && URL.createObjectURL(file)}
                alt={file && file.name}
                sizes="500px"
                fill
                style={{ objectFit: "cover" }}
              />
              <div
                className="rounded-[8px] absolute flex top-[7px] right-[10px] w-8 h-8 bg-gray-100 cursor-pointer items-center justify-center"
                onClick={() => removePhoto(index)}
              >
                <AiOutlineClose className="text-[red] text-2xl" />
              </div>
            </div>
          ))}
        <div
          onClick={() => inputElement.current?.click()}
          className="flex items-center justify-center shadow-md bg-[white] rounded-[8px] cursor-pointer aspect-video w-full"
        >
          <MdOutlineAddPhotoAlternate className="text-4xl text-myGreen" />
        </div>
        <input
          name={name}
          ref={inputElement}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
          multiple={multiple}
        />
      </div>
    </div>
  );
}
