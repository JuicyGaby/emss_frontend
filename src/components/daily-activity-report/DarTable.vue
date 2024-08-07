<template lang="">
  <div style="width: 100%">
    <v-card width="100%">
      <v-toolbar
        v-if="props.isDar"
        color="secondary"
        class="d-flex align-center ga-5 px-5"
      >
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
            <div class="ma-3">
              <h1 class="mb-5" v-if="props.isDar">
                {{ dateInputs.current_date }} - {{ moment().format("dddd") }}
              </h1>
              <div class="d-flex justify-space-between">
                <div class="d-flex flex-column" style="width: 400px">
                  <div class="d-flex ga-1">
                    <v-btn
                      v-if="props.isDar"
                      color="secondary"
                      prepend-icon="mdi-folder-plus"
                      @click="dialogs.dar.create = true"
                      class="mb-6"
                      style="width: 400px"
                      >Create DAR Entry</v-btn
                    >
                  </div>
                  <v-btn
                    v-if="
                      authentication.access_rights.can_manage_social_worker &&
                      !props.isDar
                    "
                    prepend-icon="mdi-filter"
                    color="primary"
                    class="mb-6"
                    @click="toggleSocialWorkerDialog(false)"
                  >
                    Generate Social Worker DAR
                  </v-btn>
                  <v-text-field
                    prepend-inner-icon="mdi-magnify"
                    label="Search Patient"
                    single-line
                    hide-details
                    variant="outlined"
                    density="compact"
                    v-model="darSearch"
                    style="max-width: 400px"
                  ></v-text-field>
                </div>
                <div v-if="props.isDar">
                  <v-text-field
                    label="Filter By Date"
                    style="width: 200px"
                    type="date"
                    variant="outlined"
                    density="compact"
                    v-model="dateInputs.dar"
                  ></v-text-field>
                </div>
                <div v-else>
                  <div class="d-flex align-center ga-1">
                    <v-select
                      label="Filter By Month"
                      style="width: 200px"
                      variant="outlined"
                      density="compact"
                      :items="monthsOfYear"
                      v-model="dateInputs.dar_month"
                    ></v-select>
                  </div>
                </div>
              </div>
            </div>
            <v-data-table
              :search="darSearch"
              :headers="dataTable.headers"
              :items="patientsWithNumbers"
              :items-per-page="5"
              style="border: 1px solid #e0e0e0"
            >
              <template v-slot:[`item.operation`]="{ item }">
                <div class="d-flex ga-5">
                  <v-icon
                    color="primary"
                    @click="editDailyActivityReport(item.id)"
                    >mdi-pencil</v-icon
                  >
                  <!-- <v-icon
                      color="secondary"
                      @click="viewDailyActivityReport(item)"
                      >mdi-eye</v-icon
                    > -->
                  <v-icon color="warning" @click="viewDarActivityLogs(item.id)"
                    >mdi-note-text</v-icon
                  >
                  <v-icon
                    v-if="item.creator_id === authentication.user.id"
                    color="error"
                    @click="updateDarStatusItemDialog(item.id)"
                    >mdi-delete</v-icon
                  >
                </div>
              </template>
            </v-data-table>
          </v-window-item>
          <v-window-item :value="2">
            <h1 class="mb-5" v-if="props.isDar">
              {{ dateInputs.current_date }} - {{ moment().format("dddd") }}
            </h1>
            <div class="ma-3 d-flex justify-space-between align-center">
              <div style="width: 400px" class="d-flex flex-column ga-5">
                <v-btn
                  v-if="props.isDar"
                  color="secondary"
                  @click="dialogs.swa.create = true"
                  prepend-icon="mdi-folder-plus"
                  >Create SWA Entry</v-btn
                >
                <v-btn
                  v-if="
                    authentication.access_rights.can_manage_social_worker &&
                    !props.isDar
                  "
                  prepend-icon="mdi-filter"
                  color="primary"
                  class="mb-6"
                  @click="toggleSocialWorkerDialog(true)"
                >
                  Generate Social Worker SWA
                </v-btn>
                <v-text-field
                  prepend-inner-icon="mdi-magnify"
                  label="Search Patient"
                  single-line
                  hide-details
                  variant="outlined"
                  density="compact"
                  v-model="swaSearch"
                ></v-text-field>
              </div>

              <div
                v-if="props.isDar"
                class="d-flex align-center ga-2 justify-center"
              >
                <v-text-field
                  label="Filter By Date"
                  type="date"
                  variant="outlined"
                  density="compact"
                  v-model="dateInputs.swa"
                ></v-text-field>
              </div>
              <div v-else>
                <div class="d-flex align-center ga-1">
                  <v-select
                    label="Filter By Month"
                    style="width: 200px"
                    variant="outlined"
                    density="compact"
                    :items="monthsOfYear"
                    v-model="dateInputs.swa_month"
                  ></v-select>
                </div>
              </div>
            </div>
            <v-data-table
              :search="swaSearch"
              :headers="dataTable.swa.headers"
              :items-per-page="5"
              style="border: 1px solid #e0e0e0"
              :items="swaItemsWithNumbers"
            >
              <template v-slot:[`item.operation`]="{ item }">
                <div class="d-flex ga-5">
                  <v-icon
                    color="primary"
                    @click="editSocialWorkAdministration(item.id)"
                    >mdi-pencil</v-icon
                  >
                  <v-icon color="warning" @click="viewSwaActivityLogs(item.id)"
                    >mdi-note-text</v-icon
                  >
                  <v-icon
                    v-if="item.creator_id === authentication.user.id"
                    color="error"
                    >mdi-delete</v-icon
                  >
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
    <v-dialog v-model="dialogs.dar.create" width="650px" persistent>
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
    <!-- view dar activities -->
    <v-dialog
      v-model="dialogs.dar.activity"
      width="50%"
      transition="dialog-transition"
    >
      <DarActivityLogs
        :dar_id="dar_id"
        @closeDialog="dialogs.dar.activity = false"
      />
      " />
    </v-dialog>
    <!-- delete dar dialog -->
    <v-dialog v-model="dialogs.dar.delete" width="600px">
      <dynamicDialog
        :dialogData="dialogData"
        @closeDialog="() => (dialogs.dar.delete = false)"
        @handleAction="updateDarStatusItem"
      />
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
    <!-- view swa activities -->
    <v-dialog
      v-model="dialogs.swa.activity"
      width="50%"
      transition="dialog-transition"
    >
      <SwaActivityLogs
        :swa_id="swa_id"
        @closeDialog="dialogs.swa.activity = false"
      />
    </v-dialog>
    <!-- view social worker dialog -->
    <v-dialog persistent v-model="dialogs.socialWorker.view" width="1300px">
      <ViewSocialWorker
        :isDar="isDar"
        @closeDialog="dialogs.socialWorker.view = false"
        @generateData="getSocialWorkerDarItemsByMonth"
      />
    </v-dialog>
  </div>
  <snack-bars :snackBarData="snackBarData" />
