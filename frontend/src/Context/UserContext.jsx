/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { server } from "../../config";

export const UserContext = createContext();

export default function UserProvider({ children }) {
    const [authToken, setAuthToken] = useState(() => sessionStorage.getItem("authToken") || null);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) {
            fetchCurrentUser();
        }
    }, [authToken]);

    function fetchCurrentUser() {
        fetch(`${server}/current_user`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(response => response.json())
        .then(data => setCurrentUser(data))
        .catch(error => console.error("Failed to fetch current user", error));
    }

    function addUser(name, email, phone_number, password, user_role) {
        fetch(`${server}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                phone_number,
                password,
                user_role,
            }),
        })
        .then(response => {
            if (response.ok) {
                toast.success("User registered successfully");
                navigate("/login");
            } else {
                return response.json().then(errorData => {
                    toast.error(errorData.message || "Failed to register user");
                });
            }
        })
        .catch(error => {
            toast.error("Failed to register user");
            console.error("Failed to register user", error);
        });
    }

    function updateUser(user_id, updates) {
        fetch(`${server}/users/${user_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(updates),
        })
        .then(response => {
            if (response.ok) {
                fetchCurrentUser();
                toast.success("User profile updated successfully");
            } else {
                return response.json().then(errorData => {
                    toast.error(errorData.message || "Failed to update user profile");
                });
            }
        })
        .catch(error => {
            toast.error("Failed to update user profile");
            console.error("Failed to update user profile", error);
        });
    }

    function login(email, password) {
        fetch(`${server}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => {
            if (response.ok) {
                return response.json().then(data => {
                    setAuthToken(data.access_token);
                    sessionStorage.setItem("authToken", data.access_token);
                    fetchCurrentUser();
                    toast.success("Logged in successfully");
                    navigate("/");
                });
            } else {
                return response.json().then(errorData => {
                    toast.error(errorData.message || "Invalid credentials");
                });
            }
        })
        .catch(error => {
            toast.error("Failed to log in");
            console.error("Failed to log in", error);
        });
    }

    function logout() {
        setAuthToken(null);
        sessionStorage.removeItem("authToken");
        setCurrentUser(null);
        toast.success("Logged out successfully");
        navigate("/login");
    }

    function deleteUser(user_id) {
        fetch(`${server}/users/${user_id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(response => {
            if (response.ok) {
                logout();
                toast.success("User deleted successfully");
            } else {
                return response.json().then(errorData => {
                    toast.error(errorData.message || "Failed to delete user");
                });
            }
        })
        .catch(error => {
            toast.error("Failed to delete user");
            console.error("Failed to delete user", error);
        });
    }

    return (
        <UserContext.Provider
            value={{
                authToken,
                currentUser,
                addUser,
                updateUser,
                login,
                logout,
                deleteUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
