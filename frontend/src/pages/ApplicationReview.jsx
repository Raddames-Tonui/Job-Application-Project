import React, { useState, useContext } from "react";
import { ApplicationsContext } from "./context/ApplicationsContext";

const ApplicationReview = () => {
  const { applications, setApplications, loading, error } = useContext(ApplicationsContext);
  const [statusUpdate, setStatusUpdate] = useState({});

  const handleStatusChange = (id, newStatus) => {
    setStatusUpdate((prevStatusUpdate) => ({
      ...prevStatusUpdate,
      [id]: newStatus,
    }));
  };

  const handleSaveStatus = async (id) => {
    const newStatus = statusUpdate[id];

    if (!newStatus) return;

    try {
      const response = await fetch(`/applications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Update the local state with the new status
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === id ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error("Error updating status:", error.message);
      // Optionally handle errors here, e.g., show a notification
    }
  };

  if (loading) return <div>Loading applications...</div>;
  if (error) return <div>Error loading applications: {error.message}</div>;

  return (
    <div>
      <h1>Review Applications</h1>
      {applications.map((application) => (
        <div key={application.id} className="application">
          <h2>{application.name}</h2>
          <p>{application.email}</p>
          <p>{application.position}</p>
          <p>Status: {application.status}</p>
          <select
            value={statusUpdate[application.id] || application.status}
            onChange={(e) => handleStatusChange(application.id, e.target.value)}
          >
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>
          <button onClick={() => handleSaveStatus(application.id)}>
            Save Status
          </button>
        </div>
      ))}
    </div>
  );
};

export default ApplicationReview;
