/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Footer from "./components/Footer";
import RequestResetPassword from "./components/RequestResetPassword";
import ResetPassword from "./components/ResetPassword";
import ChangePassword from "./components/Change-Password";
import Login from "./components/Login";
import Create_Account from "./components/Create_Account";
// import SendNotification from "./pages/SendNotification";

// Admin
import Profile from "./pages/Admin/Profile";
import AgentRequests from "./pages/Admin/AgentRequest";
import AgentList from "./pages/Admin/AgentList";
import BusinessList from "./pages/Admin/BusinessList";

// Seller Pages
import Home from "./pages/Seller/Home";
import Agents from "./pages/Seller/Agents";
import Agent_Details from "./pages/Seller/Agent_Details";
import Invoice from "./pages/Seller/Invoice";
import Messages_List from "./pages/Seller/Messages_List";
import Messages_Details from "./pages/Seller/Messages_Details";
// import Order_List from "./pages/Seller/Order_List";
// import Order_Details from "./pages/Seller/Order_Details";
import Dashboard_Part from "./pages/Seller/Dashboard_Part";
import Tracking from "./pages/Seller/Tracking";
import SellerPofie from "./pages/Seller/SellerPofie";
import SellerLayout from "./components/SellerLayout";

// Business Pages
import BusinessDashboard from "./pages/Business/BusinessDashboard";
import OrderManagement from "./pages/Business/OrderManagement";
import ParcelForm from "./pages/Business/ParcelForm";
import ParcelTracking from "./pages/Business/ParcelTracking";
import PickupScheduling from "./pages/Business/PickupScheduling";

// Buyer Pages
import OrderTracking from "./pages/Buyer/OrderTracking";
import TrackOrders from "./pages/Buyer/TrackOrders";

// Agent Pages
// import AgentHome from "./pages/Agent/AgentHome";
import Dashboard from "./pages/Agent/Dashboard";
import DeliveryDetails from "./pages/Agent/DeliveryDetails";
import DeliveryConfirmation from "./pages/Agent/DeliveryConfirmation";
import PerformanceMetrics from "./pages/Agent/PerformanceMetrics";
import ManageDeliveries from "./pages/Agent/ManageDeliveries";
import CommunicationTools from "./pages/Agent/CommunicationTools";
import AgentProfile from "./pages/Agent/AgentProfile";

// Context Providers
import { UserProvider, UserContext } from "./Context/UserContext";
import { TrackingProvider } from "./Context/TrackingContext";
import { DeliveryProvider } from "./Context/DeliveryContext";
import { NotificationProvider } from "./Context/NotificationContext";

// Other Pages
import Landing from "./components/landing";
import About from "./pages/About";
import Contact from "./pages/Contacts";
import PrivacyPolicy from "./pages/policy";
import Terms from "./pages/terms";
import Returns from "./pages/return";

// ProtectedRoute component to handle route protection
function ProtectedRoute({ element }) {
  const { authToken } = React.useContext(UserContext);

  if (!authToken) {
    return <Navigate to="/login" />;
  }

  return element;
}

