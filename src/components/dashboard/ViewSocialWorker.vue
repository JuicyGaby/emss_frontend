<template lang="">
  <div>
    <v-card>
      <v-toolbar color="secondary" class="px-5">
        <v-icon size="x-large"> mdi-account-group </v-icon>
        <h1>View Social Worker Monthly Data</h1>
        <v-spacer></v-spacer>
        <v-icon @click="$emit('closeDialog')">mdi-close</v-icon>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-form ref="form">
            <v-row>
              <v-col cols="12" class="d-flex flex-wrap ga-2">
                <v-autocomplete
                  v-model="userInputs.creator_id"
                  :items="inputFields.social_worker.items"
                  item-title="name"
                  item-value="employee_id"
                  :label="inputFields.social_worker.label"
                  variant="outlined"
                  :rules="[inputRules.required]"
                  density="comfortable"
                  style="width: 200px"
                ></v-autocomplete>
                <v-autocomplete
                  v-model="userInputs.month"
                  :items="inputFields.month.items"
                  :label="inputFields.month.label"
                  variant="outlined"
                  density="comfortable"
                  style="width: 200px"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" class="d-flex align-center justify-center">
                <v-card
                  v-for="(item, index) in userStatistics"
                  class="mx-10"
                  :key="index"
                  height="auto"
                  width="auto"
                >
                  <v-toolbar
                    class="pa-0 mx-0"
                    density="compact"
                    :color="item.color"
                  >
                    
                    <v-toolbar-title class="mx-0 px-5">{{
                      item.label
                    }}</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text class="d-flex justify-center align-center">
                    <h1 class="text-h3">{{ item.value }}</h1>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" class="px-0 d-flex justify-end">
                <v-card-actions>
                  <v-btn
                    prepend-icon="mdi-calendar"
                    variant="flat"
                    color="secondary"
                    @click="
                      props.isDar
                        ? getSocialWorkerMonthlyDarItems()
                        : getSocialWorkerMonthlySwaItems()
                    "
                  >
                    {{
                      props.isDar
                        ? "Generate Social Worker DAR"
                        : "Generate Social Worker SWA"
                    }}
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <!-- {{ userInputs }} -->
      </v-card-text>
    </v-card>
    <snackBars :snackBarData="snackBarData" />
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import snackBars from "../dialogs/snackBars.vue";
import {
  getSocialWorkerMonthlyDarEntries,
  getSocialWorkerMonthlySwaEntries,
} from "@/api/statistical-report";
import { handleSnackBar, inputRules, validateForm } from "@/utils/constants";
import { monthsOfYear } from "@/utils/constants";
import moment from "moment";
import { getUsersBySystemId } from "@/api/authentication";

const props = defineProps({
  isDar: Boolean,
});
const emit = defineEmits(["closeDialog", "generateData"]);
const form = ref(null);
const snackBarData = ref({});
const socialWorkerMonthlyDarItems = ref([]);
const socialWorkerMonthlySwaItems = ref([]);

const userInputs = ref({
  creator_id: null,
  month: moment().format("MMMM"),
});
const inputFields = reactive({
  social_worker: {
    label: "Select Social Worker",
    items: [],
  },
  month: {
    label: "Select Month",
    items: monthsOfYear,
  },
});
const userStatistics = ref({
  dar: {
    label: "Daily Activity Report Entries Count",
    color: "green",
    icon: "mdi-notebook-check",
    value: 0,
  },
  swa: {
    label: "Social Worker Activity Entries Count",
    color: "orange",
    icon: "mdi-notebook-check-outline",
    value: 0,
  },
  assessedPatient: {
    label: "Assessed Patient Count",
    color: "blue",
    icon: "mdi-account-multiple",
    value: 0,
  },
});

// async functions
const getSocialWorkerMonthlyDarItems = async () => {
  const isValid = await validateForm(form);
  if (!isValid) return;
  const response = await getSocialWorkerMonthlyDarEntries(userInputs.value);
  if (response) {
    socialWorkerMonthlyDarItems.value = response;
    snackBarData.value = handleSnackBar(
      "primary",
      `fetched ${response.length} items`
    );

    emit("generateData", socialWorkerMonthlyDarItems.value, true);
  }
};
const getSocialWorkerMonthlySwaItems = async () => {
  const isValid = await validateForm(form);
  if (!isValid) return;
  const response = await getSocialWorkerMonthlySwaEntries(userInputs.value);
  if (response) {
    socialWorkerMonthlySwaItems.value = response;
    snackBarData.value = handleSnackBar(
      "primary",
      `fetched ${response.length} items`
    );

    emit("generateData", socialWorkerMonthlySwaItems.value, false);
  }
};
const getSocialWorkers = async () => {
  const response = await getUsersBySystemId();
  if (response) {
    console.log("response", response);
    inputFields.social_worker.items = response;
  }
};

onMounted(async () => {
  await getSocialWorkers();
  console.log("swa?", props.isDar);
});
</script>
<style lang=""></style>
