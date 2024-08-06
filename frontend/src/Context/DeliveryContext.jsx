import { createContext,useContext, useEffect, useState } from "react";
import {UserContext} from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server } from "../../config";

export const DeliveryContext = createContext();

export function DeliveryProvider({ children }) {

    const nav = useNavigate();
    const {auth_token} = useContext(UserContext);

    const [deliveries, setDeliveries] = useState([]);

    // ADD DELIVERY
    const addDelivery = (parcel_id,agent_id,pickup_time,delivery_time,status) => {
    
          fetch(`${server}/deliveries`, {
                method: "POST",
                body: JSON.stringify(
                    {parcel_id,agent_id,pickup_time,delivery_time,status}
                ),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${auth_token}`,
                },
            })
                .then((response) => response.json ())
                .then((res) => {
                    console.log(res)
                if (res.success)
                    {
                        toast.success(res.success);
                    } else if (res.error) 
                        {
                        toast.error(res.error);
                    } else 
                    {
                        toast.error("An unexpected error occurred");
                    }
                    
                })
                
            }
    // GET ALL DELIVERIES
    useEffect(() => {
        if (auth_token) {
        fetch(`${server}/assigned_deliveries`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${auth_token}`
            }})
            .then((response) => response.json())
            .then((res) => {
                    setDeliveries(res)

                });
            }
        }, [auth_token]);    

    const contextData = {
        deliveries,
        addDelivery,
        
    }

    return <DeliveryContext.Provider value={{ contextData }}>{children}</DeliveryContext.Provider>;
}

