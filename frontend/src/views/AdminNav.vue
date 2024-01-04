<script setup>
import BaseNav from "@/views/BaseNav.vue";
import LinkCard from "@/components/trinkets/cards/LinkCard.vue";
import { useRouter } from 'vue-router';
import store from "@/store";

const router = useRouter();

function logout() {
  store.dispatch("auth/logout")
  router.push({ name: 'Home' });
}
</script>

<template>
  <div class="navbox">
    <BaseNav/>
    <LinkCard to="Users"/>
    <LinkCard to="Profile"/>
    <button @click.prevent="logout">Logout</button>
  </div>
</template>

<style scoped>

</style>
