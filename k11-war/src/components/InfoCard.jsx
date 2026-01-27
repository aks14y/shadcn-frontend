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
    <Card className={cn("w-full", className)}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          {icon && (
            <div className="text-gray-400">
              {icon}
            </div>
          )}
        </div>
        <div className="mb-4">
          <p className="text-2xl font-semibold text-gray-900">{value || "--"}</p>
        </div>
        {showSwitchButton && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={onSwitchClick}
              className="text-sm"
            >
              Switch DT
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default InfoCard;
