import FormFooter from "./FormFooter";
import Inputs from "./Inputs";

function RegisterForm() {
    return (
        <div className="h-screen w-full px-4 py-20 bg-zinc-900">
            <form className="flex flex-col gap-10 m-auto bg-zinc-800 w-full md:w-[40rem] py-10 px-5 md:p-12 rounded">
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

                <div className="flex w-2/3 gap-10 items-center m-auto">
                    <Inputs
                        label="Employer"
                        value="employer"
                        name="status"
                        id="employer"
                        type="radio"
                    />
                    <Inputs
                        label="jobseeker"
                        value="jobseeker"
                        id="jobseeker"
                        name="status"
                        type="radio"
                    />
                </div>

                <FormFooter label="register" />
            </form>
        </div>
    );
}

export default RegisterForm;
