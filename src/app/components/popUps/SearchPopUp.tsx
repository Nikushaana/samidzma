"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { BsPlusLg, BsXLg } from "react-icons/bs";
import Link from "next/link";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchPopUp() {
  const { SearchPopUp, setSearchPopUp } = useContext(ContextForSharingStates);

  const [categs, setCategs] = useState([
    {
      id: 1,
      name: "სადღესასწაულო აქსესუარები",
    },
    {
      id: 2,
      name: "ფეიერვერკები",
    },
    {
      id: 3,
      name: "საკონდიტრო აქსესუარები",
    },
    {
      id: 4,
      name: "საკონდიტრო მასალები",
    },
    {
      id: 5,
      name: "საახალწლო აქსესუარები",
    },
    {
      id: 6,
      name: "სათამაშოები",
    },
  ]);

  const [searchedcategs, setSearchedCategs] = useState([
    {
      id: 1,
      name: "აქსესუარები ტორტის გასაფორმებლად",
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15],
    },
    {
      id: 2,
      name: "სანთლები",
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15],
    },
    {
      id: 3,
      name: "აქსესუარები ტორტის გასაფორმებლად",
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15],
    },
  ]);

  const [actCateg, setActCateg] = useState("სადღესასწაულო აქსესუარები");

  return (
    <div
      className={`fixed top-0 left-0 flex items-center justify-center w-[100vw] h-[100vh] ${
        SearchPopUp
          ? "z-[20] opacity-1 duration-100"
          : "z-[-20] opacity-0 duration-150"
      }`}
    >
      <div
        onClick={() => {
          setSearchPopUp(false);
        }}
        className={`bg-[#0000003b] w-full h-full absolute z-[-1] duration-100 ${
          SearchPopUp ? "backdrop-blur-[15px] " : "backdrop-blur-none"
        }`}
      ></div>
      <div
        className={`bg-[#EAEDEE] p-[16px] max-w-[1920px] flex flex-col gap-y-[20px] rounded-[12px] duration-100`}
      >
        <div className="flex justify-end ">
          <div
            onClick={() => {
              setSearchPopUp(false);
            }}
            className="cursor-pointer"
          >
            <BsXLg />
          </div>
        </div>
        <div className="rounded-full bg-white overflow-hidden flex justify-between">
          <div className="flex items-center px-[20px] w-[calc(100%-50px)]">
            <input
              type="text"
              name=""
              placeholder="რას ეძებ?"
              className="text-[14px] w-full outline-none"
              id=""
            />
          </div>
          <div className="bg-myGreen text-white cursor-pointer flex items-center justify-center text-[18px] w-[43px] h-[43px] rounded-full">
            <IoSearchOutline />
          </div>
        </div>
        <div>
          <div className="flex items-start gap-[20px] h-[60px]">
            <h1 className="text-[28px]">კატეგორიები:</h1>
            <div className="flex items-start pt-[5px] gap-[10px] h-full">
              {categs.map((item, index: number) => (
                <p
                  key={item.id}
                  onClick={() => {
                    setActCateg(item.name);
                  }}
                  className={`px-[10px] text-[14px] cursor-pointer ${
                    actCateg === item.name
                      ? "text-white bg-myGreen h-full rounded-t-[12px] pt-[10px]"
                      : "h-[36px] rounded-full border-[1px] border-black flex items-center"
                  }`}
                >
                  {item.name}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-[8px] border-t-[10px] border-myGreen w-full bg-white flex flex-col gap-y-[20px] p-[20px] pb-[30px]">
            {searchedcategs.map((item, index: number) => (
              <div key={item.id} className="flex flex-col gap-y-[10px]">
                <h1 className="text-[14px]">
                  აქსესუარები ტორტის გასაფორმებლად
                </h1>
                <div className="grid grid-cols-10 gap-[10px]">
                  {item.data.map((item1, index: number) => (
                    <div
                      key={item1}
                      className="w-full h-[110px] rounded-[4px] bg-[red]"
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
