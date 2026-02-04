import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "./Calendar";
import { cn } from "../utils/utils";

const DateRangePicker = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [isSelectingStart, setIsSelectingStart] = useState(true);
  const calendarRef = useRef(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date) => {
    if (!date) return "Select date";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatMonthDay = (date) => {
    if (!date) return "---";
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${monthNames[date.getMonth()]} ${date.getDate()}`;
  };

  const handleDateSelect = (selectedDate) => {
    if (isSelectingStart) {
      setTempStartDate(selectedDate);
      // Auto-switch to end date selection if no end date or if selected date is after end date
      if (!tempEndDate || selectedDate > tempEndDate) {
        setTempEndDate(selectedDate);
      } else {
        setIsSelectingStart(false);
      }
    } else {
      if (selectedDate < tempStartDate) {
        // If selected end date is before start date, swap them
        setTempEndDate(tempStartDate);
        setTempStartDate(selectedDate);
        setIsSelectingStart(true);
      } else {
        setTempEndDate(selectedDate);
        // Auto-apply and close
        onStartDateChange(tempStartDate);
        onEndDateChange(selectedDate);
        setIsOpen(false);
      }
    }
  };

  const getDaysBetween = () => {
    if (!tempStartDate || !tempEndDate) return 0;
    const diffTime = Math.abs(tempEndDate - tempStartDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isDateInRange = (date) => {
    if (!tempStartDate || !tempEndDate) return false;
    const start = tempStartDate < tempEndDate ? tempStartDate : tempEndDate;
    const end = tempStartDate < tempEndDate ? tempEndDate : tempStartDate;
    return date >= start && date <= end;
  };

  const CustomCalendar = ({ selected, onSelect }) => {
    const [month, setMonth] = React.useState(selected ? new Date(selected.getFullYear(), selected.getMonth()) : new Date());

    const getDaysInMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysInMonth = getDaysInMonth(month);
    const firstDay = getFirstDayOfMonth(month);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(month.getFullYear(), month.getMonth(), i));
    }

    const handlePrevMonth = () => {
      setMonth(new Date(month.getFullYear(), month.getMonth() - 1));
    };

    const handleNextMonth = () => {
      setMonth(new Date(month.getFullYear(), month.getMonth() + 1));
    };

    return (
      <div className="w-64 p-3 bg-white rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-0.5 hover:bg-gray-100 rounded transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h2 className="text-sm font-semibold">
            {monthNames[month.getMonth()]} {month.getFullYear()}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-0.5 hover:bg-gray-100 rounded transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-3">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-gray-600">
              {day.charAt(0)}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, idx) => (
            <button
              key={idx}
              onClick={() => day && onSelect(day)}
              disabled={!day}
              className={cn(
                "h-8 rounded text-xs font-medium transition-colors",
                !day && "invisible",
                day && isDateInRange(day) && "bg-blue-200 text-blue-900",
                day &&
                  (day.toDateString() === tempStartDate?.toDateString() ||
                    day.toDateString() === tempEndDate?.toDateString()) &&
                  "bg-blue-600 text-white font-bold",
                day &&
                  !isDateInRange(day) &&
                  day.toDateString() !== tempStartDate?.toDateString() &&
                  day.toDateString() !== tempEndDate?.toDateString() &&
                  "hover:bg-gray-100"
              )}
            >
              {day?.getDate()}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative" ref={calendarRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50 hover:text-gray-800 active:bg-gray-100 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155eef]/30"
        aria-label="Pick date range"
        title="Pick date range"
      >
        <svg
          className="w-5 h-5 text-gray-600 hover:text-gray-800 transition-colors"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute right-0 top-full mt-2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3"
        >
          <div className="mb-3">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-0.5">
                  Start
                </label>
                <div
                  className={cn(
                    "px-2 py-1 rounded border-2 text-xs font-medium cursor-pointer transition-colors",
                    isSelectingStart
                      ? "border-[#155eef] bg-blue-50 text-[#155eef]"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                  )}
                  onClick={() => setIsSelectingStart(true)}
                >
                  {formatDate(tempStartDate)}
                </div>
              </div>
              <div className="text-gray-400 text-xs">→</div>
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-0.5">
                  End
                </label>
                <div
                  className={cn(
                    "px-2 py-1 rounded border-2 text-xs font-medium cursor-pointer transition-colors",
                    !isSelectingStart
                      ? "border-[#155eef] bg-blue-50 text-[#155eef]"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                  )}
                  onClick={() => setIsSelectingStart(false)}
                >
                  {formatDate(tempEndDate)}
                </div>
              </div>
            </div>
            {tempStartDate && tempEndDate && (
              <div className="text-xs text-gray-500 text-center">
                {getDaysBetween() + 1} days
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-3">
            <CustomCalendar selected={isSelectingStart ? tempStartDate : tempEndDate} onSelect={handleDateSelect} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
