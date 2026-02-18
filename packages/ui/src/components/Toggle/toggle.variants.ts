import { cva } from "class-variance-authority";

export const toggleTrackVariants = cva(
  [
    "relative inline-flex shrink-0 rounded-full transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
  ],
  {
    variants: {
      checked: {
        true: "bg-primary-500",
        false: "bg-neutral-300",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "cursor-pointer",
      },
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-14",
      },
    },
    defaultVariants: {
      checked: false,
      disabled: false,
      size: "md",
    },
  },
);

export const toggleThumbVariants = cva(
  "absolute top-0.5 rounded-full bg-white shadow transition-transform",
  {
    variants: {
      checked: {
        true: "",
        false: "translate-x-0.5",
      },
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    compoundVariants: [
      { checked: true, size: "sm", className: "translate-x-[18px]" },
      { checked: true, size: "md", className: "translate-x-[22px]" },
      { checked: true, size: "lg", className: "translate-x-[30px]" },
    ],
    defaultVariants: {
      checked: false,
      size: "md",
    },
  },
);

export const toggleLabelVariants = cva("text-sm text-neutral-800 select-none", {
  variants: {
    disabled: {
      true: "opacity-50 cursor-not-allowed",
      false: "cursor-pointer",
    },
  },
  defaultVariants: {
    disabled: false,
  },
});
