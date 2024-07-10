import React, { createContext, useState, useContext, useEffect } from 'react';

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch('/applications');
                if (!response.ok) {
                    throw new Error('Failed to fetch applications');
                }
                const data = await response.json();
                setApplications(data);
            } catch (error) {
                console.error('Error fetching applications:', error.message);
                // Optionally handle errors here, e.g., setApplications([]) or display an error message
            }
        };

        fetchApplications();
    }, []);

    return (
        <ApplicationContext.Provider value={{ applications, setApplications }}>
            {children}
        </ApplicationContext.Provider>
    );
};

export const useApplications = () => useContext(ApplicationContext);
