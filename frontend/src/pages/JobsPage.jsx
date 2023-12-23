import Jobs from "../components/Jobs";
function JobsPage() {
    return (
        <div className="min-h-screen bg-zinc-900 p-10 text-white">
            
            <div className="flex items-center justify-center w-full mb-10 gap-3">
                <input
                    type="text"
                    className="w-full md:w-1/4 py-1  bg-gray-400 text-black outline-emerald-500 placeholder:text-gray-600 px-4"
                    placeholder="Search by Title"
                />
                <button className="bg-emerald-500 px-5 py-1">Search</button>
            </div>

            <Jobs />
        </div>
    );
}

export default JobsPage;