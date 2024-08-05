// eslint-disable-next-line no-unused-vars
import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import RequestResetPassword from "./components/RequestResetPassword";
import ResetPassword from "./components/ResetPassword";
import ChangePassword from "./components/Change-Password";
import Login from "./components/Login";
import Create_Account from "./components/Create_Account";
import SendNotification from "./pages/SendNotification";

// Seller Pages
import Home from "./pages/Seller/Home";
import Agents from "./pages/Seller/Agents";
import Agent_Requests from "./pages/Seller/Agent_Requests";
import Agent_Details from "./pages/Seller/Agent_Details";
import Agent_Trends from "./pages/Seller/Agent_Trends";
import Invoice from "./pages/Seller/Invoice";
import Messages_List from "./pages/Seller/Messages_List";
import Messages_Details from "./pages/Seller/Messages_Details";
import Order_List from "./pages/Seller/Order_List";
import Order_Details from "./pages/Seller/Order_Details";
import Dashboard_Part from "./pages/Seller/Dashboard_Part";
import Tracking from "./pages/Seller/Tracking";
import SellerPofie from "./pages/Seller/SellerPofie";
import SellerLayout from "./components/SellerLayout";

//Buyer pages
import OrderTracking from "./pages/Buyer/OrderTracking";
import TrackOrders from "./pages/Buyer/TrackOrders";

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
// import AgentLogin from "./pages/Agent/AgentLogin";
// import AgentRegister from "./pages/Agent/AgentRegister";
import AgentProfile from "./pages/Agent/AgentProfile";
import UpdateStatus from "./pages/Agent/UpdateStatus";
// end of the pages for the agent

import { UserProvider } from "./Context/UserContext";
import { TrackingProvider } from "./Context/TrackingContext";
import Landing from "./components/landing";
import About from "./pages/About";
import Contact from "./pages/Contacts";
import PrivacyPolicy from "./pages/policy";
import Terms from "./pages/terms";
import Returns from "./pages/return";
function App() {
  return (
    <Router>
      <UserProvider>
        <TrackingProvider>
        
          <Routes>
            <Route path="/seller" element={<SellerLayout />}>
              {/* Seller Routes */}
              <Route path="/seller" element={<Home />} />
              <Route path="/seller/signup" element={<Create_Account />} />
              <Route path="/seller/agents" element={<Agents />} />
              <Route
                path="/seller/agent-requests"
                element={<Agent_Requests />}
              />
              <Route path="/seller/agent/:id" element={<Agent_Details />} />
              <Route
                path="/seller/agent-trends/:id"
                element={<Agent_Trends />}
              />
              <Route path="/seller/invoice/:id" element={<Invoice />} />
              <Route path="/seller/messages-list" element={<Messages_List />} />
              <Route
                path="/seller/message/:id"
                element={<Messages_Details />}
              />
              <Route path="/seller/order-list" element={<Order_List />} />
              <Route path="/seller/order/:id" element={<Order_Details />} />
              <Route path="/seller/tracking" element={<Tracking />} />
              <Route
                path="/seller/dashboard-part"
                element={<Dashboard_Part />}
              />
              <Route path="/seller/seller-profile" element={<SellerPofie />} />
            </Route>

            {/* Buyer Routes */}
            <Route path="/tracking" element={<OrderTracking />} />

            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<Create_Account />} />
            <Route path="/agent-requests" element={<Agent_Requests />} />
            <Route path="/order-list" element={<Order_List />} />
            <Route path="/order/:id" element={<Order_Details />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/track/:trackingid" element={<OrderTracking />} />
            <Route path="/track-orders" element={<TrackOrders />} />

            {/* the pages for the agent */}
            <Route path="/agent" element={<AgentHome />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/delivery-details/:id" element={<DeliveryDetails />} />
            <Route
              path="/delivery-confirmation"
              element={<DeliveryConfirmation />}
            />
            <Route
              path="/performance-metrics"
              element={<PerformanceMetrics />}
            />
            <Route path="/issue-reporting" element={<IssueReporting />} />
            <Route path="/manage-deliveries" element={<ManageDeliveries />} />
            <Route path="/add-delivery" element={<AddDelivery />} />
            <Route
              path="/communication-tools"
              element={<CommunicationTools />}
            />
            <Route
              path="/update-parcel-status"
              element={<UpdateParcelStatusPage />}
            />
            {/* <Route path="/agent-login" element={<AgentLogin />} /> */}
            {/* <Route path="/agent-register" element={<AgentRegister />} /> */}
            <Route path="/agent-profile" element={<AgentProfile />} />
            <Route path="/update-status" element={<UpdateStatus />} />
            {/* end of the pages for the agent */}

            <Route
              path="/request-reset-password"
              element={<RequestResetPassword />}
            />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/send-notification" element={<SendNotification />} />
            <Route path="/" element={<Landing />} />
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
          hideProgressBar={false}
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
