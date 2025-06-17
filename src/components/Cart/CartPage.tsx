"use client";

import { useCartContext } from "@/Hooks/useCartContext";
import { Button } from "@/components/UI/Button";
import { Modal } from "@/components/UI/Modal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export default function CartPage() {
  const { items, removeFromCart, clearCart, totalItems, totalPrice, increaseQuantity, decreaseQuantity } = useCartContext();
  
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const showModal = (title: string, message: string, onConfirm: () => void) => {
    setModalConfig({
      isOpen: true,
      title,
      message,
      onConfirm,
    });
  };

  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  const handleDecreaseQuantity = (item: CartItem) => {
    if (item.quantity === 1) {
      showModal(
        "Remove Item",
        `Are you sure you want to remove "${item.name}" from your cart?`,
        () => {
          removeFromCart(item.id);
          toast.success(`${item.name} removed from cart! 🗑️`);
        }
      );
    } else {
      decreaseQuantity(item.id);
      toast.success(`Quantity updated for ${item.name}! 📦`);
    }
  };

  const handleIncreaseQuantity = (item: CartItem) => {
    increaseQuantity(item.id);
    toast.success(`Quantity updated for ${item.name}! 📦`);
  };

  const handleClearCart = () => {
    showModal(
      "Clear Cart",
      "Are you sure you want to clear your entire cart? This action cannot be undone.",
      () => {
        clearCart();
        toast.success("Cart cleared! 🗑️");
      }
    );
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
          <p className="text-xl text-gray-700 mb-8">Looks like you have not added any products yet!</p>
          <Link href="/">
            <Button variant="primary" className="text-lg px-8 py-4">
              🛍️ Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Shopping Cart
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              You have {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">Cart Items</h2>
                <div className="space-y-4 md:space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 64px, 80px"
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate">{item.name}</h3>
                          <p className="text-xs md:text-sm text-gray-600">{item.category}</p>
                          <div className="flex items-center justify-between sm:justify-start gap-2 mt-1">
                            <span className="text-base md:text-lg font-bold text-blue-600">${item.price}</span>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 md:gap-3">
                          <Button
                            variant="default"
                            onClick={() => handleDecreaseQuantity(item)}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full p-0 flex items-center justify-center text-sm md:text-lg font-bold"
                          >
                            {item.quantity === 1 ? '🗑️' : '-'}
                          </Button>
                          
                          <span className="text-base md:text-lg font-bold text-gray-800 min-w-[1.5rem] md:min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="primary"
                            onClick={() => handleIncreaseQuantity(item)}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full p-0 flex items-center justify-center text-sm md:text-lg font-bold"
                          >
                            +
                          </Button>
                        </div>
                        
                        <div className="text-right sm:text-left">
                          <p className="text-xs md:text-sm text-gray-500">Subtotal</p>
                          <p className="text-base md:text-lg font-bold text-green-600">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 sticky top-24">
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base text-gray-700">Items ({totalItems})</span>
                    <span className="text-sm md:text-base font-semibold text-gray-800">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base text-gray-700">Shipping</span>
                    <span className="text-sm md:text-base font-semibold text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg md:text-xl font-bold text-gray-800">Total</span>
                      <span className="text-xl md:text-2xl font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4 ">
                  <Link href="/checkout">
                    <Button variant="success" className="w-full text-sm md:text-base mb-3">
                      💳 Proceed to Checkout
                    </Button>
                  </Link>
                  <Button 
                    variant="danger" 
                    onClick={handleClearCart}
                    className="w-full text-sm md:text-base"
                  >
                    🗑️ Clear Cart
                  </Button>
                  <Link href="/">
                    <Button variant="default" className="w-full text-sm md:text-base">
                      ← Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText="Yes, Remove"
        cancelText="Cancel"
      />
    </>
  );
}
