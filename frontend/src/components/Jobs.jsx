import JobCard from "./JobCard";
import { useJob } from "../ctx/JobContext";
import SpinnerFullPage from "../pages/SpinnerFullPage";

function Jobs() {
    const { data, isLoading, error } = useJob();

    console.log(data);

    if (isLoading) {
        return <SpinnerFullPage />;
    }

    if (error) {
        return <h1 className="text-stone-100">{error}</h1>;
    }

    return (
        <div className=" text-stone-300 flex flex-col gap-10 p-10">
            {data.map((job) => (
                <JobCard key={job._id} data={job} />
            ))}
        </div>
    );
}

export default Jobs;
