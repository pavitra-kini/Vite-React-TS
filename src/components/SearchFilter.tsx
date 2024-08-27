import React, { useState } from 'react';

interface SearchFilterProps {
  onFilterChange: (filters: { title?: string; price_min?: string; price_max?: string; categoryId?: string }) => void;
  initialValues?: { title?: string; price_min?: string; price_max?: string; categoryId?: string };
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onFilterChange, initialValues }) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [priceMin, setPriceMin] = useState(initialValues?.price_min || '');
  const [priceMax, setPriceMax] = useState(initialValues?.price_max || '');
  const [categoryId, setCategoryId] = useState(initialValues?.categoryId || '');

  const handleApplyFilters = () => {
    onFilterChange({ title, price_min: priceMin, price_max: priceMax, categoryId });
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Title"
        id='filter-title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded mr-2"
      />
      <input
        type="number"
        placeholder="Min Price"
        value={priceMin}
        onChange={(e) => setPriceMin(e.target.value)}
        className="p-2 border rounded mr-2"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={priceMax}
        onChange={(e) => setPriceMax(e.target.value)}
        className="p-2 border rounded mr-2"
      />
      <input
        type="text"
        placeholder="Category ID"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="p-2 border rounded mr-2"
      />
      <button
        onClick={handleApplyFilters}
        id='filter-button'
        className="p-2 bg-blue-500 text-white rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default SearchFilter;
