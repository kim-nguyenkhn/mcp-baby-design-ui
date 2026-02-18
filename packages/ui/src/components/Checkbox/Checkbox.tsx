import React, { useId } from "react";
import { cn } from "../../lib/utils";
import { Check, Minus } from "../Icons";
import { checkboxVariants, checkboxLabelVariants } from "./checkbox.variants";

export interface CheckboxProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Additional class names */
  className?: string;
  /** ID attribute */
  id?: string;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      checked = false,
      indeterminate = false,
      onChange,
      label,
      disabled = false,
      error = false,
      className,
      id: externalId,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = externalId || generatedId;

    const isChecked = indeterminate ? false : checked;
    const ariaChecked: "true" | "false" | "mixed" = indeterminate
      ? "mixed"
      : checked
        ? "true"
        : "false";

    const handleClick = () => {
      if (disabled) return;
      onChange?.(!checked);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleClick();
      }
    };

    return (
      <div className={cn("inline-flex items-center gap-2", className)}>
        <button
          ref={ref}
          id={id}
          role="checkbox"
          type="button"
          aria-checked={ariaChecked}
          aria-disabled={disabled || undefined}
          disabled={disabled}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={cn(
            checkboxVariants({
              checked: checked || indeterminate,
              disabled,
              hasError: error,
            }),
          )}
          {...props}
        >
          {indeterminate && <Minus size={12} />}
          {!indeterminate && checked && <Check size={12} />}
        </button>
        {label && (
          <label
            htmlFor={id}
            className={cn(checkboxLabelVariants({ disabled }))}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
