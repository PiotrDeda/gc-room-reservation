<script setup>
import BaseNav from "@/views/BaseNav.vue";
import LinkCard from "@/components/trinkets/cards/LinkCard.vue";
</script>

<template>
  <div class="navbox">
    <BaseNav/>
    <LinkCard to="Register"/>
    <LinkCard to="Login"/>
  </div>
</template>

<style scoped>

</style>
