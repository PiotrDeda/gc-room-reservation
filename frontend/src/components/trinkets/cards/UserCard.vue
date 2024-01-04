<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import resolveError from "@/resolve-error";
import UserService from "@/services/user-service";

const router = useRouter();
const emit = defineEmits(['refresh']);
const props = defineProps(['user']);
const changingName = ref(false);
const deletingUser = ref(false);
const username = ref(props.user.username);

async function changeName() {
  await UserService.updateUser(props.user.userId, {username: username.value})
      .then(() => {
        changingName.value = false;
        emit('refresh');
      })
      .catch(error => {
        resolveError(error, router);
      })
}

async function deleteUser() {
  await UserService.deleteUser(props.user.userId)
      .then(() => {
        emit('refresh');
      })
      .catch(error => {
        resolveError(error, router);
      })
}
</script>

<template>
  <span v-if="changingName">
    <input type="text" v-model="username">
    <button @click="changeName">Save</button>
    <button @click="changingName = false">Cancel</button>
  </span>
  <span v-else-if="deletingUser">
    <span class="badge">{{ user.username }}</span>
    <button @click="deleteUser">Confirm</button>
    <button @click="deletingUser = false">Cancel</button>
  </span>
  <span v-else>
    <span class="badge">{{ user.username }}</span>
    <button @click.prevent="changingName = true">Change name</button>
    <button @click.prevent="deletingUser = true">Delete</button>
  </span>
</template>

<style scoped>

</style>
