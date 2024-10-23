import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Toaster } from "@/components/ui/toaster"

import "./globals.css";

import Navbar from "@/components/layout/navbar/navbar";
import { cookies } from "next/headers";
import { getMeta } from "@/store/metadata";
import { CartProvider } from "@/hooks/cart-context";
import Footer from "@/components/layout/footer/footer";

const outfit = localFont({
  src: "./fonts/Outfit.ttf",
  variable: "--font-outfit",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: getMeta().siteTitle,
  description: getMeta().description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = await cookies()
  const data = cookie.get('authToken')
  const userString = cookie.get('user')
  const token = data?.value
  const userData: string | undefined = userString?.value

  const user = userData ? JSON.parse(userData) : ''
  return (
    // <html lang="en">
    <html lang="en" className="dark">
      <body
        className={`${outfit.className} overflow-x-hidden w-full max-w-screen-xl mx-auto`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            {/* <section className="max-w-screen-xl"> */}
            <Navbar user={user} token={token ? token : ''} />
            <div className="mb-10">
              {children}
            </div>
            <Toaster />
            {/* </section> */}
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
