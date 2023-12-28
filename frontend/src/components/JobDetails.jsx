    import { useEffect, useState } from "react";
    import SpinnerFullPage from "../pages/SpinnerFullPage";
    import { Link, useNavigate, useParams } from "react-router-dom";
    import { formatDate } from "../utils/formatDate";
    import useUser from "../store/useUser";
    import useJobDetails from "../store/useJobDetails";

    // eslint-disable-next-line react/prop-types
    function JobDetails() {
        // get the post details from context.
        const {id} = useParams();
        const {jobData, isLoading, error } = useJobDetails(id);
        const [applicants, setApplicants] = useState();
        const [isApplying, setIsApplying] = useState(false);
        
        useEffect(() => {
            setApplicants(jobData?.applicants);
            
        }, [jobData.applicants])

        // current url
        const navigate = useNavigate();
        // current user.
        const user = JSON.parse(localStorage.getItem("user"));
        // get the posted user's id to get the user's image from user model.
        const userId = jobData.postedBy?.id;  
        const {userData, error: imageError, isLoading: imageLoading} = useUser(userId);
        const userDetails = userData ? userData : null;

        const alreadyApply = applicants?.some(applicant => applicant.id == user._id);

        // POST delete handler.
        async function postDeleteHandler(){
            const proceed = window.confirm("Are you sure?")

            if (proceed){
                try {
                    const response = await fetch(` https://wspapi.onrender.com/api/post/delete/${jobData._id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "Application/json",
                            "authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                        }
                    })

                    if (response.ok) {
                        navigate("/jobs")

                    } else {
                        const responseData = await response.json();
                        console.log("Failed to delete", responseData.error)
                    }
                } catch(error) {
                    console.log("Error during deletion", error)
                }
            }
        }

        // job apply handler.
            async function jobApplyHandler(postId) {
                setIsApplying(true)
                try {
                    const response = await fetch(`https://wspapi.onrender.com/api/post/apply/${postId}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                        },
                        body: JSON.stringify({ uid: user._id, pid: postId })
                    });
            
                    if (!response.ok) {
                        const responseData = await response.json();
                        throw new Error(responseData.error);
                    }
            
                    const responseData = await response.json();
                    setApplicants(prev => ([...prev, {id: user._id,name: user.name, _id: postId}]))
                    setIsApplying(false)

                    return responseData;
                } catch (error) {
                    console.error("Error during job application:", error);
                } finally {
                    setIsApplying(false);
                }
            }

        let userImage;
        if (error){
            return <h1 className="text-red-500 p-10">{error}</h1>
        }

        if (isLoading) {
            return <SpinnerFullPage/>
        }

        if (!imageError && !imageLoading) {
            userImage = <img className="w-9 h-9 rounded-full" src={userDetails?.image}/>;
        }

        let applyButton;

        // format the position letter.
        const position = jobData.position === "internship" ? jobData.position : `${jobData.position}-level`;

        if (!alreadyApply && user && user.role === "user" && user?._id !== jobData?.postedBy?.id) {
        applyButton =  <div className="w-full">
                { isApplying ?   <button className="bg-blue-500 p-2 rounded-sm" disabled>Applying</button>
                :
                <button className="bg-blue-500 p-2 rounded-sm" onClick={() => jobApplyHandler(jobData._id)}>Apply Now</button>
            }
            </div>
        }

        return (
            <>
            
                <div className="min-h-screen bg-zinc-900 py-10 px-5 font-sans">
                <div className="flex items-center flex-col gap-5 p-10 text-stone-100 bg-zinc-800 md:w-2/3 m-auto">

                <div className="flex items-center gap-5 md:justify-between w-full">

                        <div className="flex items-center gap-5">
                        {userImage}
                            <Link to={`/profile/${jobData.postedBy?.id}`} className="hover:text-blue-500">{jobData.postedBy?.name}</Link>
                        </div>

                        {
                            jobData.postedBy.id === user?._id &&
                            <div className="flex gap-5">
                                <Link to={`/jobs/${jobData._id}/edit`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer hover:text-blue-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </Link>

                                <button onClick={postDeleteHandler}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-500 cursor-pointer">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                </button>
                            </div>
                        }

                </div>

                    <h1 className="text-stone-100 md:text-2xl border-b-2 border-gray-500">{jobData.title} ( {jobData.position && position} )</h1>

                    <h3>{jobData.companyName}</h3>
                    
                    <div className="w-full">
                        <p className="mb-2 text-stone-400">Description</p>
                        <p>{jobData.description}</p>
                    </div>

                    <div className="w-full">
                        <p className="mb-2 text-stone-400">Requirements:</p>
                        <p>{jobData.requirements}</p>
                    </div>

                    <span className=" w-full text-left">{applicants?.length}<span className="text-green-600 text-sm ml-5 text-left">Applicants</span></span>

                    <time className="text-sm text-stone-600 w-full">{formatDate(jobData.createdAt)}</time>
                    
                {applyButton}

                </div>
            </div>
            
            </>
        )
        
    }

    export default JobDetails;
