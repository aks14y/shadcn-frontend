import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, Calendar } from "../design-system/components";
import { cn } from "../design-system/utils/utils";
import InfoCard from "./InfoCard";
import ChartCard from "./ChartCard";
import SitesTable from "./SitesTable";
import { SimpleLineChart } from "./SimpleLineChart";
import { CAPACITY_SERIES, VOLTAGE_INSIGHTS_SERIES } from "../utils/chartUtils";

const TimeRangeTabs = ({ options }) => {
  const [active, setActive] = React.useState(options[0]?.value || "");

  return (
    <div className="inline-flex rounded-lg border border-[#155eef] bg-white gap-0">
      {options.map((opt, index) => (
        <button
          key={opt.value}
          onClick={() => setActive(opt.value)}
          className={cn(
            "px-5 py-2 text-sm font-medium transition-colors first:rounded-l-lg last:rounded-r-lg flex-1 whitespace-nowrap",
            active === opt.value ? "bg-[#155eef] text-white" : "text-[#155eef] hover:bg-blue-50",
            index > 0 && "border-l border-[#155eef]"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

const ExpandedChartDialog = ({
  open,
  onOpenChange,
  title,
  timeRangeOptions,
  legend,
  series,
  xLabel,
  yLabel,
  chartDate,
  onDateChange,
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
    setZoom((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 1));
  };

  const handleReset = () => {
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
    if (!date) return "Jan 22";
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

  const formatDate = (date) => {
    if (!date) return "22/01/2026";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
        <DialogHeader className="pb-3 flex-shrink-0  pr-12">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between w-full">
              <DialogTitle className="text-2xl font-semibold">{title}</DialogTitle>
              <div className="flex items-center gap-4 flex-shrink-0 overflow-x-auto">
                {/* Date Navigation */}
                {chartDate && onDateChange && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevDay}
                      className="p-1.5 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
                      aria-label="Previous day"
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
                        <path d="M15 19l-7-7 7-7"></path>
                      </svg>
                    </button>
                    <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
                      {formatMonthDay(chartDate)}
                    </span>
                    <button
                      onClick={handleNextDay}
                      className="p-1.5 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
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
                        className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-md transition-colors duration-200"
                        aria-label="Pick a date"
                        title="Pick a date"
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
                    className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-md transition-colors duration-200"
                    aria-label="Refresh"
                    title="Refresh"
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
                      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                  </button>

                  {/* Download Icon */}
                  <button
                    onClick={handleDownload}
                    className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-md transition-colors duration-200"
                    aria-label="Download"
                    title="Download"
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
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                  </button>

                  {/* Export Icon */}
                  <button
                    onClick={handleExport}
                    className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-md transition-colors duration-200"
                    aria-label="Export"
                    title="Export"
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
                      <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* Zoom Controls - separate row */}
            <div className="flex items-center justify-end w-full">
              <div className="flex items-center gap-1 border border-gray-300 rounded-md p-0.5 bg-white shadow-sm">
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 hover:bg-gray-100 active:bg-gray-200 rounded-md transition-colors duration-200"
                  aria-label="Zoom in"
                  title="Zoom in"
                >
                  <svg
                    className="w-4 h-4 text-gray-600 hover:text-gray-800 transition-colors"
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
                  onClick={handleReset}
                  className="p-1.5 hover:bg-gray-100 active:bg-gray-200 rounded-md transition-colors duration-200"
                  aria-label="Reset zoom"
                  title="Reset zoom"
                >
                  <svg
                    className="w-4 h-4 text-gray-600 hover:text-gray-800 transition-colors"
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
                  className="p-1.5 hover:bg-gray-100 active:bg-gray-200 rounded-md transition-colors duration-200"
                  aria-label="Zoom out"
                  title="Zoom out"
                >
                  <svg
                    className="w-4 h-4 text-gray-600 hover:text-gray-800 transition-colors"
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
              <SimpleLineChart
                series={series}
                zoom={zoom}
                xLabel={xLabel}
                yLabel={yLabel}
                className="w-full h-full"
              />
            </div>
          </div>
          {legend && legend.length > 0 && (
            <div className="flex items-center gap-4 mt-2 pt-2 border-t border-gray-200 flex-shrink-0">
              {legend.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full",
                      item.color === "#0040C1"
                        ? "bg-blue-700"
                        : item.color === "#66BB6A"
                        ? "bg-green-500"
                        : item.color === "#673AB7"
                        ? "bg-purple-600"
                        : "bg-gray-500"
                    )}
                  />
                  <span className="text-sm text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const InsightsDashboard = () => {
  const [selectedView, setSelectedView] = useState("DT");
  const [capacityExpanded, setCapacityExpanded] = useState(false);
  const [voltageExpanded, setVoltageExpanded] = useState(false);
  const [capacityDate, setCapacityDate] = useState(new Date("2026-01-22"));
  const [voltageDate, setVoltageDate] = useState(new Date("2026-01-22"));

  const dtInfo = {
    name: "DT-001",
    capacity: "500 kVA",
    location: "San Francisco, CA",
  };

  const sitesTableColumns = [
    { header: "Site Name", accessor: "siteName" },
    { header: "Meter ID", accessor: "meterId" },
    { header: "Received Time", accessor: "receivedTime" },
    { header: "P@VMax (kW)", accessor: "pVmax" },
    { header: "Q@VMax (kVAR)", accessor: "qVmax" },
    { header: "VMax", accessor: "vMax" },
    { header: "Generation Capacity (kW)", accessor: "capacity" },
    { header: "DER Type", accessor: "siteType" },
  ];

  const sitesTableData = [
    {
      siteName: "Site Alpha",
      meterId: "MTR-001234",
      receivedTime: "2026-01-21 14:32:15",
      pVmax: "125.5",
      qVmax: "45.2",
      vMax: "240.8",
      capacity: "500",
      siteType: "Solar PV",
    },
    {
      siteName: "Site Beta",
      meterId: "MTR-001235",
      receivedTime: "2026-01-21 14:31:42",
      pVmax: "98.3",
      qVmax: "32.1",
      vMax: "238.5",
      capacity: "400",
      siteType: "Wind",
    },
    {
      siteName: "Site Gamma",
      meterId: "MTR-001236",
      receivedTime: "2026-01-21 14:30:18",
      pVmax: "156.7",
      qVmax: "52.8",
      vMax: "242.1",
      capacity: "600",
      siteType: "Solar PV",
    },
    {
      siteName: "Site Delta",
      meterId: "MTR-001237",
      receivedTime: "2026-01-21 14:29:55",
      pVmax: "87.2",
      qVmax: "28.9",
      vMax: "237.3",
      capacity: "350",
      siteType: "Battery Storage",
    },
    {
      siteName: "Site Epsilon",
      meterId: "MTR-001238",
      receivedTime: "2026-01-21 14:28:33",
      pVmax: "142.9",
      qVmax: "48.6",
      vMax: "241.2",
      capacity: "550",
      siteType: "Solar PV",
    },
    {
      siteName: "Site Zeta",
      meterId: "MTR-001239",
      receivedTime: "2026-01-21 14:27:10",
      pVmax: "112.4",
      qVmax: "38.4",
      vMax: "239.7",
      capacity: "450",
      siteType: "Wind",
    },
    {
      siteName: "Site Eta",
      meterId: "MTR-001240",
      receivedTime: "2026-01-21 14:26:47",
      pVmax: "134.6",
      qVmax: "44.3",
      vMax: "240.5",
      capacity: "520",
      siteType: "Solar PV",
    },
    {
      siteName: "Site Theta",
      meterId: "MTR-001241",
      receivedTime: "2026-01-21 14:25:22",
      pVmax: "103.8",
      qVmax: "35.7",
      vMax: "238.9",
      capacity: "420",
      siteType: "Battery Storage",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 overflow-x-hidden">
      <div className="max-w-10xl mx-auto w-full min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <h1 className="text-3xl font-sans font-semibold text-[#0040c1]">Insights</h1>
            {/*  */}
            <div className="inline-flex rounded border border-[#155eef] bg-white">
              <button
                onClick={() => setSelectedView("DT")}
                className={cn(
                  "px-6 py-2 text-sm font-medium transition-colors first:rounded-l last:rounded-r whitespace-nowrap",
                  selectedView === "DT"
                    ? "bg-[#155eef] text-white"
                    : "text-[#155eef] hover:bg-blue-50"
                )}
              >
                DT
              </button>
              <button
                onClick={() => setSelectedView("Site")}
                className={cn(
                  "px-6 py-2 text-sm font-medium transition-colors first:rounded-l last:rounded-r whitespace-nowrap",
                  selectedView === "Site"
                    ? "bg-[#155eef] text-white"
                    : "text-[#155eef] hover:bg-blue-50"
                )}
              >
                Site
              </button>
            </div>
            {/*  */}
          </div>
        </div>

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <InfoCard
            title="DT Name"
            value={dtInfo.name}
            className={""}
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
            }
            showSwitchButton={true}
            onSwitchClick={() => console.log("Switch DT clicked")}
          />
          <InfoCard
            title="Capacity"
            value={dtInfo.capacity}
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
              </svg>
            }
          />
          <InfoCard
            title="Location"
            value={dtInfo.location}
            icon={
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path>
              </svg>
            }
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ChartCard
            title="DT Spare Capacity"
            timeRangeButtons={[
              { label: "Last 24 Hours", value: "day" },
              { label: "Last Week", value: "week" },
              { label: "Last Month", value: "month" },
            ]}
            legend={[
              { label: "kW", color: "#0040C1" },
              { label: "kVA", color: "#66BB6A" },
            ]}
            onExpand={() => setCapacityExpanded(true)}
            series={CAPACITY_SERIES}
          />
          <ChartCard
            title="Voltage"
            timeRangeButtons={[
              { label: "Last 24 Hours", value: "day" },
              { label: "Last Week", value: "week" },
              { label: "Last Month", value: "month" },
            ]}
            legend={[{ label: "Voltage (Vmax Average)", color: "#673AB7" }]}
            onExpand={() => setVoltageExpanded(true)}
            series={VOLTAGE_INSIGHTS_SERIES}
          />
        </div>

        {/* Expanded Chart Dialogs */}
        <ExpandedChartDialog
          open={capacityExpanded}
          onOpenChange={setCapacityExpanded}
          title="DT Spare Capacity"
          timeRangeOptions={[
            { label: "Last 24 Hours", value: "day" },
            { label: "Last Week", value: "week" },
            { label: "Last Month", value: "month" },
          ]}
          legend={[
            { label: "kW", color: "#0040C1" },
            { label: "kVA", color: "#66BB6A" },
          ]}
          series={CAPACITY_SERIES}
          xLabel="Time"
          yLabel="Capacity (kW/kVA)"
          chartDate={capacityDate}
          onDateChange={setCapacityDate}
        />

        <ExpandedChartDialog
          open={voltageExpanded}
          onOpenChange={setVoltageExpanded}
          title="Voltage"
          timeRangeOptions={[
            { label: "Last 24 Hours", value: "day" },
            { label: "Last Week", value: "week" },
            { label: "Last Month", value: "month" },
          ]}
          legend={[{ label: "Voltage (Vmax Average)", color: "#673AB7" }]}
          series={VOLTAGE_INSIGHTS_SERIES}
          xLabel="Time"
          yLabel="Voltage (V)"
          chartDate={voltageDate}
          onDateChange={setVoltageDate}
        />

        {/* Sites Table */}
        <SitesTable title="Sites List" columns={sitesTableColumns} data={sitesTableData} />
      </div>
    </div>
  );
};

export default InsightsDashboard;

