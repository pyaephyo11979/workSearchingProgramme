/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const JobContext = createContext();

function JobContextProvider({ children }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/data.json");
                const result = await response.json();

                setData(result);
            } catch (error) {
                setError("Error fetching data:");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <JobContext.Provider value={{ data, isLoading, error }}>
            {children}
        </JobContext.Provider>
    );
}

export default JobContextProvider;

// eslint-disable-next-line react-refresh/only-export-components
export function useJob() {
    const jobs = useContext(JobContext);
    return jobs;
}
