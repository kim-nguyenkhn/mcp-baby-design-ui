import React from "react";
import { cn } from "../../lib/utils";
import { tabListVariants, tabItemVariants, tabPanelVariants } from "./tab.variants";

/* ─── Context ─── */

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  orientation: "horizontal" | "vertical";
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tab components must be used within a <Tabs> provider");
  }
  return context;
}

/* ─── Tabs ─── */

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** The currently active tab value */
  value: string;
  /** Callback when the active tab changes */
  onChange: (value: string) => void;
  /** Orientation of the tab layout */
  orientation?: "horizontal" | "vertical";
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      children,
      value,
      onChange,
      orientation = "horizontal",
      ...props
    },
    ref,
  ) => (
    <TabsContext.Provider value={{ value, onChange, orientation }}>
      <div
        ref={ref}
        className={cn(
          orientation === "vertical" ? "flex" : "flex flex-col",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  ),
);
Tabs.displayName = "Tabs";

/* ─── TabList ─── */

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>(
  ({ className, children, ...props }, ref) => {
    const { orientation } = useTabsContext();
    const listRef = React.useRef<HTMLDivElement | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        listRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    const handleKeyDown = (e: React.KeyboardEvent) => {
      const tabs = listRef.current?.querySelectorAll<HTMLElement>(
        '[role="tab"]:not([disabled])',
      );
      if (!tabs || tabs.length === 0) return;

      const currentIndex = Array.from(tabs).findIndex(
        (tab) => tab === document.activeElement,
      );
      if (currentIndex === -1) return;

      const isHorizontal = orientation === "horizontal";
      const prevKey = isHorizontal ? "ArrowLeft" : "ArrowUp";
      const nextKey = isHorizontal ? "ArrowRight" : "ArrowDown";

      let newIndex = currentIndex;

      if (e.key === nextKey) {
        e.preventDefault();
        newIndex = (currentIndex + 1) % tabs.length;
      } else if (e.key === prevKey) {
        e.preventDefault();
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        newIndex = tabs.length - 1;
      }

      if (newIndex !== currentIndex) {
        tabs[newIndex].focus();
      }
    };

    return (
      <div
        ref={setRefs}
        role="tablist"
        aria-orientation={orientation}
        className={cn(tabListVariants({ orientation }), className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabList.displayName = "TabList";

/* ─── TabItem ─── */

export interface TabItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  /** Unique value identifying this tab */
  value: string;
  /** Tab label text */
  label: string;
  /** Whether this tab is disabled */
  disabled?: boolean;
  /** Optional icon element */
  icon?: React.ReactNode;
}

export const TabItem = React.forwardRef<HTMLButtonElement, TabItemProps>(
  ({ className, value, label, disabled = false, icon, ...props }, ref) => {
    const ctx = useTabsContext();
    const isActive = ctx.value === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={`tab-${value}`}
        aria-selected={isActive}
        aria-controls={`tabpanel-${value}`}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        className={cn(
          tabItemVariants({ active: isActive, orientation: ctx.orientation }),
          className,
        )}
        onClick={() => {
          if (!disabled) ctx.onChange(value);
        }}
        {...props}
      >
        {icon}
        {label}
      </button>
    );
  },
);
TabItem.displayName = "TabItem";

/* ─── TabPanel ─── */

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Value that links this panel to its tab */
  value: string;
}

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, value, children, ...props }, ref) => {
    const ctx = useTabsContext();
    const isActive = ctx.value === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        tabIndex={0}
        className={cn(tabPanelVariants(), className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabPanel.displayName = "TabPanel";
