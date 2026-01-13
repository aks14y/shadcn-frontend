import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../utils/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef(({ 
  title, 
  description, 
  children,
  className, 
  variant,
  ...props 
}, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  >
    {title && (
      <h5 className="mb-1 font-medium leading-none tracking-tight">
        {title}
      </h5>
    )}
    {description && (
      <div className="text-sm [&_p]:leading-relaxed">
        {description}
      </div>
    )}
    {children}
  </div>
))
Alert.displayName = "Alert"

export { Alert }
