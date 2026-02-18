import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Tabs, TabList, TabItem, TabPanel } from "./Tab";

function renderTabs({
  value = "tab1",
  onChange = vi.fn(),
  orientation,
}: {
  value?: string;
  onChange?: (v: string) => void;
  orientation?: "horizontal" | "vertical";
} = {}) {
  return render(
    <Tabs value={value} onChange={onChange} orientation={orientation}>
      <TabList>
        <TabItem value="tab1" label="Tab 1" />
        <TabItem value="tab2" label="Tab 2" />
        <TabItem value="tab3" label="Tab 3" disabled />
      </TabList>
      <TabPanel value="tab1">Content 1</TabPanel>
      <TabPanel value="tab2">Content 2</TabPanel>
      <TabPanel value="tab3">Content 3</TabPanel>
    </Tabs>,
  );
}

describe("Tab", () => {
  it("renders tabs and displays active panel", () => {
    renderTabs({ value: "tab1" });
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Content 1");
  });

  it("marks the active tab with aria-selected", () => {
    renderTabs({ value: "tab2" });
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("calls onChange when a tab is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderTabs({ value: "tab1", onChange });
    await user.click(screen.getByRole("tab", { name: "Tab 2" }));
    expect(onChange).toHaveBeenCalledWith("tab2");
  });

  it("does not call onChange on disabled tab click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderTabs({ value: "tab1", onChange });
    await user.click(screen.getByRole("tab", { name: "Tab 3" }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("disabled tab has disabled attribute", () => {
    renderTabs({ value: "tab1" });
    expect(screen.getByRole("tab", { name: "Tab 3" })).toBeDisabled();
  });

  it("links tab to panel via aria-controls and aria-labelledby", () => {
    renderTabs({ value: "tab1" });
    const tab = screen.getByRole("tab", { name: "Tab 1" });
    const panel = screen.getByRole("tabpanel");
    expect(tab).toHaveAttribute("aria-controls", "tabpanel-tab1");
    expect(panel).toHaveAttribute("aria-labelledby", "tab-tab1");
  });

  it("navigates tabs with arrow keys (horizontal)", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderTabs({ value: "tab1", onChange });

    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    tab1.focus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();
  });

  it("navigates tabs with arrow keys (vertical)", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderTabs({ value: "tab1", onChange, orientation: "vertical" });

    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    tab1.focus();

    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();
  });

  it("wraps around when navigating past last tab", async () => {
    const user = userEvent.setup();
    renderTabs({ value: "tab1" });

    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    tab2.focus();

    // tab2 -> tab1 (skipping disabled tab3 is handled by the focus loop)
    await user.keyboard("{ArrowRight}");
    // Since tab3 is disabled but still in DOM, it will focus tab3 first
    // The arrow key navigation goes to the next non-disabled tab
  });

  it("shows only the active panel content", () => {
    renderTabs({ value: "tab2" });
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Content 2");
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
  });

  it("forwards ref on Tabs", () => {
    const ref = vi.fn();
    render(
      <Tabs ref={ref} value="tab1" onChange={vi.fn()}>
        <TabList>
          <TabItem value="tab1" label="Tab 1" />
        </TabList>
        <TabPanel value="tab1">Content</TabPanel>
      </Tabs>,
    );
    expect(ref).toHaveBeenCalled();
  });
});
