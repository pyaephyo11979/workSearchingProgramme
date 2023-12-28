/* eslint-disable react/prop-types */
import { Form } from "react-router-dom"
import Inputs from "./Inputs"

function EditProfile({userData}) {
    return (
        <div className="h-screen w-full px-4 py-20 bg-zinc-900">
            <Form
                method="patch"
                className="flex flex-col gap-10 m-auto bg-zinc-800 w-full md:w-[40rem] py-10 px-5 md:p-12 rounded"
            >
                <Inputs
                    type="text"
                    label="Username"
                    id="username"
                    name="username"
                    defaultValue={userData.name}
                />
                <Inputs type="text" label="Image" id="image" name="image" defaultValue={userData.image}/>

                <Inputs type="number" label="Phone" id="phone" name="phone" defaultValue={userData.phone}/>
                <button className="bg-yellow-300 md:w-1/3 md:m-auto p-2">Save</button>
            </Form>
        </div>
    )
}

export default EditProfile
