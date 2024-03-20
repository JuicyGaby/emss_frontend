<template lang="">
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title primary-title class="d-flex align-center ga-2">
              <v-icon size="x-large">mdi-book-edit</v-icon>
              <h2>Daily Activity Report</h2>
            </v-card-title>
            <v-divider></v-divider>
            <div class="ma-3 d-flex justify-space-between align-center">
              <v-btn
                color="grey"
                prepend-icon="mdi-folder-plus"
                size="large"
                @click="dialogs.createDialog = true"
                >Create Report</v-btn
              >
              <v-text-field
                prepend-inner-icon="mdi-magnify"
                label="Search Patient"
                single-line
                hide-details
                variant="outlined"
                style="max-width: 400px"
              ></v-text-field>
            </div>
            <v-card-text>
              <v-data-table
                :headers="dataTable.headers"
                :items="[]"
                :items-per-page="10"
              ></v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- dialogs -->
    <v-dialog
      v-model="dialogs.createDialog"
      width="600px"
      transition="dialog-transition"
    >
        <CreateDARDialog />
    </v-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
// components
import CreateDARDialog from "@/components/daily-activity-report/CreateDARDialog.vue";
// import EditDARDialog from "@/components/daily-activity-report/EditDARDialog.vue";
// import ViewDARDialog from "@/components/daily-activity-report/ViewDARDialog.vue";
let patients = ref([]);
const dataTable = {
  headers: [
    { title: "Number" },
    { title: "Admission Date-Time" },
    { title: "Patient Name" },
    { title: "Age" },
    { title: "Operation" },
  ],
};
const dialogs = ref({
  createDialog: false,
  editDialog: false,
  viewDialog: false,
});
</script>
<style lang=""></style>
