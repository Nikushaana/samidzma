"use client";

import React, { useEffect, useRef, useState } from "react";
import { BsXLg } from "react-icons/bs";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone);

export default function NormalCalendar({
  title,
  placeholder,
  firstValue,
  name,
  setAllValues,
  error,
  render,
}: any) {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [mySelectedDate, setMySelectedDate] = useState<Date>(new Date());

  const [time, setTime] = useState(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ INIT DEFAULT VALUE (FIX)
  useEffect(() => {
    const now = new Date();

    setMySelectedDate(now);

    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const currentTime = `${hh}:${mm}`;

    setTime(currentTime);

    setAllValues((prev: any) => ({
      ...prev,
      [name]: now.toISOString(),
    }));
  }, []);

  // reset (if parent forces re-render)
  useEffect(() => {
    if (render) {
      const now = new Date();
      setMySelectedDate(now);

      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hh}:${mm}`);

      setAllValues((prev: any) => ({
        ...prev,
        [name]: now.toISOString(),
      }));
    }
  }, [render]);

  // init value from props (edit mode)
  useEffect(() => {
    if (!firstValue) return;

    const parsed = new Date(firstValue);
    setMySelectedDate(parsed);

    const hh = String(parsed.getHours()).padStart(2, "0");
    const mm = String(parsed.getMinutes()).padStart(2, "0");
    setTime(`${hh}:${mm}`);
  }, [firstValue]);

  // close outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const applyTime = (date: Date, timeStr: string) => {
    const [h, m] = timeStr.split(":").map(Number);

    const updated = new Date(date);
    updated.setHours(h);
    updated.setMinutes(m);
    updated.setSeconds(0);
    updated.setMilliseconds(0);

    return updated;
  };

  const handleDateChange = (date: any) => {
    const final = applyTime(date, time);

    setMySelectedDate(final);

    setAllValues((prev: any) => ({
      ...prev,
      [name]: final.toISOString(),
    }));
  };

  const handleTimeChange = (value: string) => {
    setTime(value);

    const final = applyTime(mySelectedDate, value);

    setMySelectedDate(final);

    setAllValues((prev: any) => ({
      ...prev,
      [name]: final.toISOString(),
    }));
  };

  const clearDate = () => {
    const now = new Date();

    setMySelectedDate(now);

    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const currentTime = `${hh}:${mm}`;

    setTime(currentTime);

    setAllValues((prev: any) => ({
      ...prev,
      [name]: now.toISOString(),
    }));
  };

  return (
    <div className="flex flex-col gap-y-[5px] w-full">
      {title && <p className="text-[12px] mx-[20px]">{title}</p>}

      <div ref={calendarRef} className="relative">
        {/* input */}
        <div
          onClick={() => setIsFocused((prev) => !prev)}
          className={`rounded-full w-full h-[52px] py-[6px] px-[15px] flex items-center border cursor-pointer ${
            error ? "border-red-500" : "border-gray-300 bg-[#EEEEEE]"
          }`}
        >
          <p className="text-[14px] flex-1 text-gray-700">
            {mounted ? dayjs
                              .utc(mySelectedDate)
                              .tz("Asia/Tbilisi")
                              .format("YYYY-MM-DD HH:mm:ss") : ""}
          </p>

          <div
            onClick={(e) => {
              e.stopPropagation();
              clearDate();
            }}
          >
            <BsXLg />
          </div>
        </div>

        {/* dropdown */}
        {isFocused && (
          <div className="absolute top-[60px] left-0 z-[10] bg-white p-3 rounded-xl shadow border w-full min-w-[320px]">
            <Calendar
              value={mySelectedDate}
              onChange={handleDateChange}
              minDate={today}
            />

            <input
              type="time"
              value={time}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="mt-3 border px-2 py-1 rounded w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}