<template lang="">
  <div>
    <v-card>
      <v-toolbar color="secondary" class="px-5">
        <v-icon size="x-large">mdi-note-text</v-icon>
        <v-toolbar-title>Daily Activity Report Logs</v-toolbar-title>
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
import { getDarActivityLogs } from "@/api/daily-activity-report";

const props = defineProps({
  dar_id: Number,
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
const getDarActivityLogsItems = async () => {
  const response = await getDarActivityLogs(props.dar_id);
  console.log(response);
  activities.value = response;
};

onMounted(async () => {
  await getDarActivityLogsItems();
});
</script>
<style lang=""></style>
