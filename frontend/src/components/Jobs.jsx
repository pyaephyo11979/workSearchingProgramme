/* eslint-disable react/prop-types */
import JobCard from "./JobCard";
import SpinnerFullPage from "../pages/SpinnerFullPage";


function Jobs({data, isLoading, error}) {
    const sortedData = data.slice().sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);

    if (isLoading) {
        return <SpinnerFullPage />;
    }

    if (error) {
        return <h1 className="text-stone-100">{error}</h1>;
    }

    return (
        <div className="flex gap-10 flex-wrap justify-center">
            {sortedData.map(job => <JobCard key={job._id}  data={job}/>)}
        </div>
    );
}

export default Jobs;
