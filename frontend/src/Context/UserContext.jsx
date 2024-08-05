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
  const addUser = (name, email, phone_number, password, user_role) => {
    return new Promise((resolve, reject) => {
      fetch(`${server}/register`, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          phone_number: phone_number,
          password: password,
          user_role: user_role,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((res) => {
          console.log("Server response:", res);
          if (res.message && res.message.includes("successfully")) {
            toast.success(res.message);
            resolve(res);
          } else if (res.error) {
            toast.error(res.error);
            reject(new Error(res.error));
          } else {
            console.error("Unexpected response structure:", res);
            toast.error("An unexpected error occurred");
            reject(new Error("Unexpected response structure"));
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          toast.error(`An error occurred: ${error.message}`);
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
        console.log("Login response", res);
        if (res.access_token && res.user) {
          setAuthToken(res.access_token);
          localStorage.setItem("access_token", res.access_token);
          setCurrentUser(res.user);

          if (res.user.role === "Agent" || res.user.role === "Business") {
            toast.success(`Logged in Successfully as ${res.user.role}!`);
            // TODO: navigate to dashboards check on business from peter
            nav(res.user.role === "Agent" ? "/agent" : "/seller/dashboard");
          } else {
            console.error("Unexpected role:", res.user.role);
            throw new Error(`Unexpected role: ${res.user.role}`);
          }
        } else if (res.message) {
          throw new Error(res.message);
        } else {
          throw new Error("An unexpected error occurred during login");
        }
      })
      .catch((error) => {
        toast.error(error.message || "An error occurred during login");
        console.error("Login error:", error);
        throw error;
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
  }, [authToken]);

  useEffect(() => {
    if (authToken) {
      fetchUserProfile();
    }
  }, [authToken, onChange, fetchUserProfile]);

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
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
