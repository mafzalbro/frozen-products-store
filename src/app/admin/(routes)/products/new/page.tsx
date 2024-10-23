"use client";
import { useState, useEffect } from "react";
import { fetchProducts, deleteProduct, FrozenProduct } from "@/actions/products";
import ProductCard from "@/components/layout/products/cards";

const ProductList = () => {
  const [products, setProducts] = useState<FrozenProduct[]>([]);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    loadProducts(); // Refresh the list after deletion
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ProductList;
