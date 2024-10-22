"use server";

import { cookies } from "next/headers";
import { signJwt, verifyJwt } from "@/actions/jwt";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const COOKIE_NAME = "authToken";
const COOKIE_USER_NAME = "user";

// Path to users.json file
const USERS_FILE_PATH = path.join(process.cwd(), "src/store/users.json");

// Helper function to read the users from the JSON file
const readUsers = () => {
  const data = fs.readFileSync(USERS_FILE_PATH, "utf8");
  return JSON.parse(data);
};

// Helper function to write the users to the JSON file
const writeUsers = (users: any) => {
  fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2), "utf8");
};

// Register new user
export const register = async (data: {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: { street: string; city: string; state: string; zip: string };
  agreeToTerms: boolean;
}) => {
  // Validation
  if (data.password !== data.confirmPassword) {
    return { success: false, message: "Passwords do not match" };
  }

  // Read users from the file
  const users = readUsers();

  // Check if user already exists
  const userExists = users.find((user: any) => user.email === data.email);
  if (userExists) {
    return { success: false, message: "Email already registered" };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Add new user to the users list
  users.push({
    email: data.email,
    username: data.username,
    password: hashedPassword,
    fullName: data.fullName,
    phone: data.phone,
    address: data.address,
  });

  // Write updated users list to file
  writeUsers(users);

  // Create JWT
  const token = signJwt({ email: data.email });

  // Set JWT as cookie
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true, // Prevent access from JavaScript
    maxAge: 60 * 60, // 1 hour
    path: "/", // Available on all routes
    sameSite: "strict", // CSRF protection
  });

  console.log(JSON.stringify(data));
  
  cookies().set(COOKIE_USER_NAME, JSON.stringify(data), {
    httpOnly: true, // Prevent access from JavaScript
    maxAge: 60 * 60, // 1 hour
    path: "/", // Available on all routes
    sameSite: "strict", // CSRF protection
  });

  return { success: true, message: "Successfully registered" };
};

// Login
export const login = async (data: { userInput: string; password: string }) => {
  const { userInput, password } = data;

  // Read users from the file
  const users = readUsers();

  // Find user by email or username
  const user = users.find(
    (user: any) => user.email === userInput || user.username === userInput
  );

  if (!user) {
    return { success: false, message: "Invalid credentials" };
  }

  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { success: false, message: "Invalid credentials" };
  }

  // Create JWT
  const token = signJwt({ email: user.email });

  // Set JWT as cookie
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true, // Prevent access from JavaScript
    maxAge: 60 * 60, // 1 hour
    path: "/", // Available on all routes
    sameSite: "strict", // CSRF protection
  });

  
  console.log(JSON.stringify(user));
  
  cookies().set(COOKIE_USER_NAME, JSON.stringify(user), {
    httpOnly: true, // Prevent access from JavaScript
    maxAge: 60 * 60, // 1 hour
    path: "/", // Available on all routes
    sameSite: "strict", // CSRF protection
  });

  return { success: true, message: "Successfully logged in" };
};

// Logout
export const logout = async () => {
  // Clear the auth token cookie
  cookies().set(COOKIE_NAME, "", {
    httpOnly: true,
    path: "/",
    maxAge: -1, // Remove the cookie
  });

  return { success: true, message: "Successfully logged out" };
};

// Verify Auth (Server-side action to protect routes)
export const verifyAuth = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return { isAuthenticated: false };
  }

  const verified = verifyJwt(token);
  if (!verified) {
    return { isAuthenticated: false };
  }

  return { isAuthenticated: true, user: verified };
};
