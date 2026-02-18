import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children text", () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders as a span element", () => {
    render(<Badge>Test</Badge>);
    const badge = screen.getByText("Test");
    expect(badge.tagName).toBe("SPAN");
  });

  it("applies filled variant classes by default", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge.className).toContain("bg-primary-100");
    expect(badge.className).toContain("text-primary-700");
  });

  it("applies outline variant classes", () => {
    render(<Badge variant="outline">Outline</Badge>);
    const badge = screen.getByText("Outline");
    expect(badge.className).toContain("border-primary-300");
    expect(badge.className).toContain("text-primary-700");
  });

  it("applies color variants for filled", () => {
    const colors = [
      { color: "primary" as const, bgClass: "bg-primary-100", textClass: "text-primary-700" },
      { color: "secondary" as const, bgClass: "bg-secondary-100", textClass: "text-secondary-700" },
      { color: "success" as const, bgClass: "bg-success-100", textClass: "text-success-700" },
      { color: "warning" as const, bgClass: "bg-warning-100", textClass: "text-warning-700" },
      { color: "error" as const, bgClass: "bg-error-100", textClass: "text-error-700" },
      { color: "neutral" as const, bgClass: "bg-neutral-100", textClass: "text-neutral-700" },
    ];

    colors.forEach(({ color, bgClass, textClass }) => {
      const { unmount } = render(
        <Badge color={color} variant="filled">
          {color}
        </Badge>,
      );
      const badge = screen.getByText(color);
      expect(badge.className).toContain(bgClass);
      expect(badge.className).toContain(textClass);
      unmount();
    });
  });

  it("applies color variants for outline", () => {
    const colors = [
      { color: "primary" as const, borderClass: "border-primary-300" },
      { color: "success" as const, borderClass: "border-success-300" },
      { color: "error" as const, borderClass: "border-error-300" },
    ];

    colors.forEach(({ color, borderClass }) => {
      const { unmount } = render(
        <Badge color={color} variant="outline">
          {color}
        </Badge>,
      );
      const badge = screen.getByText(color);
      expect(badge.className).toContain(borderClass);
      unmount();
    });
  });

  it("applies sm size classes", () => {
    render(<Badge size="sm">Small</Badge>);
    const badge = screen.getByText("Small");
    expect(badge.className).toContain("text-xs");
    expect(badge.className).toContain("px-2");
  });

  it("applies md size classes", () => {
    render(<Badge size="md">Medium</Badge>);
    const badge = screen.getByText("Medium");
    expect(badge.className).toContain("text-sm");
  });

  it("renders dot indicator when dot prop is true", () => {
    const { container } = render(<Badge dot>With dot</Badge>);
    const dot = container.querySelector("[aria-hidden='true']");
    expect(dot).toBeInTheDocument();
    expect(dot?.className).toContain("rounded-full");
  });

  it("does not render dot indicator by default", () => {
    const { container } = render(<Badge>No dot</Badge>);
    const dot = container.querySelector("[aria-hidden='true']");
    expect(dot).not.toBeInTheDocument();
  });

  it("supports custom className", () => {
    render(<Badge className="custom-class">Custom</Badge>);
    const badge = screen.getByText("Custom");
    expect(badge.className).toContain("custom-class");
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<Badge ref={ref}>Ref test</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("passes through additional HTML attributes", () => {
    render(<Badge data-testid="my-badge">HTML attrs</Badge>);
    expect(screen.getByTestId("my-badge")).toBeInTheDocument();
  });

  it("has rounded-full class for pill shape", () => {
    render(<Badge>Pill</Badge>);
    const badge = screen.getByText("Pill");
    expect(badge.className).toContain("rounded-full");
  });
});
