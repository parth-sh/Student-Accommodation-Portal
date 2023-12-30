export const auth_login = (user) => {
    localStorage.setItem("loggedIn", true);
    location.href = "/";
}

export const auth_logout = () => {
    localStorage.removeItem("loggedIn");
    location.href = "/";
}