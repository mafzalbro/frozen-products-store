// import axios from 'axios';

import categories from '@/store/categories.json'
import { Category } from '@/types/index'

interface FetchProductParams {
    page?: number;
    searchQuery?: string;
    priceRage?: string;
}

// Fetch all categories
export const fetchCategories = async ({ page = 1, searchQuery = "", priceRage = "" }: FetchProductParams): Promise<Category[]> => {
    console.log(page, searchQuery, priceRage);

    console.log("Fetching all categories");
    return categories;
};

// Fetch category by slug
export const fetchCategoryBySlug = async (slug: string): Promise<Category | undefined> => {
    console.log(`Fetching category by slug: ${slug}`);
    return categories.find((category) => category.slug === slug);
};

// Create a new category
export const createCategory = async (category: Category): Promise<Category> => {
    console.log(`Creating new category: ${category.name}`);
    // Normally, you would send this to an API.
    return category;
};

// Update an existing category
export const updateCategory = async (category: Category): Promise<Category> => {
    console.log(`Updating category: ${category.name}`);
    // Normally, you'd send this to an API.
    return category;
};

// Delete a category
export const deleteCategory = async (id: number): Promise<void> => {
    console.log(`Deleting category with id: ${id}`);
    // Normally, you'd delete this via an API.
};
