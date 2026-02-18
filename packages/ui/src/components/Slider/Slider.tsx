import React, { useRef, useCallback, useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import {
  sliderContainerVariants,
  sliderLabelVariants,
  sliderTrackVariants,
  sliderFilledTrackVariants,
  sliderThumbVariants,
} from "./slider.variants";

export interface SliderProps {
  /** Current value */
  value?: number;
  /** Change handler */
  onChange?: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Show current value */
  showValue?: boolean;
  /** Additional class names */
  className?: string;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function roundToStep(value: number, step: number, min: number): number {
  const steps = Math.round((value - min) / step);
  return min + steps * step;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: controlledValue,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      label,
      showValue = false,
      className,
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(controlledValue ?? min);
    const value = controlledValue ?? internalValue;
    const trackRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const percentage = ((value - min) / (max - min)) * 100;

    const updateValue = useCallback(
      (clientX: number) => {
        if (disabled || !trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const ratio = (clientX - rect.left) / rect.width;
        const rawValue = min + ratio * (max - min);
        const stepped = roundToStep(rawValue, step, min);
        const clamped = clamp(stepped, min, max);
        // Round to avoid floating point issues
        const rounded = Math.round(clamped * 1000) / 1000;
        setInternalValue(rounded);
        onChange?.(rounded);
      },
      [disabled, min, max, step, onChange],
    );

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        if (disabled) return;
        e.preventDefault();
        isDragging.current = true;
        updateValue(e.clientX);
      },
      [disabled, updateValue],
    );

    const handleTouchStart = useCallback(
      (e: React.TouchEvent) => {
        if (disabled) return;
        isDragging.current = true;
        updateValue(e.touches[0].clientX);
      },
      [disabled, updateValue],
    );

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging.current) {
          updateValue(e.clientX);
        }
      };

      const handleMouseUp = () => {
        isDragging.current = false;
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (isDragging.current) {
          updateValue(e.touches[0].clientX);
        }
      };

      const handleTouchEnd = () => {
        isDragging.current = false;
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }, [updateValue]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      let newValue = value;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          newValue = clamp(value + step, min, max);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          newValue = clamp(value - step, min, max);
          break;
        case "Home":
          e.preventDefault();
          newValue = min;
          break;
        case "End":
          e.preventDefault();
          newValue = max;
          break;
        default:
          return;
      }

      const rounded = Math.round(newValue * 1000) / 1000;
      setInternalValue(rounded);
      onChange?.(rounded);
    };

    return (
      <div ref={ref} className={cn(sliderContainerVariants(), className)}>
        {(label || showValue) && (
          <div className={cn(sliderLabelVariants())}>
            {label && (
              <span className="font-medium text-neutral-700">{label}</span>
            )}
            {showValue && (
              <span className="text-neutral-500" data-testid="slider-value">
                {value}
              </span>
            )}
          </div>
        )}
        <div
          ref={trackRef}
          className={cn(sliderTrackVariants({ disabled }))}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          data-testid="slider-track"
        >
          <div
            className={cn(sliderFilledTrackVariants())}
            style={{ width: `${percentage}%` }}
            data-testid="slider-filled-track"
          />
          <div
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-disabled={disabled || undefined}
            aria-label={label}
            onKeyDown={handleKeyDown}
            className={cn(sliderThumbVariants({ disabled }))}
            style={{ left: `${percentage}%` }}
            data-testid="slider-thumb"
          />
        </div>
      </div>
    );
  },
);

Slider.displayName = "Slider";
