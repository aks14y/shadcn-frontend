import React from "react";
import { Card } from "../design-system/components";
import { cn } from "../design-system/utils/utils";
import { SimpleLineChart } from "./SimpleLineChart";

// Color mapping utility for CSP compliance
const getLegendColorClass = (color) => {
  const colorMap = {
    "#0040C1": "bg-blue-700",
    "#66BB6A": "bg-green-500",
    "#673AB7": "bg-purple-600",
    "#111827": "bg-gray-900",
    "#ef4444": "bg-red-500",
    "#3b82f6": "bg-blue-500",
    "#155eef": "bg-blue-600",
    "#22c55e": "bg-green-500",
    "#60a5fa": "bg-blue-400",
  };
  return colorMap[color] || "bg-gray-500";
};

const ChartCard = ({ title, timeRangeButtons = [], legend = [], children, className, onExpand, series }) => {
  const [selectedTimeRange, setSelectedTimeRange] = React.useState(timeRangeButtons[0]?.value || "");

  return (
    <Card className={cn("w-full max-w-[360px] sm:max-w-full overflow-hidden shadow-md hover:shadow-lg transition-shadow", className)}>
      <div className="p-2 sm:p-3 min-w-0">
        <div className="flex items-center justify-between gap-2 sm:gap-4 mb-2 sm:mb-3 min-w-0">
         <div className="min-w-0 flex-shrink">
           <h3 className="text-xs sm:text-base md:text-lg font-bold">{title}</h3>
         </div>
          
          {/*  */}
          <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 xl:gap-3 flex-shrink-0">
            <div className="inline-flex rounded-full border border-[#155eef] bg-white h-[18px] sm:h-[20px] md:h-[24px] lg:h-[26px] xl:h-[32px] overflow-hidden">
              {timeRangeButtons.map((button, index) => (
                <button
                  key={button.value}
                  onClick={() => setSelectedTimeRange(button.value)}
                  className={cn(
                    "px-0.5 sm:px-1.5 md:px-2.5 lg:px-2.5 xl:px-4 py-0.5 text-[6px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-xs font-medium transition-colors first:rounded-l-full last:rounded-r-full whitespace-nowrap h-full",
                    selectedTimeRange === button.value
                      ? "bg-[#155eef] text-white"
                      : "text-[#155eef] hover:bg-blue-50",
                    index > 0 && "border-l border-[#155eef]"
                  )}
                >
                  {button.label}
                </button>
              ))}
            </div>

            {/*  */}
          
            {onExpand && (
              <button
                onClick={onExpand}
                className="p-0.5 sm:p-0.5 md:p-1 lg:p-1 xl:p-2 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                aria-label="Expand chart"
              >
                <svg
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-gray-600"
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
        <div className="text-xs sm:text-sm text-gray-600 mb-2">
          {title === "DT Spare Capacity" ? "kW/kVA" : title === "Voltage" ? "Volts" : null}
        </div>

        {/* Chart Area */}
        <div className="w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 bg-white border border-gray-200 rounded-lg p-2 sm:p-3 md:p-4 flex flex-col overflow-hidden">
          {children || (series && series.length > 0 ? (
            <SimpleLineChart 
              series={series} 
              xLabel="Time"
              yLabel={
                title === "DT Spare Capacity" 
                  ? "Capacity (kW/kVA)" 
                  : title === "Power" 
                  ? "Power (kW)" 
                  : title === "Voltage"
                  ? "Voltage (V)"
                  : ""
              }
            />
          ) : (
            <div className="text-gray-400 text-sm flex items-center justify-center h-full">Chart will be rendered here</div>
          ))}
        </div>

        {/* Legend */}
        {legend.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-2 sm:mt-3">
            {legend.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className={cn("w-3 h-3 rounded-full", getLegendColorClass(item.color))}
                />
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ChartCard;
