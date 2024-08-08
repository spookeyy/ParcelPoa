import React from "react";
import { Link } from "react-router-dom";
import  Profile from "./Profile";

function Navbar() {
    return (
        <nav className="bg-yellow-500 shadow-md sticky top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="h-8 w-8"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Workflow"
                            />
                        </div>
                        <div className="hidden md:block ">
                            <div className="ml-10 flex space-x-4 mt-4">
                            <Link
                                    to="/"
                                    className=" hover:underline  px-3 py-2 rounded-md  font-medium"
                                >
                                    Home
                                </Link>
                                {/* <Link
                                    to="/admin"
                                    className=" hover:underline  px-3 py-2 rounded-md  font-medium"
                                >
                                    Dashboard
                                </Link> */}
                                <Link
                                    to="/admin/agents"
                                    className=" hover:underline  px-3 py-2 rounded-md  font-medium"
                                >
                                    Agents
                                </Link>
                                <Link
                                    to="/admin/requests"
                                    className=" hover:underline  px-3 py-2 rounded-md  font-medium"
                                >
                                    Requests
                                </Link>
                                <Link
                                    to="/admin/businesses"
                                    className=" hover:underline  px-3 py-2 rounded-md  font-medium"
                                >
                                    Businesses
                                </Link>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                    <Profile/>
                </div>
                
            </div>
        </nav>
    );
}

export default Navbar;
