"use client";
import React, { useState } from "react";
import ProductList from "@/components/layout/products/lists";
import ProductForm from "@/components/layout/products/form";

const ProductsPage = () => {
    const [refresh, setRefresh] = useState(false);

    const handleSave = () => {
        setRefresh(!refresh); // Toggle refresh to reload products after save
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="mt-4">Browse through our delicious frozen products.</p>

            {/* Product Form for Adding New Products */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Add New Product</h2>
                <ProductForm onSave={handleSave} />
            </div>

            {/* Product List */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold">Product List</h2>
                <ProductList />
            </div>
        </div>
    );
};

export default ProductsPage;
