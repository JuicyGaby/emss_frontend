<template lang="">
  <div class="d-flex">

  </div>
  <v-container class="ma-0">
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
              @click="dialogs.create = true"
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
              :items="patientsWithNumbers"
              :items-per-page="10"
            >
              <template v-slot:[`item.operation`]="{ item }">
                <div class="d-flex ga-5">
                  <v-icon
                    color="primary"
                    @click="editDailyActivityReport(item.id)"
                    >mdi-pencil</v-icon
                  >
                  <v-icon
                    color="secondary"
                    @click="viewDailyActivityReport(item)"
                    >mdi-eye</v-icon
                  >
                </div>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- dialogs -->
  <div>
    <!-- create dar dialog -->
    <v-dialog
      v-model="dialogs.create"
      width="600px"
      transition="dialog-transition"
    >
      <CreateDARDialog
        @addDAR="addDARItem"
        @closeDialog="handleCloseDialog"
        @editDAR="handleEditDar"
      />
    </v-dialog>
    <!-- update dar dialog -->
    <v-dialog v-model="dialogs.edit" fullscreen scrollable>
      <EditDARDialog :dar_id="dar_id" @closeDialog="handleCloseDialog" />
    </v-dialog>
    <!-- view dar dialog -->
    <v-dialog
      v-model="dialogs.view"
      width="600px"
      transition="dialog-transition"
    >
      <ViewDARDialog :dar_id="dar_id" />
    </v-dialog>
  </div>
</template>
<script setup>
import { getDailyActivityReport } from "@/api/daily-activity-report";
import { ref, onMounted, computed } from "vue";

// components
import CreateDARDialog from "@/components/daily-activity-report/CreateDARDialog.vue";
import EditDARDialog from "@/components/daily-activity-report/EditDARDialog.vue";
import ViewDARDialog from "@/components/daily-activity-report/ViewDARDialog.vue";

onMounted(async () => {
  await getDarItems();
});
let patients = ref([]);
let dar_id = ref(0);
const dataTable = {
  headers: [
    { title: "Number", value: "Number" },
    // { title: "Admission Date-Time", value: "admission_date" },
    { title: "Patient Name", value: "patient_name" },
    { title: "Age", value: "age" },
    { title: "Sex", value: "sex" },
    { title: "Operation", value: "operation" },
  ],
};
const dialogs = ref({
  create: false,
  edit: false,
  view: false,
});
const getDarItems = async () => {
  const response = await getDailyActivityReport();
  console.log(response);
  if (response.length > 0) {
    patients.value = response;
  }
};
const patientsWithNumbers = computed(() => {
  return patients.value.map((patient, index) => {
    return {
      Number: index + 1,
      ...patient,
    };
  });
});

const editDailyActivityReport = (item) => {
  dialogs.value.edit = true;
  dar_id.value = item;
  console.log("Edit DAR", dar_id.value);
};
const viewDailyActivityReport = (id) => {
  console.log("Edit DAR", id);
};
// emit
const addDARItem = (item) => {
  patients.value.push(item);
  console.log(patients.value);
};
const handleEditDar = (dar_id) => {
  dialogs.value.create = false;
  editDailyActivityReport(dar_id);
};
const handleCloseDialog = () => {
  dialogs.value.create = false;
  dialogs.value.edit = false;
};
</script>
<style lang="css">
.rb {
  border: 1px dashed red;
}
</style>
