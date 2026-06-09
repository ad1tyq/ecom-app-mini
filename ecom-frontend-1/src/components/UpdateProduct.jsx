import { useState, useEffect } from "react";
import API from "../axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    desc: "",
    available: true,
    quantity: 1,
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...product,
        id,
        price: Number(product.price),
        quantity: Number(product.quantity)
      };

      const formData = new FormData();
      formData.append("prod", new Blob([JSON.stringify(payload)], { type: "application/json" }));
      if (imageFile) {
        formData.append("imgFile", imageFile);
      } else {
        // Add an empty file block in case backend strictly wants it, but we made it optional in backend
      }

      console.log("Sending FormData payload");
      await API.put("/updateProduct", formData);
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-apple-bg dark:bg-dark-bg text-apple-text dark:text-dark-text flex flex-col items-center animate-fade-in">
      <div className="w-full max-w-md p-8 bg-white dark:bg-dark-card rounded-[2rem] shadow-lg mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">Update Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Image (Optional)</label>
            <div className="w-full px-4 py-3 rounded-xl bg-apple-bg dark:bg-dark-bg border border-gray-200 dark:border-white/10 flex items-center justify-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full text-sm text-apple-gray file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-apple-blue/10 file:text-apple-blue hover:file:bg-apple-blue/20 dark:file:bg-white/10 dark:file:text-white dark:hover:file:bg-white/20 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input type="text" name="name" value={product.name} onChange={handleChange} required className="w-full px-4 py-2 rounded-xl bg-apple-bg dark:bg-dark-bg border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-apple-blue" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Brand</label>
            <input type="text" name="brand" value={product.brand} onChange={handleChange} required className="w-full px-4 py-2 rounded-xl bg-apple-bg dark:bg-dark-bg border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-apple-blue" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input type="number" name="price" value={product.price} onChange={handleChange} required className="w-full px-4 py-2 rounded-xl bg-apple-bg dark:bg-dark-bg border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-apple-blue" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input type="text" name="category" value={product.category} onChange={handleChange} required className="w-full px-4 py-2 rounded-xl bg-apple-bg dark:bg-dark-bg border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-apple-blue" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input type="text" name="desc" value={product.desc} onChange={handleChange} required className="w-full px-4 py-2 rounded-xl bg-apple-bg dark:bg-dark-bg border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-apple-blue" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Release Date</label>
            <input type="date" name="releaseDate" value={product.releaseDate} onChange={handleChange} required className="w-full px-4 py-2 rounded-xl bg-apple-bg dark:bg-dark-bg border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-apple-blue" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required className="w-full px-4 py-2 rounded-xl bg-apple-bg dark:bg-dark-bg border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-apple-blue" />
          </div>
          <div className="flex items-center justify-between pt-2">
            <label className="text-sm font-medium text-apple-text dark:text-dark-text">In Stock</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" name="available" checked={product.available} onChange={(e) => setProduct({ ...product, available: e.target.checked })} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-apple-blue"></div>
            </label>
          </div>

          <button type="submit" className="w-full py-3 rounded-full bg-apple-blue text-white font-medium hover:bg-[#0077ed] transition-colors mt-4">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
