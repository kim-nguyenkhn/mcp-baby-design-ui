import React from "react";
import { cn } from "../../lib/utils";
import { badgeVariants, badgeDotVariants } from "./badge.variants";

export type BadgeColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "neutral";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual variant */
  variant?: "filled" | "outline";
  /** Color scheme */
  color?: BadgeColor;
  /** Size of the badge */
  size?: "sm" | "md";
  /** Whether to show a dot indicator */
  dot?: boolean;
  /** Badge content */
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "filled",
      color = "primary",
      size = "md",
      dot = false,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, color, size }), className)}
        {...props}
      >
        {dot && (
          <span
            className={cn(badgeDotVariants({ color, size }))}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";
