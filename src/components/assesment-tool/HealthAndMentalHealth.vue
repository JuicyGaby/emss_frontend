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
                    label="----"
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
                    label="----"
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
                    label="----"
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
      <v-btn color="secondary">{{
        healthAndMentalHealth.isExist ? "Update Data" : "Create Data"
      }}</v-btn>
      <!-- {{ healthAndMentalHealth }} -->
    </v-container>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import {
  getHealthAndMentalHealth,
  createHealthAndMentalHealth,
  updateHealthAndMentalHealth,
} from "@/api/assesment-tool";
const props = defineProps({
  patientId: Number,
});

const healthAndMentalHealth = ref({
  isExist: false,
  patient_id: props.patientId,
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
  console.log("createHealthAndMentalHealthItem");
};
const updateHealthAndMentalHealthItem = async () => {
  console.log("updateHealthAndMentalHealthItem");
};

const handleButtonAction = async () => {
  if (healthAndMentalHealth.value.isExist) {
    await updateHealthAndMentalHealthItem();
  } else {
    await createHealthAndMentalHealthItem();
  }
};
</script>
<style lang=""></style>
