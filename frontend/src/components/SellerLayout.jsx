/* eslint-disable no-unused-vars */
// src/components/SellerLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function SellerLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />  {/* This is where the nested routes will render */}
      </main>
    </div>
  );
}

export default SellerLayout;
