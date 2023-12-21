/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
function JobCard({ data }) {
    return (
        <div className="w-full bg-zinc-800 p-5 flex flex-col gap-4 rounded-md">
            <Link to={`/jobs/${data.id}`} className="text-blue-500">
                {data.title}
            </Link>
            <p>{data.company}</p>
            <p>{data.location}</p>
        </div>
    );
}

export default JobCard;
