<template lang="">
  <v-card>
    <v-toolbar color="secondary" class="px-5">
      <v-icon>mdi-book-plus</v-icon>
      <v-toolbar-title>Update Daily Activity Report</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-close" @click="emit('closeDialog', 'dar')"> </v-btn>
    </v-toolbar>
    <v-card-title primary-title>
      <v-tabs v-model="tabValue" align-tabs="center">
        <v-tab :value="1">Demographic Data</v-tab>
        <v-tab :value="2">Services</v-tab>
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
      </v-window>
    </v-card-text>
  </v-card>
</template>
<script setup>
import DarPageOne from "@/components/daily-activity-report/dar-pages/DarPageOne.vue";
import DarPageTwo from "@/components/daily-activity-report/dar-pages/DarPageTwo.vue";
import DarPageThree from "@/components/daily-activity-report/dar-pages/DarPageThree.vue";
import { ref, onMounted } from "vue";
const props = defineProps({
  dar_id: Number,
});
onMounted(() => {
  console.log(props.dar_id);
});
const emit = defineEmits(["closeDialog"]);
const tabValue = ref(0);
</script>
<style lang=""></style>
