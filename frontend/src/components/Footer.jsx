import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 lg:px-8">
        <div>
          <h3 className="text-lg font-bold">About Us</h3>
          {/* Welcome to JobSearch, your premier destination for finding your dream job.  */}
          <p className="mt-4 text-gray-400">

          We are dedicated to connecting job seekers with top employers, offering a platform that simplifies the job search process and empowers individuals to take control of their careers.          </p>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold">For Employer</h4>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Browse Candidates</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Employers Dashboard</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Job Packages</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Jobs Featured</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Post A Job</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold">Company</h4>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Candidate Listing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold">Official Info</h4>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center space-x-2">
              <i className="fas fa-map-marker-alt"></i>
              <span className="text-gray-400">2976 sunrise road las vegas</span>
            </li>
            <li className="flex items-center space-x-2">
              <i className="fas fa-envelope"></i>
              {/* <span className="text-gray-400">youdeserveit@gmail.com</span> */}
            </li>
            <li className="flex items-center space-x-2">
              <i className="fas fa-phone-alt"></i>
              {/* <span className="text-gray-400">098765432150</span> */}
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 border-t border-gray-700 pt-4 text-center">
        <p className="text-gray-400">
          © Copyright 2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

