import { Link, useLoaderData, useParams } from "react-router-dom";
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

    const appliedJobs = data.filter(data => {
      return  data.applicants.some(applicant => applicant.id === currentUser._id)
    })


    if (isLoading) return <SpinnerFullPage/>

    if (error) return <h1 className="text-red-500">{error}</h1>

    return (
        <div className="bg-zinc-900 min-h-screen p-10">
            <div className="text-white flex items-center flex-col gap-10 bg-zinc-800  md:w-2/3 m-auto p-10">
                <div className="w-36 h-36 rounded-full">
                    <img src={userData.image} alt={userData.name} className="rounded-full" />
                </div>

                <div>
                    <p><span className="text-gray-500">Name:</span> @{userData.name}</p>
                    <p><span className="text-gray-500">Role :</span> {userData.role}</p>
                    <p><span className="text-gray-500">Phone:</span> {userData.phone}</p>
                    <p><span className="text-gray-500">Email:</span> {userData.email}</p>
                    <p><span className="text-gray-500">Gender:</span> {userData.gender}</p>
                </div>
            </div>

            { currentUser._id === userData._id &&  
               ( <ul className="flex justify-between items-center p-10 md:w-1/2 md:justify-center md:gap-10 m-auto pt-10">
                        <li className="bg-blue-500 p-2 rounded-md font-medium">
                            <Link to={`/profile/${currentUser._id}/edit`}>Edit profile</Link>
                        </li>

                        <li className="bg-yellow-500 p-2 rounded-md font-medium">
                            <Link to={`/profile/${currentUser._id}/changePassword`}>Change Password</Link>
                        </li>
                </ul>)
            }  

                {
                    userData.role === "user" ?
                   <div>
                    <h3 className="text-white text-center mt-10">Applied Jobs</h3>
                        <div className="flex gap-10 flex-wrap justify-center pt-10 text-white">
                        {appliedJobs.map(post => <JobCard key={post._id} data={post}/>)}
                        </div>
                    </div>
                    :
                    (<div>
                        <h3 className="text-white text-center mt-10">Created Jobs</h3>
                        <div className="flex gap-10 flex-wrap justify-center pt-10 text-white">
                        {userPosts.map(post => <JobCard key={post._id} data={post}/>)}
                        </div>
                    </div>)
                }

            </div>
    );
}

export default ProfilePage;
