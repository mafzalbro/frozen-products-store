"use client";

import React, { useEffect, useState } from 'react';
import { fetchCategoryBySlug } from '@/actions/categories';
import { fetchProducts } from '@/actions/products';
import { FrozenProduct, Category } from '@/types';
import ProductCard from '@/components/layout/products/cards';
import GoBack from '@/components/layout/goback';
import { Skeleton } from '@/components/ui/skeleton';

const CategoryPage = ({ params: { category } }: { params: { category: string } }) => {
    const [categoryData, setCategoryData] = useState<Category | null>(null);
    const [products, setProducts] = useState<FrozenProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedCategory = await fetchCategoryBySlug(category);
            setCategoryData(fetchedCategory || null);

            if (fetchedCategory) {
                const productsInCategory = await fetchProducts({ searchQuery: '', category: fetchedCategory.slug });
                setProducts(productsInCategory);
            }
            setLoading(false);
        };

        fetchData();
    }, [category]);

    if (loading) {
        return (
            <div className="p-6">
                <GoBack link='/categories'>
                    See All Categories
                </GoBack>
                <h1 className="text-3xl font-bold capitalize">Loading category...</h1>
                <Skeleton className="mt-4 h-8 w-1/2" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="shadow-md p-4 rounded-lg">
                            <Skeleton className="h-4 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-6 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!categoryData) {
        return <p>Category not found.</p>;
    }

    return (
        <div className="p-6">
            <GoBack link='/categories'>
                See All Categories
            </GoBack>
            <h1 className="text-3xl font-bold capitalize">Category: {categoryData.name}</h1>
            <p className="mt-4">Showing products for category:{" "}
                <span className='font-semibold'>{categoryData.name}</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>No products found in this category.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
