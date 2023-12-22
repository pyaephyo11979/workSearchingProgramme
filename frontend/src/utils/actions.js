import { json, redirect } from "react-router-dom";

export async function registerAction({ request }) {
    const BASE_URL = " https://wspapi.onrender.com/api";
    const data = await request.formData();

    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    const confirmation = data.get("confirmation");
    const phone = data.get("phone");
    const gender = data.get("gender");
    const role = data.get("role");

    if (!username || !email || !password || !confirmation || !role) {
        throw json({ message: "Inputs must be filled." }, { status: 500 });
    }

    if (password !== confirmation) {
        throw json({ message: "Password do not match" }, { status: 500 });
    }

    const userData = {
        name: username,
        email: email,
        password: password,
        role: role,
        phone: phone,
        gender: gender,
    };

    const response = await fetch(`${BASE_URL}/user/register`, {
        method: request.method,
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok)
        throw json(
            { message: "Sorry: Could not create account try again." },
            { status: 500 }
        );

    return redirect("/login");
}

export async function loginAction({ request }) {
    const data = await request.formData();

    const userData = {
        email: data.get("email"),
        password: data.get("password"),
    };

    const response = await fetch("https://wspapi.onrender.com/api/user/login", {
        method: request.method,
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const { error } = await response.json();
        return error;
    }

    const responseData = await response.json();
    const token = responseData.token;
    const user = responseData.user;

    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));

    return redirect("/jobs");
}

export async function createJobAction({ request }) {
    const data = await request.formData();
    const formData = Object.fromEntries(data);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    // need to fix.
    const jobData = {
        ...formData,
        postedBy: {
            id: user._id,
            name: user.name,
        },
    };

    const response = await fetch(
        "https://wspapi.onrender.com/api/post/create",
        {
            method: request.method,
            headers: {
                "Content-Type": "Application/json",
                'authorization': `Bearer ${JSON.parse(
                    localStorage.getItem("token")
                )}`,
            },
            body: JSON.stringify(jobData),
        }
    );

    console.log(response);

    if (!response.ok) {
        const error = await response.json();
        console.log(error);
        return error;
    }

    return redirect("/jobs");
}
