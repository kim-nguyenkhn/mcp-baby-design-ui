import React, { useState, useRef, useCallback, useId, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import { tooltipVariants, tooltipArrowVariants } from "./tooltip.variants";

export interface TooltipProps {
  /** Content displayed inside the tooltip */
  content: React.ReactNode;
  /** The trigger element */
  children: React.ReactElement;
  /** Position relative to the trigger */
  position?: "top" | "bottom" | "left" | "right";
  /** Delay in milliseconds before the tooltip appears */
  delay?: number;
  /** Additional class names for the tooltip */
  className?: string;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, children, position = "top", delay = 200, className }, ref) => {
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState<{ top: number; left: number }>({
      top: 0,
      left: 0,
    });
    const triggerRef = useRef<HTMLElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const tooltipId = useId();

    const calculatePosition = useCallback(() => {
      if (!triggerRef.current || typeof window === "undefined") return;

      const rect = triggerRef.current.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      let top = 0;
      let left = 0;

      switch (position) {
        case "top":
          top = rect.top + scrollY;
          left = rect.left + scrollX + rect.width / 2;
          break;
        case "bottom":
          top = rect.bottom + scrollY;
          left = rect.left + scrollX + rect.width / 2;
          break;
        case "left":
          top = rect.top + scrollY + rect.height / 2;
          left = rect.left + scrollX;
          break;
        case "right":
          top = rect.top + scrollY + rect.height / 2;
          left = rect.right + scrollX;
          break;
      }

      setCoords({ top, left });
    }, [position]);

    const show = useCallback(() => {
      timeoutRef.current = setTimeout(() => {
        calculatePosition();
        setVisible(true);
      }, delay);
    }, [delay, calculatePosition]);

    const hide = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setVisible(false);
    }, []);

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const positionStyles: React.CSSProperties = (() => {
      switch (position) {
        case "top":
          return {
            position: "absolute",
            top: coords.top,
            left: coords.left,
            transform: "translate(-50%, -100%) translateY(-8px)",
          };
        case "bottom":
          return {
            position: "absolute",
            top: coords.top,
            left: coords.left,
            transform: "translate(-50%, 0) translateY(8px)",
          };
        case "left":
          return {
            position: "absolute",
            top: coords.top,
            left: coords.left,
            transform: "translate(-100%, -50%) translateX(-8px)",
          };
        case "right":
          return {
            position: "absolute",
            top: coords.top,
            left: coords.left,
            transform: "translate(0, -50%) translateX(8px)",
          };
      }
    })();

    const triggerChild = React.cloneElement(children, {
      ref: (node: HTMLElement | null) => {
        (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
        const childRef = (children as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref;
        if (typeof childRef === "function") {
          childRef(node);
        } else if (childRef && typeof childRef === "object") {
          (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      },
      onMouseEnter: (e: React.MouseEvent) => {
        children.props.onMouseEnter?.(e);
        show();
      },
      onMouseLeave: (e: React.MouseEvent) => {
        children.props.onMouseLeave?.(e);
        hide();
      },
      onFocus: (e: React.FocusEvent) => {
        children.props.onFocus?.(e);
        show();
      },
      onBlur: (e: React.FocusEvent) => {
        children.props.onBlur?.(e);
        hide();
      },
      "aria-describedby": visible ? tooltipId : undefined,
    });

    const tooltipElement = visible && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={ref}
            id={tooltipId}
            role="tooltip"
            style={positionStyles}
            className={cn(
              "z-50 px-3 py-1.5 text-sm rounded-md shadow-lg bg-neutral-800 text-white pointer-events-none whitespace-nowrap",
              className,
            )}
          >
            {content}
            <div
              className={tooltipArrowVariants({ position })}
              aria-hidden="true"
            />
          </div>,
          document.body,
        )
      : null;

    return (
      <>
        {triggerChild}
        {tooltipElement}
      </>
    );
  },
);

Tooltip.displayName = "Tooltip";
