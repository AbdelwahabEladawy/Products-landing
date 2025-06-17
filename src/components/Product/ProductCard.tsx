"use client";

import { Product } from "@/Types/product";
import { Button } from "@/components/UI/Button";
import { Badge } from "@/components/UI/Badge";
import Image from "next/image";
import { useCartContext } from "@/Hooks/useCartContext";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartContext();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart! 🛒`, {
      icon: '🛍️',
    });
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform h-full flex flex-col">
      <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden flex-shrink-0">
        <Image
          src={product.image}
          alt={`Image of ${product.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5 sm:p-6 flex flex-col gap-3 sm:gap-4 flex-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 flex-1 min-w-0">
            {product.name}
          </h3>
          <Badge label={product.category} className="flex-shrink-0" />
        </div>

        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-3 mt-auto pt-2">
          <p className="text-xl sm:text-2xl font-bold text-blue-600 flex-shrink-0">
            ${product.price}
          </p>
          <Button
            className="px-4 sm:px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-sm sm:text-base flex-shrink-0"
            aria-label={`Add ${product.name} to cart`}
            onClick={handleAddToCart}
            variant="primary"
          >
            ➕ Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
