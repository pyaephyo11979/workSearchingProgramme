/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const JobDetailsContext = createContext();

export default function JobDetailsProvider({children}){
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState(null);
    const [error, setError] = useState('')

    useEffect(() => {
        async function getPostDetail(){
            try {
                const response = await fetch(`https://wspapi.onrender.com/api/post/get/${id}`);
                const postDetail = await response.json();
        
                setPost(postDetail.post)

            } catch(error) {
                setError("Could not fetch the requested post's details.");
                
            } finally {
                setIsLoading(false);
            }
        }

        getPostDetail();
    }, [id])
 
    return <JobDetailsContext.Provider value={{isLoading, post, error}}>{children}</JobDetailsContext.Provider>
}


