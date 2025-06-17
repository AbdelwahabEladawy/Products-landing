"use client";

import { useCartContext } from "@/Hooks/useCartContext";
import { Button } from "@/components/UI/Button";
import { Modal } from "@/components/UI/Modal";
import { Search } from "@/components/UI/Search";
import { Filter } from "@/components/UI/Filter";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
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
  
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 999 });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
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

  // Calculate max price from cart items
  const maxPrice = Math.max(...items.map(item => item.price), 999);

  // Filter cart items based on search and price
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toUpperCase().includes(searchQuery.toUpperCase());
      const matchesPrice = item.price >= priceRange.min && item.price <= priceRange.max;
      
      return matchesSearch && matchesPrice;
    });
  }, [items, searchQuery, priceRange]);

  // Check if there's an active search or filter
  const hasActiveFilters = searchQuery || priceRange.min > 0 || priceRange.max < maxPrice;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

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
          <p className="text-xl text-gray-600 mb-8">Looks like you have not added any products yet!</p>
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
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Shopping Cart
            </h1>
            <p className="text-xl text-gray-600">
              You have {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search Bar */}
                <div className="flex-1 w-full">
                  <Search onSearch={handleSearch} placeholder="Search cart by product name..." />
                </div>
                
                {/* Filter Button */}
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                >
                  🔍 Filter
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary - Only show when there's active search or filter */}
          {hasActiveFilters && (
            <div className="mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-gray-800">
                      {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
                    </span>
                    <span className="text-sm text-gray-500">
                      (filtered from {items.length} total)
                    </span>
                  </div>
                  
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setPriceRange({ min: 0, max: maxPrice });
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* No Results Message */}
          {hasActiveFilters && filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No items found</h3>
              <p className="text-gray-500 mb-4">No cart items match your search criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setPriceRange({ min: 0, max: maxPrice });
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Cart Items - Only show if no filters or if there are filtered results */}
          {(!hasActiveFilters || filteredItems.length > 0) && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Cart Items</h2>
                  <div className="space-y-6">
                    {filteredItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-800 truncate">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-blue-600">${item.price}</span>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <Button
                            variant="default"
                            onClick={() => handleDecreaseQuantity(item)}
                            className="w-10 h-10 rounded-full p-0 flex items-center justify-center text-lg font-bold"
                          >
                            {item.quantity === 1 ? '🗑️' : '-'}
                          </Button>
                          
                          <span className="text-lg font-bold text-gray-800 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="primary"
                            onClick={() => handleIncreaseQuantity(item)}
                            className="w-10 h-10 rounded-full p-0 flex items-center justify-center text-lg font-bold"
                          >
                            +
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Subtotal</p>
                          <p className="text-lg font-bold text-green-600">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cart Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Items ({hasActiveFilters ? filteredItems.length : totalItems})
                      </span>
                      <span className="font-semibold">
                        ${hasActiveFilters 
                          ? filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)
                          : totalPrice.toFixed(2)
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-800">Total</span>
                        <span className="text-2xl font-bold text-blue-600">
                          ${hasActiveFilters 
                            ? filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)
                            : totalPrice.toFixed(2)
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Link href="/checkout">
                      <Button variant="success" className="w-full text-lg py-4">
                        💳 Proceed to Checkout
                      </Button>
                    </Link>
                    <Button 
                      variant="danger" 
                      onClick={handleClearCart}
                      className="w-full"
                    >
                      🗑️ Clear Cart
                    </Button>
                    <Link href="/">
                      <Button variant="default" className="w-full">
                        ← Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Modal */}
      <Filter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilter={handleFilter}
        maxPrice={maxPrice}
      />

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
