import { useLoaderData, useParams } from "react-router-dom";
import SpinnerFullPage from "./SpinnerFullPage";
import useUser from "../store/useUser";
import { useJob } from "../ctx/JobContext";
import JobCard from "../components/JobCard";

function ProfilePage() {    
    const {id} = useParams();
    
    const currentUser = useLoaderData('root');
    const {userData, error, isLoading} = useUser(id);
    const {data} = useJob();
    
    const userPosts = data.filter(data => data.postedBy.id === id);

    if (isLoading) return <SpinnerFullPage/>

    if (error) return <h1 className="text-red-500">{error}</h1>

    return (
        <div className="bg-zinc-900 min-h-screen p-10">
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

            
                <div className="flex gap-10 flex-wrap justify-center pt-10 text-white">
                    {userPosts.map(post => <JobCard key={post._id} data={post}/>)}
                </div>
            
        </div>
    );
}

export default ProfilePage;
