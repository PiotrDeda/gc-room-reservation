import UserService from "@/services/user-service";

export const auth = {
    namespaced: true,
    state: {
        loggedIn: !!JSON.parse(localStorage.getItem('user')),
        isAdmin: localStorage.getItem('user') &&
            JSON.parse(localStorage.getItem('user')).roles.includes("ROLE_ADMIN")
    },
    actions: {
        register({commit}, {username, password}) {
            return UserService.register(username, password).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        },
        login({commit}, {username, password}) {
            return UserService.login(username, password).then(
                user => {
                    commit('loginSuccess');
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({commit}) {
            UserService.logout();
            commit('logout');
        }
    },
    mutations: {
        registerSuccess(state) {
            state.loggedIn = true;
            const user = JSON.parse(localStorage.getItem("user"));
            state.isAdmin = user && user.roles.includes("ROLE_ADMIN");
        },
        registerFailure(state) {
            state.loggedIn = false;
            state.isAdmin = false;
        },
        loginSuccess(state) {
            state.loggedIn = true;
            const user = JSON.parse(localStorage.getItem("user"));
            state.isAdmin = user && user.roles.includes("ROLE_ADMIN");
        },
        loginFailure(state) {
            state.loggedIn = false;
            state.isAdmin = false;
        },
        logout(state) {
            state.loggedIn = false;
            state.isAdmin = false;
        }
    }
}