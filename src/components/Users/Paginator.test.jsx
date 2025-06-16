import React from "react";
import { describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { Paginator } from "./Paginator";

describe("Paginator component test", () => {
  it("pages count is 11 but should be showed only 10", () => {
    const { container } = render(<Paginator totalIemsCount={11} pageSize={1} portionSize={10} />);
    const spans = container.querySelectorAll("span");

    expect(spans.length).toBe(10);
  });

  it("there is a button in our component", () => {
    render(<Paginator totalIemsCount={11} pageSize={1} portionSize={10} />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDefined();
  });
});
