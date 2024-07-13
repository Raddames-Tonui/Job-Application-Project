import React, { useContext, useEffect, useState } from "react";
import CompanyManagement from "../components/CompanyManagement";
import JobManagement from "../components/JobManagement";
import { toast } from "react-toastify";
import { server_url } from "../../config.json";
import { UserContext } from "../context/UserContext";
function AdminDashboard() {
  const { auth_token } = useContext(UserContext);
  const [showList, setShowList] = useState("company");
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // ====================================CRUD COMPANY======================================
  // FETCH
  useEffect(() => {
    setLoading(true);
    fetch(`${server_url}/companies`, {
      headers: {
        Authorization: `Bearer ${auth_token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        toast.error("Error fetching companies");
        setLoading(false);
      });
  }, [server_url, auth_token]);

  // CREATE
  const handleSubmitCompany = (newCompany) => {
    fetch(`${server_url}/companies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`
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
        toast.error("Error creating company");
      });
  };

  // UPDATE
  const handleUpdateCompany = (id, updatedCompany) => {
    fetch(`${server_url}/companies/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`
      },
      body: JSON.stringify(updatedCompany),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update company");
        }
        return response.json();
      })
      .then(() => {
        setCompanies(
          companies.map((company) =>
            company.id === id ? { ...company, ...updatedCompany } : company
          )
        );
        toast.success("Company updated successfully");
      })
      .catch((error) => {
        console.error("Error updating company:", error);
        toast.error("Error updating company");
      });
  };

  // DELETE
  const handleDeleteCompany = (id) => {
    fetch(`${server_url}/companies/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth_token}`
      }
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
        toast.error("Error deleting company");
      });
  };


  // ====================================CRUD JOB======================================
  // FETCH
  useEffect(() => {
    setLoading(true);
    fetch(`${server_url}/jobs`, {
      headers: {
        Authorization: `Bearer ${auth_token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        toast.error("Error fetching jobs");
        setLoading(false);
      });
  }, [server_url, auth_token]);

  // CREATE
  const handleSubmitJob = (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    const job = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: "open",
    };
    fetch(`${server_url}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`
      },
      body: JSON.stringify(job),
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
        toast.error("Error creating job");
      });
  };

  // UPDATE
  const handleUpdateJob = (id, updatedJob) => {
    fetch(`${server_url}/jobs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`
      },
      body: JSON.stringify(updatedJob),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update job");
        }
        return response.json();
      })
      .then(() => {
        setJobs(jobs.map((job) => (job.id === id ? { ...job, ...updatedJob } : job)));
        toast.success("Job updated successfully");
      })
      .catch((error) => {
        console.error("Error updating job:", error);
        toast.error("Error updating job");
      });
  };

  // DELETE
  const handleDeleteJob = (id) => {
    fetch(`${server_url}/jobs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth_token}`
      }
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
        toast.error("Error deleting job");
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
            } text-blue-700`}
          >
            Companies
          </button>
          <button
            onClick={() => setShowList("job")}
            className={`px-4 text-md duration-300 transition-all font-medium w-32  py-2 rounded ${
              showList === "job"
                ? "bg-blue-700 text-white"
                : "bg-white border border-blue-700 text-blue-700"
            } text-blue-700`}
          >
            Jobs
          </button>
        </div>
      </div>
      <hr />
      {loading ? (
        <div>Loading...</div>
      ) : showList === "company" ? (
        <CompanyManagement
          companies={companies}
          handleDeleteCompany={handleDeleteCompany}
          handleUpdateCompany={handleUpdateCompany}
          handleSubmitCompany={handleSubmitCompany}
        />
      ) : (
        <JobManagement
          jobs={jobs}
          handleSubmitJob={handleSubmitJob}
          handleDeleteJob={handleDeleteJob}
          handleUpdateJob={handleUpdateJob}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
