import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../axios";
import type { Product } from "../types";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const keyword = searchParams.get("search");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "/";
        if (keyword) {
          url = `/search?keyword=${encodeURIComponent(keyword)}`;
        } else if (category) {
          url = `/category=${encodeURIComponent(category)}`;
        }
        
        const response = await API.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      }
    };

    fetchData();
  }, [category, keyword]);

  const handleDelete = async (id: number) => {
    try {
      await API.delete(`/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (isError) {
    return (
      <div className="min-h-screen pt-24 bg-apple-bg dark:bg-dark-bg text-apple-text dark:text-dark-text flex flex-col items-center justify-center animate-fade-in">
        <div className="text-center py-20 space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 mx-auto rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center">
            <i className="bi bi-exclamation-circle text-2xl text-[#86868b]"></i>
          </div>
          <h3 className="text-xl font-medium">Unable to load products</h3>
          <p className="text-[#86868b]">We&apos;re currently experiencing issues connecting to the store. Please try again later.</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-8 py-3 rounded-full bg-apple-blue text-white font-medium hover:bg-[#0077ed] transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const filteredProducts = inStockOnly ? products.filter(p => p.available) : products;

  return (
    <div className="min-h-screen bg-apple-bg dark:bg-dark-bg transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-40 pb-24 px-5 md:px-10 flex flex-col items-center justify-center text-center animate-fade-up">
        {keyword ? (
          <>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-apple-text dark:text-dark-text mb-6">
              Search Results
            </h1>
            <p className="text-xl md:text-2xl text-[#86868b] max-w-2xl mx-auto mb-10">
              Showing results for &quot;<span className="text-apple-text dark:text-dark-text font-medium">{keyword}</span>&quot;
            </p>
          </>
        ) : (
          <>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-apple-text dark:text-dark-text mb-6">
              The new standard.
            </h1>
            <p className="text-xl md:text-2xl text-[#86868b] max-w-2xl mx-auto mb-10">
              Discover our latest collection of premium products, designed to elevate your everyday experience.
            </p>
          </>
        )}
      </section>

      {/* Product Grid Header */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 mb-8 flex justify-end">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-apple-text dark:text-dark-text">Show In Stock Only</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={inStockOnly} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInStockOnly(e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-apple-blue"></div>
          </label>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <div
              className="group cursor-pointer bg-white dark:bg-dark-card rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-lg dark:hover:shadow-white/5"
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="bg-white transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="aspect-square p-12 flex items-center justify-center relative">
                  {!product.imageName && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-10">
                      <i className="bi bi-box text-9xl"></i>
                    </div>
                  )}
                  {product.imageName && (
                    <img src={`/api/${product.id}/image`} alt={product.name} className="w-full h-full object-contain relative z-10 hover:scale-105 transition-transform duration-700" />
                  )}
                </div>
              </div>
              <div className="p-8 space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xl font-medium text-apple-text dark:text-dark-text">{product.name}</h3>
                    <p className="text-apple-gray text-sm mt-1">by {product.brand}</p>
                  </div>
                  {product.available ? (
                    <span className="shrink-0 inline-block px-3 py-1 bg-apple-blue text-white text-xs font-medium rounded-full">In Stock</span>
                  ) : (
                    <span className="shrink-0 inline-block px-3 py-1 border border-apple-blue text-apple-blue text-xs font-medium rounded-full dark:border-white dark:text-white">Out of Stock</span>
                  )}
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <p className="text-xl font-medium text-apple-text dark:text-dark-text">₹{product.price}</p>
                  <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()} className="px-5 py-2.5 rounded-full bg-apple-blue/10 dark:bg-apple-blue/20 text-apple-blue dark:text-[#4da6ff] font-medium hover:bg-apple-blue hover:text-white dark:hover:bg-apple-blue dark:hover:text-white transition-colors">
                    Add to Bag
                  </button>
                </div>
                <div className="pt-2 flex items-center gap-2">
                  <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); navigate(`/edit_product/${product.id}`); }} className="px-4 py-2 rounded-full bg-apple-blue text-white text-sm font-medium hover:bg-[#005bb5] hover:scale-105 transition-all duration-300">
                    Edit
                  </button>
                  <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); handleDelete(Number(product.id)); }} className="px-4 py-2 rounded-full border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
