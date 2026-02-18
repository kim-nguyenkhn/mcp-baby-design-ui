import React, { createContext, useContext, useId } from "react";
import { cn } from "../../lib/utils";
import {
  radioGroupVariants,
  radioOuterVariants,
  radioInnerVariants,
  radioLabelVariants,
} from "./radio-button.variants";

// ─── RadioGroup Context ───

interface RadioGroupContextValue {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroup() {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error("RadioButton must be used within a RadioGroup");
  }
  return context;
}

// ─── RadioGroup ───

export interface RadioGroupProps {
  /** Currently selected value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Name attribute for the radio group */
  name?: string;
  /** Layout direction */
  orientation?: "horizontal" | "vertical";
  /** Children (RadioButton elements) */
  children: React.ReactNode;
  /** Additional class names */
  className?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value,
      onChange,
      name: externalName,
      orientation = "vertical",
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const generatedName = useId();
    const name = externalName || generatedName;

    return (
      <RadioGroupContext.Provider value={{ name, value, onChange }}>
        <div
          ref={ref}
          role="radiogroup"
          className={cn(radioGroupVariants({ orientation }), className)}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = "RadioGroup";

// ─── RadioButton ───

export interface RadioButtonProps {
  /** Value for this radio option */
  value: string;
  /** Label text */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** ID attribute */
  id?: string;
}

export const RadioButton = React.forwardRef<HTMLButtonElement, RadioButtonProps>(
  ({ value, label, disabled = false, className, id: externalId, ...props }, ref) => {
    const generatedId = useId();
    const id = externalId || generatedId;
    const { name, value: groupValue, onChange } = useRadioGroup();
    const isChecked = groupValue === value;

    const handleClick = () => {
      if (disabled) return;
      onChange(value);
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
          role="radio"
          type="button"
          aria-checked={isChecked}
          aria-disabled={disabled || undefined}
          disabled={disabled}
          name={name}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={cn(
            radioOuterVariants({ checked: isChecked, disabled }),
          )}
          {...props}
        >
          <span className={cn(radioInnerVariants({ checked: isChecked }))} />
        </button>
        {label && (
          <label
            htmlFor={id}
            className={cn(radioLabelVariants({ disabled }))}
            onClick={disabled ? undefined : handleClick}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

RadioButton.displayName = "RadioButton";
