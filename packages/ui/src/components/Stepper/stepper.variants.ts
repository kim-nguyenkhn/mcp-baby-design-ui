import { cva } from "class-variance-authority";

export const stepperVariants = cva(
  "flex",
  {
    variants: {
      orientation: {
        horizontal: "flex-row items-center",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

export const stepCircleVariants = cva(
  [
    "inline-flex items-center justify-center rounded-full text-sm font-semibold",
    "transition-colors shrink-0",
  ],
  {
    variants: {
      status: {
        completed: "bg-primary-500 text-white",
        active: "bg-primary-500 text-white ring-4 ring-primary-100",
        incomplete: "bg-white text-neutral-500 border-2 border-neutral-300",
      },
      size: {
        default: "w-8 h-8",
      },
    },
    defaultVariants: {
      status: "incomplete",
      size: "default",
    },
  },
);

export const stepConnectorVariants = cva(
  "transition-colors",
  {
    variants: {
      completed: {
        true: "bg-primary-500",
        false: "bg-neutral-200",
      },
      orientation: {
        horizontal: "h-0.5 flex-1 mx-2",
        vertical: "w-0.5 min-h-[24px] ml-4 my-1",
      },
    },
    defaultVariants: {
      completed: false,
      orientation: "horizontal",
    },
  },
);

export const stepBarVariants = cva(
  "h-2 rounded-full transition-all",
  {
    variants: {
      status: {
        completed: "bg-primary-500",
        active: "bg-primary-500",
        incomplete: "bg-neutral-200",
      },
    },
    defaultVariants: {
      status: "incomplete",
    },
  },
);
