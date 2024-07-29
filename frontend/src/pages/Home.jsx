import React from "react";

function Home() {
  return (
    <>
    <nav className="bg-blue-800 p-4 text-white">
      <ul className="flex space-x-4">
        <li><a href="/login">Login</a></li>
        <li><a href="/signup">Signup</a></li>
      </ul>
    </nav>
      <div className="text-3xl font-bold underline text-center">
        <h1>Welcome to Parcel Delivery System</h1>
        <p>
          Manage your deliveries efficiently with our tracking and scheduling
          services.
        </p>
      </div>
    </>
  );
}

export default Home;
