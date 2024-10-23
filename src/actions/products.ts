// import axios from 'axios';

import products from '@/store/products.json'
import { FrozenProduct } from '@/types/index'

interface FetchProductParams {
    page?: number;
    searchQuery?: string;
    category?: string;
    priceRage?: string;
}

// Fetch all frozen products
export const fetchProducts = async ({ page = 1, searchQuery = "", category = "", priceRage = "" }: FetchProductParams): Promise<FrozenProduct[]> => {
    // const res = await fetch(`/api/products?page=${page}&search=${searchQuery}&category=${category}`);
    // const data = await res.json();
    console.log(page, searchQuery, category, priceRage = "");


    return products

    // return data.products; // Assuming the response has a `products` field
};
// Fetch by slug frozen products
export const fetchProductBySlug = async (slug: string) => {
    // const res = await fetch(`/api/products?page=${page}&search=${searchQuery}&category=${category}`);
    // const data = await res.json();
    console.log(slug);
    return products.filter(product => product.slug == slug)

    // return data.products; // Assuming the response has a `products` field
};

// Create a new frozen product
export const createProduct = async (product: FrozenProduct): Promise<FrozenProduct> => {
    // const response = await axios.post('/api/products', product);
    // return response.data;
    console.log(product);
    return product

};


// Update an existing frozen product
export const updateProduct = async (product: FrozenProduct): Promise<FrozenProduct> => {
    console.log(product);
    // const response = await axios.put(`/api/products/${product.id}`, product);
    // return response.data;
    return product
};

// Delete a frozen product
export const deleteProduct = async (id: number): Promise<void> => {
    console.log(id);
    // await axios.delete(`/api/products/${id}`);
};
