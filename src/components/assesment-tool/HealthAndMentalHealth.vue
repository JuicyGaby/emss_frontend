<template lang="">
  <div>
    <v-container style="width: 1300px">
      <h1>Health and Mental Health</h1>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col>
          <v-table>
            <thead>
              <tr>
                <th>Particulars</th>
                <th>Severity Index</th>
                <th>Duration Index</th>
                <th>Coping Index</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(field, key) in inputFields" :key="key">
                <th>{{ field.label }}</th>
                <th>
                  <v-select
                    outlined
                    density="compact"
                    variant="outlined"
                    :items="indexItems.severity"
                    item-title="text"
                    item-value="value"
                    style="width: 200px"
                    v-model="healthAndMentalHealth[key].severity"
                  ></v-select>
                </th>
                <th>
                  <v-select
                    outlined
                    density="compact"
                    variant="outlined"
                    :items="indexItems.duration"
                    item-title="text"
                    item-value="value"
                    style="width: 200px"
                    v-model="healthAndMentalHealth[key].duration"
                  ></v-select>
                </th>
                <th>
                  <v-select
                    outlined
                    density="compact"
                    variant="outlined"
                    :items="indexItems.coping"
                    item-title="text"
                    item-value="value"
                    style="width: 200px"
                    v-model="healthAndMentalHealth[key].coping"
                  ></v-select>
                </th>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
      <v-btn
        :prepend-icon="
          healthAndMentalHealth.isExist ? 'mdi-update' : 'mdi-pencil'
        "
        color="secondary"
        @click="
          healthAndMentalHealth.isExist
            ? updateHealthAndMentalHealthItem()
            : createHealthAndMentalHealthItem()
        "
        >{{
          healthAndMentalHealth.isExist
            ? "Update Health and  Mental Health"
            : "Create Health and Mental Health"
        }}</v-btn
      >
      {{ healthAndMentalHealth }}
    </v-container>
    <v-snackbar
      v-for="(bar, key) in snackBars"
      :key="key"
      color="green"
      location="top"
      :timeout="2500"
      min-width="250px"
      v-model="bar.isActive"
    >
      <div class="d-flex justify-center align-center ga-2">
        <v-icon icon="mdi-check-bold"></v-icon>
        <p class="text-subtitle-1">{{ bar.text }}</p>
      </div>
    </v-snackbar>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { userAuthentication } from "@/stores/session";
import {
  getHealthAndMentalHealth,
  createHealthAndMentalHealth,
  updateHealthAndMentalHealth,
} from "@/api/assesment-tool";
import { SubTitle } from "chart.js";
const props = defineProps({
  patientId: Number,
});
const authentication = userAuthentication();

const healthAndMentalHealth = ref({
  isExist: false,
  patient_id: props.patientId,
  social_worker: `${authentication.user.fname} ${authentication.user.lname}`,
  abscence_of_adequate_health_services: {
    severity: "",
    duration: "",
    coping: "",
  },
  abscence_of_support_health_services: {
    severity: "",
    duration: "",
    coping: "",
  },
  absence_of_adequate_mental_services: {
    severity: "",
    duration: "",
    coping: "",
  },
  absence_of_support_mental_services: {
    severity: "",
    duration: "",
    coping: "",
  },
  inaccessibility_of_health_services: {
    severity: "",
    duration: "",
    coping: "",
  },
  inaccessibility_of_mental_services: {
    severity: "",
    duration: "",
    coping: "",
  },
});
const snackBars = ref({
  update: {
    isActive: false,
    text: "Health and Mental Health Updated",
  },
  create: {
    isActive: false,
    text: "Health and Mental Health Created",
  },
});
const indexItems = {
  severity: [
    { text: "No Problem", value: 1 },
    { text: "Low", value: 2 },
    { text: "Moderate", value: 3 },
    { text: "High", value: 4 },
    { text: "Very High", value: 5 },
    { text: "Catastropic", value: 4 },
  ],
  duration: [
    { text: "More than 5 years", value: 1 },
    { text: "1 to 5 years", value: 2 },
    { text: "6 months to 1 year", value: 3 },
    { text: "1 to 6 months", value: 4 },
    { text: "2 weeks to 1 month", value: 5 },
    { text: "less than 2 weeks", value: 6 },
  ],
  coping: [
    { text: "Outstanding", value: 1 },
    { text: "Above Average", value: 2 },
    { text: "Adequate", value: 3 },
    { text: "Somewhat Inadequate", value: 4 },
    { text: "Inadequate", value: 5 },
    { text: "No Coping Skills", value: 6 },
  ],
};
const inputFields = {
  abscence_of_adequate_health_services: {
    label: "Abscence of Adequate Health Services",
    severity: "",
    duration: "",
    coping: "",
  },
  abscence_of_support_health_services: {
    label: "Abscence of Support Health Services",
  },
  absence_of_adequate_mental_services: {
    label: "Abscence of Adequate Mental Services",
  },
  absence_of_support_mental_services: {
    label: "Abscence of Support Mental Services",
  },
  inaccessibility_of_health_services: {
    label: "Inaccessibility of Health Services",
  },
  inaccessibility_of_mental_services: {
    label: "Inaccessibility of Mental Services",
  },
};

const createHealthAndMentalHealthItem = async () => {
  console.log("asdfsad");
  console.log("createHealthAndMentalHealthItem");
  const response = await createHealthAndMentalHealth(
    healthAndMentalHealth.value
  );
  if (response) {
    healthAndMentalHealth.value.isExist = true;
    handleSnackBar("create");
  }
};
const updateHealthAndMentalHealthItem = async () => {
  console.log("updateHealthAndMentalHealthItem");
  const response = await updateHealthAndMentalHealth(
    healthAndMentalHealth.value
  );
  if (response) {
    handleSnackBar("update");
  }
};
const fetchHealthAndMentalHealth = async () => {
  const response = await getHealthAndMentalHealth(props.patientId);
  if (response) {
    healthAndMentalHealth.value = response;
    healthAndMentalHealth.value.isExist = true;
    healthAndMentalHealth.value.social_worker = `${authentication.user.fname} ${authentication.user.lname}`;
  }
};
const handleSnackBar = (type) => {
  snackBars.value[type].isActive = true;
};

onMounted(async () => {
  await fetchHealthAndMentalHealth();
});
</script>
<style lang=""></style>
