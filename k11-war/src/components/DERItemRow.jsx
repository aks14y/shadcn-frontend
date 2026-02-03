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
      {/* <div className="w-[320px] min-w-[320px]">
        <div className="flex items-center gap-6 px-4 py-2 rounded-full border text-sm whitespace-nowrap">
          <span className="font-medium">{controlType}</span>
          <span className="text-gray-500">Start : --</span>
          <span className="text-gray-500">End : --</span>
        </div>
      </div> */}
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
      {/* <div className="flex items-center gap-3 w-[140px] min-w-[140px] justify-end">
        <div className="px-7 py-4 rounded-full border bg-sky-100 text-sm font-medium">
          {siteDefault}
        </div>
        
        <DERDropdown />
      </div> */}

      <div className="lg:w-[200px] w-full flex items-center justify-between lg:justify-end gap-3 ml-9">
        <div className="px-7 py-4 rounded-full border bg-sky-100 text-sm font-medium">
            {siteDefault || "--"}
        </div>

        <DERDropdown />
        </div>
    </div>
  );
};

// const DERItemRow = ({
//   icon,
//   name,
//   status,
//   statusColor, // "green" | "red"
//   powerLeft,
//   powerRight,
//   flowText,
//   controlType,
//   siteDefault,
// }) => {
//   return (
//     <div className="flex items-center justify-between gap-6 px-4 py-3">
      
//       {/* LEFT: Icon + Name + Status */}
//       <div className="flex items-center gap-4 min-w-[260px]">
//         <div className="h-10 w-10 rounded-full border flex items-center justify-center">
//           {icon}
//         </div>

//         <div>
//           <div className="flex items-center gap-2">
//             <span className="font-medium text-blue-600">{name}</span>

//             {/* Status */}
//             <span
//               className={`
//                 inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full
//                 ${statusColor === "green"
//                   ? "bg-green-50 text-green-600"
//                   : "bg-red-50 text-red-600"}
//               `}
//             >
//               <span
//                 className={`h-2 w-2 rounded-full ${
//                   statusColor === "green" ? "bg-green-500" : "bg-red-500"
//                 }`}
//               />
//               {status}
//             </span>
//           </div>

//           <div className="text-sm text-gray-700">
//             <span className="font-medium">{powerLeft}</span>
//             <span className="mx-1 text-gray-400">/</span>
//             <span className="text-gray-500">{powerRight}</span>
//             {flowText && (
//               <span className="ml-2 text-red-500">{flowText}</span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* MIDDLE: Active Control */}
//       <div className="flex items-center gap-6 flex-1 justify-center">
//         <div className="px-4 py-2 rounded-full border text-sm text-gray-700 min-w-[260px]">
//           <span className="font-medium">{controlType}</span>
//           <span className="ml-6 text-gray-500">Start : --</span>
//           <span className="ml-4 text-gray-500">End : --</span>
//         </div>
//       </div>

//       {/* RIGHT: Site Default */}
//       <div className="flex items-center gap-3 min-w-[140px] justify-end">
//         <div className="px-4 py-2 rounded-full bg-sky-100 text-sm font-medium">
//           {siteDefault}
//         </div>
//         <span className="text-gray-400">{">"}</span>
//       </div>
//     </div>
//   );
// };



// const DERItemRow = ({
//   icon,
//   name,
//   status,
//   statusColor,
//   currentKw,
//   maxKw,
//   mode,
//   activeControlLabel,
//   startTime = "--",
//   endTime = "--",
//   siteDefault,
// }) => {
//   return (
//     <div className="flex flex-col xl:flex-row gap-4 items-stretch border border-gray-200 rounded-full px-4 py-3">

//       {/* LEFT: DER INFO */}
//       <div className="flex items-center gap-4 flex-[2] min-w-0">
//         <div className="w-9 h-9 flex items-center justify-center rounded-full border">
//           {icon}
//         </div>

//         <div className="min-w-0">
//           <div className="flex items-center gap-2">
//             <span className="font-semibold text-blue-600 truncate">
//               {name}
//             </span>

//             <span
//               className={cn(
//                 "text-xs px-2 py-0.5 rounded-full border",
//                 statusColor === "green" &&
//                   "bg-green-50 text-green-700 border-green-200",
//                 statusColor === "red" &&
//                   "bg-red-50 text-red-600 border-red-200"
//               )}
//             >
//               {status}
//             </span>
//           </div>

//           <div className="flex items-center gap-3 text-sm text-gray-700 mt-1">
//             <span className="font-medium">
//               {currentKw} kW
//             </span>
//             <span className="text-gray-400">/</span>
//             <span className="text-gray-500">
//               {maxKw} kW
//             </span>

//             {mode && (
//               <span className="flex items-center gap-1 text-red-600 text-sm">
//                 {mode}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* CENTER: ACTIVE CONTROLS */}
//       <div className="flex-[2] flex items-center justify-between border border-gray-200 rounded-full px-4 py-2 text-sm">
//         <span className="font-medium text-gray-800">
//           {activeControlLabel}
//         </span>

//         <div className="flex items-center gap-6 text-gray-500">
//           <span>Start : {startTime}</span>
//           <span>End : {endTime}</span>
//         </div>
//       </div>

//       {/* RIGHT: SITE DEFAULT */}
//       <div className="flex items-center gap-2 flex-[1] justify-end">
//         <div className="px-5 py-2 rounded-full bg-sky-100 text-sm font-semibold text-gray-900 min-w-[80px] text-center">
//           {siteDefault}
//         </div>

//         <button className="p-1 rounded hover:bg-gray-100">
//           <svg
//             className="w-4 h-4 text-gray-600"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//           >
//             <path d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

export default DERItemRow;
