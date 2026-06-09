import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../axios";
import type { Product as ProductType } from "../types";

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) return <div className="min-h-screen pt-32 text-center text-[#86868b]">Loading product details...</div>;
  if (!product) return <div className="min-h-screen pt-32 text-center text-[#86868b]">Product not found.</div>;

  return (
    <div className="min-h-screen pt-32 pb-24 bg-apple-bg dark:bg-dark-bg text-apple-text dark:text-dark-text animate-fade-in transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-[#86868b] hover:text-apple-text dark:hover:text-dark-text transition-colors font-medium"
        >
          <i className="bi bi-chevron-left mr-2"></i>
          Back to products
        </button>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-3/5 bg-white rounded-[3rem] p-12 lg:p-24 aspect-square flex items-center justify-center relative transition-colors duration-300">
            {!product.imageName && (
              <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-10">
                <i className="bi bi-box text-9xl"></i>
              </div>
            )}
            {product.imageName && (
              <img src={`/api/${product.id}/image`} alt={product.name} className="w-full h-full object-contain relative z-10 hover:scale-105 transition-transform duration-700" />
            )}
          </div>

          {/* Right: Details */}
          <div className="w-full lg:w-2/5 pt-8 lg:pt-16">
            <p className="text-apple-blue font-semibold tracking-wide uppercase text-sm mb-3">{product.brand}</p>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight">{product.name}</h1>
            <p className="text-xl text-[#86868b] mb-10 leading-relaxed">{product.desc || "A premium product designed to elevate your everyday experience."}</p>

            <div className="py-8 border-t border-b border-gray-200 dark:border-white/10 mb-10">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-[#86868b] mb-1">Price</p>
                  <p className="text-3xl font-medium">₹{product.price}</p>
                </div>
                {product.available ? (
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-apple-blue text-white text-xs font-medium rounded-full mb-2">In Stock</span>
                    <p className="text-sm text-[#86868b]">Ships immediately</p>
                  </div>
                ) : (
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 border border-apple-blue text-apple-blue text-xs font-medium rounded-full dark:border-white dark:text-white mb-2">Out of Stock</span>
                    <p className="text-sm text-[#86868b]">Currently unavailable</p>
                  </div>
                )}
              </div>
            </div>

            <button
              className={`w-full py-4 rounded-full text-lg font-medium transition-colors ${product.available
                  ? "bg-apple-blue text-white hover:bg-[#0077ed]"
                  : "bg-gray-200 text-gray-500 dark:bg-white/10 dark:text-gray-400 cursor-not-allowed"
                }`}
              disabled={!product.available}
            >
              Add to Bag
            </button>

            <div className="mt-12 space-y-4">
              <div className="flex justify-between text-sm py-4 border-b border-gray-100 dark:border-white/5">
                <span className="text-[#86868b]">Category</span>
                <span className="font-medium text-right">{product.category}</span>
              </div>
              {product.releaseDate && (
                <div className="flex justify-between text-sm py-4 border-b border-gray-100 dark:border-white/5">
                  <span className="text-[#86868b]">Release Date</span>
                  <span className="font-medium text-right">{new Date(product.releaseDate).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm py-4 border-b border-gray-100 dark:border-white/5">
                <span className="text-[#86868b]">Stock Quantity</span>
                <span className="font-medium text-right">{product.quantity} units remaining</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
