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

export default function Page() {
  const [animInfo, setAnimInfo] = useState([
    {
      id: 1,
      value: "2.4K+",
      name: "პროდუქტი",
    },
    {
      id: 2,
      value: "82",
      name: "კატეგორია",
    },
    {
      id: 3,
      value: "200K+",
      name: "კმაყოფილი მომხმარებელი",
    },
    {
      id: 4,
      value: "100+",
      name: "პარტნიორი",
    },
    {
      id: 5,
      value: "82",
      name: "კატეგორია",
    },
    {
      id: 6,
      value: "2.4K+",
      name: "",
    },
  ]);
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-tiny:px-[25px] pb-[100px] flex flex-col gap-y-[50px] relative">
        <WhatUSearch />

        <div className="flex flex-col gap-y-[20px]">
          <h1 className="text-[28px]">ვინ ვართ ჩვენ</h1>
          <p className="text-[14px]">
            „სამი ძმა“ სადღესასწაულო აქსესუარებისა და საკონდიტრო მასალების
            ერთ-ერთი უმსხვილესი იმპორტიორია საქართველოში. ჩვენ დაგეხმარებით,
            შენი დღესასწაული თუ წვეულება განსაკუთრებულად აღნიშნო. ჩვენი მისია
            მარტივია: შევქმნათ ბედნიერება.
          </p>
          <p>ჩვენ გთავაზობთ პროდუქტების ფართო არჩევანს:</p>
          <ul className="text-[14px] ">
            <li>სადღესასწაულო აქსესუარები</li>
            <li>ფეიერვერკები</li>
            <li>საკონდიტრო აქსესუარები</li>
            <li>საკონდიტრო მასალები</li>
            <li>საახალწლო აქსესუარები </li>
            <li>სააღდგომო აქსესუარები და მასალები</li>
            <li>სათამაშოები</li>
          </ul>
        </div>

        <div className="w-full grid grid-cols-6 max-lg:grid-cols-3 gap-[15px] max-lg:gap-[30px] max-tiny:gap-[10px]">
          {animInfo.map((item: AnimInfoType, index: number) => (
            <div
              key={item.id}
              className={`w-full aspect-square rounded-full flex flex-col
                 items-center justify-center gap-y-[10px] max-tiny:gap-y-0 ${
                   index % 2 === 1
                     ? `bg-myGreen text-white ${
                         index == 3 || index == 5
                           ? "mt-[70px] max-lg:mt-[-70px] max-tiny:mt-[-30px]"
                           : "mt-[70px] max-tiny:mt-[30px]"
                       }`
                     : "bg-myYellow"
                 }`}
            >
              <h1 className="text-[42px] max-tiny:text-[21px]">{item.value}</h1>
              <h1 className="text-[18px] max-tiny:text-[9px] text-center">
                {item.name}
              </h1>
            </div>
          ))}
        </div>

        <div className="relative w-full aspect-[6/2] max-lg:aspect-[5/4] rounded-[12px] overflow-hidden">
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

        <div className="flex flex-col gap-y-[20px]">
          <h1 className="text-[28px]">ჩვენი ისტორია</h1>
          <p className="text-[14px]">
            2010 წელს დაარსებული ჩვენი კომპანიის ანგარიშზეა ორი ათასზე მეტი
            პროდუქტი და 82-ზე მეტი პროდუქტის კატეგორია, ამ ხნის განმავლობაში
            ჩვენ შევიძინეთ 200 ათასზე მეტი კმაყოფილი მომხმარებელი და 100-ზე მეტი
            პარტნიორი. 
          </p>
          <p>
            ათ წელზე მეტია, რაც ქართულ ბაზარზე ვართ, ვიზრდებით და ვვითარდებით
            ჩვენი მომხმარებლების მოთხოვნილებების დასაკმაყოფილებლად. ჩვენი ზრდა
            მოიცავს როგორც თანამშრომლების რაოდენობის გაზრდას, ასევე, ახალი
            ფილიალების გახსნას, ჩვენი სერვისების მუდმივად გაუმჯობესებას.
          </p>
          <p>
            ჩვენ ვამაყობთ ჩვენი პარტნიორობით საერთაშორისო მომწოდებლებთან, რაც
            პროდუქციის მრავალფეროვან და მაღალი ხარისხის არჩევანს უზრუნველყოფს.
            გარდა ამისა, ჩვენ ვთანამშრომლობთ უამრავ ქართულ კომპანიასთან.
          </p>
        </div>

        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-[60px]">
          <div className="relative w-full aspect-[7/4] max-lg:aspect-[5/4] rounded-[12px] overflow-hidden">
            <Image
              src="/images/shopimgin.png"
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          <div className="flex flex-col gap-y-[20px]">
            <h1 className="text-[22px]">ჩვენი გუნდი</h1>
            <p className="text-[14px]">
              ჩვენი თანამშრომლების გუნდი დაუღალავად მუშაობს იმისთვის, რომ შენი
              დღესასწაულები დაუვიწყარი იყოს. ამ ეტაპზე თბილისში „სამი ძმის“
              ექვსი ფილიალი ფუნქციონირებს. ნებისმიერ ფილიალში შენ გელოდება
              საზეიმო აქსესუარების ფართო არჩევანი, ჩვენი მოტივირებული
              თანამშრომლები კი ნებისმიერი პროდუქტის შესახებ სრულყოფილ
              კონსულტაციას გაგიწევენ.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-[60px]">
          <div className="flex flex-col gap-y-[20px]">
            <h1 className="text-[22px]">ჩვენი ხედვა</h1>
            <p className="text-[14px]">
              ჩვენი მიზანია, შევქმნათ მყუდრო, მეგობრული და საიმედო გარემო, სადაც
              ყოველი დღესასწაული განსაკუთრებულ დღედ იქცევა. გვინდა, ჩვენს
              მომხმარებლებთან გრძელვადიანი ურთიერთობები დავამყაროთ და მათ მეტი
              დადებითი ემოცია მივანიჭოთ. ჩვენი ბრენდის სლოგანია „შექმენი
              ბედნიერება“.
            </p>
            <p className="text-[14px]">
              შემოგვიერთდი შენი ოჯახისა და ახლობლებისთვის ბედნიერი მომენტების
              შესაქმნელად, მომენტების, რომლებიც ვიდეოებსა და ფოტოალბომებში
              იქნება აღბეჭდილი და სამუდამოდ დაგრჩება მოგონებებად.
            </p>
          </div>
          <div className="relative w-full aspect-[7/4] max-lg:aspect-[5/4] max-lg:order-first rounded-[12px] overflow-hidden">
            <Image
              src="/images/happyman.png"
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
  );
}
