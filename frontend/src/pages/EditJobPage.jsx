import { useContext } from "react"
import CreateJob from "../components/CreateJob"
import { JobDetailsContext } from "../ctx/JobDetailsContext"
function EditJobPage() {
    const job = useContext(JobDetailsContext);

    return (
        <div>
            <CreateJob 
            title={job.post.title}
            id={job.post._id}
            companyName={job.post.companyName}
            description={job.post.description}
            requirements={job.post.requirements}
            position={job.post.position}
            // address={job.post.address}
            method="patch"
            />
        </div>
    )
}

export default EditJobPage
