import { createStore } from "vuex";
import {auth} from "@/stores/auth-store";

const store = createStore({
    modules: {
        auth,
    },
});

export default store;
