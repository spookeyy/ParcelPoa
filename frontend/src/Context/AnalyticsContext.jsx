import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import { server } from "../../config.json";

const AnalyticsContext = createContext();

export const useAnalytics = () => useContext(AnalyticsContext);

export const AnalyticsProvider = ({ children }) => {
  const [analyticsData, setAnalyticsData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (endpoint, params = {}) => {
    setLoading(true);
    const queryString = new URLSearchParams(params).toString();
    const url = `${server}/analytics/${endpoint}${
      queryString ? `?${queryString}` : ""
    }`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          // Add any authentication headers if needed
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAnalyticsData((prevData) => ({ ...prevData, [endpoint]: data }));
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      toast.error("Failed to fetch analytics data");
    } finally {
      setLoading(false);
    }
  }, []);

  const getOrdersCount = useCallback(
    (dateRange, userId) => {
      fetchData(`orders/${dateRange}`, { user_id: userId });
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
    loading,
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
