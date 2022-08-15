import { useEffect, useState } from "react";
import styled from "styled-components";
import MonthlyCalendar from "./MonthlyCalendar";
import DailyCalendar from "./DailyCalendar";

// 스타일 지정

const CalendarCommunity = () => {
  const [calendarMode, setCalendaryMode] = useState("monthly");
  const [date, setDate] = useState({ year: 0, month: 0, day: 0 });

  const setYearAndMonth = (y, m) => {
    setDate({ year: y, month: m, day: date.day });
  };

  const openMonthlyCalendar = () => {
    setCalendaryMode("monthly");
  };

  const openDailyCalendar = (y, m, d) => {
    setDate({ year: y, month: m, day: d });
    setCalendaryMode("daily");
  };

  useEffect(() => {
    const today = new Date();
    setDate({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    });
  }, []);

  return (
    <>
      <h1>월간게시판</h1>

      {calendarMode == "monthly" ? (
        <MonthlyCalendar
          year={date.year}
          month={date.month}
          daily={openDailyCalendar}
          setYearAndMonth={setYearAndMonth}
        />
      ) : (
        <DailyCalendar
          year={date.year}
          month={date.month}
          day={date.day}
          monthly={openMonthlyCalendar}
          setYearAndMonth={setYearAndMonth}
        />
      )}
    </>
  );
};

export default CalendarCommunity;
