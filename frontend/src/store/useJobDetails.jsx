import { useEffect, useState } from "react";

function useJobDetails(postId) {
    const [jobData, setJobData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getJobData = async () => {
        
            try {
                const response = await fetch(`https://wspapi.onrender.com/api/post/get/${postId}`);
                const postDetail = await response.json();
                setJobData(postDetail.post);
            } catch (error) {
                setError(`Something went wrong ${error}`);
            } finally {
                setIsLoading(false);
            }
        }

        getJobData();
    }, [postId])

    return {jobData, isLoading, error}
}

export default useJobDetails
