import { useEffect, useState } from "react";


function useUser(userId) {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
            // Only fetch user data if userId is available
            if (!userId) {
                setIsLoading(false);
                return;
            }

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

    return {error, isLoading, userData}
}

export default useUser
