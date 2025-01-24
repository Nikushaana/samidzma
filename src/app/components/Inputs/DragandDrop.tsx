"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";

export default function DragAndDrop({ name, setAllValues }: any) {
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (setAllValues) {
      setAllValues((prev: any) => ({ ...prev, [name]: droppedFile }));
    }
  }, [droppedFile]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      setDroppedFile(files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setDroppedFile(event.target.files[0]);
    }
  };
  return (
    <div
      className="h-full bg-gray-200 hover:bg-gray-300 duration-150 w-full px-[10px] flex items-center justify-center border-2 rounded-[8px] border-dashed border-[#3E7C7F] cursor-pointer"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
    >
      {droppedFile ? (
        <p className="text-center">{droppedFile.name}</p>
      ) : (
        <p>ჩააგდე CV აქ ან დააკლიკე</p>
      )}
      <input
        type="file"
        name={name}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
