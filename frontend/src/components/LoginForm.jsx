import Inputs from "./Inputs";
import FormFooter from "./FormFooter";
import { Form } from "react-router-dom";

function LoginForm() {
    return (
        <div className="h-screen w-full px-4 py-20 bg-zinc-900">
            <Form
                method="POST"
                className="flex flex-col gap-10 m-auto bg-zinc-800 w-full md:w-[40rem] py-10 px-5 md:p-12 rounded"
            >
                <Inputs type="email" id="email" name="email" label="Email" />
                <Inputs
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                />
                <FormFooter label="login" />
            </Form>
        </div>
    );
}

export default LoginForm;
