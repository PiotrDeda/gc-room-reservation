<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import UserService from "@/services/user-service";
import ReservationService from "@/services/reservation-service";
import resolveError from "@/resolve-error";

const router = useRouter();
defineProps(['reservation']);
const emit = defineEmits(['refresh']);
const deletingReservation = ref(false);

function formatTime(timestamp) {
  const options = {day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'};
  const time = new Date(timestamp);
  return time.toLocaleTimeString([], options);
}

function deleteReservation(id) {
  ReservationService.delete(id)
      .then(() => {
        emit('refresh');
      })
      .catch(error => {
        resolveError(error, router);
      })
}
</script>

<template>
  <div class="reservation badge">
    <div>User: {{ reservation.user.username }}</div>
    <div>Room: {{ reservation.roomName }}</div>
    <div>Time: from {{ formatTime(reservation.startTime) }} to {{ formatTime(reservation.endTime) }}</div>
    <span v-if="deletingReservation">
      <button @click.prevent="deleteReservation(reservation.reservationId)">Confirm</button>
      <button @click.prevent="deletingReservation = false">Cancel</button>
    </span>
    <button v-else-if="UserService.isAdmin() || UserService.isCurrentUserId(reservation.user.userId)"
            @click.prevent="deletingReservation = true">Delete
    </button>
  </div>
</template>

<style scoped>
.reservation {
  display: flex;
  flex-direction: column;
}
</style>
