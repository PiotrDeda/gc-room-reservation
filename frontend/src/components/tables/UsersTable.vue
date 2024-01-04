<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import UserService from '@/services/user-service.js';
import resolveError from "@/resolve-error";
import UserCard from "@/components/trinkets/cards/UserCard.vue";

const router = useRouter();
/** @type {Ref<User[]>} */
const users = ref([]);
const loading = ref(true);

async function fetchUsers() {
  await UserService.getAll()
      .then(response => {
        users.value = response.data;
        loading.value = false;
      })
      .catch(error => {
        resolveError(error, router);
        loading.value = false;
      })
}

onMounted(async () => {
  await fetchUsers();
})
</script>

<template>
  <div>
    <div v-if="loading">Loading…</div>
    <div v-else v-for="user in users" :key="user.userId" class="tablelist">
        <UserCard :user="user" @refresh="fetchUsers"/>
    </div>
  </div>
</template>

<style scoped>

</style>
