import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, updateProduct } from '../features/products/productViewSlice';
import { AppDispatch, RootState } from '../store/store';

const ProductViewPage: React.FC = () => {
  // Extracting 'id' from the route parameters
  const { id } = useParams<{ id: string }>();
  
  // Typing 'dispatch' with 'AppDispatch' for correct TypeScript inference
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  // Accessing product data and status from the Redux store
  const { product, status, error } = useSelector((state: RootState) => state.productView);

  // State for modal visibility and product form fields
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);

  // Fetching the product details when 'id' is available
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [dispatch, id]);

  // Handle product update submission
  const handleUpdate = () => {
    if (product) {
      dispatch(updateProduct({ id: product.id, title, price }));
      setIsModalOpen(false);
    }
  };

  // Opens the modal and pre-fills it with the product data
  const handleModalOpen = () => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
    }
    setIsModalOpen(true);
  };

  // Closes the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Conditional rendering based on the loading state
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // Conditional rendering for error state
  if (status === 'failed') {
    return <p>{error}</p>;
  }

  // Conditional rendering if the product is not found
  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <button
        onClick={() => navigate('/products')}
        className="mb-4 text-blue-500 hover:underline"
      >
        &lt; Back to Products
      </button>
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      
      {/* Product details section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="flex justify-center items-center">
          <img
            src={product.category.image}
            alt={product.category.name}
            className="w-32 h-32 object-cover rounded-lg shadow-md"
          />
        </div>
        <div>
          <p className="text-lg mb-2"><strong>Price:</strong> ${product.price}</p>
          <p className="text-lg mb-2"><strong>Description:</strong> {product.description}</p>
          <p className="text-lg mb-2"><strong>Category:</strong> {product.category.name}</p>
        </div>
      </div>

      {/* Product images section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {product.images.map((image: string, index: number) => (
          <img
            key={index}
            src={image}
            alt={`Product image ${index}`}
            className="w-full h-40 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>

      {/* Button to open the update modal */}
      <button
        onClick={handleModalOpen}
        className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Update Product
      </button>

      {/* Modal for updating product details */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Update Product</h2>
            
            {/* Modal form fields */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            {/* Modal buttons */}
            <div className="flex justify-end">
              <button
                onClick={handleUpdate}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2"
              >
                Save
              </button>
              <button
                onClick={handleModalClose}
                className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductViewPage;
