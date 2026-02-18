import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the trigger element", () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>,
    );

    expect(screen.getByRole("button", { name: "Hover me" })).toBeInTheDocument();
  });

  it("does not show tooltip by default", () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>,
    );

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows tooltip on hover after delay", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <Tooltip content="Tooltip text" delay={200}>
        <button>Hover me</button>
      </Tooltip>,
    );

    await user.hover(screen.getByRole("button"));

    await act(async () => {
      vi.advanceTimersByTime(200);
    });

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
      expect(screen.getByRole("tooltip")).toHaveTextContent("Tooltip text");
    });
  });

  it("hides tooltip on mouse leave", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );

    await user.hover(screen.getByRole("button"));

    await act(async () => {
      vi.advanceTimersByTime(0);
    });

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    await user.unhover(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  it("shows tooltip on focus", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Focus me</button>
      </Tooltip>,
    );

    await user.tab();

    await act(async () => {
      vi.advanceTimersByTime(0);
    });

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  it("hides tooltip on blur", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Focus me</button>
      </Tooltip>,
    );

    await user.tab();

    await act(async () => {
      vi.advanceTimersByTime(0);
    });

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    await user.tab();

    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  it("sets aria-describedby on trigger when visible", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button");
    expect(trigger).not.toHaveAttribute("aria-describedby");

    await user.hover(trigger);

    await act(async () => {
      vi.advanceTimersByTime(0);
    });

    await waitFor(() => {
      const tooltip = screen.getByRole("tooltip");
      expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
    });
  });

  it("respects delay prop", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <Tooltip content="Tooltip text" delay={500}>
        <button>Hover me</button>
      </Tooltip>,
    );

    await user.hover(screen.getByRole("button"));

    await act(async () => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  it("supports position prop", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const positions = ["top", "bottom", "left", "right"] as const;

    for (const position of positions) {
      const { unmount } = render(
        <Tooltip content="Tooltip text" position={position} delay={0}>
          <button>Hover me</button>
        </Tooltip>,
      );

      await user.hover(screen.getByRole("button"));

      await act(async () => {
        vi.advanceTimersByTime(0);
      });

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });

      unmount();
    }
  });

  it("cancels timeout when mouse leaves before delay completes", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <Tooltip content="Tooltip text" delay={500}>
        <button>Hover me</button>
      </Tooltip>,
    );

    await user.hover(screen.getByRole("button"));

    await act(async () => {
      vi.advanceTimersByTime(100);
    });

    await user.unhover(screen.getByRole("button"));

    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});
