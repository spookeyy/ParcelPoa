/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server } from "../../config";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const nav = useNavigate();

  const [currentUser, setCurrentUser] = useState();
  const [onChange, setOnChange] = useState(false);
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("access_token")
      ? localStorage.getItem("access_token")
      : null
  );

  // REGISTER USER
  const addUser = (userData) => {
    return new Promise((resolve, reject) => {
      fetch(`${server}/register`, {
        method: "POST",
        body: JSON.stringify({
          ...userData,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              throw new Error(
                err.message ||
                  err.error ||
                  `HTTP error! status: ${response.status}`
              );
            });
          }
          return response.json();
        })
        .then((res) => {
          // console.log("Server response:", res);
          if (res.message && res.message.includes("successfully")) {
            toast.success(res.message);
            resolve(res);
          } else {
            console.error("Unexpected response structure:", res);
            toast.error("An unexpected error occurred");
            reject(new Error("Unexpected response structure"));
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          // toast.error(`An error occurred: ${error.message}`);
          reject(error);
        });
    });
  };

  // LOGIN USER
  function login(email, password) {
    return fetch(`${server}/login`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        // console.log("Login response", res);
        if (res.access_token && res.user) {
          setAuthToken(res.access_token);
          localStorage.setItem("access_token", res.access_token);
          setCurrentUser(res.user);
        }

        if (
          res.user.role === "Agent" ||
          res.user.role === "Business" ||
          res.user.role === "Admin" ||
          res.user.role === "PickupStation"
        ) {
          const { role } = res.user;
          const routes = {
            Agent: "/agent/dashboard",
            Business: "/business/dashboard",
            Admin: "/admin/dashboard",
            PickupStation: "/pickup-station/dashboard",
          };

          if (role in routes) {
            toast.success(`Logged in Successfully as ${role}!`);
            nav(routes[role]);
          } else {
            console.error("Unexpected role:", role);
            throw new Error(`Unexpected role: ${role}`);
          }
        } else if (res.message) {
          throw new Error(res.message);
        } else {
          throw new Error("An unexpected error occurred during login");
        }
      })
      .catch((res) => {
        toast.error("Invalid email or password");
        console.error("Login error:", res);
        throw res;
      });
  }

  // UPDATE USER
  const updateUser = (name, email, phone_number) => {
    fetch(`${server}/profile`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        email,
        phone_number,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.message) {
          toast.success(res.message);
          setOnChange(!onChange);
        } else {
          toast.error("An error occurred");
        }
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
        toast.error("An error occurred");
      });
  };

  // LOGOUT
  const logout = () => {
    fetch(`${server}/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.message) {
          toast.success(res.message);
          localStorage.removeItem("access_token");
          setAuthToken(null);
          setCurrentUser(null);
          setOnChange(!onChange);
          nav("/login");
        } else {
          toast.error("An error occurred");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        toast.error("An error occurred");
      });
  };

  // fetch user profile
  const fetchUserProfile = useCallback(() => {
    console.log("fetchUserProfile called");
    fetch(`${server}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user_id) {
          setCurrentUser(data);
        } else {
          setAuthToken(null);
          localStorage.removeItem("access_token");
        }
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setAuthToken(null);
        localStorage.removeItem("access_token");
      });
  }, [authToken, setCurrentUser, setAuthToken]);

  useEffect(() => {
    if (authToken) {
      fetchUserProfile();
    }
  }, [authToken, onChange, fetchUserProfile]);

  // REQUEST PASSWORD RESET

  // current user
  const getCurrentUser = () => {
    return fetch(`${server}/current_user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user_id) {
          setCurrentUser(data);
        } else {
          setAuthToken(null);
          localStorage.removeItem("access_token");
        }
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
        setAuthToken(null);
        localStorage.removeItem("access_token");
      });
  };

  // Request Password Reset

  const requestPasswordReset = (email, frontendUrl) => {
    return fetch(`${server}/request-reset-password`, {
      method: "POST",
      body: JSON.stringify({ email, frontend_url: frontendUrl }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.message) {
          return res.message;
        } else {
          throw new Error("An unexpected error occurred");
        }
      })
      .catch((error) => {
        console.error("Error requesting password reset:", error);
        throw error;
      });
  };

  // Reset Password
  const resetPassword = (token, newPassword) => {
    return fetch(`${server}/reset-password/${token}`, {
      method: "POST",
      body: JSON.stringify({ new_password: newPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.message) {
          return res.message;
        } else {
          throw new Error("An unexpected error occurred");
        }
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
        throw error;
      });
  };

  // APPROVE AGENT REQUEST
  const approveAgentRequest = (agentId) => {
    return fetch(`${server}/approve-agent/${agentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.message) {
          toast.success(res.message);
          return res;
        } else {
          throw new Error("An unexpected error occurred");
        }
      })
      .catch((error) => {
        toast.error("An error occurred");
        throw error;
      });
  };

  // REJECT AGENT REQUEST
  const rejectAgentRequest = (agentId) => {
    return fetch(`${server}/reject-agent/${agentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.message) {
          toast.success(res.message);
          return res;
        } else {
          throw new Error("An unexpected error occurred");
        }
      })
      .catch((error) => {
        toast.error("An error occurred");
        throw error;
      });
  };

  // FETCH AGENT DETAILS
  const fetchAgentDetails = (agentId) => {
    return fetch(`${server}/agent-details/${agentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.agent) {
          return res.agent;
        } else {
          throw new Error("An unexpected error occurred");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while fetching agent details");
        throw error;
      });
  };

  // FETCH ALL AGENTS
  const fetchAllAgents = () => {
    return fetch(`${server}/agents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.agents) {
          return res.agents;
        } else {
          throw new Error("An unexpected error occurred");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while fetching agents");
        throw error;
      });
  };

  //fetch orders:
  const fetchOrders = () => {
    return fetch(`${server}/business/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.orders) {
          return res.orders;
        } else {
          throw new Error("An unexpected error occurred");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while fetching orders");
        throw error;
      });
  };

  const contextData = {
    currentUser,
    setCurrentUser,
    authToken,
    login,
    logout,
    addUser,
    updateUser,
    requestPasswordReset,
    fetchUserProfile,
    onChange,
    setOnChange,
    resetPassword,
    approveAgentRequest,
    rejectAgentRequest,
    fetchAgentDetails,
    fetchAllAgents,
    setAuthToken,
    fetchOrders,
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};

