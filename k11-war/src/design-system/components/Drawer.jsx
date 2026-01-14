import * as React from "react"
import { cn } from "../utils/utils"
import { Button } from "./Button"

const DrawerContext = React.createContext({
  open: false,
  onOpenChange: () => {},
})

const Drawer = ({ open, onOpenChange, children, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(open || false)

  React.useEffect(() => {
    setIsOpen(open)
  }, [open])

  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <DrawerContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </DrawerContext.Provider>
  )
}

const DrawerTrigger = React.forwardRef(({ className, children, asChild, ...props }, ref) => {
  const { onOpenChange } = React.useContext(DrawerContext)
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: () => onOpenChange(true),
      ...props,
    })
  }
  
  return (
    <Button ref={ref} onClick={() => onOpenChange(true)} className={className} {...props}>
      {children}
    </Button>
  )
})
DrawerTrigger.displayName = "DrawerTrigger"

const DrawerContent = React.forwardRef(({ className, children, side = "right", ...props }, ref) => {
  const { open, onOpenChange } = React.useContext(DrawerContext)

  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onOpenChange(false)
      }
    }
    if (open) {
      document.addEventListener("keydown", handleEscape)
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open, onOpenChange])

  if (!open) return null

  const sideClasses = {
    right: "right-0 top-0 h-full w-[400px] border-l",
    left: "left-0 top-0 h-full w-[400px] border-r",
    top: "top-0 left-0 w-full h-[400px] border-b",
    bottom: "bottom-0 left-0 w-full h-[400px] border-t",
  }

  const animationClasses = {
    right: "animate-in slide-in-from-right",
    left: "animate-in slide-in-from-left",
    top: "animate-in slide-in-from-top",
    bottom: "animate-in slide-in-from-bottom",
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => onOpenChange(false)}
      />
      <div
        ref={ref}
        className={cn(
          "fixed z-50 bg-background shadow-lg",
          sideClasses[side],
          animationClasses[side],
          className
        )}
        {...props}
      >
        {children}
      </div>
    </>
  )
})
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-2 p-6", className)} {...props} />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = "DrawerDescription"

const DrawerFooter = ({ className, ...props }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6", className)} {...props} />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerClose = React.forwardRef(({ className, children, ...props }, ref) => {
  const { onOpenChange } = React.useContext(DrawerContext)
  return (
    <Button
      ref={ref}
      variant="ghost"
      onClick={() => onOpenChange(false)}
      className={cn("absolute right-4 top-4", className)}
      {...props}
    >
      {children || "×"}
    </Button>
  )
})
DrawerClose.displayName = "DrawerClose"

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
}
