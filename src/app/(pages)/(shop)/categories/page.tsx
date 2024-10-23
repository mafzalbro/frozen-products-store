"use client";

import React, { useEffect, useState } from 'react';
import { fetchCategories } from '@/actions/categories';
import { Category } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

const CategoriesPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchCategories({});
            setCategories(result);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="p-6 relative">
                <h1 className="text-3xl font-bold">Loading categories...</h1>
                <div className="flex gap-6 mt-6">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="shadow-md p-4 rounded-lg">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-8 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 relative">
            <h1 className="text-3xl font-bold">Categories</h1>
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">Explore our wide range of frozen products categorized for your convenience.</p>
            <div className="flex gap-6 mt-6">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="shadow-md p-4 rounded-lg transition-transform transform hover:scale-95 duration-200 border gap-2"
                    >
                        <h2 className="text-xl font-semibold">{category.name}</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">{category.description}</p>
                        <Link href={`/categories/${category.slug}`} passHref>
                            <Button className="mt-4 px-4 py-2 bg-blue-500 text-white">
                                View Products
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesPage;
