import {createRouter, createWebHashHistory} from 'vue-router';
import UserService from "@/services/user-service";
import Home from "@/components/Home.vue";
import Register from "@/components/auth/Register.vue";
import Login from "@/components/auth/Login.vue";
import Profile from "@/components/auth/Profile.vue";
import UsersTable from "@/components/tables/UsersTable.vue";
import AllReservationsTable from "@/components/tables/AllReservationsTable.vue";
import MyReservationsTable from "@/components/tables/MyReservationsTable.vue";

const routes = [
    {path: '/', name: "Home", component: Home},

    {path: '/register', name: "Register", component: Register},
    {path: '/login', name: "Login", component: Login},
    {path: '/profile', name: "Profile", component: Profile},
    {path: '/users', name: "Users", component: UsersTable},

    {path: '/my-reservations', name: "My Reservations", component: MyReservationsTable},
    {path: '/all-reservations', name: "All Reservations", component: AllReservationsTable},
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const restrictedPath = to.path.endsWith('/users');
    if (restrictedPath && !UserService.isAdmin())
        next('/login');
    else
        next();
});

export default router;
