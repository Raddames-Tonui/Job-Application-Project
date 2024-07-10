import React from "react";
import backgroundImage from "../assets/cover_photo.jpg"; // Adjust the path according to your project structure
import AvailableJobs from "./components/AvaiableJobs";
import Footer from "./components/Footer";

function LandingPage() {
  return (
    <div        >
      <div className="bg-white pt-16 pb-32 px-4 sm:px-6 lg:pb-40 lg:px-8 "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}>
      <div className="relative bg-white bg-opacity-75 p-6 rounded-lg shadow-lg">
        <h1 className=" text-center text-4xl font-bold leading-10 text-gray-900">
          There Is <span className="text-blue-500">Definitely An Opportunity</span>  Here
          For You!
        </h1>
        <p className="text-center mt-4 text-lg text-gray-600">
          Find Jobs, Employment & Career Opportunities
        </p>
        <div className="mt-10 flex justify-center">
          <div className="bg-white shadow-md rounded-lg p-4 flex">
            <input
              type="text"
              className="p-2 w-[30vw] rounded-l-md border border-gray-300"
              placeholder="Job title"
            />
           
            <button className="p-2 bg-blue-500 text-white rounded-r-md">
              Find Jobs
            </button>
          </div>
        </div>
        
        <div className="mt-10 flex justify-center">
          
              
        </div>
      </div>
    </div>
    <div>

      <AvailableJobs />
      <Footer/>
    </div>
      
    </div>
    
  );
}

export default LandingPage;
