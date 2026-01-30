import React from "react";
import { Card } from "../design-system/components";
import { Button } from "../design-system/components";
import { cn } from "../design-system/utils/utils";

const InfoCard = ({ 
  title, 
  value, 
  icon, 
  showSwitchButton = false,
  onSwitchClick,
  className 
}) => {
  return (
    // InfoCard layout container
    <Card className={cn("w-full max-w-[360px] sm:max-w-full min-h-[100px] h-auto overflow-hidden shadow-md hover:shadow-lg transition-shadow", className)}>
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-base sm:text-lg font-bold break-words">{title}</h3>
          {icon && (
            <div className=" shrink-0">
              {React.cloneElement(icon, { className: "w-6 h-6 sm:w-7 sm:h-7" })}
            </div>
          )}
        </div>

        <div className="mb-2 flex items-center justify-between gap-4"> 
          <p className="text-xl sm:text-2xl font-semibold text-[#0040c1] break-words">{value || "--"}</p>
          {/*  */}
           {showSwitchButton && (
          <div className="shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={onSwitchClick}
              className="text-xs sm:text-sm bg-[#155eef] rounded-full text-white hover:bg-[#0040c1] "
            >
              Switch DT
            </Button>
          </div>
        )}


          {/*  */}
         
        </div>
        
        
      </div>
    </Card>
  );
};

export default InfoCard;
