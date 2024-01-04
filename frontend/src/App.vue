<script setup>
import GuestNav from "@/views/GuestNav.vue";
import AdminNav from "@/views/AdminNav.vue";
import UserNav from "@/views/UserNav.vue";
import UserService from "@/services/user-service";
import {onMounted} from "vue";

onMounted(() => {
  document.body.style.paddingBottom = document.getElementsByTagName('footer')[0].offsetHeight + "px";
})
</script>

<template>
  <header>
    <router-link :to="{ name: 'Home' }" class="logo">
      <h1>Room Reservation</h1>
    </router-link>
    <nav>
      <GuestNav v-if="!UserService.isLoggedIn()"/>
      <AdminNav v-else-if="UserService.isAdmin()"/>
      <UserNav v-else/>
    </nav>
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    &copy; Piotr Deda 2023, licensed under MIT License
  </footer>
</template>

<style scoped>
header {
  display: flex;
  margin: 0 10% 0 10%;
  align-items: center;
}

header >>> a {
  text-decoration: none;
  color: black;
}

.logo {
  display: flex;
  margin: 0 10% 0 10%;
  align-items: center;
}

nav {
  display: flex;
  margin: 0 10% 0 10%;
  align-items: center;
  justify-content: flex-end;
}

main {
  display: flex;
  margin: 0 10% 0 10%;
  flex-direction: column;
  align-items: center;
}

footer {
  background: #dddddd;
  position: fixed;
  bottom: 0;
  padding: 5px 0 5px 0;
  width: 100%;
  text-align: center;
}
</style>
