import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { UserContext } from "../../Context/UserContext";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";

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
  const { currentUser } = useContext(UserContext);
  const userId = currentUser?.user_id;

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

  const renderChart = (data, ChartComponent, dataKey) => {
    if (!data || data.length === 0) {
      return <p>No data available for the selected period.</p>;
    }
    if (data.length === 1) {
      return (
        <div>
          <p>Only one data point available:</p>
          <p>
            {data[0].date}: {data[0][dataKey]}
          </p>
        </div>
      );
    }
    return (
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {ChartComponent === LineChart ? (
            <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
          ) : (
            <Bar dataKey={dataKey} fill="#82ca9d" />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 overflow-y-auto h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center"
          >
            <div className="text-4xl mb-4 text-yellow-500">{item.icon}</div>
            <h2 className="text-xl font-semibold text-gray-700">
              {item.title}
            </h2>
          </Link>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="min-h-[400px]">
            <CardHeader>Orders Count</CardHeader>
            <CardContent className="h-[350px]">
              {renderChart(analyticsData.orders, LineChart, "count")}
            </CardContent>
          </Card>

          <Card className="min-h-[400px]">
            <CardHeader>Parcels by Status</CardHeader>
            <CardContent className="h-[350px]">
              {renderChart(analyticsData.parcels, BarChart, "count")}
            </CardContent>
          </Card>

          <Card className="min-h-[400px]">
            <CardHeader>Orders Trend</CardHeader>
            <CardContent className="h-[350px]">
              {analyticsData.trend?.error ? (
                <p className="text-red-500">{analyticsData.trend.error}</p>
              ) : (
                renderChart(analyticsData.trend?.historical, LineChart, "count")
              )}
            </CardContent>
          </Card>

          <Card className="min-h-[400px]">
            <CardHeader>Business Performance</CardHeader>
            <CardContent>
              {analyticsData.performance && (
                <div className="space-y-4">
                  <p className="text-lg">
                    <span className="font-semibold">Total Orders:</span>{" "}
                    {analyticsData.performance.total_orders}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Total Parcels:</span>{" "}
                    {analyticsData.performance.total_parcels}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Avg Delivery Time:</span>{" "}
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