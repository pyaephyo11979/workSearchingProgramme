import { Form } from "react-router-dom"
import Inputs from "../components/Inputs"

function ChangePasswordPage() {
    return (
        <div className="h-screen w-full px-4 py-20 bg-zinc-900">
        <Form
            method="POST"
            className="flex flex-col gap-10 m-auto bg-zinc-800 w-full md:w-[40rem] py-10 px-5 md:p-12 rounded"
        >
            <Inputs type="password" id="oldPassword" name="oldPassword" label="Old Password" />
            <Inputs
                type="password"
                id="newPassword"
                name="newPassword"
                label="New Password"
            />

            <button className="bg-yellow-300 md:w-1/3 p-2 md:m-auto">Change Password</button>
        </Form>
    </div>
    )
}

export default ChangePasswordPage
