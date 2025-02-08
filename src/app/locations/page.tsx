"use client";

import Image from "next/image";
import React, { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdArrowBackIos } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { useRouter } from "next/navigation";
import WhatUSearch from "../components/Inputs/WhatUSearch";
import useStores from "../../../dataFetchs/storesContext";

export default function Page() {
  const { StoresData } = useStores();

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-sm:px-[25px] pb-[100px] flex flex-col gap-y-[50px] relative">
        <WhatUSearch />

        <div className="flex flex-col gap-y-[20px]">
          <h1 className="text-[28px]">ჩვენი ფილიალები</h1>
          <p className="text-[14px]">
            თბილისის მასშტაბით 6 სავაჭრო ფილიალი გვაქვს, რომლებიც გათვლილია
            როგორც საცალო, ისე საბითუმო მომხმარებელზე. საცალო გაყიდვების
            ფილიალები:
          </p>
          <ul className="text-[14px] list-decimal list-inside">
            <li>ხიზანიშვილის N8, სამუშაო საათები 10:00 - 19:00</li>
            <li>
              ა. წერეთლის N59, სამუშაო საათები 10:00 - 19:00 საბითუმო გაყიდვების
              ფილიალები:
            </li>
            <li>კედიას N3, სამუშაო საათები 09:00 - 18:00</li>
            <li>
              გაგარინის N13ა, სამუშაო საათები 10:00 - 19:00 (ფილიალში ამ ეტაპზე
              საცალო გაყიდვებიც ხორციელდება)
            </li>
            <li>
              ცაბაძის N8, სავაჭრო ცენტრი „ქალაქის გული“, მაღაზია N10, სამუშაო
              საათები 09:00 - 18:00 (ფილიალში ამ ეტაპზე საცალო გაყიდვებიც
              ხორციელდება)
            </li>
            <li>
              ცაბაძის N8, სავაჭრო ცენტრი „ქალაქის გული“, მაღაზია N102/103,
              სამუშაო საათები 09:00 - 18:00 (ფილიალში ამ ეტაპზე საცალო
              გაყიდვებიც ხორციელდება)
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-[20px]">
          <div className="flex flex-col gap-y-[10px] h-[558px] max-lg:h-[538px] max-sm:h-[329px]">
            <div className="relative w-full h-[calc(100%-110px)] max-lg:h-[calc(100%-105px)] max-sm:h-[calc(100%-61px)] rounded-[12px] max-sm:rounded-[3px] overflow-hidden">
              <Image
                src="/images/shopimg.png"
                alt={""}
                sizes="500px"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="grid grid-cols-5 gap-[10px] h-[100px] max-lg:h-[95px] max-sm:h-[61px]">
              <div className="relative w-full h-full rounded-[4px] overflow-hidden">
                <Image
                  src="/images/shopimg.png"
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="relative w-full h-full rounded-[4px] overflow-hidden">
                <Image
                  src="/images/shopimg.png"
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="relative w-full h-full rounded-[4px] overflow-hidden">
                <Image
                  src="/images/shopimg.png"
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="relative w-full h-full rounded-[4px] overflow-hidden">
                <Image
                  src="/images/shopimg.png"
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="relative w-full h-full rounded-[4px] overflow-hidden">
                <Image
                  src="/images/shopimg.png"
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="w-full h-full max-lg:aspect-[5/3] rounded-[12px] max-sm:rounded-[4px] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d95001.81938880184!2d45.477690849999995!3d41.9185106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ska!2sge!4v1730720095451!5m2!1ska!2sge"
              loading="lazy"
              className="w-full h-full object-cover"
            ></iframe>
          </div>
        </div>

        <div className="flex flex-col gap-y-[20px]">
          <h1 className="text-[28px]">ვინ ვართ ჩვენ</h1>
          <p className="text-[14px]">
            თბილისის მასშტაბით 6 სავაჭრო ფილიალი გვაქვს, რომლებიც გათვლილია
            როგორც საცალო, ისე საბითუმო მომხმარებელზე. საცალო გაყიდვების
            ფილიალები:
          </p>
          <ul className="text-[14px] list-decimal list-inside">
            <li>ხიზანიშვილის N8, სამუშაო საათები 10:00 - 19:00</li>
            <li>
              ა. წერეთლის N59, სამუშაო საათები 10:00 - 19:00 საბითუმო გაყიდვების
              ფილიალები:
            </li>
            <li>კედიას N3, სამუშაო საათები 09:00 - 18:00</li>
            <li>
              გაგარინის N13ა, სამუშაო საათები 10:00 - 19:00 (ფილიალში ამ ეტაპზე
              საცალო გაყიდვებიც ხორციელდება)
            </li>
            <li>
              ცაბაძის N8, სავაჭრო ცენტრი „ქალაქის გული“, მაღაზია N10, სამუშაო
              საათები 09:00 - 18:00 (ფილიალში ამ ეტაპზე საცალო გაყიდვებიც
              ხორციელდება)
            </li>
            <li>
              ცაბაძის N8, სავაჭრო ცენტრი „ქალაქის გული“, მაღაზია N102/103,
              სამუშაო საათები 09:00 - 18:00 (ფილიალში ამ ეტაპზე საცალო
              გაყიდვებიც ხორციელდება)
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-[20px]">
          <div className="w-full h-full max-lg:aspect-[5/3] rounded-[12px] max-sm:rounded-[4px] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d95001.81938880184!2d45.477690849999995!3d41.9185106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ska!2sge!4v1730720095451!5m2!1ska!2sge"
              loading="lazy"
              className="w-full h-full object-cover"
            ></iframe>
          </div>
          <div className="flex flex-col gap-y-[10px] h-[558px] max-lg:h-[538px] max-sm:h-[329px] max-lg:order-first">
            <div className="relative w-full h-[calc(100%-110px)] max-lg:h-[calc(100%-105px)] max-sm:h-[calc(100%-61px)] rounded-[12px] max-sm:rounded-[3px] overflow-hidden">
              <Image
                src="/images/shopimg.png"
                alt={""}
                sizes="500px"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="grid grid-cols-5 gap-[10px] h-[100px] max-lg:h-[95px] max-sm:h-[61px]">
              <div className="relative w-full h-full rounded-[4px] overflow-hidden">
                <Image
                  src="/images/shopimg.png"
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="relative w-full h-full rounded-[4px] overflow-hidden">
                <Image
                  src="/images/shopimg.png"
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="relative w-full h-full rounded-[4px] overflow-hidden">
                <Image
                  src="/images/shopimg.png"
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="relative w-full h-full rounded-[4px] overflow-hidden">
                <Image
                  src="/images/shopimg.png"
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="relative w-full h-full rounded-[4px] overflow-hidden">
                <Image
                  src="/images/shopimg.png"
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
