import { useContext, useEffect } from "react"
import { useLoaderData, useNavigate } from "react-router-dom";

import CreateJob from "../components/CreateJob"
import SpinnerFullPage from "./SpinnerFullPage";
import { JobDetailsContext } from "../ctx/JobDetailsContext"

function EditJobPage() {
    const navigate = useNavigate();
    const user = useLoaderData("root");
    const {post, isLoading, error} = useContext(JobDetailsContext);

    useEffect(() => {
        if (post && post.postedBy && post.postedBy.id !== user._id) {
            navigate(`/jobs/${post._id}`)
        }
    }, [post, user._id, navigate])

    if (isLoading) return <SpinnerFullPage/>

    if (error) return <h1 className="text-red-500">{error}</h1>

    return (
        <div>
            <CreateJob 
            post={post}
            method="patch"
            />
        </div>
    )
}

export default EditJobPage
