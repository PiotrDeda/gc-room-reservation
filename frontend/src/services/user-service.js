import http from "../http-common";
import store from "@/store";

const url = "/users";

class UserService {
    register(username, password) {
        return http.post(`${url}/register`, {username, password}).then((response) => {
            if (response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
        });
    }

    login(username, password) {
        return http.post(`${url}/login`, {username, password}).then((response) => {
            if (response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    getAll() {
        return http.get(url);
    }

    getProfile() {
        return http.get(`${url}/profile`);
    }

    updateUser(id, data) {
        return http.patch(`${url}/${id}`, data);
    }

    deleteUser(id) {
        return http.delete(`${url}/${id}`);
    }

    isLoggedIn() {
        return store.state.auth.loggedIn;
    }

    isCurrentUserId(userId) {
        const user = JSON.parse(localStorage.getItem("user"));
        return user && user.id === userId;
    }

    isAdmin() {
        return store.state.auth.isAdmin;
    }
}

export default new UserService();
