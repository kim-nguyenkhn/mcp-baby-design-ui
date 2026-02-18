import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Breadcrumb, BreadcrumbItem } from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("renders breadcrumb items", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Widget</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Widget")).toBeInTheDocument();
  });

  it("renders separators between items", () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Widget</BreadcrumbItem>
      </Breadcrumb>,
    );
    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators).toHaveLength(2);
    expect(separators[0]).toHaveTextContent("/");
  });

  it("renders custom separator", () => {
    const { container } = render(
      <Breadcrumb separator=">>">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Page</BreadcrumbItem>
      </Breadcrumb>,
    );
    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators[0]).toHaveTextContent(">>");
  });

  it("renders current item as plain text, not a link", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Current</BreadcrumbItem>
      </Breadcrumb>,
    );
    const current = screen.getByText("Current");
    expect(current.tagName).toBe("SPAN");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("renders non-current items as links", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Current</BreadcrumbItem>
      </Breadcrumb>,
    );
    const link = screen.getByText("Home");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/");
  });

  it("applies primary color to link items", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Current</BreadcrumbItem>
      </Breadcrumb>,
    );
    const link = screen.getByText("Home");
    expect(link.className).toContain("text-primary-600");
  });

  it("does not render separator after the last item", () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Current</BreadcrumbItem>
      </Breadcrumb>,
    );
    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators).toHaveLength(1);
  });

  it("forwards ref on Breadcrumb", () => {
    const ref = vi.fn();
    render(
      <Breadcrumb ref={ref}>
        <BreadcrumbItem isCurrent>Home</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(ref).toHaveBeenCalled();
  });
});
