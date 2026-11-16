import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Trash2, Plus, Minus, ArrowLeft, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import Button from "../components/Button";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => {
    const numericPrice = parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0;
    return sum + numericPrice * item.quantity;
  }, 0);

  const shipping = cart.length > 0 ? 5.0 : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#8B0000", "#ffffff", "#27272a"],
    });
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center justify-center px-6 text-center gap-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-4 rounded-full bg-[#8B0000]/20 text-[#8B0000]"
        >
          <Check className="w-10 h-10" />
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-normal uppercase tracking-tight">
          Order Confirmed
        </h1>
        <p className="text-zinc-400 text-sm max-w-md">
          Thank you for shopping at Echo Records. Your vinyl records are being carefully packed and will ship soon.
        </p>
        <Button
          text="Continue Shopping"
          bg="bg-white hover:bg-zinc-200"
          textColor="text-black text-xs font-semibold uppercase tracking-wider py-3 px-8"
          onClick={() => navigate("/shop")}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white py-12 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl sm:text-5xl font-normal uppercase tracking-tight">
              YOUR CART
            </h1>
            <p className="text-zinc-400 text-xs mt-1">
              Review your selected vinyl pressings before checkout
            </p>
          </div>
          <button
            onClick={() => navigate("/shop")}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center gap-6">
            <p className="text-zinc-500 text-sm">Your cart is currently empty.</p>
            <Button
              text="Explore Catalog"
              bg="bg-[#8B0000] hover:bg-red-800"
              textColor="text-white text-xs font-semibold uppercase tracking-wider py-3 px-8"
              onClick={() => navigate("/shop")}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 flex flex-col divide-y divide-zinc-800">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-6 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={item.cover || item.image}
                      alt={item.title}
                      className="w-20 h-20 rounded-lg object-cover bg-zinc-900 border border-zinc-800 shrink-0"
                    />
                    <div>
                      <h3 className="text-sm sm:text-base font-medium text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5">{item.artist}</p>
                      <p className="text-xs text-zinc-300 font-semibold mt-2">
                        {item.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 self-end sm:self-center">
                    <div className="flex items-center gap-3 border border-zinc-800 rounded-full px-3 py-1.5 bg-zinc-900/50">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                        className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-medium w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                        className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                      className="text-zinc-500 hover:text-red-500 transition-colors cursor-pointer p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider border-b border-zinc-800 pb-4">
                Order Summary
              </h2>

              <div className="flex flex-col gap-3 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Protective Vinyl Shipping</span>
                  <span className="text-white">${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-zinc-800 pt-3 flex justify-between text-sm font-semibold text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-[#8B0000] hover:bg-red-800 text-white text-xs font-semibold uppercase tracking-wider py-3.5 rounded-full transition-colors cursor-pointer mt-2"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;