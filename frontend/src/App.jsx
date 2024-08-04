// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Agent_List from "./pages/Agent_List";
import Agent_Requests from "./pages/Agent_Requests";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Order_List from "./pages/Order_List";
import Order_Details from "./pages/Order_Details"
import Reset_Password from "./pages/Reset_Password";
//Buyer pages
import OrderTracking from "./pages/Buyer/OrderTracking";
import TrackOrders from "./pages/Buyer/TrackOrders";
import Create_Account from "./pages/Buyer/Create_Account"
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
import {UserProvider} from './Context/UserContext';
import { TrackingProvider } from './Context/TrackingContext';
function App() {
  return (
    <Router>
      <Header />
      <UserProvider>
      <TrackingProvider >
      <Routes>

        <Route path="/create-account" element={<Create_Account />} />
        <Route path="/agent-list" element={<Agent_List />} />
        <Route path="/agent-requests" element={<Agent_Requests />} />
        <Route path="/order-list" element={<Order_List />} />
        <Route path="/order/:id" element={<Order_Details />} />
        <Route path="/reset-password" element={<Reset_Password />} />
        <Route path="/track/:parcelId" element={<OrderTracking />} />
        <Route path="/track-orders" element={<TrackOrders />} /> 
        {/* the pages for the agent */}
        <Route path="/agent" element={<AgentHome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/delivery-details/:id" element={<DeliveryDetails />} />
        <Route
          path="/delivery-confirmation"
          element={<DeliveryConfirmation />}
        />
        <Route path="/performance-metrics" element={<PerformanceMetrics />} />
        <Route path="/issue-reporting" element={<IssueReporting />} />
        <Route path="/manage-deliveries" element={<ManageDeliveries />} />
        <Route path="/add-delivery" element={<AddDelivery />} />
        <Route path="/communication-tools" element={<CommunicationTools />} />
        <Route
          path="/update-parcel-status"
          element={<UpdateParcelStatusPage />}
        />
        <Route path="/agent-login" element={<AgentLogin />} />
        <Route path="/agent-register" element={<AgentRegister />} />
        <Route path="/agent-profile" element={<AgentProfile />} />
        <Route path="/update-status" element={<UpdateStatus />} />
        {/* end of the pages for the agent */}
      </Routes>
      </TrackingProvider> 
      </UserProvider>
      <Footer />
    </Router>
  );
}

export default App;
