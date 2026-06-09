

const AddProduct = () => {
  return (
    <div className="min-h-screen pt-24 bg-apple-bg dark:bg-dark-bg text-apple-text dark:text-dark-text flex flex-col items-center justify-center animate-fade-in">
      <div className="text-center py-20 space-y-4 max-w-lg mx-auto">
        <div className="w-16 h-16 mx-auto rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center">
          <i className="bi bi-plus-lg text-2xl text-[#86868b]"></i>
        </div>
        <h3 className="text-xl font-medium">Add Product</h3>
        <p className="text-[#86868b]">The product creation studio is currently under development. Check back soon for an elegant way to manage your catalog.</p>
        <button onClick={() => window.history.back()} className="mt-4 px-8 py-3 rounded-full bg-apple-blue text-white font-medium hover:bg-[#0077ed] transition-colors">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
