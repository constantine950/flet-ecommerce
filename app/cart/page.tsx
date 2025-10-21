"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../_context/CartContext";
import { useState } from "react";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [isPaying, setIsPaying] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePay = () => {
    setIsPaying(true);
    setTimeout(() => {
      alert("Payment successful! 🎉 Thank you for shopping with Flet.");
      clearCart();
      setIsPaying(false);
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <main className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty 🛍️</h1>
        <p className="text-gray-600 mb-6">
          Looks like you haven’t added anything yet.
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Start Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Your Bag</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-gray-50 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div>
                <h2 className="font-semibold text-gray-800">{item.title}</h2>
                <p className="text-blue-600 font-medium">${item.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-2 py-1 border rounded-full hover:bg-gray-100 disabled:opacity-50"
                  >
                    −
                  </button>
                  <span className="text-gray-800 font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 border rounded-full hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-gray-700 font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-sm mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total + Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-6 gap-4">
        <p className="text-lg font-semibold text-gray-800">
          Total: <span className="text-blue-600">${total.toFixed(2)}</span>
        </p>

        <div className="flex space-x-4">
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition"
          >
            Clear Cart
          </button>

          <button
            onClick={handlePay}
            disabled={isPaying}
            className={`${
              isPaying
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white px-6 py-2 rounded-full transition`}
          >
            {isPaying ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
