import { useLoaderData } from "react-router-dom";
import { useUser } from "../ctx/UserContext";
import SpinnerFullPage from "./SpinnerFullPage";

function ProfilePage() {    
    const currentUser = useLoaderData('root');
    const {userData, isLoading, error} = useUser();


    if (isLoading) return <SpinnerFullPage/>

    if (error) return <h1 className="text-red-500">{error}</h1>

    return (
        <div className="bg-zinc-800 min-h-screen p-10">
            <div className="text-white flex items-center flex-col gap-10">
                <div className="w-20 h-20 rounded-full">
                    <img src={userData.image} alt="" className="rounded-full" />
                </div>
                <h1 className="text-2xl">{userData.name}</h1>
            </div>

            { 
                currentUser._id === userData._id &&  
                <ul className="flex justify-between items-center w-1/2 md:justify-center md:gap-10 m-auto pt-10">
                        <li className="bg-blue-500 p-2 rounded-md font-medium">Edit profile</li>
                        <li className="bg-amber-500 p-2 rounded-md font-medium">Posts</li>
                </ul>
            }
        </div>
    );
}

export default ProfilePage;
