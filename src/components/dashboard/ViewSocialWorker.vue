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
          <v-row>
            <v-col cols="12" class="d-flex flex-wrap ga-2">
              <v-autocomplete
                v-model="userInputs.creator_id"
                :items="inputFields.social_worker.items"
                item-title="name"
                item-value="employee_id"
                :label="inputFields.social_worker.label"
                variant="outlined"
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
            <v-col cols="12" class="px-0 d-flex justify-end">
              <v-card-actions>
                <v-btn
                  prepend-icon="mdi-calendar"
                  variant="flat"
                  color="secondary"
                  @click="getSocialWorkerMonthlyDarItems"
                  >Generate Social Worker Report
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
        {{ userInputs }}
      </v-card-text>
    </v-card>
    <snackBars :snackBarData="snackBarData" />
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import snackBars from "../dialogs/snackBars.vue";
import { getSocialWorkerMonthlyDarEntries } from "@/api/statistical-report";
import { handleSnackBar } from "@/utils/constants";
import { monthsOfYear } from "@/utils/constants";
import moment from "moment";
import { getUsersBySystemId } from "@/api/authentication";

const emit = defineEmits(["closeDialog", "generateData"]);

const snackBarData = ref({});
const socialWorkerMonthlyDarItems = ref([]);

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

// async functions
const getSocialWorkerMonthlyDarItems = async () => {
  const response = await getSocialWorkerMonthlyDarEntries(userInputs.value);
  if (response) {
    socialWorkerMonthlyDarItems.value = response;
    snackBarData.value = handleSnackBar(
      "primary",
      `fetched ${response.length} items`
    );

    emit("generateData", socialWorkerMonthlyDarItems.value);
  }
};
const getSocialWorkers = async () => {
  const response = await getUsersBySystemId();
  if (response) {
    inputFields.social_worker.items = response;
  }
};

onMounted(async () => {
  await getSocialWorkers();
});
</script>
<style lang=""></style>
