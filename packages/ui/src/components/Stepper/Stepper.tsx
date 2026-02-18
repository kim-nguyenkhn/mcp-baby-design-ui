import React from "react";
import { cn } from "../../lib/utils";
import { Check } from "../Icons";
import {
  stepperVariants,
  stepCircleVariants,
  stepConnectorVariants,
  stepBarVariants,
} from "./stepper.variants";

export interface StepItem {
  /** Step label text */
  label: string;
  /** Optional step description */
  description?: string;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of step definitions */
  steps: StepItem[];
  /** The currently active step index (0-based) */
  activeStep: number;
  /** Layout orientation */
  orientation?: "horizontal" | "vertical";
  /** Visual variant */
  variant?: "numbered" | "bar";
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      steps,
      activeStep,
      orientation = "horizontal",
      variant = "numbered",
      ...props
    },
    ref,
  ) => {
    if (variant === "bar") {
      return (
        <div ref={ref} className={cn("w-full", className)} {...props}>
          <div className="flex gap-2 mb-2">
            {steps.map((step, index) => {
              const status =
                index < activeStep
                  ? "completed"
                  : index === activeStep
                    ? "active"
                    : "incomplete";
              return (
                <div
                  key={index}
                  className={cn("flex-1 rounded-full", stepBarVariants({ status }))}
                  role="presentation"
                />
              );
            })}
          </div>
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
                aria-current={index === activeStep ? "step" : undefined}
              >
                <span
                  className={cn(
                    "text-sm font-medium",
                    index <= activeStep
                      ? "text-primary-600"
                      : "text-neutral-500",
                  )}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-xs text-neutral-400">
                    {step.description}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(stepperVariants({ orientation }), className)}
        {...props}
      >
        {steps.map((step, index) => {
          const status =
            index < activeStep
              ? "completed"
              : index === activeStep
                ? "active"
                : "incomplete";
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={index}>
              <div
                className={cn(
                  "flex items-center gap-2",
                  orientation === "vertical" && "flex-row",
                )}
                aria-current={index === activeStep ? "step" : undefined}
              >
                <div
                  className={cn(stepCircleVariants({ status }))}
                  data-testid={`step-circle-${index}`}
                >
                  {status === "completed" ? (
                    <Check size={16} data-testid={`step-check-${index}`} />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="flex flex-col">
                  <span
                    className={cn(
                      "text-sm font-medium whitespace-nowrap",
                      status === "incomplete"
                        ? "text-neutral-500"
                        : "text-neutral-800",
                    )}
                  >
                    {step.label}
                  </span>
                  {step.description && (
                    <span className="text-xs text-neutral-400">
                      {step.description}
                    </span>
                  )}
                </div>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    stepConnectorVariants({
                      completed: index < activeStep,
                      orientation,
                    }),
                  )}
                  role="presentation"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  },
);

Stepper.displayName = "Stepper";
