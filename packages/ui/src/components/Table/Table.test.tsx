import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
} from "./Table";

function renderBasicTable() {
  return render(
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Age</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alice</TableCell>
          <TableCell>30</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob</TableCell>
          <TableCell>25</TableCell>
        </TableRow>
      </TableBody>
    </Table>,
  );
}

describe("Table", () => {
  it("renders a table with rows and cells", () => {
    renderBasicTable();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("renders header cells", () => {
    renderBasicTable();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("applies hover class on table rows", () => {
    renderBasicTable();
    const rows = screen.getAllByRole("row");
    // Data rows (not header row) should have hover class
    expect(rows[1].className).toContain("hover:bg-neutral-50");
  });

  it("renders sortable header with sort indicator", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell sortable sortDirection="asc" onSort={vi.fn()}>
              Name
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const header = screen.getByText("Name").closest("th");
    expect(header).toHaveAttribute("aria-sort", "ascending");
    expect(screen.getByTestId("sort-indicator")).toBeInTheDocument();
  });

  it("fires onSort callback when sortable header is clicked", async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell sortable sortDirection={null} onSort={onSort}>
              Name
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    await user.click(screen.getByText("Name").closest("th")!);
    expect(onSort).toHaveBeenCalledTimes(1);
  });

  it("sets aria-sort to descending", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell sortable sortDirection="desc" onSort={vi.fn()}>
              Name
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const header = screen.getByText("Name").closest("th");
    expect(header).toHaveAttribute("aria-sort", "descending");
  });

  it("sets aria-sort to none when sortDirection is null", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell sortable sortDirection={null} onSort={vi.fn()}>
              Name
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const header = screen.getByText("Name").closest("th");
    expect(header).toHaveAttribute("aria-sort", "none");
  });

  it("forwards ref on Table", () => {
    const ref = vi.fn();
    render(
      <Table ref={ref}>
        <TableBody>
          <TableRow>
            <TableCell>Test</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(ref).toHaveBeenCalled();
  });
});
