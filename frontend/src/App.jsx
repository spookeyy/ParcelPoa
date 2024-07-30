import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Create_Account from './pages/Create_Account';
import Agent_List from './pages/Agent_List';
import Agent_Requests from './pages/Agent_Requests';
import Footer from './components/Footer';
import Header from './components/Header';
import Invoice from './pages/Invoice';
import Messages_List from './pages/Messages_List';

import Messages_Details from './pages/Messages_Details';
import Order_List from './pages/Order_List';
import Order_Details from './pages/Order_Details';
import Reset_Password from './pages/Reset_Password';
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
        <Route path="/invoice/:id" element={<Invoice />} />
        <Route path="/messages-list" element={<Messages_List />} />
        <Route path="/message/:id" element={<Messages_Details />} />
        <Route path="/order-list" element={<Order_List />} />
        <Route path="/order/:id" element={<Order_Details />} />
        <Route path="/reset-password" element={<Reset_Password />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
