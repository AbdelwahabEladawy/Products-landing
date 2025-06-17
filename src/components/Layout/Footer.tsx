"use client";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          
          {/* Logo & Slogan */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              🛍️ ShopEasy
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Your premium destination for quality products and exceptional shopping experiences
            </p>
          </div>

          {/* Copyright */}
          <div className="">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} ShopEasy. All rights reserved.
            </p>
         
          </div>
        </div>
      </div>
    </footer>
  );
}
