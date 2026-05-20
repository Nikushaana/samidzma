"use client";

import React, { useEffect, useRef, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { parse, format } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ka } from "date-fns/locale";

export default function InputCalendar({
  title,
  placeholder,
  firstValue,
  name,
  name1,
  setAllValues,
  error,
  render,
  minDate,
  holidays,
  multipleDate,
}: any) {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [mySelectedDate, setMySelectedDate] = useState<any>(
    multipleDate ? [null, null] : null,
  );

  useEffect(() => {
    if (render) {
      setMySelectedDate(multipleDate ? [null, null] : null);
    }
  }, [render]);

  useEffect(() => {
    if (firstValue) {
      if (multipleDate && Array.isArray(firstValue)) {
        setMySelectedDate([
          parse(firstValue[0], "dd-MM-yyyy", new Date()),
          parse(firstValue[1], "dd-MM-yyyy", new Date()),
        ]);
      } else if (!multipleDate && typeof firstValue === "string") {
        setMySelectedDate(parse(firstValue, "dd-MM-yyyy", new Date()));
      }
    }
  }, [firstValue]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChangeDate = (date: any) => {
    setMySelectedDate(date);

    if (multipleDate) {
      const [start, end] = date;
      setAllValues((prev: any) => ({
        ...prev,
        [name]: start || null,
        [name1]: end || null,
      }));
    } else {
      setAllValues((prev: any) => ({
        ...prev,
        [name]: format(date, "dd-MM-yyyy"),
      }));
    }
  };

  return (
    <div className="flex flex-col gap-y-[5px] w-full">
      {title && <p className="text-[12px] mx-[20px]">{title}</p>}

      <div ref={calendarRef} className="relative">
        <div
          onClick={() => setIsFocused((prev) => !prev)}
          className={`rounded-full w-full h-[52px] max-sm:h-[42px] outline-none py-[6px] px-[15px] flex items-center duration-100 border-[1px] ${
            error
              ? "border-myPink"
              : isFocused
                ? "border-[#E2E2E2]"
                : "bg-[#EEEEEE] border-[#E2E2E2]"
          }`}
        >
          <p
            className={`truncate text-start px-[5px] text-[14px] w-[calc(100%-20px)] ${
              mySelectedDate ? "" : "text-gray-400"
            }
              `}
          >
            {(
              multipleDate
                ? mySelectedDate[0] && mySelectedDate[1]
                : mySelectedDate
            )
              ? multipleDate
                ? `${format(mySelectedDate[0], "dd-MM-yyyy").replaceAll(
                    "-",
                    ".",
                  )} - დან ${format(mySelectedDate[1], "dd-MM-yyyy").replaceAll(
                    "-",
                    ".",
                  )} - მდე`
                : format(mySelectedDate, "dd-MM-yyyy").replaceAll("-", ".")
              : placeholder}
          </p>
          {(multipleDate
            ? mySelectedDate[0] && mySelectedDate[1]
            : mySelectedDate) && (
            <div
              onClick={() => {
                setMySelectedDate(
                  firstValue
                    ? [
                        parse(firstValue[0], "dd-MM-yyyy", new Date()),
                        parse(firstValue[1], "dd-MM-yyyy", new Date()),
                      ]
                    : multipleDate
                      ? [null, null]
                      : null,
                );
                if (multipleDate) {
                  setAllValues((prev: any) => ({
                    ...prev,
                    [name]: "",
                    [name1]: "",
                  }));
                } else {
                  setAllValues((prev: any) => ({
                    ...prev,
                    [name]: "",
                  }));
                }
              }}
              className="flex items-center justify-center text-[#010125]"
            >
              <BsXLg className="cursor-pointer" />
            </div>
          )}
        </div>

        {isFocused && (
          <div className="absolute top-[56px] left-0 z-[2] p-[10px] max-tiny:p-0 flex justify-center w-full min-w-[330px] max-tiny:min-w-0 bg-white rounded-xl shadow border-[1px] overflow-hidden inputCalendar">
            <Calendar
              selectRange={multipleDate}
              formatShortWeekday={(locale, date) =>
                ["კვ", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"][date.getDay()]
              }
              formatMonthYear={(locale, date) =>
                format(date, "MMMM yyyy", { locale: ka })
              }
              formatMonth={(locale, date) =>
                format(date, "MMM", { locale: ka })
              }
              onChange={(date: any) => {
                handleChangeDate(date);
              }}
              value={mySelectedDate}
              minDate={
                minDate == "today"
                  ? new Date(new Date().setDate(new Date().getDate()))
                  : minDate == "allDays"
                    ? undefined
                    : new Date(new Date().setDate(new Date().getDate() + 1))
              }
              tileClassName={({ date, view }) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const isPast = date < today;
                if (isPast && minDate !== "allDays") return "pastDate";

                if (
                  view === "month" &&
                  holidays?.find(
                    (item: any) => item.date == format(date, "dd-MM-yyyy"),
                  )
                ) {
                  return "holidayNone";
                }
                return null;
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
