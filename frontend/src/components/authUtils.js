export const auth_login = () => {
    localStorage.setItem("loggedIn", true);
    location.href = "/";
}

export const auth_logout = () => {
    localStorage.clear();
    location.href = "/";
}

export const set_user_profile = (profile) => {
    localStorage.setItem("profile", profile);
}

export const is_logged_in = () => {
    localStorage.getItem('loggedIn');
}