import React from "react";
import ConsumingIcon from "./icons/ConsumingIcon";
import DERDropdown from "./DERDropdown";

const DERItemRow = ({
  icon,
  name,
  status,
  statusColor,
  powerLeft,
  powerRight,
  flowText,
  controlType,
  siteDefault,
}) => {
  return (
    <div
      className="
        flex flex-col 
        lg:flex-row
        lg:items-center
        gap-4
        px-4 py-4
        rounded-2xl
        border border-gray-200
      "
    >
      {/* COLUMN 1 — DER INFO */}
      <div className="flex items-center gap-3 lg:w-[420px] w-full">
        <div className="h-10 w-10 flex items-center justify-center shrink-0">
          {icon}
        </div>

        <div className="whitespace-nowrap">
          <div className="flex items-center gap-4 py-2 flex-wrap">
            <span className="font-medium text-blue-600">{name}</span>

            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full
                ${statusColor === "green"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"}
              `}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  statusColor === "green" ? "bg-green-500" : "bg-red-500"
                }`}
              />
              {status}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-700 flex-wrap">
            <span className="font-medium">{powerLeft}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">{powerRight}</span>

            {flowText && (
              <span className="flex items-center gap-1 text-red-500">
                <ConsumingIcon />
                {flowText}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* COLUMN 2 — ACTIVE CONTROLS */}
      <div className="lg:w-[320px] w-full">
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-6 px-4 py-2 rounded-full border whitespace-nowrap text-sm">
            <span className="font-medium">
            {controlType || "--"}
            </span>

            <div className="flex items-center gap-6 text-gray-500">
            <span>Start : --</span>
            <span>End : --</span>
            </div>
        </div>
        </div>

      {/* COLUMN 3 — SITE DEFAULT */}

      <div className="lg:w-[200px] w-full flex items-center justify-between lg:justify-end gap-3 ml-9">
        <div className="px-7 py-4 rounded-full border bg-sky-100 text-sm font-medium">
            {siteDefault || "--"}
        </div>

        <div className="relative overflow-visible">
          <DERDropdown />
        </div>
      </div>
    </div>
  );
};

export default DERItemRow;