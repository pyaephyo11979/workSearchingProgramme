/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { useEffect, useState } from "react";

function JobCard({data}) {        
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUser() {
            const response = await fetch(` https://wspapi.onrender.com/api/user/get/${data.postedBy.id}`)
            const userData = await response.json();

            setUser(userData.user)
        }
        getUser()
    }, [data.postedBy.id])

    return (
        <div className="p-10 flex flex-col gap-5 w-full bg-zinc-700 md:w-[25rem] rounded-md min-h-[30rem] flex-wrap">

            <div className="flex items-center gap-3">
            {user && <img className="w-10 h-10 rounded-full" src={user.image}/>}
                <Link to={`/profile/${data.postedBy.id}`} className="hover:text-blue-600">
                    {data.postedBy.name}
                </Link>
            </div>

            <Link to={`${data._id}`} className="text-xl font-bold text-blue-500 hover:text-blue-400">
                {data.title}
            </Link>
            
            <div className="flex gap-3 items-center">
                <span className="font-thin">
                    {data.companyName} 
                </span>
                <span className="text-[10px] text-stone-200 font-extralight">
                    Myanmar, Yangon (placeholder)
                    {/* {data.address} */}
                </span>
            </div>

           {
                data.description.length > 200 ?
                 <p className="text-sm">
                    {data.description.slice(0, 100)}..               
                </p>
                :
                <p className="text-sm">
                    {data.description}            
                </p>
            }

            <div>
               <span className="text-gray-400"> Requriements</span>
               {
                    data.requirements.length > 200 ? 
                    <p className="text-sm">{data.requirements.slice(0, 200)}... </p>
                    :
                    <p className="text-sm">{data.requirements}</p>
               }
            </div>

            <span className="text-sm text-stone-400">{formatDate(data.createdAt)}</span>
        </div>
    );
}

export default JobCard;
