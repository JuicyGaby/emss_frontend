<template lang="">
  <div class="rb">
    <v-card width="100%">
      <v-toolbar color="secondary" class="d-flex align-center ga-5 px-5">
        <v-icon size="x-large">mdi-book-edit</v-icon>
        <h1>Daily Activity Report</h1>
      </v-toolbar>
      <v-tabs v-model="tabValue" align-tabs="start">
        <v-tab :value="1">Daily Activity Report</v-tab>
        <v-tab :value="2">Social Work Administration</v-tab>
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
                  @click="dialogs.dar.create = true"
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
            <div class="ma-3 d-flex justify-space-between align-center">
              <v-btn color="secondary" @click="dialogs.swa.create = true"
                >Create Entry</v-btn
              >
              <div class="d-flex align-center ga-2 justify-center">
                <v-text-field
                  type="date"
                  variant="outlined"
                  density="comfortable"
                  v-model="dateInputs.swa"
                ></v-text-field>
                <v-btn color="grey" class="mb-6" @click="getDarSwaItemByDate()"
                  >Filter Date</v-btn
                >
              </div>
            </div>
            <v-data-table
              :headers="dataTable.swa.headers"
              :items-per-page="5"
              :items="swaItemsWithNumbers"
            >
              <template v-slot:[`item.operation`]="{ item }">
                <div class="d-flex ga-5">
                  <v-icon
                    color="primary"
                    @click="editSocialWorkAdministration(item.id)"
                    >mdi-pencil</v-icon
                  >
                  <v-icon color="secondary">mdi-eye</v-icon>
                </div>
              </template>
            </v-data-table>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
  <!-- dialogs -->
  <div>
    <!-- create dar dialog -->
    <v-dialog v-model="dialogs.dar.create" width="600px">
      <CreateDARDialog
        @addDAR="handlePushItem"
        @closeDialog="handleCloseDialog"
        @editDAR="handleEditDar"
      />
    </v-dialog>
    <!-- update dar dialog -->
    <v-dialog
      v-model="dialogs.dar.edit"
      fullscreen
      scrollable
      transition="dialog-transition"
    >
      <EditDARDialog :dar_id="dar_id" @closeDialog="handleCloseDialog" />
    </v-dialog>
    <!-- view dar dialog -->
    <v-dialog
      v-model="dialogs.dar.view"
      width="600px"
      transition="dialog-transition"
    >
      <ViewDARDialog :dar_id="dar_id" />
    </v-dialog>

    <!-- create swa dialog -->
    <v-dialog v-model="dialogs.swa.create" transition="dialog-transition">
      <CreateSWADialog
        @closeDialog="dialogs.swa.create = false"
        @addSwa="handlePushItem"
        @editSwa="handleEditItem"
      />
    </v-dialog>
    <!-- update swa dialog -->
    <v-dialog
      v-model="dialogs.swa.edit"
      fullscreen
      scrollable
      transition="dialog-transition"
      :swa_id="swa_id"
    >
      <EditSWADialog :swa_id="swa_id" @closeDialog="dialogs.swa.edit = false" />
      />
    </v-dialog>
    <!-- view swa dialog -->
  </div>
  <snack-bars :snackBarData="snackBarData" />
</template>
<script setup>
import {
  getDailyActivityReport,
  getDarSwa,
  getDarSwaByDate,
} from "@/api/daily-activity-report";
import moment from "moment";
import { ref, onMounted, computed } from "vue";
import { snackBarData } from "@/utils/constants";
// components
import snackBars from "@/components/dialogs/snackBars.vue";
// DAR Components
import CreateDARDialog from "@/components/daily-activity-report/CreateDARDialog.vue";
import EditDARDialog from "@/components/daily-activity-report/EditDARDialog.vue";
import ViewDARDialog from "@/components/daily-activity-report/ViewDARDialog.vue";
// SWA Components
import CreateSWADialog from "@/components/daily-activity-report/CreateSWADialog.vue";
import EditSWADialog from "@/components/daily-activity-report/EditSWADialog.vue";
import ViewSWADialog from "@/components/daily-activity-report/ViewSWADialog.vue";
onMounted(async () => {
  await getDarItems();
  await getSwaItems();
});
let patients = ref([]);
let swaItems = ref([]);
const tabValue = ref(1);
let dar_id = ref(0);
let swa_id = ref(0);
const search = ref("");

// objects
const dateInputs = ref({
  dar: moment().format("YYYY-MM-DD"),
  swa: moment().format("YYYY-MM-DD"),
});
const dataTable = {
  headers: [
    { title: "Number", value: "Number" },
    // { title: "Admission Date-Time", value: "admission_date" },
    { title: "Patient Name", value: "fullname" },
    { title: "Created By", value: "created_by" },
    { title: "Operation", value: "operation" },
  ],
  swa: {
    headers: [
      { title: "Number", value: "Number" },
      { title: "Admission Date-Time", value: "date_created" },
      { title: "Creator", value: "creator_name" },
      { title: "Operation", value: "operation" },
    ],
  },
};
const dialogs = ref({
  dar: {
    create: false,
    edit: false,
    view: false,
  },
  swa: {
    create: false,
    edit: false,
    view: false,
  },
});

// functions
const getDarItems = async () => {
  const response = await getDailyActivityReport();
  if (response.length > 0) {
    patients.value = response;
  }
};
const getSwaItems = async () => {
  const response = await getDarSwa();
  if (response.length > 0) {
    swaItems.value = response;
  }
};
const getDarSwaItemByDate = async () => {
  console.log(dateInputs.value.swa);
  const response = await getDarSwaByDate(dateInputs.value.swa);
  handleSnackBar(`Successfully  fetched ${response.length} Items`, "primary");
  if (response.length > 0) {
    swaItems.value = response;
    return;
  }
  swaItems.value = [];
};

const patientsWithNumbers = computed(() => {
  return patients.value.map((patient, index) => {
    return {
      Number: index + 1,
      ...patient,
    };
  });
});
const swaItemsWithNumbers = computed(() => {
  return swaItems.value.map((item, index) => {
    return {
      Number: index + 1,
      ...item,
    };
  });
});

const editDailyActivityReport = (item) => {
  dialogs.value.dar.edit = true;
  dar_id.value = item;
};
const viewDailyActivityReport = (id) => {
  console.log("Edit DAR", id);
};
const editSocialWorkAdministration = (item) => {
  swa_id.value = item;
  dialogs.value.swa.edit = true;
};

const handleSnackBar = (message, color) => {
  snackBarData.value.text = message;
  snackBarData.value.type = color;
  snackBarData.value.isVisible = true;
};
// emit
const handlePushItem = (type, item) => {
  if (type === "dar") {
    patients.value.push(item);
  } else if (type === "swa") {
    console.log("pushing", item);
    swaItems.value.push(item);
  }
};
const handleEditDar = (dar_id) => {
  dialogs.value.dar.create = false;
  editDailyActivityReport(dar_id);
};
const handleEditItem = (type, itemId) => {
  if (type === "dar") {
    editDailyActivityReport(itemId);
  } else if (type === "swa") {
    editSocialWorkAdministration(itemId);
  }
};
const handleCloseDialog = (type) => {
  dialogs.value[type].create = false;
  dialogs.value[type].edit = false;
};
</script>
<style lang="css">
.rb {
  border: 1px dashed red;
  width: 100%;
}
</style>