function App() {
  return (
    <Router>
      <UserProvider>
        <NotificationProvider>
          <TrackingProvider>
            <DeliveryProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Create_Account />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route
                  path="/request-reset-password"
                  element={<RequestResetPassword />}
                />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />

                {/* <Route path="/send-notification" element={<SendNotification />} /> */}

                {/* Public Pages */}
                <Route path="/about" element={<About />} />
                <Route path="/contact-us" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/" element={<Landing />} />

                {/* Seller Routes */}
                <Route path="/seller" element={<SellerLayout />}>
                  <Route path="/seller" element={<Home />} />
                  <Route path="/seller/signup" element={<Create_Account />} />
                  <Route
                    path="/seller/agents"
                    element={<ProtectedRoute element={<Agents />} />}
                  />
                  <Route path="/seller/agent/:id" element={<Agent_Details />} />
                  <Route path="/seller/invoice/:id" element={<Invoice />} />
                  <Route
                    path="/seller/messages-list"
                    element={<Messages_List />}
                  />
                  <Route
                    path="/seller/message/:id"
                    element={<Messages_Details />}
                  />
                  {/* <Route path="/seller/order-list" element={<Order_List />} />
                <Route path="/seller/order/:id" element={<Order_Details />} /> */}
                  <Route path="/seller/tracking" element={<Tracking />} />
                  <Route
                    path="/seller/dashboard-part"
                    element={<Dashboard_Part />}
                  />
                  <Route
                    path="/seller/seller-profile"
                    element={<ProtectedRoute element={<SellerPofie />} />}
                  />
                </Route>

                {/* Buyer Routes */}
                <Route path="/tracking" element={<OrderTracking />} />
                {/* <Route path="/order-list" element={<Order_List />} />
              <Route path="/order/:id" element={<Order_Details />} /> */}
                <Route
                  path="/track/:trackingNumber?"
                  element={<OrderTracking />}
                />
                <Route path="/track-orders" element={<TrackOrders />} />

                {/* Agent Routes */}
                {/* <Route
                path="/agent"
                element={<ProtectedRoute element={<AgentHome />} />}
              /> */}
                <Route
                  path="agent/dashboard/*"
                  element={<ProtectedRoute element={<Dashboard />} />}
                />
                <Route
                  path="/delivery-details/:id"
                  element={<ProtectedRoute element={<DeliveryDetails />} />}
                />
                <Route
                  path="/delivery-confirmation"
                  element={
                    <ProtectedRoute element={<DeliveryConfirmation />} />
                  }
                />
                <Route
                  path="/performance-metrics"
                  element={<ProtectedRoute element={<PerformanceMetrics />} />}
                />
                <Route
                  path="/manage-deliveries"
                  element={<ProtectedRoute element={<ManageDeliveries />} />}
                />
                <Route
                  path="/communication-tools"
                  element={<ProtectedRoute element={<CommunicationTools />} />}
                />
                <Route
                  path="/agent-profile"
                  element={<ProtectedRoute element={<AgentProfile />} />}
                />

                {/* Business Routes */}
                <Route
                  path="/business/dashboard"
                  element={<ProtectedRoute element={<BusinessDashboard />} />}
                />
                <Route
                  path="/business/parcel-tracking"
                  element={<ProtectedRoute element={<ParcelTracking />} />}
                />
                <Route
                  path="/business/parcel-tracking/:trackingid"
                  element={<ProtectedRoute element={<ParcelTracking />} />}
                />
                <Route
                  path="/business/orders"
                  element={<ProtectedRoute element={<OrderManagement />} />}
                />
                <Route
                  path="/business/parcels"
                  element={<ProtectedRoute element={<ParcelForm />} />}
                />
                <Route
                  path="/business/schedule-pickup"
                  element={<ProtectedRoute element={<PickupScheduling />} />}
                />

                {/* Admin Routes */}
                <Route
                  path="/admin/requests"
                  element={<ProtectedRoute element={<AgentRequests />} />}
                />
                <Route
                  path="/admin/profile"
                  element={<ProtectedRoute element={<Profile />} />}
                />
                <Route
                  path="/admin/agents"
                  element={<ProtectedRoute element={<AgentList />} />}
                />
                <Route
                  path="/admin/businesses"
                  element={<ProtectedRoute element={<BusinessList />} />}
                />
                <Route
                  path="/admin/agent/:id"
                  element={<ProtectedRoute element={<Agent_Details />} />}
                />
              </Routes>
            </DeliveryProvider>
          </TrackingProvider>
        </NotificationProvider>
        <Footer />
        <ToastContainer
          position="top-center"
          toastOptions={{
            style: {
              background: "rgb(51 65 85)",
              color: "#000",
              borderRadius: "8px",
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
