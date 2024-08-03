import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from './components/Header';
import RequestResetPassword from "./components/RequestResetPassword";
import ResetPassword from "./components/ResetPassword";
import ChangePassword from "./components/Change-Password";
import Login from "./components/Login";
import Create_Account from "./components/Create_Account";

// Seller Pages
import Home from './pages/Seller/Home';
import Agents from './pages/Seller/Agents';
import Agent_Requests from './pages/Seller/Agent_Requests';
import Agent_Details from './pages/Seller/Agent_Details';
import Agent_Trends from './pages/Seller/Agent_Trends'; 

import Invoice from './pages/Seller/Invoice';
import Messages_List from './pages/Seller/Messages_List';
import Messages_Details from './pages/Seller/Messages_Details';
import Order_List from './pages/Seller/Order_List';
import Order_Details from './pages/Seller/Order_Details';
import Dashboard_Part from './pages/Seller/Dashboard_Part';
import Tracking from './pages/Seller/Tracking';



//Buyer pages
import OrderTracking from "./pages/Buyer/OrderTracking";
import TrackOrders from "./pages/Buyer/TrackOrders";
//End
// the pages for the agent
import AgentHome from "./pages/Agent/AgentHome";
import Dashboard from "./pages/Agent/Dashboard";
import DeliveryDetails from "./pages/Agent/DeliveryDetails";
import DeliveryConfirmation from "./pages/Agent/DeliveryConfirmation";
import PerformanceMetrics from "./pages/Agent/PerformanceMetrics";
import IssueReporting from "./pages/Agent/IssueReporting";
import ManageDeliveries from "./pages/Agent/ManageDeliveries";
import AddDelivery from "./pages/Agent/AddDelivery";
import CommunicationTools from "./pages/Agent/CommunicationTools";
import UpdateParcelStatusPage from "./pages/Agent/UpdateParcelStatusPage";
import AgentLogin from "./pages/Agent/AgentLogin";
import AgentRegister from "./pages/Agent/AgentRegister";
import AgentProfile from "./pages/Agent/AgentProfile";
import UpdateStatus from "./pages/Agent/UpdateStatus";
// end of the pages for the agent
import { UserProvider } from "./Context/UserContext";
import { TrackingProvider } from "./Context/TrackingContext";
function App() {
  return (
    <Router>
      <UserProvider>
      <Header />
        <TrackingProvider>
          <Routes>
     
            {/* Seller Routes  Start*/}
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Create_Account />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/agent-requests" element={<Agent_Requests />} />
            <Route path="/agent/:id" element={<Agent_Details />} />
            <Route path="/agent-trends/:id" element={<Agent_Trends />} /> 
            <Route path="/invoice/:id" element={<Invoice />} />
            <Route path="/messages-list" element={<Messages_List />} />
            <Route path="/message/:id" element={<Messages_Details />} />
            <Route path="/order-list" element={<Order_List />} />
            <Route path="/order/:id" element={<Order_Details />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/dashboard-part" element={<Dashboard_Part />} />
            {/* Seller Routes  */}

            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<Create_Account />} />
            <Route path="/agent-requests" element={<Agent_Requests />} />
            <Route path="/order-list" element={<Order_List />} />
            <Route path="/order/:id" element={<Order_Details />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/track/:parcelId" element={<OrderTracking />} />
            <Route path="/track-orders" element={<TrackOrders />} />
              
            {/* the pages for the agent */}
            <Route path="/agent" element={<AgentHome />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/delivery-details/:id" element={<DeliveryDetails />} />
            <Route path="/delivery-confirmation" element={<DeliveryConfirmation />} />
            <Route path="/performance-metrics" element={<PerformanceMetrics />} />
            <Route path="/issue-reporting" element={<IssueReporting />} />
            <Route path="/manage-deliveries" element={<ManageDeliveries />} />
            <Route path="/add-delivery" element={<AddDelivery />} />
            <Route path="/communication-tools" element={<CommunicationTools />} />
            <Route path="/update-parcel-status" element={<UpdateParcelStatusPage />} />
            <Route path="/agent-login" element={<AgentLogin />} />
            <Route path="/agent-register" element={<AgentRegister />} />
            <Route path="/agent-profile" element={<AgentProfile />} />
            <Route path="/update-status" element={<UpdateStatus />} />
            {/* end of the pages for the agent */}

            <Route path="/request-reset-password" element={<RequestResetPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </TrackingProvider>
        <Footer />
        <ToastContainer
          position="top-center"
          toastOptions={{
            style: {
              background: "rgb(51 65 85)",
              color: "#000",
              borderRadius: "4px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              padding: "10px 20px",
            },
          }}
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          progress={undefined}
          theme="dark"
        />
      </UserProvider>

    </Router>
  );
}

export default App;
