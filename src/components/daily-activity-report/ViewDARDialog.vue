<template lang="">
  <div>
    <v-card>
      <v-card-title primary-title>
        <v-icon size="x-large">mdi-book-edit</v-icon>
        <h2>Daily Activity Report</h2>
      </v-card-title>
      <v-card-text> </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  dar_id: Number,
});
</script>
<style lang=""></style>
