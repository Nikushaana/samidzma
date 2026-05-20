"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { GoDotFill } from "react-icons/go";
import Link from "next/link";

export default function BlogCard({ item, colspan }: any) {
  const router = useRouter();

  const whole = colspan === "all";
  const half = colspan === "half";

  return (
    <Link href={`/blog/${item.link}`}
      className={`rounded-[8px] bg-white grid p-[20px] cursor-pointer h-full ${
        whole || half
          ? "grid-cols-2 gap-[40px] max-lg:grid-cols-1 max-lg:gap-y-[10px]"
          : "grid-cols-1 gap-y-[10px]"
      }`}
    >
      {/* IMAGE */}
      <div
        className={`relative w-full aspect-[4/3] h-full max-h-[350px] rounded-[4px] overflow-hidden ${
          whole ? "max-h-[245px] " : ""
        }`}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.main_img}`}
          alt={`${item?.blogs_main_imgs_alt}`}
          fill
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col justify-between gap-y-[30px]">
        <div
          className={`flex flex-col ${whole ? "gap-y-[20px] max-lg:gap-y-0" : ""}`}
        >
          <h1 className="text-[22px] max-2xl:text-[18px] line-clamp-2">
            {item?.name}
          </h1>

          <p
            className={`text-[14px] text-[#323434] ${
              whole ? "line-clamp-5" : "line-clamp-2"
            }`}
          >
            {item?.description}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-[10px]">
            <div className="relative w-[40px] aspect-square rounded-[5px] overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.employee?.img}`}
                alt={`${item?.employee?.img_alt}`}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-[13px]">{item?.employee?.name}</h1>
              <div className="flex items-center gap-[5px]">
                <p className="text-[11px] shrink-0">
                  {dayjs
                    .utc(item?.publication_date)
                    .tz("Asia/Tbilisi")
                    .format("MMM DD, YYYY")}
                </p>
                <GoDotFill className="text-[7px] mb-[2px] shrink-0" />
                <p className="text-[11px] shrink-0">{item?.reading_minute} წუთი</p>
              </div>
            </div>
          </div>

          <p className="text-[18px] max-sm:text-[14px] underline text-myGreen">
            წაიკითხე ვრცლად
          </p>
        </div>
      </div>
    </Link>
  );
}
