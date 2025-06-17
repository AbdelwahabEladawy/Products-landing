"use client";
import { Product } from "@/Types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
