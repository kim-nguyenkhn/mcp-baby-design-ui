import React from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Loader } from "../Icons";
import { buttonVariants } from "./button.variants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Icon element rendered before children */
  leftIcon?: React.ReactNode;
  /** Icon element rendered after children */
  rightIcon?: React.ReactNode;
  /** Render as a child component (Slot pattern) */
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      type = "button",
      asChild: _asChild,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        {...props}
      >
        {loading ? (
          <Loader className="animate-spin" size={16} data-testid="button-loader" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  },
);

Button.displayName = "Button";
