import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div className="min-h-screen bg-apple-bg dark:bg-dark-bg transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-40 pb-24 px-5 md:px-10 flex flex-col items-center justify-center text-center animate-fade-up">
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-apple-text dark:text-dark-text mb-6">
          The new standard.
        </h1>
        <p className="text-xl md:text-2xl text-[#86868b] max-w-2xl mx-auto mb-10">
          Discover our latest collection of premium products, designed to elevate your everyday experience.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="px-8 py-4 w-full sm:w-auto rounded-full bg-apple-blue text-white text-lg font-medium hover:bg-[#0077ed] transition-colors">
            Shop now
          </button>
          <button className="px-8 py-4 w-full sm:w-auto rounded-full border-2 border-[#1d1d1f] dark:border-[#f5f5f7] text-[#1d1d1f] dark:text-[#f5f5f7] text-lg font-medium hover:bg-[#1d1d1f] hover:text-white dark:hover:bg-[#f5f5f7] dark:hover:text-black transition-colors">
            Learn more
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <div
              className="group cursor-pointer bg-white dark:bg-dark-card rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-lg dark:hover:shadow-white/5"
              key={product.id}
            >
              <div className="bg-[#f5f5f7] dark:bg-white/5 transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="aspect-square p-12 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-10">
                    <i className="bi bi-box text-9xl"></i>
                  </div>
                  {product.image && <img src={product.image} className="w-full h-full object-contain relative z-10" alt={product.name} />}
                </div>
              </div>
              <div className="p-8 space-y-3">
                <h3 className="text-xl font-medium text-apple-text dark:text-dark-text">{product.name}</h3>
                <p className="text-apple-gray text-sm">by {product.brand}</p>
                <div className="pt-4 flex items-center justify-between">
                  <p className="text-xl font-medium text-apple-text dark:text-dark-text">₹{product.price}</p>
                  <button className="px-5 py-2.5 rounded-full bg-apple-blue/10 dark:bg-apple-blue/20 text-apple-blue dark:text-[#4da6ff] font-medium hover:bg-apple-blue hover:text-white dark:hover:bg-apple-blue dark:hover:text-white transition-colors">
                    Add to Bag
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
