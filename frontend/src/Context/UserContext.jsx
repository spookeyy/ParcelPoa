/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
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
  function updateUser(name, email, phone_number, updated_at) {
    fetch(`${server}/profile`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        email: email,
        phone_number: phone_number,
        updated_at: updated_at,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.success);
        } else if (res.error) {
          toast.error(res.error);
        } else {
          toast.error("An error occured");
        }
      });
  }

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
        if (res.success) {
          toast.success(res.success);
          localStorage.removeItem("access_token");
          setAuthToken(null);
          setCurrentUser(null);
          setOnChange(!onChange);
          nav("/login");
        } else if (res.error) {
          toast.error(res.error);
        } else {
          toast.error("An error occured");
        }
      });
  };
  useEffect(() => {
    if (authToken) {
      fetch(`${server}/current_user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.email) {
            setCurrentUser(data);
          } else {
            localStorage.removeItem("access_token");
            setCurrentUser(null);
            setAuthToken(null);
            nav("/login");
          }
        });
    }
  }, [authToken, onChange, nav]);

  const contextData = {
    currentUser,
    setCurrentUser,
    authToken,
    login,
    logout,
    addUser,
    updateUser,
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
