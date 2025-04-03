import React, { createContext, useState, useContext, useCallback } from "react";
import { toast } from "react-toastify";
import { server } from "../../config.json";

const AnalyticsContext = createContext();

export const useAnalytics = () => useContext(AnalyticsContext);

export const AnalyticsProvider = ({ children }) => {
  const [OldAnalyticsData, setOldAnalyticsData] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({
    orders: [],
    parcels: [],
    trend: {
      historical: [],
      predictions: [],
    },
    performance: {
      total_orders: 0,
      total_parcels: 0,
      avg_delivery_time: null,
    },
  });
  const [loading, setLoading] = useState(false);


  const fetchDashboardData = useCallback(async (dateRange, userId) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${server}/analytics/business-dashboard/${dateRange}?user_id=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setAnalyticsData({
        orders: data.orders || [],
        parcels: data.parcels || [],
        trend: data.trend || {},
        performance: data.performance || {},
      });
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);
// -------------------------------------------------------------------------------------------------------------------------//
  //individual fetch functions if needed for other components
  const fetchData = useCallback(async (endpoint, params = {}) => {
    setLoading(true);

    // Filter out undefined/null params
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v != null)
    );

    const queryString = new URLSearchParams(cleanParams).toString();
    const url = `${server}/analytics/${endpoint}${
      queryString ? `?${queryString}` : ""
    }`;

    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors", // Explicitly enable CORS
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        // credentials: "include", // If using cookies
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setOldAnalyticsData((prev) => ({ ...prev, [endpoint]: data }));
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getOrdersCount = useCallback(
    (dateRange, userId) => {
      return fetchData(`orders/${dateRange}`, { user_id: userId });
    },
    [fetchData]
  );

  const getParcelsByStatus = useCallback(
    (dateRange, userId) => {
      fetchData(`parcels/status/${dateRange}`, { user_id: userId });
    },
    [fetchData]
  );

  const getUsersByRole = useCallback(
    (dateRange) => {
      fetchData(`users/role/${dateRange}`);
    },
    [fetchData]
  );

  const getDeliveryPerformance = useCallback(
    (dateRange, agentId) => {
      fetchData(`deliveries/performance/${dateRange}`, { agent_id: agentId });
    },
    [fetchData]
  );

  const getOrdersTrend = useCallback(
    (dateRange, userId) => {
      fetchData(`trend/orders/${dateRange}`, { user_id: userId });
    },
    [fetchData]
  );

  const getBusinessPerformance = useCallback(
    (dateRange, userId) => {
      fetchData(`business/performance/${dateRange}`, { user_id: userId });
    },
    [fetchData]
  );

  const getAgentPerformance = useCallback(
    (dateRange, agentId) => {
      fetchData(`agent/performance/${dateRange}`, { agent_id: agentId });
    },
    [fetchData]
  );

  const value = {
    analyticsData,
    OldAnalyticsData,
    loading,
    fetchDashboardData,
    getOrdersCount,
    getParcelsByStatus,
    getUsersByRole,
    getDeliveryPerformance,
    getOrdersTrend,
    getBusinessPerformance,
    getAgentPerformance,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};
