<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import UserService from "@/services/user-service";
import resolveError from "@/resolve-error";

const router = useRouter();
/** @type {Ref<User>} */
const profile = ref([]);

async function fetchProfile() {
  await UserService.getProfile()
      .then(response => {
        profile.value = response.data;
      })
      .catch(error => {
        resolveError(error, router);
      })
}

onMounted(async () => {
  await fetchProfile();
});
</script>

<template>
  <div class="badge">User: {{ profile.username }}</div>
  <div v-if="profile.role === 'ROLE_ADMIN'" class="badge">ADMIN</div>
</template>

<style scoped>

</style>
