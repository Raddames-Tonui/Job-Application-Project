import React, { createContext, useState, useContext, useEffect } from 'react';

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch('/companies');
                if (!response.ok) {
                    throw new Error('Failed to fetch companies');
                }
                const data = await response.json();
                setCompanies(data.companies);
            } catch (error) {
                console.error('Error fetching companies:', error.message);
            }
        };

        fetchCompanies();
    }, []);

    return (
        <CompanyContext.Provider value={{ companies, setCompanies }}>
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompanies = () => useContext(CompanyContext);
