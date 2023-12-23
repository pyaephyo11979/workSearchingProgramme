export function checkAuthUser() {
    const user = localStorage.getItem("user");
    return JSON.parse(user);
}

