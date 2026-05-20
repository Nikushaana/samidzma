"use client";

import React, { useEffect, useState } from "react";

export default function BlogCategorySelector({
  data,
  title,
  name,
  setAllValues,
  firstValue,
}: any) {
  const [value, setValue] = useState<number[]>([]);

   useEffect(() => {
    if (firstValue?.length) {
      const ids = firstValue.map((item: any) => item.blog_category_id);
      setValue(ids);
    }
  }, [firstValue]);

  useEffect(() => {
    if (setAllValues && value !== undefined) {
      setAllValues((prev: any) => ({ ...prev, [name]: value }));
    }
  }, [value]);

  const handleToggle = (id: number) => {
    setValue((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col gap-y-[5px] w-full">
      {title && <p className="text-[12px] mx-[20px]">{title} ({value.length})</p>}
      <div className="w-full flex flex-wrap gap-3">
        {data.map((categ: any) => {
          const selected = value.includes(categ.id);

          return (
            <h1
              key={categ.id}
              onClick={() => handleToggle(categ.id)}
              style={{
                background: selected ? categ.color : "#EEEEEE",
                borderColor: selected ? categ.color : "#d1d5db",
                color: selected ? "white" : "black",
              }}
              className="text-[12px] px-[10px] h-[26px] duration-100 rounded-[33px] flex items-center cursor-pointer"
            >
              {categ.name}
            </h1>
          );
        })}
      </div>
    </div>
  );
}
