import { useContext } from "react";
import { JobDetailsContext } from "../ctx/JobDetailsContext";
import SpinnerFullPage from "../pages/SpinnerFullPage";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

// eslint-disable-next-line react/prop-types
function JobDetails() {
    const {post, isLoading, error} = useContext(JobDetailsContext);
    console.log(post)

    if (isLoading) {
        return <SpinnerFullPage/>
    }

    if (error){
        return <h1 className="text-red-500 p-10">{error}</h1>
    }

    const position = post.position === "internship" ? post.position : `${post.position}-level`

    return (
        <div className="min-h-screen bg-zinc-900 py-10 px-5 font-sans">
            <div className="flex items-center flex-col gap-5 p-10 text-stone-100 bg-zinc-800 md:w-2/3 m-auto">

               <div className="flex items-center gap-10 w-full">
                    <div className="w-10 h-10 rounded-full bg-black"></div>
                    <Link to="/profile" className="hover:text-blue-500">{post.postedBy.name}</Link>
               </div>

                <h1 className="text-stone-100 md:text-2xl border-b-2 border-gray-500">{post.title} ( {position} )</h1>

                <h3>{post.companyName}</h3>
                
                <div className="w-full">
                    <p className="mb-2 text-stone-400">Description</p>
                    <p>{post.description}</p>
                </div>

                <div className="w-full">
                    <p className="mb-2 text-stone-400">Requirements:</p>
                    <p>{post.requirements}</p>
                </div>

                <span className=" w-full text-left">{post.applicants.length}<span className="text-green-600 text-sm ml-5 text-left">Applicants</span></span>

                <time className="text-sm text-stone-600 w-full">{formatDate(post.createdAt)}</time>

                <div className="w-full">
                    <button className="bg-blue-500 p-2 rounded-sm">Apply Now</button>
                </div>

            </div>
        </div>
    )
    
   
}

export default JobDetails;
