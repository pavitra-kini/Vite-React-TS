import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, setPage, deleteProduct } from '../features/products/productsSlice';
import SearchFilter from '../components/SearchFilter';
import { RootState, AppDispatch } from '../store/store';
import { useNavigate, Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const ProductPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Type dispatch with AppDispatch
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const currentPage = Number(searchParams.get('page')) || 1;
  const titleFilter = searchParams.get('title') || '';
  const priceMinFilter = searchParams.get('price_min') || '';
  const priceMaxFilter = searchParams.get('price_max') || '';
  const categoryIdFilter = searchParams.get('categoryId') || '';

  const { items: products, status, error, totalPages } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts({
      page: currentPage,
      title: titleFilter,
      price_min: priceMinFilter,
      price_max: priceMaxFilter,
      categoryId: categoryIdFilter,
    }));
  }, [currentPage, titleFilter, priceMinFilter, priceMaxFilter, categoryIdFilter, dispatch]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page numbers

    // Update search params without resetting the filters
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());

    setSearchParams(params);
    dispatch(setPage(page));
  };

  const handleDelete = (id: number) => {
    setSelectedProductId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedProductId !== null) {
      dispatch(deleteProduct(selectedProductId));
      setIsDeleteModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleFilterChange = (filters: { title?: string; price_min?: string; price_max?: string; categoryId?: string }) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      const value = filters[key as keyof typeof filters];
      if (value) {
        params.set(key, value);
      }
    });
    params.set('page', '1'); // Reset to the first page when filters change
    setSearchParams(params);
  };

  const handleAddProduct = () => {
    navigate('/add-product'); // Navigate to the add product page
  };

  return (
    <div id="product-list">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>
      <SearchFilter
        onFilterChange={handleFilterChange}
        initialValues={{ title: titleFilter, price_min: priceMinFilter, price_max: priceMaxFilter, categoryId: categoryIdFilter }}
      />

      {status === 'loading' && <p>Loading...</p>}
      
      {status === 'succeeded' ? (
        <>
          {products.length > 0 ? (
            <div className="overflow-x-auto" id={`product-listing-page-${currentPage}`}>
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b text-left">ID</th>
                    <th className="px-6 py-3 border-b text-left">Title</th>
                    <th className="px-6 py-3 border-b text-left">Price</th>
                    <th className="px-6 py-3 border-b text-left">Category</th>
                    <th className="px-6 py-3 border-b text-left">Image</th>
                    <th className="px-6 py-3 border-b text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 border-b text-left">{product.id}</td>
                      <td className="px-6 py-4 border-b text-left">{product.title}</td>
                      <td className="px-6 py-4 border-b text-left">${product.price}</td>
                      <td className="px-6 py-4 border-b text-left">{product.category.name}</td>
                      <td className="px-6 py-4 border-b text-left">
                        <img
                          src={product.category.image}
                          alt={product.category.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 border-b text-left">
                        <Link to={`/products/${product.id}`} className="text-blue-500 hover:underline mr-4">View</Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center my-8">
              <h2 className="text-xl font-bold mb-4">No Records Found</h2>
              <p className="text-gray-600">No products match your filters. Please adjust your search criteria.</p>
            </div>
          )}
          
          {totalPages > 1 && (
            <div className="pagination mt-4 flex justify-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`p-2 mx-1 ${
                    currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      ) : status === 'failed' ? (
        <p>{error}</p>
      ) : null}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={confirmDelete}
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 mr-2"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
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

export default ProductPage;
