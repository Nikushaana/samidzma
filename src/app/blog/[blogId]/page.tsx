"use client";

import Image from "next/image";
import React, { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdArrowBackIos } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] pb-[100px] flex flex-col gap-y-[70px] relative">
        <div className="flex flex-col gap-y-[40px]">
          <div className="">
            <div className="flex items-center gap-[10px] mb-[10px]">
              <h1 className="text-[14px]">თეგი: </h1>
              {["საჩუქრები"].map((item, index) => (
                <h1
                  key={index}
                  className={`text-[12px] px-[10px] h-[26px] flex items-center rounded-full ${
                    index % 3 == 0
                      ? "bg-myYellow"
                      : index % 3 == 1
                      ? "bg-myGreen text-white"
                      : "bg-myPink text-white"
                  }`}
                >
                  {item}
                </h1>
              ))}
            </div>
            <div className="relative w-full h-[500px] rounded-[12px] overflow-hidden">
              <Image
                src="/images/food.png"
                alt={""}
                sizes="500px"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[60px]">
            <div className="flex flex-col gap-y-[20px]">
              <h1 className="text-[22px]">7 საუკეთესო საშობაო საჩუქარი</h1>
              <p className="text-[14px]">
                იდეალური საშობაო საჩუქრის პოვნა სასიხარულო და ამავდროულად
                შრომატევადი პროცესია. ჩვენ დაგეხმარებით და შემოგთავაზებთ 7
                საუკეთესო საშობაო საჩუქრის იდეას.
              </p>
              <ul className="text-[14px] list-decimal list-inside">
                <li>ნაძვის ხე</li>
                <li>დეკორატიული ღობე ნაძვის ხისთვის</li>
                <li>სათამაშო</li>
                <li>საშობაო წინდა</li>
                <li>რბილი საბანი</li>
                <li>ქუდი</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[60px]">
            <div className="relative w-full h-[400px] rounded-[12px] overflow-hidden">
              <Image
                src="/images/food.png"
                alt={""}
                sizes="500px"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="flex flex-col gap-y-[20px]">
              <h1 className="text-[22px]">7 საუკეთესო საშობაო საჩუქარი</h1>
              <p className="text-[14px]">
                იდეალური საშობაო საჩუქრის პოვნა სასიხარულო და ამავდროულად
                შრომატევადი პროცესია. ჩვენ დაგეხმარებით და შემოგთავაზებთ 7
                საუკეთესო საშობაო საჩუქრის იდეას.
              </p>
              <ul className="text-[14px] list-decimal list-inside">
                <li>ნაძვის ხე</li>
                <li>დეკორატიული ღობე ნაძვის ხისთვის</li>
                <li>სათამაშო</li>
                <li>საშობაო წინდა</li>
                <li>რბილი საბანი</li>
                <li>ქუდი</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[60px]">
            <div className="flex flex-col gap-y-[20px]">
              <p className="text-[14px]">
                როცა საქმე სადღესასწაულო გაფორმებას ეხება, ჩვენი შესაძლებლობები
                უსაზღვროა. მთავარია, გაფორმება წვეულების თემას შეესაბამებოდეს:
                ბანერები, კონფეტი, თეფშები, ხელსახოცები, სუფრა, ბუშტები — ყველა
                დეტალი ერთმანეთს უნდა ავსებდეს.
              </p>
            </div>

            <div className="col-span-2 relative w-full h-[400px] rounded-[12px] overflow-hidden">
              <Image
                src="/images/food.png"
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

        <div className="flex flex-col gap-y-[20px]">
          <h1 className="text-[28px]">მსგავსი პროდუქტები</h1>
          {/* <RecomendedCardsSlider /> */}
          asasd{" "}
        </div>

        <div className="relative rounded-[12px] bg-[#EAEDEE] p-[30px] overflow-hidden flex flex-col gap-y-[20px]">
          <h1 className="text-[28px]">ბლოგი</h1>
          <div className="grid grid-cols-4 gap-[20px]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  router.push("/blog/1");
                }}
                className={`${
                  index === 0
                    ? "col-span-1"
                    : index === 1
                    ? "col-span-1"
                    : index === 2
                    ? "col-span-2"
                    : index === 3
                    ? "col-span-2"
                    : index === 4
                    ? "col-span-1"
                    : index === 5
                    ? "col-span-1"
                    : index === 6 && "col-span-1"
                }`}
              >
                {/* {index === 2 || index === 3 ? (
                <BlogsCard1 item={item} />
              ) : (
                <BlogsCard2 item={item} />
              )} */}
                blogg
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
