"use client";

import { useState } from "react";

interface FilterProps {
  onFilter: (minPrice: number, maxPrice: number) => void;
  maxPrice: number;
  isOpen: boolean;
  onClose: () => void;
}

export const Filter = ({ onFilter, maxPrice, isOpen, onClose }: FilterProps) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPriceRange, setMaxPriceRange] = useState("");

  const handleFilter = () => {
    const min = parseInt(minPrice) || 0;
    const max = parseInt(maxPriceRange) || maxPrice;
    onFilter(min, max);
    onClose();
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPriceRange("");
    onFilter(0, maxPrice);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            🔍 Filter Products
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            ✕
          </button>
        </div>

        {/* Price Range Inputs */}
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Price Range</h4>
            
            <div className="space-y-4">
              {/* From Price */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  From Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    min="0"
                    max={maxPrice}
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700"
                  />
                </div>
              </div>

              {/* To Price */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  To Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    min={parseInt(minPrice) || 0}
                    max={maxPrice}
                    value={maxPriceRange}
                    onChange={(e) => setMaxPriceRange(e.target.value)}
                    placeholder={maxPrice.toString()}
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Price Display */}
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Price Range:</span>
                <span className="font-bold text-blue-600">
                  ${minPrice || 0} - ${maxPriceRange || maxPrice}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200"
          >
            Reset
          </button>
          <button
            onClick={handleFilter}
            className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors duration-200"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}; 