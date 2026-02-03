import React from "react";
import { Card, Button, Calendar, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Dialog, DialogContent, DialogHeader, DialogTitle } from "../design-system/components";
import HeaderCheckboxDropdown from "../components/HeaderChechboxDropdown";
import { cn } from "../design-system/utils/utils";
import { SimpleLineChart } from "./SimpleLineChart";
import { POWER_SERIES, VOLTAGE_SERIES } from "../utils/chartUtils";
import DERListCard from "./DERListCard";
import DERItemRow from "./DERItemRow";
import DERHeaderRow from "./DERHeaderRow";
import WallboxIcon from "./icons/WallboxIcon";
import SunnyBoyIcon from "./icons/SunnyBoyIcon";

const IconCircle = ({ children }) => (
  <span className="
    flex h-8 w-8 items-center justify-center
    rounded-full border border-gray-200
    text-gray-600 shrink-0
  ">
    {children}
  </span>
);

const NameIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-700"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M7.33301 3.00001H12.1997C12.9464 3.00001 13.3198 3.00001 13.605 3.14533C13.8559 3.27317 14.0599 3.47714 14.1877 3.72802C14.333 4.01324 14.333 4.38661 14.333 5.13334V6.00001C14.333 6.62127 14.333 6.93189 14.2315 7.17692C14.0962 7.50363 13.8366 7.76319 13.5099 7.89852C13.2649 8.00001 12.9543 8.00001 12.333 8.00001M8.66634 13H3.79967C3.05294 13 2.67957 13 2.39435 12.8547C2.14347 12.7269 1.9395 12.5229 1.81167 12.272C1.66634 11.9868 1.66634 11.6134 1.66634 10.8667V10C1.66634 9.37876 1.66634 9.06813 1.76784 8.8231C1.90316 8.4964 2.16273 8.23683 2.48943 8.1015C2.73446 8.00001 3.04509 8.00001 3.66634 8.00001M6.86634 9.66668H9.13301C9.31969 9.66668 9.41303 9.66668 9.48434 9.63035C9.54706 9.59839 9.59805 9.54739 9.63001 9.48467C9.66634 9.41337 9.66634 9.32003 9.66634 9.13334V6.86668C9.66634 6.67999 9.66634 6.58665 9.63001 6.51535C9.59805 6.45263 9.54706 6.40163 9.48434 6.36967C9.41303 6.33334 9.31969 6.33334 9.13301 6.33334H6.86634C6.67966 6.33334 6.58631 6.33334 6.51501 6.36967C6.45229 6.40163 6.4013 6.45263 6.36934 6.51535C6.33301 6.58665 6.33301 6.67999 6.33301 6.86668V9.13334C6.33301 9.32003 6.33301 9.41337 6.36934 9.48467C6.4013 9.54739 6.45229 9.59839 6.51501 9.63035C6.58631 9.66668 6.67966 9.66668 6.86634 9.66668ZM11.8663 14.6667H14.133C14.3197 14.6667 14.413 14.6667 14.4843 14.6303C14.5471 14.5984 14.5981 14.5474 14.63 14.4847C14.6663 14.4134 14.6663 14.32 14.6663 14.1333V11.8667C14.6663 11.68 14.6663 11.5867 14.63 11.5153C14.5981 11.4526 14.5471 11.4016 14.4843 11.3697C14.413 11.3333 14.3197 11.3333 14.133 11.3333H11.8663C11.6797 11.3333 11.5863 11.3333 11.515 11.3697C11.4523 11.4016 11.4013 11.4526 11.3693 11.5153C11.333 11.5867 11.333 11.68 11.333 11.8667V14.1333C11.333 14.32 11.333 14.4134 11.3693 14.4847C11.4013 14.5474 11.4523 14.5984 11.515 14.6303C11.5863 14.6667 11.6797 14.6667 11.8663 14.6667ZM1.86634 4.66668H4.13301C4.31969 4.66668 4.41303 4.66668 4.48434 4.63035C4.54706 4.59839 4.59805 4.54739 4.63001 4.48467C4.66634 4.41337 4.66634 4.32003 4.66634 4.13334V1.86668C4.66634 1.67999 4.66634 1.58665 4.63001 1.51535C4.59805 1.45263 4.54706 1.40163 4.48434 1.36967C4.41303 1.33334 4.31969 1.33334 4.13301 1.33334H1.86634C1.67966 1.33334 1.58631 1.33334 1.51501 1.36967C1.45229 1.40163 1.4013 1.45263 1.36934 1.51535C1.33301 1.58665 1.33301 1.67999 1.33301 1.86668V4.13334C1.33301 4.32003 1.33301 4.41337 1.36934 4.48467C1.4013 4.54739 1.45229 4.59839 1.51501 4.63035C1.58631 4.66668 1.67966 4.66668 1.86634 4.66668Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);


const TypeIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" height="16" 
    viewBox="0 0 24 24" fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round">
      <path d="M14 7H16C18.7614 7 21 9.23858 21 12C21 14.7614 18.7614 17 16 17H14M10 7H8C5.23858 7 3 9.23858 3 12C3 14.7614 5.23858 17 8 17H10M8 12H16" />
  </svg>
);

const LocationIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const NetworkIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3v18" />
    <path d="M6 8h12" />
    <path d="M6 16h12" />
  </svg>
);

const PowerIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
  </svg>
);

const EvIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="3" width="14" height="14" rx="2" />
    <path d="M9 21v-4h6v4" />
    <path d="M9 7h6" />
  </svg>
);


const SiteDetailRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 rounded-full border border-gray-200 pl-0 py-0 text-sm">
    <IconCircle>{icon}</IconCircle>

    <span className="text-gray-500 whitespace-nowrap">
      {label + ":"}
    </span>

    <span className="font-medium text-gray-900 truncate max-w-[45%]">
      {value}
    </span>
  </div>
);


const TimeRangeTabs = ({ options }) => {
  const [active, setActive] = React.useState(options[0]?.value || "");

  return (
    <div
      className="
        flex items-center overflow-hidden
        rounded-full border border-[#155eef]-500
        bg-white max-w-full
        text-xs sm:text-sm font-medium
      "
    > 
      {options.map((opt) => {
        const isActive = active === opt.value;

        return (
          <button
            key={opt.value}
            onClick={() => setActive(opt.value)}
            className={cn(
              "px-2 py-1 sm:px-3 py-1.5 transition-colors whitespace-nowrap",
              "focus:outline-none",
              isActive
                ? "bg-[#155eef] text-white"
                : "text-[#155eef] hover:bg-[#eef3ff]"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

// Color mapping utility for CSP compliance
const getColorClass = (color) => {
  const colorMap = {
    "#111827": "bg-gray-900",
    "#ef4444": "bg-red-500",
    "#3b82f6": "bg-blue-500",
    "#155eef": "bg-blue-600",
    "#22c55e": "bg-green-500",
    "#60a5fa": "bg-blue-400",
  };
  return colorMap[color] || "bg-gray-500";
};


const EmptyChart = ({ legend, className, series, xLabel, yLabel }) => {
  if (series && series.length > 0) {
    return (
      <div className={cn("flex flex-col", className || "h-80")}>
        <div className="flex-1 border-b border-gray-200 p-6 min-h-0 rounded-lg bg-white w-full h-full min-w-0 overflow-hidden">
          <SimpleLineChart className="w-full h-full"
          series={series} xLabel={xLabel} yLabel={yLabel} />
        </div>
        {legend && legend.length > 0 && (
          <div className="flex items-center gap-6 pt-6 pb-2 text-sm text-gray-600">
            {legend.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span
                  className={cn("w-3 h-3 rounded-full", getColorClass(item.color))}
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col justify-between", className)}>
      <div className="flex-1 border-b border-gray-200" />
      {legend && legend.length > 0 && (
        <div className="flex items-center gap-4 pt-3 text-sm text-gray-600">
          {legend.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span
                className={cn("w-2.5 h-2.5 rounded-full", getColorClass(item.color))}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const SectionCard = ({ title, rightContent, children, onExpand }) => (
  <Card className="w-full h-full px:0 py:0 overflow-visible rounded-xl
                  shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_8px_rgba(16,24,40,0.08)]">
    <div className="px-2 py-1 h-full flex flex-col min-w-0">
      <div className="flex items-start justify-between gap-2 mb-2 min-w-0 shrink-0">
        <h3 className="text-base sm:text-base font-bold text-gray-900 break-words truncate">{title}</h3>
        <div className="flex items-center gap-2 flex-shrink-0">
          {rightContent}
          {onExpand && (
            <button
              onClick={onExpand}
              className="p-1 rounded hover:bg-gray-100 transition-colors"
              aria-label="Expand chart"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0 relative overflow-visible">
        {children}
      </div>
    </div>
  </Card>
);


const DatePickerButton = ({ date, onDateChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [popoverStyle, setPopoverStyle] = React.useState({});
  const dateRef = React.useRef(null);
  const popoverRef = React.useRef(null);

  // Close on outside click
  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        dateRef.current &&
        !dateRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Update calendar position
  const updatePopoverPosition = React.useCallback(() => {
    if (!dateRef.current) return;

    const rect = dateRef.current.getBoundingClientRect();
    const calendarWidth = 280;
    const GAP=8;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = rect.left;
    if (left + calendarWidth > viewportWidth) {
      left = viewportWidth - calendarWidth - GAP;
    }
    if (left < GAP) {
      left = GAP;
    }

    const maxHeight = Math.max(
      200,
      viewportHeight - rect.bottom - GAP
    );

    setPopoverStyle({
      top: rect.bottom + GAP,
      left,
      maxHeight: maxHeight,
    });
  }, []);

  // Recalculate on open, scroll, resize
  React.useEffect(() => {
    if (!isOpen) return;

    updatePopoverPosition();

    window.addEventListener("scroll", updatePopoverPosition, true);
    window.addEventListener("resize", updatePopoverPosition);

    return () => {
      window.removeEventListener("scroll", updatePopoverPosition, true);
      window.removeEventListener("resize", updatePopoverPosition);
    };
  }, [isOpen, updatePopoverPosition]);

  const formatDate = (date) => {
    if (!date) return "20/01/2026";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatMonthDay = (date) => {
    if (!date) return "Jan 20";
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${monthNames[date.getMonth()]} ${date.getDate()}`;
  };

  const handlePreviousDay = () => {
    const newDate = new Date(date || new Date("2026-01-20"));
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(date || new Date("2026-01-20"));
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-4 text-sm text-gray-700">
        <button onClick={handlePreviousDay} className="p-1.5 rounded hover:bg-gray-100">
          ←
        </button>

        <span>{formatMonthDay(date || new Date("2026-01-20"))}</span>

        <button onClick={handleNextDay} className="p-1.5 rounded hover:bg-gray-100">
          →
        </button>

        {/* Date picker */}
        <button
          ref={dateRef}
          onClick={() => setIsOpen((v) => !v)}
          className="
            relative
            w-[180px]
            border border-gray-500
            rounded-md
            px-3
            pt-5
            pb-2
            text-sm
            text-left
            hover:bg-gray-50
          "
        >
          <span className="absolute top-1 left-3 text-xs text-gray-500">
            Pick a date
          </span>

          <span className="block text-gray-900">
            {formatDate(date || new Date("2026-01-20"))}
          </span>

          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </button>

        {isOpen && (
          <div
            ref={popoverRef}
            className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 overflow-y-auto"
            style={popoverStyle}
          >
            <Calendar
              selected={date || new Date("2026-01-20")}
              onSelect={(selectedDate) => {
                if (selectedDate) {
                  onDateChange(selectedDate);
                  setIsOpen(false);
                }
              }}
              mode="single"
            />
          </div>
        )}
      </div>
    </div>
  );
};


const ExpandedChartDialog = ({
  open,
  onOpenChange,
  title,
  timeRangeOptions,
  legend,
  chartDate,
  onDateChange,
  series,
  xLabel,
  yLabel,
}) => {
  const [zoom, setZoom] = React.useState(1);
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const calendarRef = React.useRef(null);
  const popoverRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target)
      ) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(4, prev + 0.5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(1, prev - 0.5));
  };

  const handleZoomReset = () => {
    setZoom(1);
  };

  const handlePrevDay = () => {
    if (chartDate && onDateChange) {
      const newDate = new Date(chartDate);
      newDate.setDate(newDate.getDate() - 1);
      onDateChange(newDate);
    }
  };

  const handleNextDay = () => {
    if (chartDate && onDateChange) {
      const newDate = new Date(chartDate);
      newDate.setDate(newDate.getDate() + 1);
      onDateChange(newDate);
    }
  };

  const formatMonthDay = (date) => {
    if (!date) return "Jan 21";
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[date.getMonth()]} ${date.getDate()}`;
  };

  const handleDownload = () => {
    console.log("Download chart");
  };

  const handleExport = () => {
    console.log("Export chart");
  };

  const handleRefresh = () => {
    console.log("Refresh chart");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-[95vw] h-[90vh] max-h-[90vh] flex flex-col p-4">
        <DialogHeader className="pb-3 px-5">
          <div className="flex flex-col gap-3 p-2">
            <div className="flex items-center justify-between gap-4 w-full min-w-0">
              <DialogTitle className="text-xl font-semibold whitespace-nowrap">{title}</DialogTitle>
              <div className="flex items-center gap-3 min-w-0">
                {/* Date Navigation */}
                {chartDate && onDateChange && (
                  <div className="flex items-center gap-1 text-sm whitespace-nowrap">
                    <button
                      onClick={handlePrevDay}
                      className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                      aria-label="Previous day"
                    >
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M15 19l-7-7 7-7"></path>
                      </svg>
                    </button>
                    <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
                      {formatMonthDay(chartDate)}
                    </span>
                    <button
                      onClick={handleNextDay}
                      className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                      aria-label="Next day"
                    >
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                )}
                
                {/* Time Range Tabs */}
                {/* {timeRangeOptions && <TimeRangeTabs options={timeRangeOptions} />} */}
                {timeRangeOptions && (
                  <div className="hidden sm:flex">
                    <TimeRangeTabs options={timeRangeOptions} />
                  </div>
                )}
                
                {/* Utility Icons */}
                <div className="flex items-center gap-2">
                  {/* Calendar Icon */}
                  {chartDate && onDateChange && (
                    <div className="relative" ref={calendarRef}>
                      <button
                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        aria-label="Pick a date"
                        title="Pick a date"
                      >
                        <svg
                          className="w-5 h-5 text-gray-600"
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
                      {isCalendarOpen && (
                        <div
                          ref={popoverRef}
                          className="absolute right-0 top-full mt-2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3"
                        >
                          <Calendar
                            selected={chartDate}
                            onSelect={(selectedDate) => {
                              if (selectedDate) {
                                onDateChange(selectedDate);
                                setIsCalendarOpen(false);
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Refresh Icon */}
                  <button
                    onClick={handleRefresh}
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                    aria-label="Refresh"
                    title="Refresh"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                  </button>
                  
                  {/* Download Icon */}
                  <button
                    onClick={handleDownload}
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                    aria-label="Download"
                    title="Download"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                  </button>
                  
                  {/* Export Icon */}
                  <button
                    onClick={handleExport}
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                    aria-label="Export"
                    title="Export"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* Zoom Controls - Moved to separate row */}
            <div className="flex items-center justify-end w-full">
              <div className="flex items-center gap-1 border border-gray-300 rounded p-0.5">
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Zoom in"
                  title="Zoom in"
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"></path>
                  </svg>
                </button>
                <button
                  onClick={handleZoomReset}
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Reset zoom"
                  title="Reset zoom"
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </button>
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Zoom out"
                  title="Zoom out"
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          <div className="flex-1 w-full border border-gray-200 rounded bg-white p-4 min-h-0 flex flex-col">
            <div className="w-full h-full min-w-0 min-h-0 overflow-hidden">
              <SimpleLineChart series={series} zoom={zoom} xLabel={xLabel} yLabel={yLabel} className="w-full h-full" />
            </div>
          </div>
          {legend && legend.length > 0 && (
            <div className="flex items-center gap-4 mt-2 pt-2 border-t border-gray-200 flex-shrink-0 text-sm text-gray-600">
              {legend.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "w-2.5 h-2.5 rounded-full",
                      getColorClass(item.color)
                    )}
                  />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const MonitorDashboard = ({ onNavigateToInsights }) => {
  const [derScheduleDate, setDerScheduleDate] = React.useState(new Date("2026-01-20"));
  const [controlListDate, setControlListDate] = React.useState(new Date("2026-01-20"));
  const [selectedDer, setSelectedDer] = React.useState("all");
  const [powerExpanded, setPowerExpanded] = React.useState(false);
  const [voltageExpanded, setVoltageExpanded] = React.useState(false);
  const [powerDate, setPowerDate] = React.useState(new Date("2026-01-21"));
  const [voltageDate, setVoltageDate] = React.useState(new Date("2026-01-21"));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-10xl mx-auto space-y-6">
        {/* Page title */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-900">
            Sites Dashboard
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 min-w-0">

          {/* ───────────── TOP 4 CARDS ───────────── */}

          <SectionCard
            title="Site Details"
            rightContent={
              <Button
                onClick={onNavigateToInsights}
                variant="outline"
                size="sm"
                className="text-sm px-2 py-1 rounded-full font-medium border-[#155eef] bg-[#155eef] text-white"
              >
                Switch Site
              </Button>
            }
          >
            <div className="space-y-2">
              <SiteDetailRow icon={<NameIcon />} label="Name" value="cfvg" />
              <SiteDetailRow icon={<TypeIcon />} label="Type" value="N/A" />
              <SiteDetailRow icon={<LocationIcon />} label="Location" value="N/A" />
              <SiteDetailRow icon={<LocationIcon />} label="DER Type" value="N/A" />
            </div>
          </SectionCard>

          <SectionCard title="Generation Capacity">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-6 h-full">
              <div>
                <div className="text-[11px] uppercase text-gray-500">Total</div>
                <div className="text-xl font-semibold">0 kW</div>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#155eef]" />
                  Energised 0 kW
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#60a5fa]" />
                  De-energised 0 kW
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                  Reserved 0 kW
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Network">
            <SiteDetailRow
              icon={<LocationIcon />}
              label="Phase Connected"
              value="Phase B"
            />
          </SectionCard>

          <SectionCard
            title="Insights"
            rightContent={
              <button
                onClick={onNavigateToInsights}
                className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                aria-label="Navigate to Insights"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            }
          >
            <div className="space-y-2">
              <SiteDetailRow icon={<PowerIcon />} label="DHCI Max" value="0.0 kVA" />
              <SiteDetailRow icon={<PowerIcon />} label="DHCI Min" value="0.0 kVA" />
              <SiteDetailRow icon={<EvIcon />} label="EV Charge Events" value="N/A" />
            </div>
          </SectionCard>

          {/* ───────────── POWER (SPANS 2 COLS) ───────────── */}
          <div className="col-span-full xl:col-span-2">
            <SectionCard
              title="Power"
              rightContent={
                <TimeRangeTabs
                  options={[
                    { label: "Today", value: "today" },
                    { label: "Last Week", value: "week" },
                    { label: "Last Month", value: "month" },
                  ]}
                />
              }
              onExpand={() => setPowerExpanded(true)}
            >
              <EmptyChart
                legend={[
                  { label: "Phase A", color: "#111827" },
                  { label: "Phase B", color: "#ef4444" },
                  { label: "Phase C", color: "#3b82f6" },
                ]}
                series={POWER_SERIES}
                yLabel="Power (kW)"
              />
            </SectionCard>
          </div>

          {/* ───────────── VOLTAGE (SPANS 2 COLS) ───────────── */}
          <div className="col-span-full xl:col-span-2">
            <SectionCard
              title="Voltage Profile"
              rightContent={
                <TimeRangeTabs
                  options={[
                    { label: "Today", value: "today" },
                    { label: "Last Week", value: "week" },
                    { label: "Last Month", value: "month" },
                  ]}
                />
              }
              onExpand={() => setVoltageExpanded(true)}
            >
              <EmptyChart
                legend={[
                  { label: "Voltage (AN)", color: "#111827" },
                  { label: "Voltage (BN)", color: "#ef4444" },
                  { label: "Voltage (CN)", color: "#3b82f6" },
                ]}
                series={VOLTAGE_SERIES}
                yLabel="Voltage (V)"
              />
            </SectionCard>
          </div>

        </div>

        {/* Expanded Chart Dialogs */}
        <ExpandedChartDialog
          open={powerExpanded}
          onOpenChange={setPowerExpanded}
          title="Power"
          timeRangeOptions={[
            { label: "Today", value: "today" },
            { label: "Last Week", value: "week" },
            { label: "Last Month", value: "month" },
          ]}
          legend={[
            { label: "Phase A", color: "#111827" },
            { label: "Phase B", color: "#ef4444" },
            { label: "Phase C", color: "#3b82f6" },
          ]}
          chartDate={powerDate}
          onDateChange={setPowerDate}
          series={POWER_SERIES}
          xLabel="Time"
          yLabel="Power (kW)"
        />

        <ExpandedChartDialog
          open={voltageExpanded}
          onOpenChange={setVoltageExpanded}
          title="Voltage Profile"
          timeRangeOptions={[
            { label: "Today", value: "today" },
            { label: "Last Week", value: "week" },
            { label: "Last Month", value: "month" },
          ]}
          legend={[
            { label: "Voltage (AN)", color: "#111827" },
            { label: "Voltage (BN)", color: "#ef4444" },
            { label: "Voltage (CN)", color: "#3b82f6" },
          ]}
          chartDate={voltageDate}
          onDateChange={setVoltageDate}
          series={VOLTAGE_SERIES}
          xLabel="Time"
          yLabel="Voltage (V)"
        />

        {/* DERs summary row */}
        <SectionCard
          title="DER's – (2)"
        >
          <DERListCard>

            <DERHeaderRow />
            <DERItemRow
              icon={<WallboxIcon className="w-5 h-5 text-gray-700"/>}
              name="Wallbox"
              status="Disconnected"
              statusColor="red"
              powerLeft="10.996 kW"
              powerRight="0 kW"
              flowText="Consuming"
              controlType="Load Limiting"
              siteDefault="70 kW"
            />

            <DERItemRow
              icon={<SunnyBoyIcon className="w-5 h-5 text-gray-700"/>}
              name="SunnyBoy"
              status="Connected"
              statusColor="green"
              powerLeft="0 kW"
              powerRight="6 kW"
              controlType="Gen Limiting"
              siteDefault="--"
            />

          </DERListCard>
        </SectionCard>


        {/* DER Schedules */}
        <SectionCard
          title="DER Schedules"
          rightContent={
            <DatePickerButton
              date={derScheduleDate}
              onDateChange={setDerScheduleDate}
            />
          }
        >
          <div className="py-10 text-center text-sm text-gray-500">
            No schedules for this date.
          </div>
        </SectionCard>

        {/* Control List */}
        <SectionCard
          title="Control List"
          rightContent={
            <div className="flex items-center gap-6 text-sm text-gray-700">
              <Select value={selectedDer} onValueChange={setSelectedDer}>
                <SelectTrigger className="w-[140px] h-9 text-sm border-gray-300">
                  <SelectValue placeholder="Select DER" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="der1">DER 1</SelectItem>
                  <SelectItem value="der2">DER 2</SelectItem>
                  <SelectItem value="der3">DER 3</SelectItem>
                </SelectContent>
              </Select>
              <DatePickerButton
                date={controlListDate}
                onDateChange={setControlListDate}
              />
            </div>
          }
        >
          <div className="mt-4 border-t border-gray-200" />

          {/* Table Header */}
          <div className="grid grid-cols-7 gap-4 px-4 py-3 text-xs font-medium text-gray-500">
            <div>Sl No</div>
            <div>DER</div>
            <HeaderCheckboxDropdown
              label="Function"
              options={[
                "Select All",
                "Connect / Disconnect",
                "Gen Limiting",
                "Load Limiting",
                "Target Watt",
                "Volt-Var",
              ]}
            />
            <div>Value</div>
            <div>Start Time</div>
            <div>End Time</div>
            <HeaderCheckboxDropdown
              label="Status"
              align="right"
              options={[
                "Select All",
                "Active",
                "Scheduled"
              ]}
            />
              
          </div>

          <div className="border-t border-gray-200" />

          {/* Empty State */}
          <div className="py-10 text-center text-sm text-gray-500">
            No controls found for this date.
          </div>

        </SectionCard>
      </div>
    </div>
  );
};

export default MonitorDashboard;

