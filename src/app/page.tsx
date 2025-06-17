"use client"
import { useState, useMemo } from "react";
import { Filter } from "lucide-react";
import ProductList from "@/components/Product/ProductList";
import { Search } from "@/components/UI/Search";
import { Filter as FilterModal } from "@/components/UI/Filter";
import { products } from "@/Data/products";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"name" | "category">("name");
  
  // Calculate max price from products
  const maxPrice = Math.max(...products.map(p => p.price));
  
  const [priceRange, setPriceRange] = useState({ min: 0, max: maxPrice });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter products based on search and price
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      let matchesSearch = false;
      
      if (searchType === "name") {
        matchesSearch = product.name.toUpperCase().includes(searchQuery.toUpperCase());
      } else {
        matchesSearch = product.category.toUpperCase().includes(searchQuery.toUpperCase());
      }
      
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      
      return matchesSearch && matchesPrice;
    });
  }, [searchQuery, searchType, priceRange]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

  // Check if there's an active search or filter
  const hasActiveFilters = searchQuery || priceRange.min > 0 || priceRange.max < maxPrice;

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl pb-2 font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Discover Amazing Products
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our curated collection of high-quality products at unbeatable prices
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search Type Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setSearchType("name")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      searchType === "name"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Product Name
                  </button>
                  <button
                    onClick={() => setSearchType("category")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      searchType === "category"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Category
                  </button>
                </div>

                {/* Search Bar */}
                <div className="flex-1 w-full">
                  <Search 
                    onSearch={handleSearch} 
                    placeholder={`Search by ${searchType === "name" ? "product name" : "category"}...`}
                    value={searchQuery}
                  />
                </div>
                
                {/* Filter Button */}
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                >
                  <Filter size={18} />
                  Filter by Price
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
                      {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                    </span>
                    <span className="text-sm text-gray-500">
                      (filtered from {products.length} total)
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
          {hasActiveFilters && filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">No products match your search criteria.</p>
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

          {/* Products */}
          {(!hasActiveFilters || filteredProducts.length > 0) && (
            <ProductList products={filteredProducts} />
          )}
        </div>
      </main>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilter={handleFilter}
        maxPrice={maxPrice}
      />
    </>
  );
}
