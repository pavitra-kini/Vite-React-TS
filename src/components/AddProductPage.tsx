import React, { useState } from 'react'; // Importing necessary React hooks
import { useDispatch, useSelector } from 'react-redux'; // Importing hooks from react-redux for dispatching actions and selecting state
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for programmatic navigation
import { addProduct } from '../features/products/productAddSlice'; // Importing the addProduct thunk action
import { RootState, AppDispatch } from '../store/store'; // Importing types for RootState and AppDispatch

const AddProductPage: React.FC = () => {
  // State hooks for form inputs
  const [title, setTitle] = useState(''); 
  const [price, setPrice] = useState(0); 
  const [description, setDescription] = useState(''); 
  const [categoryId, setCategoryId] = useState(1); // Default to 1 for the category ID
  const [images, setImages] = useState<string[]>(['']); // Initialize images as an array with one empty string

  // Setting up dispatch with the correct type
  const dispatch = useDispatch<AppDispatch>(); 
  const navigate = useNavigate(); // For navigation after a successful product addition

  // Selecting productAdd state slice
  const { status, error } = useSelector((state: RootState) => state.productAdd);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addProduct({
        title,
        price,
        description,
        categoryId,
        images,
      })
    );
  };

  // Navigate to product list after successful submission
  if (status === 'succeeded') {
    setTimeout(() => {
      navigate('/products');
    }, 2000); // Delayed navigation for 2 seconds to allow the success message to be seen
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      {status === 'loading' && <p>Adding product...</p>}
      {status === 'failed' && <p className="text-red-500">{error}</p>}
      {status === 'succeeded' && <p className="text-green-500">Product added successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Update title state
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))} // Ensure price is a number
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Update description state
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            rows={4}
            required
          />
        </div>

        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category ID</label>
          <input
            id="categoryId"
            type="number"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))} // Ensure categoryId is a number
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images (comma separated URLs)</label>
          <input
            id="images"
            type="text"
            value={images.join(',')} // Join image URLs into a comma-separated string
            onChange={(e) => setImages(e.target.value.split(',').map(url => url.trim()))} // Split input string into an array of trimmed URLs
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
