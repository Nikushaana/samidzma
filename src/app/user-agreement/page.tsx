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
  const [agreement, setAgreement] = useState([
    {
      id: 1,
      title: "Main provisions",
      coTexts: [
        {
          id: 1,
          text: "This Agreement is concluded between the Buyer and the Online Store at the time of order placement.",
        },
        {
          id: 2,
          text: "The information posted on the website of the Online Store contains the terms and conditions of the offer to purchase goods and represents a public offer, the status of which is stipulated by Article 633 of the Civil Code of Ukraine (CCU). Acceptance is the fact of placing an order for the offered goods.",
        },
        {
          id: 3,
          text: "When placing an order the Buyer agrees to the terms and conditions stipulated by this Agreement by marking the box “I have read and agree with the rules of the User Agreement” when placing an order.",
        },
        {
          id: 4,
          text: "Any individual or legal entity capable of accepting and paying for the goods can make a purchase in the online store.",
        },
        {
          id: 5,
          text: "The goods are paid in the national currency of Ukraine upon delivery of the goods or by bank wire transfer.",
        },
      ],
    },
    {
      id: 2,
      title: "product information",
      coTexts: [
        {
          id: 1,
          text: "The goods are presented in the catalog through photo samples, which are the property of the online store.",
        },
        {
          id: 2,
          text: "Each photo-sample is accompanied by textual information: article number, price and description of the goods.",
        },
        {
          id: 3,
          text: "At the Buyer's request, the online store manager is obliged to provide (by phone or e-mail) additional information necessary and sufficient, from the Buyer's point of view, to make a decision on the purchase of goods.",
        },
        {
          id: 4,
          text: "The price of the goods indicated on the website can be changed unilaterally by the Online Shop.",
        },
        {
          id: 5,
          text: "In case of change in the price of the goods ordered by the Buyer, the manager of the online store at the first opportunity informs the Buyer (by phone or e-mail) to confirm or cancel the order. If it is impossible to contact the Buyer, the order is considered canceled.",
        },
      ],
    },
    {
      id: 3,
      title: "Procedure for purchasing goods in the online store",
      coTexts: [
        {
          id: 1,
          text: "Orders are accepted through the online store and official pages in social networks.",
        },
        {
          id: 2,
          text: "The Buyer of the Online Shop has the right to place an order for any product presented on the website of the Online Shop and available. Each product can be ordered in any quantity. The order can be placed by the Buyer in the following ways: made by phone, by e-mail or placed independently on the site.",
        },
        {
          id: 3,
          text: "If the goods are out of stock, the manager of the company is obliged to inform the Buyer (by phone or e-mail).",
        },
        {
          id: 4,
          text: "In the absence of goods, the Buyer has the right to replace it with a product of a similar model, to refuse this product, to cancel the order.",
        },
        {
          id: 5,
          text: "The Buyer has the right to refuse the order at any time before it is sent to the Buyer, by informing the online store by phone or e-mail.",
        },
      ],
    },
  ]);
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-sm:px-[25px] pb-[100px] flex flex-col gap-y-[30px] relative">
        <WhatUSearch />

        <div className="flex flex-col gap-y-[10px]">
          <h1 className="text-[28px]">Dear buyer!</h1>
          <p className="text-[14px]">
            Please read the User Agreement with the Internet-shop yuriv.ua
            carefully before buying the goods.
          </p>
        </div>
        <p className="text-[14px]">
          This text is the User Agreement between the Internet-shop yuriv.com.ua
          hereinafter referred to as “Internet-shop”, and the user of the
          services of the Internet-shop, hereinafter referred to as “Buyer” and
          defines the terms of purchasing goods through the site of the
          Internet-shop.
        </p>
        <div className="text-[14px] flex flex-col gap-y-[30px]">
          {agreement.map((item, index: number) => (
            <div key={item.id} className="flex flex-col gap-y-[5px]">
              <h1>
                {item.id}. {item.title}
              </h1>
              {item.coTexts.map((item1, index: number) => (
                <p key={item1.id}>
                  {item.id}.{item1.id} {item1.text}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
