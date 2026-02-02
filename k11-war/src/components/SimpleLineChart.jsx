import React from "react";
import ReactECharts from "echarts-for-react";
import { cn } from "../design-system/utils/utils";

export const SimpleLineChart = ({ series, zoom = 1, xLabel, yLabel, className, startDate = undefined, endDate = undefined   }) => {
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

  // Create color map for tooltip
  const colorMap = {};
  truncatedSeries.forEach((serie) => {
    colorMap[serie.label] = serie.color;
  });

  const option = {
    grid: {
      left: "8%",
      right: "8%",
      top: "8%",
      bottom: "8%",
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
          color: "#374151",
          width: 2.5,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#f3f4f6",
          type: "solid",
        },
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
          color: "#374151",
          width: 2.5,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#f3f4f6",
          type: "solid",
        },
      },
    },
    series: truncatedSeries.map((serie) => ({
      name: serie.label,
      type: "line",
      data: serie.data.map((p) => p.y),
      smooth: 0.3,
      symbol: "circle",
      symbolSize: 5,
      itemStyle: {
        color: serie.color,
        borderColor: serie.color,
        borderWidth: 2,
      },
      lineStyle: {
        color: serie.color,
        width: 2.5,
        type: "dotted",
      },
      areaStyle: {
        color: serie.color,
        opacity: 0.08,
      },
    })),
tooltip: {
  trigger: "axis",
  backgroundColor: "#ffffff",
  borderColor: "#e5e7eb",
  borderWidth: 1,
  padding: 12,
  extraCssText: 'box-shadow: 0 2px 8px rgba(0,0,0,0.1);',
  textStyle: {
    color: "#000000",
    fontSize: 12,
  },
  axisPointer: {
    type: "line",
    lineStyle: {
      color: "#d1d5db",
      width: 1,
      type: "dashed",
    },
  },
  formatter: (params) => {
    if (!Array.isArray(params) || params.length === 0) return "";
    
    const dataIndex = params[0].dataIndex;
    
    // Calculate actual date based on startDate and endDate if provided
    let dateStr;
    if (startDate && endDate) {
      const totalPoints = truncatedSeries[0]?.data.length || 1;
      const startTime = new Date(startDate).getTime();
      const endTime = new Date(endDate).getTime();
      const timeRange = endTime - startTime;
      const pointTime = startTime + (dataIndex / (totalPoints - 1)) * timeRange;
      const dataDate = new Date(pointTime);
      
      dateStr = dataDate.toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }) + ', ' + dataDate.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      });
    } else {
      // Fallback to index-based calculation
      const now = new Date();
      const dataDate = new Date(now.getTime() - (100 - dataIndex) * 15 * 60000);
      dateStr = dataDate.toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }) + ', ' + dataDate.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      });
    }
    
    // Use Unicode circle character instead of HTML/CSS
    let tooltip = dateStr + '<br/><br/>';
    
    params.forEach((item) => {
      const seriesColor = truncatedSeries[item.seriesIndex]?.color || '#000';
    // console.log(seriesColor);
    // cant apply color for the dot due to CSP
      tooltip += '<span class=>●</span> ' + item.seriesName + ': ' + item.value + '<br/>';
    });
    
    tooltip += '<br/>Quality: 100%';
    
    return tooltip;
  },
},
    animation: true,
    animationDuration: 800,
  };

  return (
    <div className={cn("w-full h-full relative", className)}>
      {yLabel && (
        <div className="absolute left-2 top-1/2 -rotate-90 text-xs text-gray-600 whitespace-nowrap z-10" style={{ transformOrigin: 'center left', transform: 'rotate(-90deg) translateX(-50%)' }}>
          {yLabel}
        </div>
      )}
      <ReactECharts
        option={option}
        style={{ width: "100%", height: "100%" }}
        opts={{ renderer: "svg" }}
      />
      {xLabel && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs text-gray-600">
          {xLabel}
        </div>
      )}
    </div>
  );
};

