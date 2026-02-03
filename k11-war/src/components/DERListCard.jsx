import React from "react";

const DERListCard = ({ children }) => {
  return (
    <div
      className="
        w-full
        bg-white
        px-4
        py-3
        shadow-sm
      "
    >
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
};

export default DERListCard;
