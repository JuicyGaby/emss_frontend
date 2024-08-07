<template lang="">
  <div class="" style="width: 100%">
    <v-card width="100%" height="" elevation="0">
      <v-toolbar color="secondary" class="d-flex align-center ga-5 px-5">
        <v-icon size="x-large">mdi-medical-bag</v-icon>
        <h1>Electronic Medical Social Service System</h1>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row :no-gutters="true">
            <v-col cols="12">
              <h1 class="text-h4">
                {{ currentDate }} - {{ moment().format("dddd") }}
              </h1>
            </v-col>
          </v-row>
          <v-row class="">
            <v-col cols="6">
              <v-btn
                color="secondary"
                @click="dialogs.statisticalReportMonth = true"
                >Generate Statistical Report</v-btn
              >
            </v-col>
            <v-col cols="6" class="d-flex justify-end">
              <div class="d-flex justify-center ga-2">
                <v-select
                  v-model="userInputs.month"
                  :items="inputFields.month.items"
                  :label="inputFields.month.label"
                  variant="outlined"
                  density="compact"
                  style="width: 200px"
                  class="mb-2"
                ></v-select>
              </div>
            </v-col>
            <v-col cols="4" v-for="(item, index) in userCards" :key="index">
              <v-card height="auto">
                <v-toolbar rounded :color="item.toolBarColor" class="px-5">
                  <v-icon size="x-large" class="mr-2">{{ item.icon }}</v-icon>
                  <h2>{{ item.label }}</h2>
                </v-toolbar>
                <v-card-text class="d-flex justify-center align-center">
                  <h1 class="text-h3">
                    {{ item.count }}
                  </h1>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" v-for="(item, index) in cards" :key="index">
              <v-card height="auto">
                <v-toolbar rounded :color="item.toolBarColor" class="px-5">
                  <v-icon size="x-large" class="mr-4">{{ item.icon }}</v-icon>
                  <h2>Month of {{ userInputs.month }} {{ item.title }}</h2>
                </v-toolbar>
                <v-card-text class="d-flex justify-center align-center">
                  <h1 class="text-h3">
                    {{ item.count }}
                  </h1>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <DarTable :isDar="false" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
  <!-- statistical report dialog -->
  <v-dialog
    v-model="dialogs.statisticalReportActive"
    scrollable
    fullscreen
    persistent
    transition="dialog-transition"
  >
    <StatisticalReport
      :statisticalReportMonth="userInputs.statisticalReportMonth"
      @closeDialog="toggleDialog"
    ></StatisticalReport>
  </v-dialog>
  <v-dialog v-model="dialogs.statisticalReportMonth" width="500">
    <v-card>
      <v-toolbar color="primary">
        <v-toolbar-title>
          <v-icon> mdi-calendar-month </v-icon>Generate Monthly Statistical
          Report</v-toolbar-title
        >
        <v-icon class="mr-5" @click="dialogs.statisticalReportMonth = false"
          >mdi-close</v-icon
        >
      </v-toolbar>
      <v-card-text>
        <v-select
          v-model="userInputs.statisticalReportMonth"
          label="Selected Month"
          variant="outlined"
          :items="inputFields.month.items"
        ></v-select>
      </v-card-text>
      <v-card-actions class="pa-0 ma-5 justify-end">
        <v-btn
          variant="flat"
          @click="toggleStatisticalReportDialog"
          color="secondary"
          >Select Month</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <snackBars :snackBarData="snackBarData" />
</template>

<script setup>
import moment from "moment";
import { userAuthentication } from "@/stores/session";
import { ref, onMounted, watch } from "vue";
import { handleSnackBar, monthsOfYear } from "@/utils/constants";
// components
import snackBars from "@/components/dialogs/snackBars.vue";
import DarTable from "@/components/daily-activity-report/DarTable.vue";
import StatisticalReport from "@/components/dashboard/StatisticalReport.vue";
import { generateMonthlyReport } from "../api/statistical-report";
const authentication = userAuthentication();
const userFullName = `${authentication.user.fname} ${authentication.user.lname}`;
const currentDate = moment().format("MMMM Do YYYY");
const currentMonth = moment().format("MMMM");
const snackBarData = ref({});
const monthlyReportData = ref({});
const userInputs = ref({
  creator_id: authentication.user.id,
  month: currentMonth,
  statisticalReportMonth: currentMonth,
});

// triggers when dashboard month changes
watch(
  () => userInputs.value.month,
  async () => {
    await generateMonthlyReportData();
  }
);
const dialogs = ref({
  statisticalReportActive: false,
  statisticalReportMonth: false,
});
const cards = ref({
  monthlyDarCount: {
    title: `DAR Count`,
    icon: "mdi-notebook-check",
    toolBarColor: "green-lighten-1",
    count: 0,
  },
  monthlySwaCount: {
    title: `SWA Count`,
    icon: "mdi-notebook-check-outline",
    toolBarColor: "orange-lighten-1",
    count: 0,
  },
  monthlyAssesedPatientsCount: {
    title: `Assesed Patients Count`,
    icon: "mdi-account-multiple",
    toolBarColor: "blue-lighten-1",
    count: 0,
  },
});
const userCards = ref({
  dar: {
    label: "My DAR Created Count",
    icon: "mdi-notebook-check",
    toolBarColor: "success",
    count: 0,
  },
  swa: {
    label: "My SWA Created Count",
    icon: "mdi-notebook-check-outline",
    toolBarColor: "warning",

    count: 0,
  },
  assesedPatients: {
    label: "My Assesed Patients Count",
    icon: "mdi-account-multiple",
    toolBarColor: "primary",
    count: 0,
  },
});
const inputFields = ref({
  month: {
    label: "Selected Month",
    items: monthsOfYear,
  },
});

const toggleDialog = (type) => {
  dialogs.value[type] = false;
};

const generateMonthlyReportData = async () => {
  const response = await generateMonthlyReport(userInputs.value);
  if (response) {
    monthlyReportData.value = response;
    cards.value.monthlyDarCount.count = response.month.darCount;
    cards.value.monthlySwaCount.count = response.month.swaCount;
    cards.value.monthlyAssesedPatientsCount.count =
      response.month.patientAssessedCount;

    userCards.value.dar.count = response.social_worker.darCount;
    userCards.value.swa.count = response.social_worker.swaCount;
    userCards.value.assesedPatients.count =
      response.social_worker.patientAssessedCount;
    snackBarData.value = handleSnackBar(
      "success",
      `Month of ${userInputs.value.month} Report Generated`
    );
  }
};
const generateCurrentMonthReportData = async () => {
  const response = await generateMonthlyReport(userInputs.value);
  if (response) {
    monthlyReportData.value = response;
    cards.value.monthlyDarCount.count = response.month.darCount;
    cards.value.monthlySwaCount.count = response.month.swaCount;
    cards.value.monthlyAssesedPatientsCount.count =
      response.month.patientAssessedCount;

    userCards.value.dar.count = response.social_worker.darCount;
    userCards.value.swa.count = response.social_worker.swaCount;
    userCards.value.assesedPatients.count =
      response.social_worker.patientAssessedCount;
  }
};
const toggleStatisticalReportDialog = () => {
  dialogs.value.statisticalReportActive = true;
  dialogs.value.statisticalReportMonth = false;
};
onMounted(async () => {
  await generateCurrentMonthReportData(userInputs.value);
});
</script>
<style lang=""></style>
