import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


// images for the slider
const images = [
  "https://images.unsplash.com/photo-1609143739217-01b60dad1c67?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE5fHxkZWxpdmVyeXxlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1682129768936-c5b7c3033cdc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGRlbGl2ZXJ5fGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjEwfHxkZWxpdmVyeXxlbnwwfHwwfHx8MA%3D%3D",
];

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // do not delete this
  // useNavigate hook for navigation
  const navigate = useNavigate();

  // Function to handle agent button click
  const handleAgentButtonClick = () => {
    navigate("/agent"); // Navigate to the Agent page
  }; 
  // do not delete this

  // Function to handle the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to handle the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <>
      <header className="bg-blue-800 p-4 text-white hover:bg-goldenrod transition duration-300">
        <nav className="flex justify-between items-center">
          <a href="/" className="text-xl font-bold">
            <img src="logo.png" alt="ParcelPoa" className="h-8" />
          </a>
          <ul className="flex space-x-4">
            <li><a href="/" aria-label="Home" className="hover:bg-goldenrod hover:text-white transition duration-300">Home</a></li>
            <li><a href="/about" aria-label="About Us" className="hover:bg-goldenrod hover:text-white transition duration-300">About Us</a></li>
            <li><a href="/services" aria-label="Services" className="hover:bg-goldenrod hover:text-white transition duration-300">Orders</a></li>
            <li><a href="/contact" aria-label="Contact Us" className="hover:bg-goldenrod hover:text-white transition duration-300">Contact Us</a></li>
            <li><a href="/login" aria-label="Login" className="hover:bg-goldenrod hover:text-white transition duration-300">Login</a></li>
            <li><a href="/signup" aria-label="Signup" className="hover:bg-goldenrod hover:text-white transition duration-300">Signup</a></li>
          </ul>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center h-screen">
        {/* Image Slider */}
        <div className="relative w-full h-full">
          <img
            src={images[currentImageIndex]}
            alt={`Slide ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute text-center">
          <h2 className="text-3xl font-bold underline text-black">Welcome to ParcelPoa Delivery System</h2>
          <p className="mt-2 text-black">
            Manage your deliveries efficiently with our tracking and scheduling services.<br></br>
            Our system allows you to schedule pickups, track your parcels in real-time,<br></br>
            and receive notifications for every step of the delivery process.<br></br> 
            Whether you're sending a gift or managing business shipments, <br></br>
            we ensure your packages arrive safely and on time.
          </p>
        </div>
  
      </main>

      {/* Do not delete this */}
      {/* Button to navigate to Agent side */}
      <button
        onClick={handleAgentButtonClick}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Show me the Agent Side
      </button>
      {/* Footer part removed */}
    </>
  );
}

export default Home;