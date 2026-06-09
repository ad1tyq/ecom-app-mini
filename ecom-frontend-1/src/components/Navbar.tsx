import React, { useEffect, useState, useRef } from "react";
import API from "../axios";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types";

const Navbar: React.FC = () => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light";
  };

  const [theme, setTheme] = useState<string>(getInitialTheme());
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isSuggesting, setIsSuggesting] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get("/");
        const uniqueCategories = [...new Set(response.data.map((p: Product) => p.category).filter(Boolean))] as string[];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }
      setIsSuggesting(true);
      setShowSuggestions(true);
      try {
        const response = await API.get(`/search?keyword=${encodeURIComponent(searchQuery)}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsSuggesting(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchSubmit = (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement>) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setShowSuggestions(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = `${theme === "dark" ? "dark dark-theme" : "light-theme"} bg-apple-bg text-apple-text dark:bg-dark-bg dark:text-dark-text font-sans antialiased transition-colors duration-300`;
  }, [theme]);

  const links = [
    { label: "Home", href: "/" },
    { label: "Add Product", href: "/add_product" },
    { label: "Categories", href: "/" },
  ];

  return (
    <>
      {/* Background Overlay for Mega Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isCategoriesOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsCategoriesOpen(false)}
      ></div>

      <header>
        <nav
          onMouseLeave={() => setIsCategoriesOpen(false)}
          className="fixed top-0 w-full bg-[#f5f5f7]/80 dark:bg-black/80 backdrop-blur-xl backdrop-saturate-150 z-50 border-b border-[#d2d2d7]/50 dark:border-white/10"
        >
          <div className="max-w-[1440px] mx-auto px-4 md:px-10">
            <div className="relative flex flex-row items-center justify-between h-12 md:h-14">
              {/* Logo / GitHub Link */}
              <a
                className="flex items-center gap-2 text-xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] hover:opacity-80 transition-opacity whitespace-nowrap group"
                href="https://github.com/ad1tyq"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-github text-2xl"></i>
                <span>ad1tyq</span>
              </a>

              {/* Nav Links - Fixed in center */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row items-center justify-center space-x-4 md:space-x-8 overflow-visible px-2 w-max">
                {links.map((link, idx) => {
                  if (link.label === "Categories") {
                    return (
                      <div
                        key={idx}
                        className="relative flex flex-col items-center group"
                        onMouseEnter={() => setIsCategoriesOpen(true)}
                      >
                        <button
                          type="button"
                          className={`appearance-none bg-transparent border-none m-0 p-0 flex items-center gap-1 text-xs md:text-sm font-medium transition-colors duration-200 whitespace-nowrap outline-none ${isCategoriesOpen ? 'text-[#1d1d1f] dark:text-[#f5f5f7]' : 'text-[#1d1d1f]/80 dark:text-[#f5f5f7]/80 hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]'}`}
                        >
                          {link.label}
                          <i className={`bi bi-chevron-down text-[10px] transition-transform duration-300 ${isCategoriesOpen ? "rotate-180" : ""}`}></i>
                        </button>
                      </div>
                    );
                  }

                  return (
                    <a
                      key={idx}
                      href={link.href}
                      onMouseEnter={() => setIsCategoriesOpen(false)}
                      className="text-xs md:text-sm font-medium text-[#1d1d1f]/80 dark:text-[#f5f5f7]/80 hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors duration-200 whitespace-nowrap"
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>

              {/* Icons - Always horizontal */}
              <div className="flex flex-row items-center space-x-3 md:space-x-5 relative z-10">
                {/* Search */}
                <div className="relative flex items-center h-full min-w-[14px]">
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden flex items-center ${isSearchOpen ? 'w-32 md:w-40 opacity-100' : 'w-0 opacity-0'}`}>
                    <form onSubmit={handleSearchSubmit} className="flex items-center bg-black/5 dark:bg-white/10 rounded-full px-3 py-1 w-full min-w-[128px] md:min-w-[160px]">
                      <input
                        type="text"
                        ref={inputRef}
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        onFocus={() => {
                          if (searchQuery.trim()) setShowSuggestions(true);
                        }}
                        onBlur={() => {
                          // Delay hiding to allow click to register on suggestions
                          setTimeout(() => setShowSuggestions(false), 200);
                        }}
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm w-full text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b]"
                      />
                      <button type="button" onClick={() => { setIsSearchOpen(false); setSearchQuery(""); setShowSuggestions(false); }} className="ml-1 flex items-center shrink-0">
                        <i className="bi bi-x text-sm cursor-pointer text-[#1d1d1f]/80 dark:text-[#f5f5f7]/80 hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors"></i>
                      </button>
                    </form>
                    
                    {/* Autocomplete Dropdown */}
                    <div className={`absolute top-[calc(100%+14px)] right-0 w-64 md:w-80 bg-white/95 dark:bg-[#1d1d1f]/95 backdrop-blur-xl border border-[#d2d2d7]/50 dark:border-white/10 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 transform origin-top-right ${showSuggestions ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                      {isSuggesting ? (
                        <div className="p-5 text-center flex flex-col items-center justify-center space-y-2">
                          <i className="bi bi-circle-half animate-spin text-apple-blue text-lg"></i>
                          <span className="text-sm text-[#86868b]">Searching...</span>
                        </div>
                      ) : suggestions.length > 0 ? (
                        <div className="max-h-[300px] overflow-y-auto">
                          {suggestions.slice(0, 5).map(product => (
                            <div 
                              key={product.id}
                              onClick={() => {
                                setIsSearchOpen(false);
                                setShowSuggestions(false);
                                setSearchQuery("");
                                navigate(`/product/${product.id}`);
                              }}
                              className="flex items-center gap-3 p-3 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors border-b border-[#d2d2d7]/30 dark:border-white/5 last:border-0"
                            >
                              <div className="w-10 h-10 rounded-lg bg-[#f5f5f7] dark:bg-black/20 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                {product.imageName ? (
                                  <img src={`/api/${product.id}/image`} alt={product.name} className="w-full h-full object-cover" />
                                ) : (
                                  <i className="bi bi-box text-[#86868b]"></i>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] truncate">{product.name}</p>
                                <p className="text-xs text-[#86868b] truncate">{product.brand}</p>
                              </div>
                            </div>
                          ))}
                          {suggestions.length > 5 && (
                            <div 
                              onClick={handleSearchSubmit}
                              className="p-3 text-center text-xs font-medium text-apple-blue hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
                            >
                              View all {suggestions.length} results
                            </div>
                          )}
                        </div>
                      ) : searchQuery.trim() ? (
                        <div className="p-5 text-center text-sm text-[#86868b]">No products found matching &quot;{searchQuery}&quot;</div>
                      ) : null}
                    </div>
                    
                  </div>
                  <div className={`absolute left-0 transition-opacity duration-300 flex items-center justify-center h-full ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <i onClick={() => setIsSearchOpen(true)} className="bi bi-search text-sm cursor-pointer text-[#1d1d1f]/80 dark:text-[#f5f5f7]/80 hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors"></i>
                  </div>
                </div>

                {/* Theme Toggle */}
                <button onClick={toggleTheme} className="text-[#1d1d1f]/80 dark:text-[#f5f5f7]/80 hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors flex items-center justify-center">
                  {theme === "dark" ? (
                    <i className="bi bi-moon-fill text-sm"></i>
                  ) : (
                    <i className="bi bi-sun-fill text-sm"></i>
                  )}
                </button>

                {/* Cart */}
                <i className="bi bi-cart text-sm cursor-pointer text-[#1d1d1f]/80 dark:text-[#f5f5f7]/80 hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors"></i>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div
            className={`absolute top-full left-0 w-full bg-[#f5f5f7]/95 dark:bg-[#1d1d1f]/95 backdrop-blur-xl border-b border-[#d2d2d7]/50 dark:border-white/10 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] origin-top ${isCategoriesOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-8 md:py-12">
              <h3 className="text-[#86868b] text-xs font-semibold uppercase tracking-wider mb-6">Explore Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-x-8">
                {categories.length > 0 ? (
                  categories.map((category, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => {
                        setIsCategoriesOpen(false);
                        navigate(`/?category=${encodeURIComponent(category)}`);
                      }}
                      className="text-left text-lg md:text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] hover:text-[#0077ed] transition-colors"
                    >
                      {category}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-[#86868b]">No products added</p>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
