import { useEffect } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import EditProfile from "../components/EditProfile";

function EditProfilePage() {
    const {id} = useParams();
    const user = useLoaderData("root");
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== user._id) navigate(`/profile/${id}`)
    }, [id, user, navigate])
    
    
    return (
       <EditProfile userData={user}/>
    )
}

export default EditProfilePage
