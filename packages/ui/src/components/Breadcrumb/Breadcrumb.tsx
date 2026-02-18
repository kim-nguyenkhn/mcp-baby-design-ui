import React from "react";
import { cn } from "../../lib/utils";
import {
  breadcrumbVariants,
  breadcrumbItemVariants,
  breadcrumbSeparatorVariants,
} from "./breadcrumb.variants";

/* ─── Breadcrumb ─── */

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** Custom separator element between items */
  separator?: React.ReactNode;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, children, separator = "/", ...props }, ref) => {
    const items = React.Children.toArray(children);

    return (
      <nav ref={ref} aria-label="Breadcrumb" className={cn(className)} {...props}>
        <ol className={cn(breadcrumbVariants())}>
          {items.map((child, index) => (
            <React.Fragment key={index}>
              <li className="inline-flex items-center">{child}</li>
              {index < items.length - 1 && (
                <li
                  aria-hidden="true"
                  className={cn(breadcrumbSeparatorVariants())}
                >
                  {separator}
                </li>
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    );
  },
);
Breadcrumb.displayName = "Breadcrumb";

/* ─── BreadcrumbItem ─── */

export interface BreadcrumbItemProps
  extends React.HTMLAttributes<HTMLElement> {
  /** URL for the breadcrumb link */
  href?: string;
  /** Whether this is the current/active page */
  isCurrent?: boolean;
}

export const BreadcrumbItem = React.forwardRef<HTMLElement, BreadcrumbItemProps>(
  ({ className, children, href, isCurrent = false, ...props }, ref) => {
    if (isCurrent) {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          aria-current="page"
          className={cn(breadcrumbItemVariants({ isCurrent: true }), className)}
          {...props}
        >
          {children}
        </span>
      );
    }

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cn(breadcrumbItemVariants({ isCurrent: false }), className)}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  },
);
BreadcrumbItem.displayName = "BreadcrumbItem";
