<template lang="">
  <v-card>
    <v-toolbar color="secondary" class="px-5">
      <v-icon>mdi-book-plus</v-icon>
      <v-toolbar-title>Update Daily Activity Report</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-close" @click="emit('closeDialog')"> </v-btn>
    </v-toolbar>
    <v-card-title primary-title>
      <v-tabs v-model="tabValue" align-tabs="center" density="">
        <v-tab :value="1">Page 1</v-tab>
        <v-tab :value="2">Page 2</v-tab>
        <v-tab :value="3">Page 3</v-tab>
        <v-tab :value="4">Page 4</v-tab>
      </v-tabs>
    </v-card-title>
    <v-card-text>
      <v-window v-model="tabValue">
        <v-window-item :value="1">
          <DarPageOne :dar_id="dar_id" />
        </v-window-item>
        <v-window-item :value="2">
          <DarPageTwo :dar_id="dar_id" />
        </v-window-item>
        <v-window-item :value="3"> Three </v-window-item>
        <v-window-item :value="4"> Four </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
<script setup>
import DarPageOne from "@/components/daily-activity-report/dar-pages/DarPageOne.vue";
import DarPageTwo from "@/components/daily-activity-report/dar-pages/DarPageTwo.vue";
import DarPageThree from "@/components/daily-activity-report/dar-pages/DarPageThree.vue";
import DarPageFour from "@/components/daily-activity-report/dar-pages/DarPageFour.vue";
import { ref } from "vue";
const props = defineProps({
  dar_id: Number,
});
const emit = defineEmits(["closeDialog"]);
const tabValue = ref(0);
</script>
<style lang=""></style>
