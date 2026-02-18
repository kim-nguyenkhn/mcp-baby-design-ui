import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Tag } from "./Tag";

describe("Tag", () => {
  it("renders children text", () => {
    render(<Tag>React</Tag>);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("renders as a span element", () => {
    const { container } = render(<Tag>Test</Tag>);
    const tag = container.firstChild;
    expect(tag?.nodeName).toBe("SPAN");
  });

  it("applies filled variant classes by default", () => {
    const { container } = render(<Tag>Default</Tag>);
    const tag = container.firstChild as HTMLElement;
    expect(tag.className).toContain("bg-primary-100");
    expect(tag.className).toContain("text-primary-700");
  });

  it("applies outline variant classes", () => {
    const { container } = render(<Tag variant="outline">Outline</Tag>);
    const tag = container.firstChild as HTMLElement;
    expect(tag.className).toContain("border-primary-300");
    expect(tag.className).toContain("text-primary-700");
  });

  it("applies color variants", () => {
    const { container, rerender } = render(<Tag color="success">Success</Tag>);
    let tag = container.firstChild as HTMLElement;
    expect(tag.className).toContain("bg-success-100");
    expect(tag.className).toContain("text-success-700");

    rerender(<Tag color="error">Error</Tag>);
    tag = container.firstChild as HTMLElement;
    expect(tag.className).toContain("bg-error-100");
    expect(tag.className).toContain("text-error-700");

    rerender(<Tag color="warning">Warning</Tag>);
    tag = container.firstChild as HTMLElement;
    expect(tag.className).toContain("bg-warning-100");
    expect(tag.className).toContain("text-warning-700");
  });

  it("shows remove button when onRemove is provided", () => {
    render(<Tag onRemove={() => {}}>Removable</Tag>);
    expect(screen.getByLabelText("Remove")).toBeInTheDocument();
  });

  it("does not show remove button when onRemove is not provided", () => {
    render(<Tag>Not removable</Tag>);
    expect(screen.queryByLabelText("Remove")).not.toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>Removable</Tag>);

    await user.click(screen.getByLabelText("Remove"));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("remove button has correct aria-label", () => {
    render(<Tag onRemove={() => {}}>Tag</Tag>);
    const removeBtn = screen.getByLabelText("Remove");
    expect(removeBtn).toHaveAttribute("aria-label", "Remove");
  });

  it("renders an icon when icon prop is provided", () => {
    const icon = <svg data-testid="custom-icon" />;
    render(<Tag icon={icon}>With icon</Tag>);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("does not render icon wrapper when icon is not provided", () => {
    const { container } = render(<Tag>No icon</Tag>);
    const iconWrapper = container.querySelector("[aria-hidden='true']");
    expect(iconWrapper).not.toBeInTheDocument();
  });

  it("applies disabled styles", () => {
    const { container } = render(<Tag disabled>Disabled</Tag>);
    const tag = container.firstChild as HTMLElement;
    expect(tag.className).toContain("opacity-50");
    expect(tag.className).toContain("cursor-not-allowed");
  });

  it("disables remove button when disabled", () => {
    render(
      <Tag disabled onRemove={() => {}}>
        Disabled
      </Tag>,
    );
    const removeBtn = screen.getByLabelText("Remove");
    expect(removeBtn).toBeDisabled();
  });

  it("does not call onRemove when disabled", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(
      <Tag disabled onRemove={onRemove}>
        Disabled
      </Tag>,
    );

    await user.click(screen.getByLabelText("Remove"));
    expect(onRemove).not.toHaveBeenCalled();
  });

  it("supports custom className", () => {
    const { container } = render(<Tag className="custom-class">Custom</Tag>);
    const tag = container.firstChild as HTMLElement;
    expect(tag.className).toContain("custom-class");
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<Tag ref={ref}>Ref test</Tag>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("passes through additional HTML attributes", () => {
    render(<Tag data-testid="my-tag">HTML attrs</Tag>);
    expect(screen.getByTestId("my-tag")).toBeInTheDocument();
  });

  it("has rounded-full class for pill shape", () => {
    const { container } = render(<Tag>Pill</Tag>);
    const tag = container.firstChild as HTMLElement;
    expect(tag.className).toContain("rounded-full");
  });

  it("renders with icon and remove button together", () => {
    const icon = <svg data-testid="tag-icon" />;
    const onRemove = vi.fn();
    render(
      <Tag icon={icon} onRemove={onRemove}>
        Full tag
      </Tag>,
    );

    expect(screen.getByTestId("tag-icon")).toBeInTheDocument();
    expect(screen.getByText("Full tag")).toBeInTheDocument();
    expect(screen.getByLabelText("Remove")).toBeInTheDocument();
  });
});
