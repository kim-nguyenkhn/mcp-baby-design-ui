import React from "react";
import { cn } from "../../lib/utils";
import { ChevronDown } from "../Icons";
import {
  accordionVariants,
  accordionTriggerVariants,
  accordionContentVariants,
} from "./accordion.variants";

/* ─── Context ─── */

interface AccordionContextValue {
  type: "single" | "multiple";
  expandedValues: string[];
  toggle: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionItem must be used within an <Accordion> provider");
  }
  return context;
}

/* ─── Accordion ─── */

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether only one or multiple items can be expanded */
  type?: "single" | "multiple";
  /** Default expanded item values */
  defaultValue?: string[];
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      children,
      type = "single",
      defaultValue = [],
      ...props
    },
    ref,
  ) => {
    const [expandedValues, setExpandedValues] =
      React.useState<string[]>(defaultValue);

    const toggle = React.useCallback(
      (value: string) => {
        setExpandedValues((prev) => {
          if (prev.includes(value)) {
            return prev.filter((v) => v !== value);
          }
          if (type === "single") {
            return [value];
          }
          return [...prev, value];
        });
      },
      [type],
    );

    return (
      <AccordionContext.Provider value={{ type, expandedValues, toggle }}>
        <div
          ref={ref}
          className={cn(accordionVariants(), className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = "Accordion";

/* ─── AccordionItem ─── */

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique value identifying this item */
  value: string;
  /** Title displayed in the trigger bar */
  title: string;
  /** Whether this item is disabled */
  disabled?: boolean;
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, title, disabled = false, children, ...props }, ref) => {
    const ctx = useAccordionContext();
    const isExpanded = ctx.expandedValues.includes(value);
    const panelId = `accordion-panel-${value}`;
    const triggerId = `accordion-trigger-${value}`;

    return (
      <div ref={ref} className={cn(className)} {...props}>
        <button
          type="button"
          id={triggerId}
          aria-expanded={isExpanded}
          aria-controls={panelId}
          disabled={disabled}
          className={cn(accordionTriggerVariants())}
          onClick={() => {
            if (!disabled) ctx.toggle(value);
          }}
        >
          <span>{title}</span>
          <ChevronDown
            size={16}
            className={cn(
              "transition-transform duration-200",
              isExpanded && "rotate-180",
            )}
          />
        </button>
        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          className={cn(accordionContentVariants({ expanded: isExpanded }))}
        >
          <div className="px-4 py-3 text-sm text-neutral-700">{children}</div>
        </div>
      </div>
    );
  },
);
AccordionItem.displayName = "AccordionItem";
