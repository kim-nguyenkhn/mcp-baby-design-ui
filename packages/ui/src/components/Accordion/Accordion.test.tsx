import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Accordion, AccordionItem } from "./Accordion";

function renderAccordion({
  type = "single" as const,
  defaultValue = [] as string[],
} = {}) {
  return render(
    <Accordion type={type} defaultValue={defaultValue}>
      <AccordionItem value="item1" title="Section 1">
        Content 1
      </AccordionItem>
      <AccordionItem value="item2" title="Section 2">
        Content 2
      </AccordionItem>
      <AccordionItem value="item3" title="Section 3" disabled>
        Content 3
      </AccordionItem>
    </Accordion>,
  );
}

describe("Accordion", () => {
  it("renders all item titles", () => {
    renderAccordion();
    expect(screen.getByText("Section 1")).toBeInTheDocument();
    expect(screen.getByText("Section 2")).toBeInTheDocument();
    expect(screen.getByText("Section 3")).toBeInTheDocument();
  });

  it("expands an item on click", async () => {
    const user = userEvent.setup();
    renderAccordion();
    const trigger = screen.getByText("Section 1").closest("button")!;
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("collapses other items in single mode", async () => {
    const user = userEvent.setup();
    renderAccordion({ type: "single" });

    const trigger1 = screen.getByText("Section 1").closest("button")!;
    const trigger2 = screen.getByText("Section 2").closest("button")!;

    await user.click(trigger1);
    expect(trigger1).toHaveAttribute("aria-expanded", "true");

    await user.click(trigger2);
    expect(trigger2).toHaveAttribute("aria-expanded", "true");
    expect(trigger1).toHaveAttribute("aria-expanded", "false");
  });

  it("allows multiple items open in multiple mode", async () => {
    const user = userEvent.setup();
    renderAccordion({ type: "multiple" });

    const trigger1 = screen.getByText("Section 1").closest("button")!;
    const trigger2 = screen.getByText("Section 2").closest("button")!;

    await user.click(trigger1);
    await user.click(trigger2);

    expect(trigger1).toHaveAttribute("aria-expanded", "true");
    expect(trigger2).toHaveAttribute("aria-expanded", "true");
  });

  it("collapses an expanded item on click", async () => {
    const user = userEvent.setup();
    renderAccordion();
    const trigger = screen.getByText("Section 1").closest("button")!;

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("does not expand disabled item", async () => {
    const user = userEvent.setup();
    renderAccordion();
    const trigger = screen.getByText("Section 3").closest("button")!;
    expect(trigger).toBeDisabled();
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("respects defaultValue", () => {
    renderAccordion({ defaultValue: ["item2"] });
    const trigger2 = screen.getByText("Section 2").closest("button")!;
    expect(trigger2).toHaveAttribute("aria-expanded", "true");
  });

  it("has proper ARIA linking between trigger and panel", () => {
    renderAccordion({ defaultValue: ["item1"] });
    const trigger = screen.getByText("Section 1").closest("button")!;
    const panelId = trigger.getAttribute("aria-controls");
    expect(panelId).toBe("accordion-panel-item1");
    const panel = document.getElementById(panelId!);
    expect(panel).toHaveAttribute("role", "region");
    expect(panel).toHaveAttribute("aria-labelledby", trigger.id);
  });

  it("forwards ref on Accordion", () => {
    const ref = vi.fn();
    render(
      <Accordion ref={ref}>
        <AccordionItem value="item1" title="Test">
          Content
        </AccordionItem>
      </Accordion>,
    );
    expect(ref).toHaveBeenCalled();
  });
});
