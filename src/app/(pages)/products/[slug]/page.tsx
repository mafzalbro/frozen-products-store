// src/app/pages/products/[slug]/page.tsx
import React from 'react';  
const ProductDetailPage = ({ params: { slug } }: { params: { slug: string } }) => {

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Product: {slug}</h1>
            <p className="mt-4">Details about the frozen product: {slug}</p>
            {/* Display product details here */}
        </div>
    );
};

export default ProductDetailPage;
