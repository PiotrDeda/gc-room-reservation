<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import store from "@/store";
import resolveError from "@/resolve-error";

const router = useRouter();
const username = ref('');
const password = ref('');

async function register(event) {
  event.preventDefault();
  if (username.value.length < 4 || username.value.length > 48) {
    alert('Username must be between 4 and 48 characters long.');
    console.error('Username must be between 4 and 48 characters long.');
    return;
  }
  if (password.value.length < 8 || password.value.length > 48) {
    alert('Password must be between 8 and 48 characters long.');
    console.error('Password must be between 8 and 48 characters long.');
    return;
  }
  await store.dispatch("auth/register", {username: username.value, password: password.value})
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
    <form @submit="register">
      <label for="username">Username: </label>
      <input v-model="username" type="text" id="username" required autofocus :maxlength="48" :minlength="4">
      <br>
      <label for="password">Password: </label>
      <input v-model="password" type="password" id="password" required :maxlength="48" :minlength="8">
      <br>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<style scoped>

</style>
