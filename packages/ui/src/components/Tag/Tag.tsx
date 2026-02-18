import React from "react";
import { cn } from "../../lib/utils";
import { X } from "../Icons";
import { tagVariants, tagRemoveButtonVariants } from "./tag.variants";

export type TagColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "neutral";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual variant */
  variant?: "filled" | "outline";
  /** Color scheme */
  color?: TagColor;
  /** Callback when remove button is clicked. If provided, a remove button is shown. */
  onRemove?: () => void;
  /** Optional leading icon */
  icon?: React.ReactNode;
  /** Whether the tag is disabled */
  disabled?: boolean;
  /** Tag content */
  children: React.ReactNode;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      variant = "filled",
      color = "primary",
      onRemove,
      icon,
      disabled = false,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          tagVariants({ variant, color, disabled }),
          "px-2.5 py-1",
          className,
        )}
        {...props}
      >
        {icon && (
          <span className="shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5" aria-hidden="true">
            {icon}
          </span>
        )}
        <span>{children}</span>
        {onRemove && (
          <button
            type="button"
            onClick={disabled ? undefined : onRemove}
            disabled={disabled}
            className={cn(tagRemoveButtonVariants({ disabled }))}
            aria-label="Remove"
          >
            <X size={14} />
          </button>
        )}
      </span>
    );
  },
);

Tag.displayName = "Tag";
