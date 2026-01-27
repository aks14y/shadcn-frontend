import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "../utils/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = React.forwardRef(({ className, ...props }, ref) => {
  const internalRef = React.useRef(null)
  const combinedRef = React.useCallback((node) => {
    internalRef.current = node
    if (typeof ref === 'function') {
      ref(node)
    } else if (ref) {
      ref.current = node
    }
  }, [ref])

  React.useEffect(() => {
    if (internalRef.current) {
      // Remove inline style attribute to maintain CSP compliance
      const removeInlineStyles = () => {
        if (internalRef.current && internalRef.current.hasAttribute('style')) {
          internalRef.current.removeAttribute('style')
        }
        // Also check for span elements inside (Radix sometimes wraps content)
        const span = internalRef.current.querySelector('span')
        if (span && span.hasAttribute('style')) {
          span.removeAttribute('style')
        }
      }
      
      // Remove immediately
      removeInlineStyles()
      
      // Use MutationObserver to catch when Radix adds the style attribute
      const observer = new MutationObserver(() => {
        removeInlineStyles()
      })
      
      observer.observe(internalRef.current, {
        attributes: true,
        attributeFilter: ['style'],
        subtree: true
      })
      
      return () => observer.disconnect()
    }
  }, [])

  return (
    <SelectPrimitive.Value
      ref={combinedRef}
      className={cn("pointer-events-none", className)}
      {...props}
    />
  )
})
SelectValue.displayName = SelectPrimitive.Value.displayName

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const internalRef = React.useRef(null)
  const combinedRef = React.useCallback((node) => {
    internalRef.current = node
    if (typeof ref === 'function') {
      ref(node)
    } else if (ref) {
      ref.current = node
    }
  }, [ref])

  React.useEffect(() => {
    if (internalRef.current) {
      // Remove inline style attributes from trigger and its children for CSP compliance
      const removeInlineStyles = () => {
        if (internalRef.current) {
          // Remove from trigger itself
          if (internalRef.current.hasAttribute('style')) {
            internalRef.current.removeAttribute('style')
          }
          // Remove from all span elements inside (including SelectValue)
          const spans = internalRef.current.querySelectorAll('span')
          spans.forEach(span => {
            if (span.hasAttribute('style')) {
              span.removeAttribute('style')
            }
          })
        }
      }
      
      // Remove immediately
      removeInlineStyles()
      
      // Use MutationObserver to catch when Radix adds style attributes
      const observer = new MutationObserver(() => {
        removeInlineStyles()
      })
      
      observer.observe(internalRef.current, {
        attributes: true,
        attributeFilter: ['style'],
        subtree: true
      })
      
      return () => observer.disconnect()
    }
  }, [])

  return (
    <SelectPrimitive.Trigger
      ref={combinedRef}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 [&>span]:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => {
  const internalRef = React.useRef(null)
  const viewportRef = React.useRef(null)
  const combinedRef = React.useCallback((node) => {
    internalRef.current = node
    if (typeof ref === 'function') {
      ref(node)
    } else if (ref) {
      ref.current = node
    }
  }, [ref])

  React.useEffect(() => {
    if (internalRef.current) {
      // Remove ALL inline styles for strict CSP compliance (similar to Accordion approach)
      const removeAllInlineStyles = (element) => {
        if (element && element.hasAttribute('style')) {
          element.removeAttribute('style')
        }
      }
      
      const removeInlineStyles = () => {
        // Remove from content element
        if (internalRef.current) {
          removeAllInlineStyles(internalRef.current)
        }
        // Remove from viewport
        if (viewportRef.current) {
          removeAllInlineStyles(viewportRef.current)
        }
        // Remove from all child elements
        if (internalRef.current) {
          const children = internalRef.current.querySelectorAll('*')
          children.forEach(child => removeAllInlineStyles(child))
        }
        // Remove from Portal elements in document
        const portals = document.querySelectorAll('[data-radix-portal]')
        portals.forEach(portal => {
          removeAllInlineStyles(portal)
          const portalChildren = portal.querySelectorAll('*')
          portalChildren.forEach(child => removeAllInlineStyles(child))
        })
      }
      
      // Remove immediately
      removeInlineStyles()
      
      // Use MutationObserver to catch when Radix adds style attributes
      const observer = new MutationObserver(() => {
        removeInlineStyles()
      })
      
      // Observe the content element
      if (internalRef.current) {
        observer.observe(internalRef.current, {
          attributes: true,
          attributeFilter: ['style'],
          subtree: true
        })
      }
      
      // Also observe document body for Portal elements
      const bodyObserver = new MutationObserver(() => {
        removeInlineStyles()
      })
      
      bodyObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style']
      })
      
      return () => {
        observer.disconnect()
        bodyObserver.disconnect()
      }
    }
  }, [])

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={combinedRef}
        className={cn(
          "select-content relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          ref={viewportRef}
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
