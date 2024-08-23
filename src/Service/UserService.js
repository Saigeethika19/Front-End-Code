import { myAxios } from "./Helper";

// Signup method
export const signup = (user) => {
    return myAxios.post("/user/create-user", user).then((response) => response.data);
}

// Login method
export const mylogin = (credentials) => {
    return myAxios.post("/user/login", credentials).then((response) => {
        const user = response.data;
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage
        return user;
    });
};

// Logout method
export const logout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    return Promise.resolve(true);
};