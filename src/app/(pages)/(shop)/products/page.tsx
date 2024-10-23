"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchProducts } from "@/actions/products";
import { FrozenProduct } from "@/types/index";
import ProductCard from "@/components/layout/products/cards";
import Pagination from "@/components/layout/products/pagination";
import SearchFilter from "@/components/layout/products/search-filter";

const ProductsPage = () => {
  const [products, setProducts] = useState<FrozenProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  // Memoize loadProducts using useCallback to avoid unnecessary re-creation
  const loadProducts = useCallback(async () => {
    const data = await fetchProducts({ page: currentPage, searchQuery, category });
    setProducts(data);
    // Assuming total pages data is fetched from API response
    setTotalPages(5); // Example total pages, replace with actual data from API
  }, [currentPage, searchQuery, category]);

  // Effect now depends on the memoized loadProducts function
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div className="p-4 md:p-6 w-screen overflow-x-hidden">
      <h1 className="text-3xl font-bold my-4 mb-6 mx-5">Products</h1>
      <SearchFilter
        onSearchChange={setSearchQuery}
        onCategoryChange={setCategory}
        categories={["Pizza", "Chicken", "Vegetables", "Desserts"]} // Example categories
      />
      <div className="flex flex-wrap">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default ProductsPage;
