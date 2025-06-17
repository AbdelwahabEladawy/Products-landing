import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { CartProvider } from "@/Contexts/cartContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ShopEasy - Your Premium Shopping Destination",
  description: "Discover amazing products at unbeatable prices. Shop with confidence at ShopEasy!",
  keywords: "shopping, ecommerce, products, online store, ShopEasy",
  authors: [{ name: "ShopEasy Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${poppins.variable}`}>
      <body 
        className="antialiased bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen"
        suppressHydrationWarning={true}
      >
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            {children}
            <Footer />
          </div>
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '16px',
                fontWeight: '500',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
