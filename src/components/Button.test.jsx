import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "./Button";

describe("Button Component", () => {
  it("renders button with the provided text", () => {
    render(<Button text="Explore Catalog" />);
    expect(screen.getByText("Explore Catalog")).toBeInTheDocument();
  });

  it("triggers onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button text="Add to Cart" onClick={handleClick} />);

    fireEvent.click(screen.getByText("Add to Cart"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});