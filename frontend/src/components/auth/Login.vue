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
      <input v-model="username" type="text" id="username" required autofocus>
      <br>
      <label for="password">Password: </label>
      <input v-model="password" type="password" id="password" required>
      <br>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>

</style>
