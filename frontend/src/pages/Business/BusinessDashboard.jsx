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
  // const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const { analyticsData, loading, fetchDashboardData, OldAnalyticsData } = useAnalytics();
  const [dateRange, setDateRange] = useState("week");
  const { currentUser } = useContext(UserContext);
  const chartThemes = {
    light: {
      textColor: "#333",
      gridColor: "#eee",
      backgroundColor: "#fff",
      lineColor: "#8884d8",
      barColor: "#82ca9d",
      tooltipBg: "#fff",
      tooltipBorder: "#ccc",
    },
    dark: {
      textColor: "#e2e8f0",
      gridColor: "#4a5568",
      backgroundColor: "#2d3748",
      lineColor: "#9f7aea", // Purple
      barColor: "#4299e1", // Blue
      tooltipBg: "#1a202c",
      tooltipBorder: "#4a5568",
    },
  };

  useEffect(() => {
    if (currentUser?.user_id) {
      fetchDashboardData(dateRange, currentUser.user_id);
    }
  }, [dateRange, currentUser?.user_id, fetchDashboardData]);

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

  const renderChart = (data, ChartComponent, dataKey, darkMode = false) => {
    const theme = darkMode ? chartThemes.dark : chartThemes.light;

    if (
      !data ||
      (Array.isArray(data) && data.length === 0) ||
      (typeof data === "object" && Object.keys(data).length === 0)
    ) {
      return <p>No data available for the selected period.</p>;
    }

    let chartData = [];

    // Handle different data formats
    if (Array.isArray(data)) {
      chartData = data.map((item) => ({
        name: item.date, // Changed from 'date' to 'name' which Recharts prefers
        value: item[dataKey] || item.count || 0,
      }));
    } else if (data.historical && data.predictions) {
      // Handle trend data structure
      chartData = [
        ...(data.historical || []).map((item) => ({
          name: item.date,
          value: item.count,
          type: "historical",
        })),
        ...(data.predictions || []).map((item) => ({
          name: item.date,
          value: item.count,
          type: "prediction",
        })),
      ];
    } else if (typeof data === "object") {
      chartData = Object.entries(data).map(([key, value]) => ({
        name: key,
        value: typeof value === "object" ? value.count : value,
      }));
    }

    if (chartData.length === 0) {
      return <p>No data available for the selected period.</p>;
    }

    // Sort by date
    chartData.sort((a, b) => new Date(a.name) - new Date(b.name));

    // Simplify data if too many points
    if (chartData.length > 30) {
      const step = Math.ceil(chartData.length / 30);
      chartData = chartData.filter((_, index) => index % step === 0);
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis
            dataKey="name"
            tick={{ fill: theme.textColor }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}
          />
          <YAxis tick={{ fill: theme.textColor }} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.tooltipBg,
              borderColor: theme.tooltipBorder,
              color: theme.textColor,
            }}
            formatter={(value) => [Number(value).toLocaleString(), "Count"]}
            labelFormatter={(label) => {
              const date = new Date(label);
              return `Date: ${date.toLocaleDateString()}`;
            }}
          />
          <Legend wrapperStyle={{ color: theme.textColor }} />
          {ChartComponent === LineChart ? (
            <Line
              type="monotone"
              dataKey="value"
              stroke={theme.lineColor}
              activeDot={{ r: 8 }}
            />
          ) : (
            <Bar dataKey="value" fill={theme.barColor} />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  // console.log("Dashboard data:", analyticsData);

  const renderParcelsChart = (parcelsData, darkMode = false) => {
    const theme = darkMode ? chartThemes.dark : chartThemes.light;

    if (!parcelsData || parcelsData.length === 0) {
      return <p>No parcel data available.</p>;
    }

    const chartData = parcelsData.map((item) => ({
      name: item.status,
      count: item.count,
    }));

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis dataKey="name" tick={{ fill: theme.textColor }} />
          <YAxis tick={{ fill: theme.textColor }} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.tooltipBg,
              borderColor: theme.tooltipBorder,
              color: theme.textColor,
            }}
            formatter={(value) => [Number(value).toLocaleString(), "Count"]}
            labelFormatter={(label) => label}
          />
          <Legend wrapperStyle={{ color: theme.textColor }} />
          <Bar dataKey="count" fill={theme.barColor} />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div
      className={`container mx-auto px-4 py-8 overflow-y-auto h-full ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      {/* Dark mode toggle button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-md ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
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
          className={` p-2 rounded-md ${
            darkMode ? " border border-gray-700 bg-gray-700" : "border border-gray-300 bg-white"
          }`}
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
        </select>
      </div>

      {loading ? (
        <p>Loading charts...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card
            className={`min-h-[400px] ${darkMode ? "bg-gray-700" : "bg-white"}`}
          >
            <CardHeader>Orders Count</CardHeader>
            <CardContent className="h-[350px]">
              {renderChart(analyticsData.orders, LineChart, "count", darkMode)}
            </CardContent>
          </Card>

          <Card
            className={`min-h-[400px] ${darkMode ? "bg-gray-700" : "bg-white"}`}
          >
            <CardHeader>Parcels by Status</CardHeader>
            <CardContent className="h-[350px]">
              {renderParcelsChart(analyticsData.parcels, darkMode)}
            </CardContent>
          </Card>

          <Card
            className={`min-h-[400px] ${darkMode ? "bg-gray-700" : "bg-white"}`}
          >
            <CardHeader>Orders Trend</CardHeader>
            <CardContent className="h-[350px]">
              {analyticsData.trend?.error ? (
                <p className="text-red-500">{analyticsData.trend.error}</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      ...(analyticsData.trend.historical || []),
                      ...(analyticsData.trend.predictions || []),
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getMonth() + 1}/${date.getDate()}`;
                      }}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [
                        Number(value).toLocaleString(),
                        "Count",
                      ]}
                      labelFormatter={(label) => {
                        const date = new Date(label);
                        return `Date: ${date.toLocaleDateString()}`;
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#8884d8"
                      name="Historical"
                      strokeDasharray="5 5"
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#82ca9d"
                      name="Predictions"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card
            className={`min-h-[400px] ${darkMode ? "bg-gray-700" : "bg-white"}`}
          >
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