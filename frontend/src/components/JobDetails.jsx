import { useParams } from "react-router-dom";

function JobDetails() {
    // request job post Id.
    const { id } = useParams();

    return <div className="w-2/3">job details</div>;
}

export default JobDetails;
