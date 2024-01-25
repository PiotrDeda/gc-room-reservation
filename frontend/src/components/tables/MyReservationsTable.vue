<script setup>
import ReservationCard from "@/components/trinkets/cards/ReservationCard.vue";
import ReservationSubmit from "@/components/trinkets/submits/ReservationSubmit.vue";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import ReservationService from '@/services/reservation-service';
import UserService from "@/services/user-service";
import resolveError from "@/resolve-error";

const router = useRouter();
/** @type {Ref<Reservation[]>} */
const reservations = ref([]);
const loading = ref(true);
const userId = ref('');

async function fetchProfile() {
  await UserService.getProfile()
      .then(response => {
        userId.value = response.data.userId;
      })
      .catch(error => {
        resolveError(error, router);
      })
}

async function fetchReservations() {
  await ReservationService.getByUser(userId.value)
      .then(response => {
        reservations.value = response.data;
        loading.value = false;
      })
      .catch(error => {
        resolveError(error, router);
        loading.value = false;
      })
}

onMounted(async () => {
  fetchProfile().then(async () => await fetchReservations());
})
</script>

<template>
  <div>
    <div v-if="loading">Loading…</div>
    <div v-for="reservation in reservations" v-else :key="reservation.reservationId" class="tablelist">
      <ReservationCard :reservation="reservation"/>
    </div>
    <hr/>
    <ReservationSubmit @refresh="fetchReservations"/>
  </div>
</template>

<style scoped>

</style>
