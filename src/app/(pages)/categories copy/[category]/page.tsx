// src/app/pages/categories/[category]/page.tsx
import React from 'react';
const CategoryPage = ({ params: { category } }: { params: { category: string } }) => {

    console.log(category);


    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold capitalize">{category}</h1>
            <p className="mt-4">Showing products for category: {category}</p>
            {/* List products in this category here */}
        </div>
    );
};

export default CategoryPage;
