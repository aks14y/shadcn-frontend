import React from "react";
import { Card, Button, Calendar, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Dialog, DialogContent, DialogHeader, DialogTitle } from "../design-system/components";
import { cn } from "../design-system/utils/utils";
import { SimpleLineChart } from "./SimpleLineChart";
import { POWER_SERIES, VOLTAGE_SERIES } from "../utils/chartUtils";

const TimeRangeTabs = ({ options }) => {
  const [active, setActive] = React.useState(options[0]?.value || "");

  return (
    <div className="inline-flex rounded-full bg-[#f5f5ff] p-1 text-sm font-medium">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setActive(opt.value)}
          className={cn(
            "px-4 py-1.5 rounded-full transition-colors",
            active === opt.value
              ? "bg-[#155eef] text-white"
              : "text-[#155eef]"
          )}
        >
          {opt.label}
        </button>
      ))}
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
        <div className="flex-1 border-b border-gray-200 p-6 min-h-0 rounded-lg bg-white">
          <SimpleLineChart series={series} xLabel={xLabel} yLabel={yLabel} />
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
  <Card className="w-full">
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center gap-3">
          {rightContent}
          {onExpand && (
            <button
              onClick={onExpand}
              className="p-2 rounded hover:bg-gray-100 transition-colors"
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
      {children}
    </div>
  </Card>
);

const DatePickerButton = ({ date, onDateChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dateRef = React.useRef(null);
  const popoverRef = React.useRef(null);

  React.useEffect(() => {
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

  const formatDate = (date) => {
    if (!date) return "20/01/2026";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatMonthDay = (date) => {
    if (!date) return "Jan 20";
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
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
        <button
          onClick={handlePreviousDay}
          className="p-1.5 rounded hover:bg-gray-100"
          aria-label="Previous day"
        >
          <svg
            className="w-5 h-5"
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
        <span>{formatMonthDay(date || new Date("2026-01-20"))}</span>
        <button
          onClick={handleNextDay}
          className="p-1.5 rounded hover:bg-gray-100"
          aria-label="Next day"
        >
          <svg
            className="w-5 h-5"
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
        <div className="relative">
          <button
            ref={dateRef}
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 text-sm hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-500">Pick a date</span>
            <span>{formatDate(date || new Date("2026-01-20"))}</span>
            <svg
              className="w-4 h-4 text-gray-400"
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
        <DialogHeader className="pb-3 flex-shrink-0">
          <div className="flex flex-col gap-3 p-2">
            <div className="flex items-center justify-between w-full">
              <DialogTitle className="text-2xl font-semibold">{title}</DialogTitle>
              <div className="flex items-center gap-4">
                {/* Date Navigation */}
                {chartDate && onDateChange && (
                  <div className="flex items-center gap-2">
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
                {timeRangeOptions && <TimeRangeTabs options={timeRangeOptions} />}
                
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
          <div className="flex-1 w-full border border-gray-200 rounded bg-white p-4 min-h-0 flex flex-col" style={{ minHeight: 0 }}>
            <div className="flex-1 min-h-0 w-full">
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

        {/* Top row cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SectionCard
            title="Site Details"
            rightContent={
              <Button
                variant="outline"
                size="sm"
                className="text-sm px-4 py-1.5 rounded-full border-[#155eef] text-[#155eef]"
              >
                Switch Site
              </Button>
            }
          />
          <SectionCard title="Generation Capacity">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>
                <div className="text-sm uppercase tracking-wide text-gray-500">
                  Total
                </div>
                <div className="mt-1 text-2xl font-semibold text-gray-900">
                  0 kW
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="inline-block w-3 h-3 rounded-full bg-[#155eef] mr-2" />
                  Reserved 0 kW
                </div>
                <div>
                  <span className="inline-block w-3 h-3 rounded-full bg-[#22c55e] mr-2" />
                  Running 0 kW
                </div>
                <div>
                  <span className="inline-block w-3 h-3 rounded-full bg-[#60a5fa] mr-2" />
                  Offline 0 kW
                </div>
              </div>
            </div>
          </SectionCard>
          <SectionCard title="Network" />
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
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            }
          />
        </div>

        {/* Power + Voltage row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              xLabel="Time"
              yLabel="Power (kW)"
            />
          </SectionCard>

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
              xLabel="Time"
              yLabel="Voltage (V)"
            />
          </SectionCard>
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
          title="DER's – (0)"
          rightContent={
            <div className="flex items-center gap-8 text-sm text-gray-700">
              <span>Active Controls</span>
              <span>Site Default</span>
            </div>
          }
        >
          <div className="h-10" />
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
          <div className="py-10 text-center text-sm text-gray-500">
            No controls found for this date.
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default MonitorDashboard;

