"use client";

import React, { useState, useEffect, useRef } from "react";
import useDebounce from "../hooks/useDebounce";
import { Product, ProductSearchResponse } from "../types/Product";
import Image from "next/image";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Debounced query to avoid spamming the API on every keystroke
  const debouncedQuery = useDebounce(query, 400);

  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch products from the DummyJSON API
  useEffect(() => {
    async function fetchProducts(searchTerm: string) {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${searchTerm}`
        );
        const data: ProductSearchResponse = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
        setError("Error fetching products");
      } finally {
        setIsLoading(false);
      }
    }

    if (debouncedQuery.trim()) {
      fetchProducts(debouncedQuery.trim());
    } else {
      setProducts([]);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsDropdownOpen(true);
  };

  const renderDropdown = () => {
    if (!isDropdownOpen) return null;
  
  return (
      <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-md z-10 p-4">
         { isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? ( 
          <p className="text-red-500">{error}</p> 
        ) : products.length === 0 && debouncedQuery.trim() ? ( 
          <p className="text-gray-500">No products found</p> 
            ) : (
            <div className="grid grid-cols-2 gap-4"> 
              {products.map((product) => (
                <div key={product.id} className="flex items-center gap-4">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={64}
                    height={64}
                    className="object-cover rounded"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 uppercase line-clamp-2">
                      {product.title}
                    </span>
                    <span className="text-sm text-gray-500">${product.price}</span>
                  </div>
                </div>
              ))}
            </div>
            )}
        </div>
  );
};

  return (
    <div className="relative w-full max-w-md mx-auto mt-10" ref={containerRef}>
      <label htmlFor="search" className="block mb-2 font-medium text-gray-700">
        Search Products
      </label>
      <input
        id="search"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Type to search..."
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {renderDropdown()}
    </div>
  );
}
