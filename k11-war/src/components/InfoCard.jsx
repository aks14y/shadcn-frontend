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
    <Card className={cn("w-[27vw] h-[20vh] ", className)}>
      <div className="">
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-lg font-bold">{title}</h3>
          {icon && (
            <div className="text-gray-400">
              {icon}
            </div>
          )}
        </div>

        <div className="mb-2 flex items-center justify-between "> 
          <p className="text-2xl font-semibold  text-[#0040c1]">{value || "--"}</p>
          {/*  */}
           {showSwitchButton && (
          <div className="  ">
            <Button
              variant="outline"
              size="sm"
              onClick={onSwitchClick}
              className="text-sm bg-[#155eef] rounded-full text-white hover:bg-[#0040c1] "
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
