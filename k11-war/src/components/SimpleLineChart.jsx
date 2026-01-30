import React from "react";
import ReactECharts from "echarts-for-react";
import { cn } from "../design-system/utils/utils";

export const SimpleLineChart = ({ series, zoom = 1, xLabel, yLabel, className }) => {
  const maxPoints = Math.max(...series.map((s) => s.data.length));
  const visiblePoints = Math.max(4, Math.floor(maxPoints / zoom));

  const truncatedSeries = series.map((s) => ({
    ...s,
    data: s.data.slice(0, visiblePoints),
  }));

  // Convert data format for ECharts
  const xAxisData = truncatedSeries[0]?.data.map((_, index) => index) || [];
  const allYValues = truncatedSeries.flatMap((s) => s.data.map((p) => p.y));
  const minY = Math.min(...allYValues);
  const maxY = Math.max(...allYValues);

  // Add padding to keep lines within axis boundaries, ensure no zero values
  const yRange = maxY - minY;
  const yAxisMin = Math.max(0, minY - yRange * 0.05); // Add padding below, but don't go below 0
  const yAxisMax = maxY + yRange * 0.05; // 5% padding above

  const option = {
    grid: {
      left: "5%",
      right: "5%",
      top: "5%",
      bottom: "5%",
      containLabel: false,
    },
    xAxis: {
      type: "category",
      data: xAxisData,
      show: true,
      boundaryGap: false,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#d1d5db",
          width: 1,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      show: true,
      min: yAxisMin,
      max: yAxisMax,
      scale: false,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#d1d5db",
          width: 1,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    series: truncatedSeries.map((serie) => ({
      name: serie.label,
      type: "line",
      data: serie.data.map((p) => p.y),
      smooth: false,
      symbol: "none",
      lineStyle: {
        color: serie.color,
        width: 1.2,
      },
      areaStyle: {
        opacity: 0,
      },
    })),
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
      },
    },
    animation: false,
  };

  return (
    <div className={cn("w-full h-full min-w-0 relative", className)}>
      {yLabel && (
        <div className="absolute -left-1 sm:-left-3 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-xs text-gray-600 whitespace-nowrap z-10 pb-3">
          {yLabel}
        </div>
      )}
      <ReactECharts
        option={option}
        style={{ width: "100%", height: "100%" }}
        opts={{ renderer: "svg" }}
      />
      {xLabel && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-600">
          {xLabel}
        </div>
      )}
    </div>
  );
};

