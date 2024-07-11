import React, { useState, useEffect, useContext } from "react";
import backgroundImage from "../assets/cover_photo.jpg";
import Footer from "../components/Footer";
import FilteredJobs from "../components/FilteredJobs";
import AvailableJobs from "../components/AvailableJobs";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/UserContext";

function LandingPage() {

  
  const [jobs, setJobs] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5555/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Effect to toggle body overflow
  useEffect(() => {
    const handleScrollLock = () => {
      document.body.style.overflow = isSearching ? "hidden" : "auto";
    };

    handleScrollLock();

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSearching]);

  return (
    <div >
      <div
        className="bg-[#F3F4F6] pt-16 pb-32 px-4 sm:px-6 lg:pb-40 lg:px-8"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <div className="relative bg-white bg-opacity-10 p-6  rounded-lg shadow-lg">
          <h1 className="text-center text-4xl font-bold leading-10 text-gray-900">
            There Is{" "}
            <span className="text-blue-500">Definitely An Opportunity</span>{" "}
            Here For You!
          </h1>
          <p className="text-center mt-4 text-lg text-gray-600">
            Find Jobs, Employment & Career Opportunities
          </p>
          <div className="mt-10 flex justify-center">
            <div className=" shadow-md rounded-lg p-4 flex">
              <input
                type="text"
                className="p-2 w-[30vw] rounded-l-md border border-gray-300"
                placeholder="Job title"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearching(true)}
                onBlur={() => setIsSearching(false)}
              />
              <button className="p-2 bg-blue-500 text-white rounded-r-md">
                Search
              </button>
            </div>
          </div>
          {searchQuery && (
            <div className=" flex justify-center">
              <FilteredJobs filteredJobs={filteredJobs} />
            </div>
          )}
        </div>
      </div>
      <div>
        
      </div>
      <AvailableJobs jobs={jobs} />
      <Footer />
    </div>
  );
}

export default LandingPage;