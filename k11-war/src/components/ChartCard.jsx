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
    <Card className={cn("w-full", className)}>
      <div className="p-[16px]">
        <div className="flex items-start justify-between mb-6">
         <div>
           <h3 className="text-l font-bold text-lg">{title}</h3>
         </div>
          
          {/*  */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="inline-flex rounded-full border border-[#155eef] bg-white h-[32px]">
              {timeRangeButtons.map((button, index) => (
                <button
                  key={button.value}
                  onClick={() => setSelectedTimeRange(button.value)}
                  className={cn(
                    "px-4 py-1.5 text-xs font-medium transition-colors first:rounded-l-full last:rounded-r-full whitespace-nowrap h-full",
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
                className="p-2 hover:bg-gray-100 rounded transition-colors"
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
        <div className="text-sm text-gray-600">
          {title === "DT Spare Capacity" ? "kW/kVA" : title === "Voltage" ? "Volts" : null}
        </div>

        {/* Chart Area */}
        <div className="w-full h-80 bg-white border border-gray-200 rounded-lg p-6 flex flex-col">
          {children || (series && series.length > 0 ? (
            <SimpleLineChart 
              series={series} 
              xLabel="Time"
              yLabel={title === "DT Spare Capacity" ? "Capacity (kW/kVA)" : title === "Power" ? "Power (kW)" : "Voltage (V)"}
            />
          ) : (
            <div className="text-gray-400 text-sm flex items-center justify-center h-full">Chart will be rendered here</div>
          ))}
        </div>

        {/* Legend */}
        {legend.length > 0 && (
          <div className="flex items-center gap-6 mt-6">
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
