import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders page buttons", () => {
    render(<Pagination totalPages={5} currentPage={1} onPageChange={vi.fn()} />);
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go to page 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go to page 5" })).toBeInTheDocument();
  });

  it("highlights the current page with aria-current", () => {
    render(<Pagination totalPages={5} currentPage={3} onPageChange={vi.fn()} />);
    const currentButton = screen.getByRole("button", { name: "Go to page 3" });
    expect(currentButton).toHaveAttribute("aria-current", "page");
  });

  it("calls onPageChange when a page is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination totalPages={5} currentPage={1} onPageChange={onPageChange} />);
    await user.click(screen.getByRole("button", { name: "Go to page 3" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("shows ellipsis when there are many pages", () => {
    render(<Pagination totalPages={20} currentPage={10} onPageChange={vi.fn()} />);
    const ellipses = screen.getAllByTestId("pagination-ellipsis");
    expect(ellipses.length).toBeGreaterThanOrEqual(1);
  });

  it("navigates to previous page when prev button is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination totalPages={5} currentPage={3} onPageChange={onPageChange} />);
    await user.click(screen.getByRole("button", { name: "Go to previous page" }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("navigates to next page when next button is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination totalPages={5} currentPage={3} onPageChange={onPageChange} />);
    await user.click(screen.getByRole("button", { name: "Go to next page" }));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("disables prev button on first page", () => {
    render(<Pagination totalPages={5} currentPage={1} onPageChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Go to previous page" })).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<Pagination totalPages={5} currentPage={5} onPageChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Go to next page" })).toBeDisabled();
  });

  it("hides prev/next buttons when showPrevNext is false", () => {
    render(
      <Pagination totalPages={5} currentPage={1} onPageChange={vi.fn()} showPrevNext={false} />,
    );
    expect(screen.queryByRole("button", { name: "Go to previous page" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Go to next page" })).not.toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Pagination ref={ref} totalPages={5} currentPage={1} onPageChange={vi.fn()} />);
    expect(ref).toHaveBeenCalled();
  });
});
