"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchProductBySlug } from "@/actions/products";
import type { FrozenProduct } from "@/types/index";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/cart-context";
import GoBack from "@/components/layout/goback";

const ProductDetails = ({ params: { slug } }: { params: { slug: string } }) => {
    const [product, setProduct] = useState<FrozenProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1); // State for quantity
    const { addToCart } = useCart();

    // Fetch product details based on the slug
    const loadProduct = useCallback(async () => {
        setLoading(true);
        const data = await fetchProductBySlug(slug);
        setProduct(data[0]);
        setLoading(false);
    }, [slug]);

    useEffect(() => {
        if (slug) {
            loadProduct();
        }
    }, [slug, loadProduct]);

    if (loading) {
        return <div className="text-center mt-8 p-8 h-60">Loading...</div>;
    }

    if (!product) {
        return <div className="text-center mt-8 p-8 h-60">Product not found</div>;
    }

    // Handle add to cart
    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
    };

    return (
        <div className="p-6 max-w-4xl mx-auto my-10">
           <GoBack link='/products'>
                See All Products
            </GoBack>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex justify-center">
                    <Image
                        height={360}
                        width={640}
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-auto rounded-lg shadow-md object-cover"
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <p className="mt-4 text-gray-700 dark:text-gray-400">{product.description}</p>
                        <p className="mt-2 text-lg font-semibold">Price: ${product.price}</p>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">Category: {product.category}</p>
                    </div>
                    <div className="flex items-center mt-4">
                        <Button
                            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                            disabled={quantity <= 1}
                            className="flex-shrink-0"
                        >
                            -
                        </Button>
                        <span className="mx-4 text-lg">{quantity}</span>
                        <Button onClick={() => setQuantity((prev) => prev + 1)} className="flex-shrink-0">
                            +
                        </Button>
                    </div>
                    <Button onClick={handleAddToCart} className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
