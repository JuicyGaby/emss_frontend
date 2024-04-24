<template lang="">
  <div>
    <v-card>
      <v-toolbar color="secondary" class="px-5">
        <v-icon size="x-large">mdi-note-text</v-icon>
        <v-toolbar-title>Social Work Administration Activity Logs</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon @click="$emit('closeDialog')">mdi-close</v-icon>
      </v-toolbar>
      <v-card-text>
        <v-data-table
          :headers="dataTable.tableHeaders"
          :items="activities"
          :items-per-page="5"
        >
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import moment from "moment";

const props = defineProps({
  swaId: Number,
});
const activities = ref([]);
const emit = defineEmits(["closeDialog"]);
const dataTable = ref({
  tableHeaders: [
    { title: "Date", value: "created_at" },
    { title: "Activity", value: "activity" },
    { title: "Social Worker", value: "created_by" },
  ],
});
// async function

onMounted(async () => {});
</script>
<style lang=""></style>
