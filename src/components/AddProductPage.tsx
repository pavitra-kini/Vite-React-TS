// src/components/AddProductPage.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../features/products/productAddSlice';
import { RootState, AppDispatch } from '../store/store';

const AddProductPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(1); 
  const [images, setImages] = useState<string[]>(['']); 

  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch for dispatch
  const navigate = useNavigate();

  const { status, error } = useSelector((state: RootState) => state.productAdd);

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

  if (status === 'succeeded') {
    setTimeout(() => {
      navigate('/products');
    }, 2000);
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
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images (comma separated URLs)</label>
          <input
            id="images"
            type="text"
            value={images.join(',')}
            onChange={(e) => setImages(e.target.value.split(',').map(url => url.trim()))}
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
