import React, { useState } from "react";
import "./Calender.css"; // ✅ Correct spelling

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const calendarCells = [];
  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    calendarCells.push(
      <div key={day} className={`calendar-cell ${isToday ? "today" : ""}`}>
        {day}
      </div>
    );
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>{months[month]} {year}</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-days">
        {days.map(day => (
          <div key={day} className="calendar-day">{day}</div>
        ))}
      </div>
      <div className="calendar-grid">{calendarCells}</div>
    </div>
  );
};

export default Calendar;
