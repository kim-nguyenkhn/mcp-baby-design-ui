import React from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { avatarVariants } from "./avatar.variants";

/**
 * Simple hash function to generate a consistent color index from a string.
 */
function hashStringToColor(str: string): string {
  const colors = [
    "bg-primary-500",
    "bg-primary-600",
    "bg-primary-700",
    "bg-error-500",
    "bg-neutral-600",
    "bg-neutral-700",
    "bg-primary-400",
    "bg-error-600",
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit int
  }
  return colors[Math.abs(hash) % colors.length];
}

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "role">,
    VariantProps<typeof avatarVariants> {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Fallback text displayed as initials when image is unavailable */
  fallback?: string;
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      className,
      src,
      alt,
      fallback,
      size,
      shape,
      ...props
    },
    ref,
  ) => {
    const [imgError, setImgError] = React.useState(false);

    // Reset error state when src changes
    React.useEffect(() => {
      setImgError(false);
    }, [src]);

    const showImage = src && !imgError;
    const label = alt || fallback || "Avatar";
    const fallbackColor = fallback ? hashStringToColor(fallback) : "";

    return (
      <span
        ref={ref}
        role="img"
        aria-label={label}
        className={cn(
          avatarVariants({ size, shape }),
          !showImage && fallbackColor,
          !showImage && fallback && "text-white",
          className,
        )}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt || ""}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span data-testid="avatar-fallback">{fallback || "?"}</span>
        )}
      </span>
    );
  },
);

Avatar.displayName = "Avatar";
