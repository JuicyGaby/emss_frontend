<template lang="">
  <div class="" style="width: 100%">
    <v-card width="100%" height="100vh">
      <v-toolbar color="secondary" class="d-flex align-center ga-5 px-5">
        <v-icon size="x-large">mdi-book-edit</v-icon>
        <h1>Electronic Malasakit Social Service System</h1>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <h1 class="text-h4">
                {{ currentDate }} - {{ moment().format("dddd") }}
              </h1>
            </v-col>
          </v-row>
          <v-row class="">
            <v-col cols="12" class="d-flex justify-end">
              <div class="d-flex justify-center ga-2">
                <v-select
                  v-model="userInputs.month"
                  :items="inputFields.month.items"
                  :label="inputFields.month.label"
                  variant="outlined"
                  density="comfortable"
                  style="width: 200px"
                  class="mb-2"
                ></v-select>
                <v-btn
                  prepend-icon="mdi-calendar"
                  color="grey"
                  size="large"
                  @click="generateMonthlyReportData"
                  >Select Month</v-btn
                >
              </div>
            </v-col>
            <v-col cols="4" v-for="(item, index) in userCards" :key="index">
              <v-card height="auto">
                <v-toolbar rounded :color="item.toolBarColor" class="px-5">
                  <v-icon size="x-large" class="mr-4">{{ item.icon }}</v-icon>
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
                  <h2>{{ userInputs.month }}'s {{ item.title }}</h2>
                </v-toolbar>
                <v-card-text class="d-flex justify-center align-center">
                  <h1 class="text-h3">
                    {{ item.count }}
                  </h1>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
  <snackBars :snackBarData="snackBarData" />
</template>
<script setup>
import moment from "moment";
import { userAuthentication } from "@/stores/session";
import { ref, onMounted } from "vue";
import { handleSnackBar } from "@/utils/constants";
// components
import snackBars from "@/components/dialogs/snackBars.vue";
import SocialWorkerDashboardVue from "@/components/dashboard/SocialWorkerDashboard.vue";
import { generateMonthlyReport } from "../api/statistical-report";
const authentication = userAuthentication();
const accessRights = authentication.access_rights;
const userFullName = `${authentication.user.fname} ${authentication.user.lname}`;
const currentDate = moment().format("MMMM Do YYYY");
const currentMonth = moment().format("MMMM");
const snackBarData = ref({});
const monthlyReportData = ref({});
const userInputs = ref({
  creator_id: authentication.user.id,
  month: currentMonth,
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
    items: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
});

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
onMounted(async () => {
  await generateCurrentMonthReportData(userInputs.value);
});
</script>
<style lang=""></style>
