"use client";

import Image from "next/image";
import React, { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdArrowBackIos } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Input1 from "../components/Inputs/Input1";
import TextArea1 from "../components/Inputs/TextArea1";
import { ImAttachment } from "react-icons/im";
import { BsCheck } from "react-icons/bs";
import WhatUSearch from "../components/Inputs/WhatUSearch";

export default function Page() {
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      
    <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-tiny:px-[25px] pb-[100px] flex flex-col gap-y-[30px] min-h-[80vh] relative">
      <WhatUSearch />

      <div className="flex flex-col gap-y-[10px]">
        <h1 className="text-[28px]">მიტანის სერვისი</h1>
        <p className="text-[14px]">
          „სამ ძმაში“ მოქმედებს მიტანის სერვისი. ამ ეტაპზე სერვისი თბილისის
          მასშტაბით მუშაობს. მიტანის ღირებულების გასაგებად ჩაწერე შენი მისამართი
          პროდუქტის მიტანის სერვისის ველში. შენ ასევე შეგიძლია ისარგებლო
          თვითგატანით: თავად წაიღო პროდუქცია მაღაზიიდან. 
        </p>
      </div>
      <p className="text-[14px]">
        მიღებული შეკვეთების მიწოდება შეკვეთიდან ორი დღის ვადაში მოხდება. შენ
        მიერ მითითებულ მისამართზე პროდუქციის მიწოდება ოპერატორის მიერ შეკვეთის
        დადასტურებისა და კურიერული მომსახურების წარმომადგენელთან მიწოდების
        ვადების შეთანხმების შემდეგ ხდება. არახელსაყრელი პირობების ან მიწოდებაზე
        უარის თქმის შესახებ, მყიდველი ვალდებულია აცნობოს ონლაინ მაღაზიას.
      </p>

      <div>
        <p className="text-[14px]">
          შეკვეთის ღირებულების გადახდა შესაძლებელია რამდენიმე მეთოდის
          საშუალებით: 
        </p>
        <ul className="list-inside list-disc text-[14px]">
          <li>ნაღდი ანგარიშსწორებით კურიერთან</li>
          <li>ბარათით</li>
          <li>ონლაინ ბანკით</li>
        </ul>
      </div>

      <div>
        <p className="text-[14px]">გთხოვ, გაითვალისწინო:</p>
        <ul className="list-inside list-disc text-[14px]">
          <li>მიღებული შეკვეთა გადაამოწმე ჩვენი წარმომადგენლის თანდასწრებით</li>
          <li>
            დეფექტის შემთხვევაში, ხელახალი მიწოდება მოხდება კომპანიის ხარჯზე,
            დამატებით შეთანხმებულ დროში
          </li>
        </ul>
        <p className="text-[14px]">
          სხვა დამატებითი ინფორმაციის დასაზუსტებლად დაგვიკავშირდი ცხელ ხაზზე:
          (032) 204-70-07
        </p>
      </div>
    </div>
    </div>

  );
}
