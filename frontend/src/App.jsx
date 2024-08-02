import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Seller/Home';
import Login from './pages/Seller/Login';
import Create_Account from './pages/Seller/Create_Account';
import Agent_List from './pages/Seller/Agent_List';
import Agent_Requests from './pages/Seller/Agent_Requests';
import Agent_Details from './pages/Seller/Agent_Details';
import Agent_Trends from './pages/Seller/Agent_Trends'; 
import Footer from './components/Footer';
import Header from './components/Header';
import Invoice from './pages/Seller/Invoice';
import Messages_List from './pages/Seller/Messages_List';
import Messages_Details from './pages/Seller/Messages_Details';
import Order_List from './pages/Seller/Order_List';
import Order_Details from './pages/Seller/Order_Details';
import Dashboard_Part from './pages/Seller/Dashboard_Part';

import Reset_Password from './pages/Seller/Reset_Password';
import Tracking from './pages/Seller/Tracking';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<Create_Account />} />
        <Route path="/signup" element={<Create_Account />} />
        <Route path="/agent-list" element={<Agent_List />} />
        <Route path="/agent-requests" element={<Agent_Requests />} />
        <Route path="/agent/:id" element={<Agent_Details />} />
        <Route path="/agent-trends/:id" element={<Agent_Trends />} /> 
        <Route path="/invoice/:id" element={<Invoice />} />
        <Route path="/messages-list" element={<Messages_List />} />
        <Route path="/message/:id" element={<Messages_Details />} />
        <Route path="/order-list" element={<Order_List />} />
        <Route path="/order/:id" element={<Order_Details />} />
        <Route path="/reset-password" element={<Reset_Password />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/dashboard-part" element={<Dashboard_Part />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
