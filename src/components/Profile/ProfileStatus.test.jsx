import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"; // for using  toBeInTheDocument
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  it("status from props should be rendered in span", () => {
    render(<ProfileStatus status="Hello world will be mine" updateStatus={() => {}} />);
    expect(screen.getByText("Hello world will be mine")).toBeInTheDocument();
  });

  it("renders span with correct status", () => {
    render(<ProfileStatus status="Hello world will be mine" updateStatus={() => {}} />);
    const spanElement = screen.getByText("Hello world will be mine");
    expect(spanElement.tagName).toBe("SPAN");
  });

  it("displays input on double click", async () => {
    const user = userEvent.setup();
    render(<ProfileStatus status="Hello world will be mine" updateStatus={() => {}} />);
    const spanElement = screen.getByText("Hello world will be mine");
    await user.dblClick(spanElement);
    const inputElement = screen.getByDisplayValue("Hello world will be mine");
    expect(inputElement).toBeDefined();
  });
});
