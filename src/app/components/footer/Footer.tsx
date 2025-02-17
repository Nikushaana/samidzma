"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import FooterCategoriesDropDown from "./FooterCategoriesDropDown";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const [aboutUs, setAboutUs] = useState([
    {
      id: 1,
      name: "ჩვენ შესახებ",
      url: "about-us",
    },
    {
      id: 2,
      name: "დაგვიკავშირდი",
      url: "contact-us",
    },
    {
      id: 3,
      name: "ჩვენი ფილიალები",
      url: "locations",
    },
    {
      id: 4,
      name: "ვაკანსიები",
      url: "careers",
    },
    {
      id: 5,
      name: "ხშირად დასმული კითხვები",
      url: "faq",
    },
    {
      id: 6,
      name: "მომხმარებლის თანხმობა",
      url: "user-agreement",
    },
    {
      id: 7,
      name: "მიტანის სერვისი",
      url: "delivery-services-contract",
    },
  ]);

  const [termsandconditions, setTermsandConditions] = useState([
    {
      id: 1,
      name: "წესები და პირობები",
      url: "user-agreement",
    },
    {
      id: 2,
      name: "მიტანის სერვისი",
      url: "delivery-services-contract",
    },
    {
      id: 3,
      name: "დაბრუნების პოლიტიკა",
      url: "user-agreement",
    },
    {
      id: 4,
      name: "კონფიდენციალურობის პოლიტიკა",
      url: "user-agreement",
    },
  ]);
  return (
    <div
      className={`z-[2] ${pathname.split("/")[1] === "admin" ? "hidden" : ""}`}
    >
      <div className="px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-sm:px-[25px] bg-myBlack flex flex-col gap-y-[15px] items-center pt-[20px] pb-[60px]">
        <div className="w-[252px] h-[120px] max-sm:h-[90px] relative">
          <Image
            src="/images/plane.png"
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-white text-[28px] max-sm:text-[21px]">
            გამოიწერე ჩვენი სიახლეები
          </h1>
          <p className="text-white text-[18px] max-sm:text-[14px] text-center">
            გაიგე პირველმა ჩვენი სიახლეებისა და აქციების შესახებ
          </p>
        </div>
        <div className="rounded-full overflow-hidden max-sm:w-full h-[47px] max-sm:h-[34px] flex">
          <div className="bg-white flex items-center px-[20px] w-[342px] max-sm:w-[calc(100%-130px)]">
            <input
              type="text"
              name=""
              placeholder="შეიყვანე მეილი"
              className="text-[14px]"
              id=""
            />
          </div>
          <div className="bg-myGreen text-white cursor-pointer flex items-center px-[20px] max-sm:w-[130px]">
            <h1>გამოიწერე</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center bg-[#242727] overflow-hidden relative">
        <div className="max-w-[1920px] w-full pl-[264px] pr-[380px] max-2xl:pl-[160px] max-2xl:pr-[320px] max-lg:px-[90px] max-sm:px-[25px] grid grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2 max-tiny:grid-cols-1 gap-[20px] text-white py-[60px]">
          <div className="flex flex-col gap-y-[20px] z-[1]">
            <h1 className="text-[18px] max-sm:text-[14px]">ჩვენ შესახებ</h1>
            <div className="flex flex-col gap-y-[5px]">
              {aboutUs.map((item, index: number) => (
                <p
                  key={item.id}
                  onClick={() => {
                    router.push(`/${item.url}`);
                  }}
                  className="text-[14px] max-sm:text-[11px] cursor-pointer"
                >
                  {item.name}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-[20px] z-[1]">
            <h1 className="text-[18px] max-sm:text-[14px]">
              პროდუქტის კატეგორიები
            </h1>
            <FooterCategoriesDropDown />
          </div>
          <div className="col-span-2 gap-[20px] max-lg:gap-y-[40px] max-lg:col-span-1 grid grid-cols-2 max-lg:grid-cols-1 z-[1]">
            <div className="flex flex-col gap-y-[20px]">
              <h1 className="text-[18px] max-sm:text-[14px]">
                წესები და პირობები
              </h1>
              <div className="flex flex-col gap-y-[5px]">
                {termsandconditions.map((item, index: number) => (
                  <p
                    key={item.id}
                    onClick={() => {
                      router.push(`/${item.url}`);
                    }}
                    className="text-[14px] max-sm:text-[11px] cursor-pointer"
                  >
                    {item.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end max-lg:items-start gap-y-[20px]">
              <h1 className="text-[18px] max-sm:text-[14px] text-end">
                გვიპოვე სოციალურ ქსელებში (?)
              </h1>
              <div className="flex flex-col items-end max-lg:items-start gap-y-[5px]">
                <div className="flex items-center gap-[10px]">
                  <p>(032) 204-70-07</p>
                  <BsTelephoneFill />
                </div>
                <div className="flex items-center gap-[10px]">
                  <FaInstagram />
                  <FaFacebookF />
                  <div className="w-[16px] h-[16px] relative">
                    <Image
                      src="/images/x.png"
                      alt={""}
                      sizes="500px"
                      fill
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute z-0 bottom-[-180px] left-[-200px] w-[600px] h-[400px] max-lg:hidden">
          <Image
            src="/images/yellowCol.png"
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <div className="absolute z-0 bottom-[-20px] right-[-50px] w-[250px] h-[150px] max-lg:hidden">
          <Image
            src="/images/yellowLomgCol.png"
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <div className="absolute z-0 bottom-[-40px] right-[-30px] w-[200px] h-[300px] max-lg:hidden">
          <Image
            src="/images/greencoltwo.png"
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      <div className="bg-myBlack text-[#7E8389] flex justify-center items-center h-[58px] max-sm:text-[12px]">
        <p>© 2025 samidzma - All Rights Reserved</p>
      </div>
    </div>
  );
}
