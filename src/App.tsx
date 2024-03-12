import React from 'react';
import './index.css';
import ProductListPage from "./app/components/ProductListPage"
import ProductPage from './app/components/ProductPage';
import CartPage from './app/components/CartPage';



function App() {
  return (
    <>
      <ProductPage />
      <ProductListPage />
      <CartPage />
    </>
  );
}
export default App;