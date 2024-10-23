"use client"

import { logout } from "@/actions/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter(); // Access the router

  useEffect(() => {
    const performLogout = async () => {
      await logout(); // Call the logout function
      router.refresh()
      router.push('/login'); // Redirect to the login page after logout
    };

    performLogout(); // Execute the logout function
  }, [router]); // Only run on mount

  return (
    <div className="w-2/3 mt-4 md:mt-10 space-y-6 mx-auto border border-border p-4 sm:p-10">
      <h1 className="text-4xl">Logging you out...</h1>
      {/* Optionally, you can display a message or loading spinner here */}
    </div>
  );
}
