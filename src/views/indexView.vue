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
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="userInputs.month"
                :items="inputFields.month.items"
                :label="inputFields.month.label"
                variant="outlined"
                density="comfortable"
                style="width: 500px"
                class="my-1"
              ></v-select>
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
                  <h2>{{ item.title }}</h2>
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
</template>
<script setup>
import moment from "moment";
import { userAuthentication } from "@/stores/session";
import { ref } from "vue";
import { handleSnackBar } from "@/utils/constants";
// components
import snackBars from "@/components/dialogs/snackBars.vue";
import SocialWorkerDashboardVue from "@/components/dashboard/SocialWorkerDashboard.vue";
const authentication = userAuthentication();
const userFullName = `${authentication.user.fname} ${authentication.user.lname}`;
const currentDate = moment().format("MMMM Do YYYY");
const currentMonth = moment().format("MMMM");
const snackBarData = ref({});
const userInputs = ref({
  month: currentMonth,
});
const cards = ref({
  monthlyDarCount: {
    title: "Monthly DAR Count",
    icon: "mdi-notebook-check",
    toolBarColor: "green-lighten-1",
    count: 0,
  },
  monthlySwaCount: {
    title: "Monthly SWA Count",
    icon: "mdi-notebook-check-outline",
    toolBarColor: "orange-lighten-1",
    count: 0,
  },
  monthlyAssesedPatientsCount: {
    title: "Monthly Assesed Patients Count",
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
</script>
<style lang=""></style>
