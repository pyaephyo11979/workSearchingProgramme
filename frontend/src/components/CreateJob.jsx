/* eslint-disable react/prop-types */
import { Form } from "react-router-dom";

import CreateJobInputs from "./CreateJobInputs";

function CreateJob({post, method}) {
    
    return (
        <div className="min-h-screen w-full px-4 py-20 bg-zinc-900">
            <Form
                method={method ? method : "post"}
                className="flex flex-col gap-5 m-auto bg-zinc-800 w-full md:w-[40rem] py-10 px-5 md:p-12 rounded"
            >
                {post._id && <input type="hidden" value={post._id} name="id" />}
                <CreateJobInputs
                    label="Title"
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={post.title ? post.title : ""}
                />
                <CreateJobInputs
                    label="Company Name"
                    type="text"
                    id="company_name"
                    name="company_name"
                    defaultValue={post.companyName ? post.companyName : ""}
                />

                <CreateJobInputs
                    label="Address"
                    type="text"
                    id="address"
                    name="address"
                    defaultValue={post.address ? post.address : ""}
                />

                <div className="w-full text-white">
                    <label htmlFor="description">Description</label>
                    <textarea
                        cols="30"
                        id="description"
                        name="description"
                        defaultValue={post.description ? post.description : ""}
                        className="h-[100px] md:h-[150px] px-5 py-2 border-none outline-none bg-slate-400 w-full mt-5 text-black"
                    ></textarea>
                </div>

                <div className="w-full text-white">
                    <label htmlFor="requirements">Requirements</label>
                    <textarea
                        cols="30"
                        name="requirements"
                        id="requirements"
                        defaultValue={post.requirements ? post.requirements : ""}
                        className="h-[100px] md:h-[200px] px-5 py-2 border-none outline-none bg-slate-400 w-full mt-5 text-black"
                    ></textarea>
                </div>

                <div className="flex text-white items-center">
                    <label htmlFor="position" className="w-1/3 ">
                        Position
                    </label>
                    <select
                        name="position"
                        id="position"
                        defaultValue={post.position ? post.position : "internship"}
                        className="w-2/3 text-black bg-slate-400 p-2"
                    >
                        <option value="internship">Intership</option>
                        <option value="entry">Entry</option>
                        <option value="junior">Junior</option>
                        <option value="mid">Mid</option>
                        <option value="senior">Senior</option>
                    </select>
                </div>

                <button className="bg-green-500 w-1/3 p-2 mt-5 text-white rounded-md">
                    {method === "patch" ? "Edit" : "Create"}
                </button>
            </Form>
        </div>
    );
}

export default CreateJob;
