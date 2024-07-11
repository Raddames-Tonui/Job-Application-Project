// import React, { useState, useEffect, useContext } from "react";
// import backgroundImage from "../assets/cover_photo.jpg";
// import Footer from "./components/Footer";
// import FilteredJobs from "./components/FilteredJobs";
// import AvailableJobs from "./components/AvailableJobs";
// import { UserContext } from "../context/UserContext";
// import { useJobContext } from "../context/JobContext"; 

// function Dashboard() {
//   const { jobs, fetchJobs,  error } = useJobContext();
//   const { currentUser } = useContext(UserContext);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSearching, setIsSearching] = useState(false);
//   const [filteredJobs, setFilteredJobs] = useState([]);

//   useEffect(() => {
//     fetchJobs(); 
//   }, [fetchJobs]); 

//   useEffect(() => {
//     setFilteredJobs(
//       jobs.filter((job) =>
//         job.title.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//   }, [jobs, searchQuery]);

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   useEffect(() => {
//     const handleScrollLock = () => {
//       document.body.style.overflow = isSearching ? "hidden" : "auto";
//     };

//     handleScrollLock();

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isSearching]);

//   useEffect(() => {
//     if (error) {
//       console.error('Error fetching jobs:', error);
//     }
//   }, [error]);

//   return (
//     <div>
//       <div
//         className="bg-[#F3F4F6] pt-16 pb-32 px-4 sm:px-6 lg:pb-40 lg:px-8"
//         style={{
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           height: "100vh",
//         }}
//       >
//         <div className="relative bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
//           <div className="text-center">
//             <h1 className="text-4xl font-bold leading-10 text-gray-900 mt-4">
//               Welcome, {currentUser.username}!
//             </h1>
//             <p className="text-lg text-gray-600 mt-2">
//               Explore and Apply for Jobs
//             </p>
//           </div>
//           <div className="mt-10 flex justify-center">
//             <div className="shadow-md rounded-lg p-4 flex">
//               <input
//                 type="text"
//                 className="p-2 w-[30vw] rounded-l-md border border-gray-300"
//                 placeholder="Search Jobs by Title"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 onFocus={() => setIsSearching(true)}
//                 onBlur={() => setIsSearching(false)}
//               />
//               <button className="p-2 bg-blue-500 text-white rounded-r-md">
//                 Search
//               </button>
//             </div>
//           </div>
//           {searchQuery && (
//             <div className="flex justify-center mt-6">
//               <FilteredJobs filteredJobs={filteredJobs} />
//             </div>
//           )}
//         </div>
//       </div>
//       <AvailableJobs jobs={jobs} />
//       <Footer />
//     </div>
//   );
// }

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from "../assets/cover_photo.jpg";


const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:5555/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredJobs = jobs.filter(job => {
    return job.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleApply = (jobId) => {
    navigate(`jobs/apply/${jobId}`);
  };

  return (
    <div>
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

      </div>
      <input
        type="text"
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mt-4">
        {filteredJobs.length === 0 ? (
          <p className="text-gray-500">No jobs found.</p>
        ) : (
          filteredJobs.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h1 className="text-xl font-bold text-gray-800">{item.title}</h1>
              <p className="text-gray-600">{item.company.name}</p>
              <p className="text-gray-700">{item.description}</p>
              <div className='flex justify-end'>
                <button
                  className='bg-blue-500 text-white rounded-md px-4 py-2'
                  onClick={() => handleApply(item.id)}
                >
                  Apply
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;

