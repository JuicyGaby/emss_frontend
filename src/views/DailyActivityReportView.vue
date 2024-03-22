<template lang="">
  <div class="rb">
    <v-card width="100%">
      <v-toolbar color="secondary" class="d-flex align-center ga-5 px-5">
        <v-icon size="x-large">mdi-book-edit</v-icon>
        <h1>Daily Activity Report</h1>
      </v-toolbar>
      <v-tabs v-model="tabValue" align-tabs="start">
        <v-tab :value="1">Daily Activity Report</v-tab>
        <v-tab :value="2">Social Word Administration</v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <v-card-text>
        <v-window v-model="tabValue">
          <v-window-item :value="1">
            <div class="ma-3 d-flex justify-space-between align-center">
              <div class="">
                <v-btn
                  color="grey"
                  prepend-icon="mdi-folder-plus"
                  @click="dialogs.create = true"
                  >Create Entry</v-btn
                >
              </div>
              <v-text-field
                prepend-inner-icon="mdi-magnify"
                label="Search Patient"
                single-line
                hide-details
                variant="outlined"
                density="comfortable" 
                v-model="search"
                style="max-width: 400px"
              ></v-text-field>
            </div>
            <v-data-table
              :search="search"
              :headers="dataTable.headers"
              :items="patientsWithNumbers"
              :items-per-page="5"
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
          </v-window-item>
          <v-window-item :value="2">
            <div class="ma-3 ">
              <v-btn color="grey">text</v-btn>
            </div>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
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
    <v-dialog
      v-model="dialogs.edit"
      fullscreen
      scrollable
      transition="dialog-transition"
    >
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
const tabValue = ref(1);
let dar_id = ref(0);
const search = ref("");
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
  width: 100%;
}
</style>
