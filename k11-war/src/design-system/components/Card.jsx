import * as React from "react"
import { cn } from "../utils/utils"

const Card = React.forwardRef(({ 
  title, 
  description, 
  headerAction,
  children, 
  className,
  headerClassName,
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  >
    {title && (
      <div className={cn("flex flex-col space-y-1.5 p-6 bg-primary text-primary-foreground", headerClassName)}>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            {title}
          </h3>
          {headerAction && <div>{headerAction}</div>}
        </div>
      </div>
    )}
    <div className={cn("p-6", title && "pt-0")}>
      {description && (
        <p className="text-sm text-muted-foreground mt-2">
          {description}
        </p>
      )}
      {children}
    </div>
  </div>
))
Card.displayName = "Card"

export { Card }
