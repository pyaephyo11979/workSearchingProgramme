import { useState } from "react";
import Jobs from "../components/Jobs";
import { useJob } from "../ctx/JobContext";
function JobsPage() {
    
    const { data, isLoading, error } = useJob();

    const [searchValue, setSearchValue] = useState('');
    

    function handleSearchValueChange(event){
        setSearchValue(event.target.value)
    }

    const filteredData = data.filter(post => post.title.toLowerCase().includes(searchValue.toLowerCase()));

    return (

        <div className="min-h-screen bg-zinc-900 p-10 text-white">

            <div className="flex items-center justify-center w-full mb-10 gap-3">
                <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchValueChange}
                    className="w-full md:w-1/4 py-1  bg-gray-400 text-black outline-emerald-500 placeholder:text-gray-600 px-4"
                    placeholder="Search by Title"
                />
                
            </div>

             {searchValue
                ? <Jobs data={filteredData} isLoading={isLoading} error={error} />
                : <Jobs data={data} isLoading={isLoading} error={error} />
            }
        </div>
    );
}

export default JobsPage;