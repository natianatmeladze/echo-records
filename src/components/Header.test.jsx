import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router";
import { CartProvider } from "../context/CartContext";
import Header from "./Header";

describe("Header Component", () => {
  const renderHeader = () =>
    render(
      <MemoryRouter>
        <CartProvider>
          <Header />
        </CartProvider>
      </MemoryRouter>
    );

  it("renders navigation links and initial cart count", () => {
    renderHeader();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("Artists")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("toggles mobile burger menu when clicked", () => {
    renderHeader();
    const toggleBtn = screen.getByLabelText("Toggle Menu");

    expect(screen.getAllByText("Shop")).toHaveLength(1);

    fireEvent.click(toggleBtn);
    expect(screen.getAllByText("Shop")).toHaveLength(2);
  });
});