<template lang="">
  <div>
    <v-card>
      <v-toolbar color="secondary" class="px-5">
        <v-icon>mdi-book-plus</v-icon>
        <v-toolbar-title>Update Daily Activity Report</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" @click="emit('closeDialog')"> </v-btn>
      </v-toolbar>
      <v-card-text> </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  dar_id: Number,
});
const emit = defineEmits(["closeDialog"]);
</script>
<style lang=""></style>
