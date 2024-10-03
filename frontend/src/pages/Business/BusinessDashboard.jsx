import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaBox, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAnalytics } from "../../Context/AnalyticsContext";
import { currentUser } from "../../Context/UserContext";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

function BusinessDashboard() {
  const navigate = useNavigate();
  const {
    analyticsData,
    loading,
    getOrdersCount,
    getParcelsByStatus,
    getOrdersTrend,
    getBusinessPerformance,
  } = useAnalytics();
  const [dateRange, setDateRange] = useState("week");
  const userId = currentUser.user_id;

  useEffect(() => {
    getOrdersCount(dateRange, userId);
    getParcelsByStatus(dateRange, userId);
    getOrdersTrend(dateRange, userId);
    getBusinessPerformance(dateRange, userId);
  }, [
    dateRange,
    userId,
    getOrdersCount,
    getParcelsByStatus,
    getOrdersTrend,
    getBusinessPerformance,
  ]);

  const dashboardItems = [
    {
      title: "Create Order",
      icon: <FaCalendarAlt size={24} />,
      link: "/business/schedule-pickup",
    },
    {
      title: "Order Management",
      icon: <FaBox size={24} />,
      link: "/business/orders",
    },
    {
      title: "Parcel Tracking",
      icon: <FaMapMarkerAlt size={24} />,
      link: "/business/parcel-tracking",
    },
    { title: "Agents", icon: <FaUsers size={24} />, link: "/business/agents" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Business Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardItems.map((item, index) => (
          <Card
            key={index}
            onClick={() => navigate(item.link)}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              {item.icon}
              <CardHeader className="text-lg font-semibold mt-4">
                {item.title}
              </CardHeader>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-4">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {loading ? (
        <p>Loading charts...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>Orders Count</CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.orders}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>Parcels by Status</CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.parcels}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>Orders Trend</CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.trend?.historical}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>Business Performance</CardHeader>
            <CardContent>
              {analyticsData.performance && (
                <div>
                  <p>Total Orders: {analyticsData.performance.total_orders}</p>
                  <p>
                    Total Parcels: {analyticsData.performance.total_parcels}
                  </p>
                  <p>
                    Avg Delivery Time:{" "}
                    {analyticsData.performance.avg_delivery_time}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default BusinessDashboard;
