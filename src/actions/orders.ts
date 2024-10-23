"use server"

// src/app/actions/fetchOrders.ts
import { cookies } from 'next/headers';
import orders from '@/store/orders.json';
import { Order } from '@/types'

// Fetch all orders for the authenticated user
export const fetchUserOrders = async (): Promise<Order[]> => {
    const userCookie = cookies().get('user'); // Get the authenticated user from cookies
    if (!userCookie) {
        console.log("No user authenticated.");
        return []; // Return an empty array if no user is authenticated
    }
    console.log(userCookie);
    
    const userId = JSON.parse(userCookie.value).id; // Extract user ID from cookie
    console.log(`Fetching all orders for user ID: ${userId}`);
    
    // Filter orders by authenticated user ID
    return orders.filter(order => order.customerId === userId);
};

// Fetch order by ID for the authenticated user
export const fetchUserOrderById = async (id: number): Promise<Order | undefined> => {
    const userCookie = cookies().get('user'); // Get the authenticated user from cookies
    if (!userCookie) {
        console.log("No user authenticated.");
        return undefined; // Return undefined if no user is authenticated
    }
    
    const userId = JSON.parse(userCookie.value).id; // Extract user ID from cookie
    console.log(`Fetching order by ID: ${id} for user ID: ${userId}`);
    
    // Find the order by ID and check if it belongs to the authenticated user
    return orders.find(order => order.id === id && order.customerId === userId);
};

// Create a new order for the authenticated user
export const createOrder = async (order: Order): Promise<Order> => {
    const userCookie = cookies().get('user'); // Get the authenticated user from cookies
    if (!userCookie) {
        throw new Error("User not authenticated");
    }

    const userId = JSON.parse(userCookie.value).id; // Extract user ID from cookie
    console.log(`Creating new order for customer: ${order.customerName} for user ID: ${userId}`);
    
    // Attach user ID to the order
    order.customerId = userId;
    // Normally, you would send this to an API or save it in your database
    return order;
};

// Update an existing order for the authenticated user
export const updateOrder = async (order: Order): Promise<Order> => {
    const userCookie = cookies().get('user'); // Get the authenticated user from cookies
    if (!userCookie) {
        throw new Error("User not authenticated");
    }

    const userId = JSON.parse(userCookie.value).id; // Extract user ID from cookie
    console.log(`Updating order ID: ${order.id} for user ID: ${userId}`);
    
    // Normally, you'd send this to an API. Ensure the order belongs to the user.
    if (order.customerId !== userId) {
        throw new Error("You do not have permission to update this order");
    }
    
    return order; // Return the updated order
};

// Delete an order for the authenticated user
export const deleteOrder = async (id: number): Promise<void> => {
    const userCookie = cookies().get('user'); // Get the authenticated user from cookies
    if (!userCookie) {
        throw new Error("User not authenticated");
    }

    const userId = JSON.parse(userCookie.value).id; // Extract user ID from cookie
    console.log(`Deleting order with id: ${id} for user ID: ${userId}`);
    
    // Normally, you'd delete this via an API. Ensure the order belongs to the user.
    const order = orders.find(order => order.id === id);
    if (order && order.customerId !== userId) {
        throw new Error("You do not have permission to delete this order");
    }
};
