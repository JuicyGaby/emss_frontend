<template lang="">
  <div>
    <v-card>
      <v-toolbar color="secondary" class="px-5">
        <v-icon>mdi-book-plus</v-icon>
        <v-toolbar-title>Update Daily Activity Report</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" @click="emit('closeDialog')"> </v-btn>
      </v-toolbar>
      <v-card-title primary-title>
        <v-tabs v-model="tabValue" align-tabs="center" density="comfortable">
          <v-tab :value="1">Page 1</v-tab>
          <v-tab :value="2">Page 2</v-tab>
          <v-tab :value="3" disabled>Page 3</v-tab>
          <v-tab :value="4" disabled>Page 4</v-tab>
        </v-tabs>
        <v-window v-model="tabValue">
          <v-window-item :value="1"> One </v-window-item>
          <v-window-item :value="2"> Two </v-window-item>
          <v-window-item :value="3"> Three </v-window-item>
          <v-window-item :value="4"> Four </v-window-item>
        </v-window>
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
const emit = defineEmits(["closeDialog"]);
const tabValue = ref(0);
</script>
<style lang=""></style>
