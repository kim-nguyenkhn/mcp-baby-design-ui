import React, { useId } from "react";
import { cn } from "../../lib/utils";
import {
  toggleTrackVariants,
  toggleThumbVariants,
  toggleLabelVariants,
} from "./toggle.variants";

export interface ToggleProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Toggle size */
  size?: "sm" | "md" | "lg";
  /** Additional class names */
  className?: string;
  /** ID attribute */
  id?: string;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      checked = false,
      onChange,
      label,
      disabled = false,
      size = "md",
      className,
      id: externalId,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = externalId || generatedId;

    const handleClick = () => {
      if (disabled) return;
      onChange?.(!checked);
    };

    return (
      <div className={cn("inline-flex items-center gap-2", className)}>
        <button
          ref={ref}
          id={id}
          role="switch"
          type="button"
          aria-checked={checked}
          aria-disabled={disabled || undefined}
          disabled={disabled}
          onClick={handleClick}
          className={cn(toggleTrackVariants({ checked, disabled, size }))}
          {...props}
        >
          <span
            className={cn(toggleThumbVariants({ checked, size }))}
            aria-hidden="true"
          />
        </button>
        {label && (
          <label
            htmlFor={id}
            className={cn(toggleLabelVariants({ disabled }))}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

Toggle.displayName = "Toggle";