</template>
<script setup>
import {
  getDailyActivityReport,
  getDarSwa,
  getDarSwaByDate,
  getDailyActivityReportByDate,
  updateDarStatus,
} from "@/api/daily-activity-report";
import {
  getMonthlyDarEntries,
  getMonthlySwaEntries,
} from "@/api/statistical-report";
import { getUsersBySystemId } from "@/api/authentication";
import moment from "moment";
import dynamicDialog from "@/components/dialogs/dialogs.vue";
import { ref, onMounted, computed, watch } from "vue";
import { snackBarData, dialogData, monthsOfYear } from "@/utils/constants";
import { userAuthentication } from "@/stores/session";
// components
import snackBars from "@/components/dialogs/snackBars.vue";
// DAR Components
import CreateDARDialog from "@/components/daily-activity-report/CreateDARDialog.vue";
import EditDARDialog from "@/components/daily-activity-report/EditDARDialog.vue";
import ViewDARDialog from "@/components/daily-activity-report/ViewDARDialog.vue";
import DarActivityLogs from "@/components/daily-activity-report/DarActivityLogs.vue";
// SWA Components
import CreateSWADialog from "@/components/daily-activity-report/CreateSWADialog.vue";
import EditSWADialog from "@/components/daily-activity-report/EditSWADialog.vue";
import ViewSWADialog from "@/components/daily-activity-report/ViewSWADialog.vue";
import SwaActivityLogs from "@/components/daily-activity-report/SwaActivityLogs.vue";
// Social Worker Components
import ViewSocialWorker from "@/components/dashboard/ViewSocialWorker.vue";
const props = defineProps({
  isDar: Boolean,
});
const patients = ref([]);
const swaItems = ref([]);
const tabValue = ref(1);
const dar_id = ref(0);
const swa_id = ref(0);
const darSearch = ref("");
const swaSearch = ref("");
const isDar = ref(true);
const authentication = userAuthentication();
const userFullName = `${authentication.user.fname} ${authentication.user.lname}`;
// objects
const dateInputs = ref({
  dar: moment().format("YYYY-MM-DD"),
  swa: moment().format("YYYY-MM-DD"),
  // make a current date that makes the month name visible using moment
  current_date: moment().format("MMMM Do YYYY"),
  dar_month: moment().format("MMMM"),
  swa_month: moment().format("MMMM"),
});
const dataTable = {
  headers: [
    { title: "Number", value: "Number" },
    { title: "Date Created", value: "date_created" },
    { title: "Patient Name", value: "fullname" },
    { title: "Social Worker", value: "created_by" },
    { title: "Operation", value: "operation" },
  ],
  swa: {
    headers: [
      { title: "Number", value: "Number" },
      { title: "Date Created", value: "date_created" },
      { title: "Social Worker", value: "creator_name" },
      { title: "Operation", value: "operation" },
    ],
  },
};
const dialogs = ref({
  dar: {
    create: false,
    edit: false,
    view: false,
    activity: false,
    delete: false,
  },
  swa: {
    create: false,
    edit: false,
    view: false,
    activity: false,
    delete: false,
  },
  socialWorker: {
    view: false,
  },
});
const watchedDates = computed(() => {
  return {
    dar: dateInputs.value.dar,
    swa: dateInputs.value.swa,
    dar_month: dateInputs.value.dar_month,
    swa_month: dateInputs.value.swa_month,
  };
});
watch(
  () => watchedDates.value,
  async (newValues, oldValues) => {
    if (newValues.dar !== oldValues.dar) {
      await getDarItemByDate();
    }
    if (newValues.swa !== oldValues.swa) {
      await getDarSwaItemByDate();
    }
    if (newValues.dar_month !== oldValues.dar_month) {
      await getDarItemsByMonth();
    }
    if (newValues.swa_month !== oldValues.swa_month) {
      await getSwaItemsByMonth();
    }
  }
);

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
const getDarItemByDate = async () => {
  const response = await getDailyActivityReportByDate(dateInputs.value.dar);
  handleSnackBar(`Successfully  fetched ${response.length} Items`, "primary");
  if (response.length > 0) {
    patients.value = response;
    return;
  }
  patients.value = [];
};
const getDarItemsByMonth = async () => {
  const response = await getMonthlyDarEntries(dateInputs.value);
  handleSnackBar(`Successfully  fetched ${response.length} Items`, "primary");
  if (response) {
    patients.value = response;
  }
};
const getSwaItemsByMonth = async () => {
  const response = await getMonthlySwaEntries(dateInputs.value);
  handleSnackBar(`Successfully  fetched ${response.length} Items`, "primary");
  if (response) {
    swaItems.value = response;
  }
};
const getSocialWorkerDarItemsByMonth = async (data, isDar) => {
  // make a two seconds interval to fetch the data
  if (isDar) {
    setTimeout(() => {
      patients.value = data;
    }, 500);
    return;
  }
  setTimeout(() => {
    swaItems.value = data;
  }, 500);
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

// activity logs

const viewDarActivityLogs = (id) => {
  dar_id.value = id;
  dialogs.value.dar.activity = true;
};
const viewSwaActivityLogs = (id) => {
  swa_id.value = id;
  dialogs.value.swa.activity = true;
};

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

const updateDarStatusItemDialog = async (id) => {
  dialogs.value.dar.delete = true;
  dialogData.value.text = "Are you sure you want to delete this item?";
  dialogData.value.type = "warning";
  dialogData.value.buttonText = "Delete";
  dialogData.value.buttonColor = "error";
  dialogData.value.itemId = id;
};
const updateDarStatusItem = async (dar_id) => {
  const response = await updateDarStatus(dar_id);
  if (response) {
    dialogs.value.dar.delete = false;
    handleSnackBar("Successfully deleted item", "success");
    patients.value = patients.value.filter((item) => item.id !== dar_id);
  }
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

const toggleSocialWorkerDialog = (isSwa) => {
  if (isSwa) {
    isDar.value = false;
    dialogs.value.socialWorker.view = true;
    return;
  }
  isDar.value = true;
  dialogs.value.socialWorker.view = true;
};
onMounted(async () => {
  await getDarItems();
  await getSwaItems();
  if (!props.isDar) {
    await getSwaItemsByMonth();
    await getDarItemsByMonth();
  }
});
// view social worker
</script>
<style lang="css">
.rb {
  width: 100%;
}
</style>
