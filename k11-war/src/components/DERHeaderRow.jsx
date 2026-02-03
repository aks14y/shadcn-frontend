import React from "react";

const DERHeaderRow = () => (
  <div className="hidden lg:flex items-center gap-4 px-4 text-sm font-medium text-gray-700">
    {/* DER Info spacer */}
    <div className="w-[420px]" />

    {/* Active Controls header */}
    <div className="w-[320px] text-center">
      Active Controls
    </div>

    {/* Site Default header */}
    <div className="w-[200px] text-right">
      Site Default
    </div>
  </div>
);

// const DERHeaderRow = () => (
//   <div className="hidden sm:flex items-center gap-4 px-4 text-sm font-medium text-gray-700">
//     <div className="w-[420px]" />
//     <div className="w-[320px] font-bold text-center">Active Controls</div>
//     <div className="w-[160px] font-bold text-right">Site Default</div>
//   </div>
// );

export default DERHeaderRow;
