// src/components/SellerLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function SellerLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />  {/* This is where the nested routes will render */}
      </main>
      <Footer />
    </div>
  );
}

export default SellerLayout;
