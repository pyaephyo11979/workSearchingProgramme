import JobCard from "./JobCard";
import { useJob } from "../ctx/JobContext";
import SpinnerFullPage from "../pages/SpinnerFullPage";


function Jobs() {
    const { data, isLoading, error } = useJob();

    if (isLoading) {
        return <SpinnerFullPage />;
    }

    if (error) {
        return <h1 className="text-stone-100">{error}</h1>;
    }

    return (
        <div className="flex gap-10 flex-wrap justify-center">
            {data.map(job => <JobCard key={job._id} data={job}/>)}
        </div>
    );
}

export default Jobs;
