import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { cn } from "../utils/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => {
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
      // Remove ALL inline styles for strict CSP compliance
      const removeAllInlineStyles = (element) => {
        if (element && element.hasAttribute('style')) {
          element.removeAttribute('style')
        }
      }
      
      const removeInlineStyles = () => {
        removeAllInlineStyles(internalRef.current)
        // Remove from all child elements
        const children = internalRef.current.querySelectorAll('*')
        children.forEach(child => removeAllInlineStyles(child))
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
    <AccordionPrimitive.Item
      ref={combinedRef}
      className={cn("border-b", className)}
      {...props}
    />
  )
})
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
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
      // Remove ALL inline styles for strict CSP compliance
      const removeAllInlineStyles = (element) => {
        if (element && element.hasAttribute('style')) {
          element.removeAttribute('style')
        }
      }
      
      const removeInlineStyles = () => {
        removeAllInlineStyles(internalRef.current)
        // Also check for parent Header element
        const header = internalRef.current.closest('[data-radix-accordion-header]') || internalRef.current.parentElement
        if (header) {
          removeAllInlineStyles(header)
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
        attributeFilter: ['style']
      })
      
      // Also observe the parent if it exists
      if (internalRef.current.parentElement) {
        observer.observe(internalRef.current.parentElement, {
          attributes: true,
          attributeFilter: ['style']
        })
      }
      
      return () => observer.disconnect()
    }
  }, [])

  return (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
        ref={combinedRef}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
        {...props}
      >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
  )
})
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const internalRef = React.useRef(null)
  const contentRef = React.useRef(null)
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
      // Remove ALL inline styles for strict CSP compliance
      const removeAllInlineStyles = (element) => {
        if (element && element.hasAttribute('style')) {
          element.removeAttribute('style')
        }
      }
      
      const removeInlineStyles = () => {
        removeAllInlineStyles(internalRef.current)
        // Remove from child div as well
        if (contentRef.current) {
          removeAllInlineStyles(contentRef.current)
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
  <AccordionPrimitive.Content
      ref={combinedRef}
      className="accordion-content overflow-hidden text-sm"
      {...props}
    >
      <div 
        ref={contentRef}
        className={cn("pb-4 pt-0", className)}
      >
        {children}
      </div>
  </AccordionPrimitive.Content>
  )
})

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
