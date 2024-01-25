<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import ReservationService from "@/services/reservation-service";
import resolveError from "@/resolve-error";

const emit = defineEmits(['refresh']);
const router = useRouter();
const roomName = ref('');
const startTime = ref('');
const endTime = ref('');

async function submitReservation(event) {
  event.preventDefault();
  await ReservationService.create({roomName: roomName.value, startTime: startTime.value, endTime: endTime.value})
      .then(() => {
        emit('refresh');
      })
      .catch(error => {
        resolveError(error, router);
      })
}
</script>

<template>
  <form class="badge" @submit="submitReservation">
    <label for="reservationName">Room: </label>
    <input id="roomName" v-model="roomName" required type="text">
    <br>
    <label for="startTime">Start time: </label>
    <input id="startTime" v-model="startTime" required type="datetime-local">
    <br>
    <label for="startTime">End time: </label>
    <input id="endTime" v-model="endTime" required type="datetime-local">
    <br>
    <button type="submit">Make a reservation</button>
  </form>
</template>

<style scoped>

</style>