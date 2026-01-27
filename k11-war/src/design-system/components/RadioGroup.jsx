import * as React from "react"
import { useRadioGroup, useRadio } from "@react-aria/radio"
import { useRadioGroupState } from "@react-stately/radio"
import { cn } from "../utils/utils"

const RadioGroup = React.forwardRef(({ className, label, orientation = "vertical", children, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, ...props }, ref) => {
  const state = useRadioGroupState(props)
  
  // Ensure we have either a label or aria-label/aria-labelledby for accessibility
  const { radioGroupProps, labelProps } = useRadioGroup(
    { 
      ...props, 
      label: label || undefined,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
    }, 
    state
  )

  // Clone children to pass state as prop
  const childrenWithState = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { state, orientation })
    }
    return child
  })

  return (
    <div
      ref={ref}
      {...radioGroupProps}
      className={cn(
        orientation === "horizontal" ? "flex gap-4" : "grid gap-2",
        className
      )}
    >
      {label && (
        <span {...labelProps} className="text-sm font-medium mb-2 block">
          {label}
        </span>
      )}
      {childrenWithState}
    </div>
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef(({ className, value, children, state, orientation, ...props }, ref) => {
  if (!state) {
    throw new Error("RadioGroupItem must be used within RadioGroup")
  }

  const isSelected = state.selectedValue === value
  const inputRef = React.useRef(null)
  const { inputProps, isDisabled } = useRadio(
    { ...props, value, children },
    state,
    inputRef
  )

  React.useImperativeHandle(ref, () => inputRef.current)

  return (
    <label
      className={cn(
        "flex items-center space-x-2 cursor-pointer",
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <input
        {...inputProps}
        ref={inputRef}
        className="sr-only"
      />
      <div
        className={cn(
          "aspect-square h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors",
          isSelected
            ? "border-primary bg-primary"
            : "border-primary",
          isDisabled && "opacity-50"
        )}
      >
        {isSelected && (
          <div className="h-2.5 w-2.5 rounded-full bg-primary-foreground" />
        )}
      </div>
      {children && (
        <span className="text-sm font-medium leading-none">
          {children}
        </span>
      )}
    </label>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

const RadioGroupItemWithLabel = React.forwardRef(({ className, label, value, disabled, ...props }, ref) => {
  return (
    <RadioGroupItem
      ref={ref}
      value={value}
      isDisabled={disabled}
      className={className}
      {...props}
    >
      {label}
    </RadioGroupItem>
  )
})
RadioGroupItemWithLabel.displayName = "RadioGroupItemWithLabel"

export { RadioGroup, RadioGroupItem, RadioGroupItemWithLabel }
