import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext'; // Assuming UserContext is correctly imported

export const ApplicationsContext = createContext();

export const ApplicationsProvider = ({ children }) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authToken } = useContext(UserContext); // Access authToken from UserContext

    useEffect(() => {
        const fetchApplications = () => {
            fetch('/applications', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setApplications(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
        };

        if (authToken) {
            fetchApplications();
        }
    }, [authToken]);

    const applyForJob = (jobId, userId) => {
        fetch('/applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify({
                jobId,
                userId,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to apply for job');
            }
            return response.json();
        })
        .then(newApplication => {
            setApplications(prevApplications => [...prevApplications, newApplication]);
        })
        .catch(error => {
            console.error('Error applying for job:', error.message);
        });
    };

    const updateApplication = (id, status) => {
        fetch(`/applications/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify({ status }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update application status');
            }
            return response.json();
        })
        .then(updatedApplication => {
            setApplications(prevApplications =>
                prevApplications.map(app =>
                    app.id === updatedApplication.id ? updatedApplication : app
                )
            );
        })
        .catch(error => {
            console.error('Error updating application status:', error.message);
        });
    };

    return (
        <ApplicationsContext.Provider value={{ applications, loading, error, applyForJob, updateApplication }}>
            {children}
        </ApplicationsContext.Provider>
    );
};
