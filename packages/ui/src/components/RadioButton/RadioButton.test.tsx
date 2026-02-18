import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { RadioGroup, RadioButton } from "./RadioButton";

describe("RadioButton", () => {
  const renderGroup = (props: {
    value: string;
    onChange?: (v: string) => void;
    orientation?: "horizontal" | "vertical";
  }) => {
    const onChange = props.onChange ?? vi.fn();
    return render(
      <RadioGroup value={props.value} onChange={onChange} orientation={props.orientation}>
        <RadioButton value="a" label="Option A" />
        <RadioButton value="b" label="Option B" />
        <RadioButton value="c" label="Option C" disabled />
      </RadioGroup>,
    );
  };

  it("renders a radiogroup with radio buttons", () => {
    renderGroup({ value: "a" });
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("marks the selected radio as checked", () => {
    renderGroup({ value: "a" });
    const radios = screen.getAllByRole("radio");
    expect(radios[0]).toHaveAttribute("aria-checked", "true");
    expect(radios[1]).toHaveAttribute("aria-checked", "false");
    expect(radios[2]).toHaveAttribute("aria-checked", "false");
  });

  it("calls onChange when clicking a radio", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderGroup({ value: "a", onChange });
    await user.click(screen.getAllByRole("radio")[1]);
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("only allows one selection at a time", () => {
    renderGroup({ value: "b" });
    const radios = screen.getAllByRole("radio");
    expect(radios[0]).toHaveAttribute("aria-checked", "false");
    expect(radios[1]).toHaveAttribute("aria-checked", "true");
  });

  it("does not call onChange for disabled radio", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderGroup({ value: "a", onChange });
    await user.click(screen.getAllByRole("radio")[2]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders labels", () => {
    renderGroup({ value: "a" });
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByText("Option B")).toBeInTheDocument();
    expect(screen.getByText("Option C")).toBeInTheDocument();
  });

  it("supports horizontal orientation", () => {
    renderGroup({ value: "a", orientation: "horizontal" });
    const group = screen.getByRole("radiogroup");
    expect(group.className).toContain("flex-row");
  });

  it("supports vertical orientation", () => {
    renderGroup({ value: "a", orientation: "vertical" });
    const group = screen.getByRole("radiogroup");
    expect(group.className).toContain("flex-col");
  });
});
