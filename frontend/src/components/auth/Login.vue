<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import store from "@/store";
import resolveError from "@/resolve-error";

const router = useRouter();
const username = ref('');
const password = ref('');

async function login(event) {
  event.preventDefault();
  await store.dispatch("auth/login", {username: username.value, password: password.value})
      .then(() => {
        router.push({name: 'Home'});
      })
      .catch(error => {
        resolveError(error, router);
      });
}
</script>

<template>
  <div>
    <form @submit="login">
      <label for="username">Username: </label>
      <input id="username" v-model="username" autofocus required type="text">
      <br>
      <label for="password">Password: </label>
      <input id="password" v-model="password" required type="password">
      <br>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>

</style>
