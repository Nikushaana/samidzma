"use client";

import React, { useContext, useEffect, useState } from "react";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { PiHouseLineThin } from "react-icons/pi";
import {
  BsCart3,
  BsChatDots,
  BsDisplay,
  BsGift,
  BsNewspaper,
  BsRobot,
} from "react-icons/bs";
import { AiOutlineStock } from "react-icons/ai";
import { GiReceiveMoney } from "react-icons/gi";
import { TfiAngleRight } from "react-icons/tfi";
import {
  MdOutlineAttachMoney,
  MdOutlineBusinessCenter,
  MdOutlineWarehouse,
} from "react-icons/md";
import { TbMessageCircleQuestion } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { RiAdvertisementLine, RiCoupon3Line } from "react-icons/ri";
import { GoCommentDiscussion } from "react-icons/go";

export default function SideBar() {
  const { userMenu, setUserMenu } = useContext(ContextForSharingStates);
  const router = useRouter();
  const pathname = usePathname();

  const [route, setRoute] = useState([
    {
      id: 1,
      route: "ვაკანსიები",
      link: "vacancy",
      links: [
        {
          id: 1,
          route: "ვაკანსიის დამატება",
          link: "add-vacancy",
        },
        {
          id: 2,
          route: "შემოსული CV-ები",
          link: "sended-cvs",
        },
      ],
      icon: <MdOutlineBusinessCenter />,
    },
    {
      id: 2,
      route: "FAQ",
      link: "faq",
      links: [
        {
          id: 1,
          route: "FAQ დამატება",
          link: "add-faq",
        },
      ],
      icon: <TbMessageCircleQuestion />,
    },
    {
      id: 3,
      route: "ბლოგები",
      link: "blog",
      links: [
        {
          id: 1,
          route: "ბლოგის დამატება",
          link: "add-blog",
        },
        {
          id: 2,
          route: "ბლოგის კატეგორიები",
          link: "blog-category",
        },
        {
          id: 3,
          route: "ბლოგის კატეგორიის დამატება",
          link: "add-blog-category",
        },
      ],
      icon: <BsNewspaper />,
    },
    {
      id: 4,
      route: "პირველი კატეგორიები",
      link: "first-categories",
      links: [
        {
          id: 1,
          route: "პირველი კატეგორიის დამატება",
          link: "add-first-category",
        },
        {
          id: 2,
          route: "მეორე კატეგორიები",
          link: "second-categories",
        },
        {
          id: 3,
          route: "მეორე კატეგორიის დამატება",
          link: "add-second-category",
        },
      ],
      icon: <BiCategory />,
    },
    {
      id: 5,
      route: "პრომო კოდები",
      link: "promo-codes",
      links: [
        {
          id: 1,
          route: "პრომო კოდის დამატება",
          link: "add-promo-code",
        },
      ],
      icon: <RiCoupon3Line />,
    },
    {
      id: 6,
      route: "მთავარი საწყობი",
      link: "main-warehouse",
      links: [],
      icon: <MdOutlineWarehouse />,
    },
    {
      id: 7,
      route: "შეკვეთები",
      link: "orders",
      links: [],
      icon: <BsCart3 />,
    },
    {
      id: 8,
      route: "პროდუქტის საჩუქრები",
      link: "product-gifts",
      links: [
        {
          id: 1,
          route: "პროდუქტის საჩუქრის დამატება",
          link: "add-product-gifts",
        },
      ],
      icon: <BsGift />,
    },
    {
      id: 9,
      route: "მთავარი ბანერი",
      link: "main-banners",
      links: [
        {
          id: 1,
          route: "მთავარი ბანერის დამატება",
          link: "add-main-banners",
        },
      ],
      icon: <RiAdvertisementLine />,
    },
    {
      id: 10,
      route: "კომენტარები",
      link: "comments",
      links: [
        // {
        //   id: 1,
        //   route: "კომენტარის დამატება",
        //   link: "add-comments",
        // },
      ],
      icon: <GoCommentDiscussion />,
    },
    {
      id: 11,
      route: "მონაწერები",
      link: "messages",
      links: [],
      icon: <BsChatDots />,
    },
    {
      id: 12,
      route: "გადახდის მეთოდები",
      link: "pay-methods",
      links: [],
      icon: <MdOutlineAttachMoney />,
    },
  ]);

  const [dropedUrl, setDropedUrl] = useState<string>("");
  const [acturl, setacturl] = useState<any>({});

  useEffect(() => {
    if (!userMenu) {
      setDropedUrl("");
    }
  }, [userMenu]);

  useEffect(() => {
    setacturl({
      first: pathname.split("/")[3],
      second: pathname.split("/")[4] || "",
    });
  }, [pathname]);

  return (
    <div
      className={`overflow-x-hidden bg-[white] shadow duration-200 ${
        userMenu ? "w-[270px]" : "w-[60px] items-center"
      }`}
    >
      <div
        className={`fixed duration-200 h-[calc(100vh)] pt-[40px] pb-[20px] overflow-x-hidden overflow-y-scroll showScrollVert ${
          userMenu ? "w-[270px]" : "w-[60px]"
        }  flex flex-col gap-y-[40px] ${userMenu ? "" : "items-center"}`}
      >
        <div
          className={`shrink-0 ${
            userMenu ? "w-full" : "w-[40px] overflow-hidden rounded-full"
          } duration-200 h-[70px] relative`}
        >
          <Image
            src="/images/siteLogo.png"
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>

        <div className="flex flex-col relative gap-y-[5px] mr-[16px] ml-[5px]">
          <h1
            className={`text-gray-400 text-[14px] mx-[20px] ${
              userMenu ? "flex" : "hidden"
            }`}
          >
            მთავარი მენიუ
          </h1>
          {route.map((item, index: number) => (
            <div key={item.id}>
              <div
                onClick={() => {
                  setDropedUrl((pre) => (pre === item.link ? "" : item.link));
                }}
                className="flex items-center gap-[5px] h-[40px] w-full group"
              >
                <div
                  className={`w-[4px] h-full rounded-[10px] duration-150  ${
                    dropedUrl === item.link || acturl.first === item.link
                      ? "bg-myGreen"
                      : "group-hover:bg-myGreen"
                  } `}
                ></div>
                <div
                  className={`w-[calc(100%-11px)] h-full flex items-center justify-between rounded-[10px] px-[20px] duration-150  ${
                    dropedUrl === item.link && "bg-[#f4fcf7]"
                  }`}
                >
                  <div className={`flex items-center gap-[15px] duration-150 `}>
                    <div
                      onClick={() => {
                        if (dropedUrl === "") {
                          setUserMenu(true);
                        }
                      }}
                      className={`relative cursor-pointer flex items-center justify-center text-[22px] ${
                        acturl.first === item.link && "text-myGreen"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <h1
                      onClick={() => {
                        router.push(`/admin/panel/${item.link}`);
                        setacturl((pre: any) => ({
                          ...pre,
                          first: item.link,
                          second: "",
                        }));
                      }}
                      className={`duration-150 text-[12px] cursor-pointer  ${
                        userMenu ? "" : "hidden"
                      } ${
                        acturl.first === item.link
                          ? "text-myGreen"
                          : "hover:text-myGreen"
                      }`}
                    >
                      {item.route}
                    </h1>
                  </div>
                  {item.links.length > 0 && userMenu && (
                    <div
                      className={`relative duration-150 select-none flex items-center text-[13px] justify-center cursor-pointer  ${
                        dropedUrl === item.link
                          ? "text-myGreen"
                          : "group-hover:text-myGreen"
                      } ${dropedUrl === item.link ? "rotate-[90deg]" : ""}`}
                    >
                      <TfiAngleRight />
                    </div>
                  )}
                </div>
              </div>

              <div
                style={{
                  height:
                    dropedUrl === item.link
                      ? item.links
                        ? `${item.links.length * 45}px`
                        : "0"
                      : "0",
                  overflow: "hidden",
                  transition: "height 0.3s ease",
                }}
              >
                {item.links &&
                  item.links.map((item1, index: number) => (
                    <div
                      key={item1.id}
                      onClick={() => {
                        setacturl((pre: any) => ({
                          ...pre,
                          second: item1.link,
                        }));
                        router.push(`/admin/panel/${item.link}/${item1.link}`);
                      }}
                      className={`flex items-center h-[40px] cursor-pointer group gap-[25px] duration-200 ${
                        pathname.split("/")[4] === item1.link ? "" : ""
                      }`}
                    >
                      <div
                        className={`w-[4px] h-full rounded-[10px] duration-150`}
                      ></div>
                      <div
                        className={`flex items-center gap-[15px] duration-150`}
                      >
                        <div
                          className={`mx-[10px] w-[5px] h-[5px] border-[1px] border-myGreen duration-100 rounded-full ${
                            acturl.second === item1.link
                              ? "bg-myGreen "
                              : "group-hover:bg-myGreen"
                          }`}
                        ></div>
                        <h1
                          className={`text-[13px] ${
                            pathname.split("/")[4] === item1.link ? "" : ""
                          }  ${userMenu ? "flex" : "hidden"}`}
                        >
                          {item1.route}
                        </h1>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
