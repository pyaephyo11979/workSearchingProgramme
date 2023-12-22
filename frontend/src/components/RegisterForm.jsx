import { Form } from "react-router-dom";
import FormFooter from "./FormFooter";
import Inputs from "./Inputs";

function RegisterForm() {
    return (
        <div className="h-screen w-full px-4 py-20 bg-zinc-900">
            <Form
                method="post"
                className="flex flex-col gap-10 m-auto bg-zinc-800 w-full md:w-[40rem] py-10 px-5 md:p-12 rounded"
            >
                <Inputs
                    type="text"
                    label="Username"
                    id="username"
                    name="username"
                />

                <Inputs type="email" label="Email" id="email" name="email" />
                <Inputs
                    type="password"
                    label="Password"
                    id="password"
                    name="password"
                />

                <Inputs
                    type="password"
                    label="Confirm Password"
                    id="confirmation"
                    name="confirmation"
                />

                <Inputs type="number" label="Phone" id="phone" name="phone" />

                <div className="flex justify-between items-center text-white">
                    <label htmlFor="gender">Gender</label>
                    <select className="text-black w-1/3 mr-24" name="gender">
                        <option value="" defaultValue={true}>
                            Select Your gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="flex w-2/3 gap-10 items-center m-auto">
                    <Inputs
                        label="Employer"
                        value="employer"
                        name="role"
                        id="employer"
                        type="radio"
                    />
                    <Inputs
                        label="Jobseeker"
                        value="user"
                        id="jobseeker"
                        name="role"
                        type="radio"
                    />
                </div>

                <FormFooter label="register" />
            </Form>
        </div>
    );
}

export default RegisterForm;
