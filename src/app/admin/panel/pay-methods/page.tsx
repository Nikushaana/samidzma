"use client";

import React, { useContext, useEffect, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { useRouter } from "next/navigation";
import { FaInfo } from "react-icons/fa";
import { ContextForSharingStates } from "../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../dataFetchs/AxiosToken";
import { RxUpdate } from "react-icons/rx";
import GreenButton from "@/app/components/buttons/greenButton";

export default function Page() {
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );

  const [payMethodData, setPayMethodData] = useState<any>([]);

  const [allPaymethodsLoader, setAllPaymethodsLoader] = useState<boolean>(true);
  const [allPaymethodsId, setAllPaymethodsId] = useState<any>();
  const [allPaymethodsRender, setAllPaymethodsRender] = useState<any>();

  const [PaymethodsUpdatePopUp, setPaymethodsUpdatePopUp] =
    useState<string>("");
  const [PaymethodsUpdateLoader, setPaymethodsUpdateLoader] =
    useState<boolean>(false);

  useEffect(() => {
    setAllPaymethodsLoader(true);
    axiosAdmin
      .get("admin/paymentMethod")
      .then((res) => {
        setAllPaymethodsId(res.data.id);
        setPayMethodData([
          {
            id: 1,
            pay_method: "CASH",
            name: "ნაღდი ანგარიშსწორება",
            status: res.data.CASH,
          },
          {
            id: 2,
            pay_method: "BOG",
            name: "ბარათით გადახდა",
            status: res.data.BOG,
          },
          // {
          //   id: 3,
          //   pay_method: "TBC",
          //   name: "თიბისი ბანკი",
          //   status: res.data.TBC,
          // },
          {
            id: 3,
            pay_method: "UNIPAY",
            name: "UNIPAY",
            status: res.data.UNIPAY,
          },
        ]);

        setAllPaymethodsLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [allPaymethodsRender]);

  const HandleUpdatePaymethods = () => {
    setPaymethodsUpdateLoader(true);
    axiosAdmin
      .post(`admin/paymentMethod/${allPaymethodsId}`, {
        BOG: payMethodData[1].status,
        TBC: payMethodData[2].status,
        CASH: payMethodData[0].status,
        UNIPAY: payMethodData[3].status,
      })
      .then((res) => {
        setAllPaymethodsRender(res);
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით შეიცვალა");
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ შეიცვალა!");
      })
      .finally(() => {
        setPaymethodsUpdateLoader(false);
        setPaymethodsUpdatePopUp("");
      });
  };

  return (
    <div
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        PaymethodsUpdateLoader && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">გადახდის მეთოდები</h1>
      <div className="flex flex-col gap-y-[10px] items-center w-full relative">
        {allPaymethodsLoader && (
          <div className="w-[60px] h-[60px] flex items-center justify-center absolute top-[150px] left-[50%] translate-x-[-50%] z-[1]">
            <DotsLoader />
          </div>
        )}{" "}
        {payMethodData.map((item: any, index: number) => (
          <div
            key={item.id}
            className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
              PaymethodsUpdateLoader === item.id && "opacity-[0.5] mx-[20px]"
            }`}
          >
            <div className="flex max-sm:flex-col items-center max-sm:items-start gap-[20px]">
              <p className="select-none">{item.name}</p>

              <p
                className={`select-none text-[14px] ${
                  item.status ? "text-[green]" : "text-[red]"
                }`}
              >
                {item.status ? "აქტიურია" : "გამორთულია"}
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <div className="relative">
                <div
                  onClick={() => {
                    setPaymethodsUpdatePopUp(item.pay_method);
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                >
                  <RxUpdate />
                </div>
                {PaymethodsUpdatePopUp === item.pay_method && (
                  <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                    <div
                      onClick={() => {
                        setPayMethodData((prev: any[]) =>
                          prev.map((method) =>
                            method.pay_method === item.pay_method
                              ? { ...method, status: item.status ? 0 : 1 }
                              : method
                          )
                        );
                      }}
                      className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                    >
                      <RxUpdate />
                    </div>
                    <div
                      onClick={() => {
                        setPaymethodsUpdatePopUp("");
                      }}
                      className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[18px] hover:shadow-md duration-300 cursor-pointer"
                    >
                      <BsXLg />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[200px]">
        <GreenButton
          name="შენახვა"
          action={HandleUpdatePaymethods}
          loader={PaymethodsUpdateLoader}
          style="h-[50px] text-[18px]"
        />
      </div>
    </div>
  );
}
