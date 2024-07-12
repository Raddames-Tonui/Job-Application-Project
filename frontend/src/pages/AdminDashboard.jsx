import React, { useEffect, useState } from "react";
import CompanyManagement from "../components/CompanyManagement";
import JobManagement from "../components/JobManagement";
import { toast } from "react-toastify";

function AdminDashboard({ currentUser }) {
  const [showList, setShowList] = useState("company");
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);

  // Fetch companies and jobs on component mount
  useEffect(() => {
    fetchCompanies();
    fetchJobs();
  }, []);

  const fetchCompanies = () => {
    fetch("http://127.0.0.1:5555/companies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch companies");
        }
        return response.json();
      })
      .then((data) => setCompanies(data))
      .catch((error) => {
        console.error("Error fetching companies:", error);
        toast.error("Failed to fetch companies");
      });
  };

  const fetchJobs = () => {
    fetch("http://127.0.0.1:5555/jobs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        return response.json();
      })
      .then((data) => setJobs(data))
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        toast.error("Failed to fetch jobs");
      });
  };

  // CRUD operations for companies
  const handleSubmitCompany = (newCompany) => {
    fetch("http://127.0.0.1:5555/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCompany),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create company");
        }
        return response.json();
      })
      .then((data) => {
        setCompanies([...companies, data]);
        toast.success("Company created successfully");
      })
      .catch((error) => {
        console.error("Error creating company:", error);
        toast.error("Failed to create company");
      });
  };

  const handleUpdateCompany = (id, updatedCompany) => {
    fetch(`http://127.0.0.1:5555/companies/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCompany),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update company");
        }
        return response.json();
      })
      .then((data) => {
        setCompanies(
          companies.map((company) => (company.id === id ? data : company))
        );
        toast.success("Company updated successfully");
      })
      .catch((error) => {
        console.error("Error updating company:", error);
        toast.error("Failed to update company");
      });
  };

  const handleDeleteCompany = (id) => {
    fetch(`http://127.0.0.1:5555/companies/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete company");
        }
        setCompanies(companies.filter((company) => company.id !== id));
        toast.success("Company deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting company:", error);
        toast.error("Failed to delete company");
      });
  };

  // CRUD operations for jobs
  const handleSubmitJob = (newJob) => {
    fetch("http://127.0.0.1:5555/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create job");
        }
        return response.json();
      })
      .then((data) => {
        setJobs([...jobs, data]);
        toast.success("Job created successfully");
      })
      .catch((error) => {
        console.error("Error creating job:", error);
        toast.error("Failed to create job");
      });
  };

  const handleUpdateJob = (id, updatedJob) => {
    fetch(`http://127.0.0.1:5555/jobs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update job");
        }
        return response.json();
      })
      .then((data) => {
        setJobs(jobs.map((job) => (job.id === id ? data : job)));
        toast.success("Job updated successfully");
      })
      .catch((error) => {
        console.error("Error updating job:", error);
        toast.error("Failed to update job");
      });
  };

  const handleDeleteJob = (id) => {
    fetch(`http://127.0.0.1:5555/jobs/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete job");
        }
        setJobs(jobs.filter((job) => job.id !== id));
        toast.success("Job deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting job:", error);
        toast.error("Failed to delete job");
      });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="mb-4 flex gap-2 items-center">
          <button
            onClick={() => setShowList("company")}
            className={`px-4 text-md duration-300 transition-all font-medium w-32 py-2 rounded mr-2 ${
              showList === "company"
                ? "bg-blue-700 text-white"
                : "bg-white border border-blue-700 text-blue-700"
            }`}
          >
            Companies
          </button>
          <button
            onClick={() => setShowList("job")}
            className={`px-4 text-md duration-300 transition-all font-medium w-32 py-2 rounded ${
              showList === "job"
                ? "bg-blue-700 text-white"
                : "bg-white border border-blue-700 text-blue-700"
            }`}
          >
            Jobs
          </button>
        </div>
      </div>
      <hr />
      {showList === "company" ? (
        <CompanyManagement
          companies={companies}
          handleDeleteCompany={handleDeleteCompany}
          handleUpdateCompany={handleUpdateCompany}
          handleSubmitCompany={handleSubmitCompany}
        />
      ) : (
        <JobManagement
          jobs={jobs}
          handleDeleteJob={handleDeleteJob}
          handleUpdateJob={handleUpdateJob}
          handleSubmitJob={handleSubmitJob}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
