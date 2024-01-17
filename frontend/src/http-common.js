import axios from "axios";

const instance = axios.create({
    baseURL: "https://rr-backend-clkh3y6y3q-ew.a.run.app",
    headers: {
        "Content-type": "application/json"
    }
});

instance.interceptors.request.use(function (config) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token)
        config.headers.Authorization = 'Bearer ' + user.token;
    return config;
});

export default instance;
