// NoPage.jsx
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NoPage = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;

    // Function to update button position randomly within viewport
    const updateButtonPosition = () => {
      const randomX = Math.random() * (window.innerWidth - button.offsetWidth);
      const randomY = Math.random() * (window.innerHeight - button.offsetHeight);

      button.style.left = `${randomX}px`;
      button.style.top = `${randomY}px`;
    };

    // Update button position every 3 seconds (adjust as needed)
    const interval = setInterval(updateButtonPosition, 3000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="no-page-container flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">The page you are looking for does not exist.</p>

      {/* Floating Button */}
      <button ref={buttonRef} className="floating-button" >
        <Link to="/">
        Catch Me!
        </Link></button>
    </div>
  );
}

export default NoPage;