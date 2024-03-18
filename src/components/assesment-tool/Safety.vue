<template lang="">
  <div>
    <v-container style="width: 1000px">
      <h1>Safety</h1>
      <v-divider class="mb-5"></v-divider>
      <v-table>
        <thead>
          <tr>
            <th
              v-for="(header, index) in tableheaders"
              :key="index"
              class="text-left"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(field, key) in particulars" :key="key">
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
                v-model="safetyData[key].severity"
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
                v-model="safetyData[key].duration"
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
                v-model="safetyData[key].coping"
              ></v-select>
            </th>
          </tr>
        </tbody>
      </v-table>
      <v-btn color="secondary" @click="handleButtonAction">{{
        safetyData.isExist ? "Update" : "Create"
      }}</v-btn>
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
    <!-- {{ safetyData }} -->
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getSafety, createSafety, updateSafety } from "@/api/assesment-tool";
const props = defineProps({
  patientId: Number,
});

onMounted(async () => {
  await fetchSafetyData();
});

const safetyData = ref({
  isExist: false,
  patient_id: props.patientId,
  voice_crime_in_community: {
    severity: "",
    duration: "",
    coping: "",
  },
  unsafe_working_conditions: {
    severity: "",
    duration: "",
    coping: "",
  },
  unsafe_codition_home: {
    severity: "",
    duration: "",
    coping: "",
  },
  absence_of_adequate_safety_services: {
    severity: "",
    duration: "",
    coping: "",
  },
  natural_disasters: {
    severity: "",
    duration: "",
    coping: "",
  },
  human_created_disasters: {
    severity: "",
    duration: "",
    coping: "",
  },
});
const snackBars = ref({
  update: {
    isActive: false,
    text: "Safety Data Updated",
  },
  create: {
    isActive: false,
    text: "Safety Data Created",
  },
});
const tableheaders = [
  "Particulars",
  "Severity Index",
  "Duration Index",
  "Coping Index",
];
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
const particulars = {
  voice_crime_in_community: {
    label: "Voice Crime in Community",
  },
  unsafe_working_conditions: {
    label: "Unsafe Working Conditions",
  },
  unsafe_codition_home: {
    label: "Unsafe Condition at Home",
  },

  absence_of_adequate_safety_services: {
    label: "Absence of Adequate Safety Services",
  },
  natural_disasters: {
    label: "Natural Disasters",
  },
  human_created_disasters: {
    label: "Human Created Disasters",
  },
};

const createSafetyItem = async () => {
  const response = await createSafety(safetyData.value);
  if (response) {
    safetyData.value.isExist = true;
    handleSnackBar("create");
  }
};
const updateSafetyItem = async () => {
  console.log("update safety item");
  const response = await updateSafety(safetyData.value);
  if (response) {
    handleSnackBar("update");
  }
};
const fetchSafetyData = async () => {
  const response = await getSafety(props.patientId);
  if (response) {
    console.log("response", response);
    handlePatientData(response);
  }
};

const handleSnackBar = (type) => {
  snackBars.value[type].isActive = true;
};
const handlePatientData = (response) => {
  safetyData.value = response;
  safetyData.value.isExist = true;
};
const handleButtonAction = async () => {
  if (safetyData.value.isExist) {
    await updateSafetyItem();
    return;
  }
  await createSafetyItem();
};
</script>
<style lang="css"></style>
