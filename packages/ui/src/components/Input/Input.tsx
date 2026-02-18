import React, { useState, useId } from "react";
import { cn } from "../../lib/utils";
import { Eye, EyeOff } from "../Icons";
import {
  inputVariants,
  inputWrapperVariants,
  inputLabelVariants,
  inputHelperVariants,
} from "./input.variants";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Input label displayed above the field */
  label?: string;
  /** Helper text displayed below the field */
  helperText?: string;
  /** Error message - replaces helperText and styles the input */
  error?: string;
  /** Maximum character length with visible counter */
  maxLength?: number;
  /** Icon element rendered on the left side */
  leftIcon?: React.ReactNode;
  /** Icon element rendered on the right side */
  rightIcon?: React.ReactNode;
  /** Input type */
  type?: "text" | "password" | "email";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      maxLength,
      leftIcon,
      rightIcon,
      type = "text",
      disabled,
      id: externalId,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = externalId || generatedId;
    const helperId = `${id}-helper`;
    const [showPassword, setShowPassword] = useState(false);
    const [charCount, setCharCount] = useState(
      () => String(value ?? defaultValue ?? "").length,
    );

    const isPassword = type === "password";
    const hasError = Boolean(error);
    const hasLeftIcon = Boolean(leftIcon);
    const hasRightIcon = Boolean(rightIcon) || isPassword;
    const displayMessage = error || helperText;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    const resolvedType = isPassword && showPassword ? "text" : type;

    return (
      <div className={cn(inputWrapperVariants())}>
        {label && (
          <label htmlFor={id} className={cn(inputLabelVariants())}>
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            type={resolvedType}
            className={cn(
              inputVariants({ hasError, hasLeftIcon, hasRightIcon }),
              className,
            )}
            disabled={disabled}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            aria-invalid={hasError || undefined}
            aria-describedby={displayMessage ? helperId : undefined}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
          {!isPassword && rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              {rightIcon}
            </span>
          )}
        </div>
        <div className="flex justify-between">
          {displayMessage && (
            <span
              id={helperId}
              className={cn(inputHelperVariants({ hasError }))}
            >
              {displayMessage}
            </span>
          )}
          {maxLength !== undefined && (
            <span className="text-xs text-neutral-500 ml-auto" data-testid="char-count">
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";
