import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import ProductPage from '../pages/ProductPage'; // Import the ProductPage component
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ProductViewPage from '../components/ProductViewPage';
import AddProductPage from '../components/AddProductPage';

const App: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      {isAuthenticated ? (
        <div className="flex">
          <Sidebar />
          <div className="flex-grow p-4">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/products/:id" element={<ProductViewPage />} />
              <Route path="*" element={<Navigate to="/home" />} />
              <Route path="/add-product" element={<AddProductPage />} />

            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
