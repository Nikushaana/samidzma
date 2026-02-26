"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import DotsLoader from "@/app/components/loaders/DotsLoader";

import { format } from "date-fns";
import { ContextForSharingStates } from "../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../dataFetchs/AxiosToken";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ka } from "date-fns/locale";

export default function Page() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );

  const [holidaysData, setHolidaysData] = useState<any>([]);

  const [mySelectedDate, setMySelectedDate] = useState<any>();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setMySelectedDate(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [allHolidaysLoader, setAllHolidaysLoader] = useState<boolean>(true);
  const [allHolidaysRender, setAllHolidaysRender] = useState<any>();
  const [oneHolidaysLoader, setOneHolidaysLoader] = useState<boolean>(false);

  useEffect(() => {
    setAllHolidaysLoader(true);
    axiosAdmin
      .get("admin/holiday")
      .then((res) => {
        setHolidaysData(res.data.data);

        setAllHolidaysLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [allHolidaysRender]);

  useEffect(() => {
    if (mySelectedDate) {
      setOneHolidaysLoader(true);
      axiosAdmin
        .post("admin/holiday", {
          data: format(mySelectedDate, "dd-MM-yyyy"),
        })
        .then((res) => {
          setAllHolidaysRender(res);
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("უქმე დღეები წარმატებით შეიცვალა");
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("უქმე დღეები ვერ შეიცვალა!");
        })
        .finally(() => {
          setOneHolidaysLoader(false);
        });
    }
  }, [mySelectedDate]);

  return (
    <div
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        oneHolidaysLoader || allHolidaysLoader && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">დასვენების დღეები</h1>
      <div className="flex flex-col gap-y-[30px] items-center w-full relative ">
        {allHolidaysLoader && (
          <div className="w-[60px] h-[60px] flex items-center justify-center absolute top-[150px] left-[50%] translate-x-[-50%] z-[1]">
            <DotsLoader />
          </div>
        )}
        <p>სულ მონიშნულია {holidaysData.length} უქმე დღე</p>
        <div ref={calendarRef} className="flex justify-center max-tiny:w-full adminCalendar ">
          <Calendar
            formatShortWeekday={(locale, date) =>
              ["კვ", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"][date.getDay()]
            }
            formatMonthYear={(locale, date) =>
              format(date, "MMMM yyyy", { locale: ka })
            }
            formatMonth={(locale, date) => format(date, "MMM", { locale: ka })}
            onChange={setMySelectedDate}
            value={mySelectedDate}
            tileClassName={({ date, view }) => {
              if (
                view === "month" &&
                holidaysData.find(
                  (item: any) => item.date == format(date, "dd-MM-yyyy")
                )
              ) {
                return "holiday";
              }
              return null;
            }}
          />
        </div>
      </div>
    </div>
  );
}
