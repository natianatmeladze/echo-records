import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { CartProvider, useCart } from "./CartContext";

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

const mockAlbum = {
  id: 101,
  title: "The Dark Side of the Moon",
  artist: "Pink Floyd",
  price: "$30.00",
};

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds an item to the cart, updates totalItems, and saves to localStorage", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockAlbum);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.totalItems).toBe(1);

    const saved = JSON.parse(localStorage.getItem("echo_records_cart"));
    expect(saved).toHaveLength(1);
    expect(saved[0].title).toBe("The Dark Side of the Moon");
  });

  it("increments and decrements item quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockAlbum);
      result.current.updateQuantity(101, 2);
    });

    expect(result.current.totalItems).toBe(3);

    act(() => {
      result.current.updateQuantity(101, -1);
    });

    expect(result.current.totalItems).toBe(2);
  });

  it("removes item and clears the cart and localStorage", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockAlbum);
      result.current.removeFromCart(101);
    });

    expect(result.current.cart).toHaveLength(0);

    act(() => {
      result.current.addToCart(mockAlbum);
      result.current.clearCart();
    });

    expect(result.current.totalItems).toBe(0);
    expect(localStorage.getItem("echo_records_cart")).toBe("[]");
  });
});