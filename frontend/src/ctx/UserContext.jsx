import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export default function UserContextProvider({children}){
    const {id : userId} = useParams();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function getUserData(){
            try {
                const response = await fetch(`https://wspapi.onrender.com/api/user/get/${userId}`);
                if (!response.ok) {
                    setError("User not found.Please try again.")
                    throw new Error("User not found.Please try again.")
                } else {
                    const {user} = await response.json();
                    setUserData(user);
                    setIsLoading(false);
                }
            } catch(error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }

        getUserData();

    }, [userId])
    return <UserContext.Provider value={{userData, isLoading, error}}>{children}</UserContext.Provider>
}

export function useUser(){
    const ctxValue = useContext(UserContext);
    return ctxValue;
}