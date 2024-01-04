<script setup>
defineProps(['to', 'id', 'linkText'])
</script>

<template>
  <router-link v-if="id" :to="{ name: to, params: { id: id } }">
    <button v-if="linkText">{{ linkText }}</button>
    <button v-else>{{ to }}</button>
  </router-link>
  <router-link v-else :to="{ name: to }">
    <button v-if="linkText">{{ linkText }}</button>
    <button v-else>{{ to }}</button>
  </router-link>
</template>

<style scoped>

</style>