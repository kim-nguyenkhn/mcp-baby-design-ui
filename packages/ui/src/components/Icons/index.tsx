import React from "react";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: number;
}

const defaultProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// ─── ChevronDown ───

export const ChevronDown = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...defaultProps}
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
);
ChevronDown.displayName = "ChevronDown";

// ─── ChevronUp ───

export const ChevronUp = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...defaultProps}
      {...props}
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  ),
);
ChevronUp.displayName = "ChevronUp";

// ─── ChevronLeft ───

export const ChevronLeft = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...defaultProps}
      {...props}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
);
ChevronLeft.displayName = "ChevronLeft";

// ─── ChevronRight ───

export const ChevronRight = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...defaultProps}
      {...props}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
);
ChevronRight.displayName = "ChevronRight";

// ─── Check ───

export const Check = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...defaultProps}
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
);
Check.displayName = "Check";

// ─── X ───

export const X = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...defaultProps}
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
);
X.displayName = "X";

// ─── Search ───

export const Search = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...defaultProps}
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
);
Search.displayName = "Search";

// ─── Calendar ───

export const Calendar = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...defaultProps}
      {...props}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
);
Calendar.displayName = "Calendar";

// ─── AlertCircle ───

export const AlertCircle = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...defaultProps}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
);
AlertCircle.displayName = "AlertCircle";

// ─── Info ───

export const Info = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...defaultProps}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
);
Info.displayName = "Info";

// ─── Loader ───

export const Loader = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...defaultProps}
      {...props}
    >
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  ),
);
Loader.displayName = "Loader";

// ─── Plus ───

export const Plus = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...defaultProps}
      {...props}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
);
Plus.displayName = "Plus";

// ─── Minus ───

export const Minus = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...defaultProps}
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
);
Minus.displayName = "Minus";

// ─── Eye ───

export const Eye = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...defaultProps}
      {...props}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
);
Eye.displayName = "Eye";

// ─── EyeOff ───

export const EyeOff = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...defaultProps}
      {...props}
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
);
EyeOff.displayName = "EyeOff";

// ─── ArrowLeft ───

export const ArrowLeft = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...defaultProps}
      {...props}
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
);
ArrowLeft.displayName = "ArrowLeft";

// ─── ArrowRight ───

export const ArrowRight = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...defaultProps}
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
);
ArrowRight.displayName = "ArrowRight";
