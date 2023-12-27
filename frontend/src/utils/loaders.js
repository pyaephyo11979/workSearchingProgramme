import { redirect } from "react-router-dom";

export function checkAuthUser() {
    const user = localStorage.getItem("user");
    return JSON.parse(user);
}

export function authProtectedLoader() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return redirect("/login");
    return user;
}
