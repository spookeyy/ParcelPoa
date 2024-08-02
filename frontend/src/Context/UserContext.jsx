/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { server } from "../../config";

export const UserContext = createContext();


export const UserProvider = ({ children }) =>
     {
        const nav = useNavigate();

        const [currentUser, setCurrentUser] = useState();
        const[onChange, setOnChange] = useState(false)
        const [authToken, setAuthToken] = useState(() => localStorage.getItem("access_token")? localStorage.getItem("access_token"): null )
        
    // REGISTER USER
    const addUser = (name, email, phone_number, password, user_role) => {
        fetch(`${server}/register`, {
            method: "POST",
            body: JSON.stringify({
                name : name,
                email: email,
                phone_number : phone_number,
                password : password,
                user_role : user_role,
            }),
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((response) => response.json())
        .then(res => {
            if(res.success)
                {
                    toast.success(res.success)
                    nav("/login")
                }
                else if(res.error)
                {
                    toast.error(res.error)
                }
                else {
                    toast.error("An error occured")
                }
    
            });
        
        }

// LOGIN USER
function login(email, password) {
    fetch(`${server}/login`, {
        method: "POST",
        body: JSON.stringify({ 
            email: email,
            password: password
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => response.json())
    .then(res => {
        if (res.access_token) {
            setAuthToken(res.access_token);
            localStorage.setItem("access_token", res.access_token);

            fetch(`${server}/current_user`, {
                headers: {
                    Authorization: `Bearer ${res.access_token}`,
                },
            })
            .then(response => response.json())
            .then(user => {
                if (user.user_role === "Agent") {
                    toast.success("Logged in Successfully as Agent!");
                    nav("/agent");
                } else if (user.user_role === "Business") {
                    toast.success("Logged in Successfully as Business!");
                    nav("/business-dashboard");
                } else {
                    toast.error("Unknown role");
                }
            })
            .catch(error => {
                toast.error("Failed to fetch user role");
                console.error("Failed to fetch user role", error);
            });
        } else if (res.error) {
            toast.error(res.error);
        } else {
            toast.error("An error occurred");
        }
    })
    .catch(error => {
        toast.error("An error occurred during login");
        console.error("An error occurred during login", error);
    });
}


// UPDATE USER
        function updateUser(name,email,phone_number,updated_at) {
            fetch(`${server}/profile`, {
                method: "PUT",
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone_number: phone_number,
                    updated_at: updated_at
            }),
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${authToken}`,
            },
            })
            .then((response) => response.json())
                .then((res) =>{
                if(res.success)
                    {
                        toast.success(res.success)
                    }
                    else if(res.error)
                    {
                        toast.error(res.error)
                    }
                    else {
                        toast.error("An error occured")
                    }

                });
            
            }
            
    // LOGOUT

    const logout = () => {
        fetch(`${server}/logout`, {
            method:'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${authToken}`,
            },
    })

    .then((response) => response.json())
        .then((res) =>{
            if(res.success)
            {
                toast.success(res.success)
                localStorage.removeItem("access_token")
                setAuthToken(null)
                setCurrentUser(null)
                setOnChange(!onChange)
                nav("/login")
            }
            else if(res.error)
            {
                toast.error(res.error)
            }
            else {
                toast.error("An error occured")
            }
    
  });
}
    useEffect(() => {

        if (authToken) {
            fetch(`${server}/current_user`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${authToken}`,
                }
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.email){
                    setCurrentUser(data)
                }
                else{
                    localStorage.removeItem("access_token")
                    setCurrentUser(null)
                    setAuthToken(null)
                    nav("/login")
                }
            
            })
        }

},[authToken, onChange])

const contextData = {
    currentUser,
    setCurrentUser,
    authToken,
    login,
    logout,
    addUser,
    updateUser
}


    return (
        <UserContext.Provider
            value={ contextData }>
            {children}
        </UserContext.Provider>
    );
}
