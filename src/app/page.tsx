import React from "react";
import ProductSearch from "../components/ProductSearch";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Product Search Bar</h1>
      <ProductSearch />
    </main>
  );
}
