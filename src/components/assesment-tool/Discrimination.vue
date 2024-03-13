<template lang="">
  <div>
    <v-container style="width: 1000px">
      <h1>Discrimination</h1>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col>
          <v-table density="compact">
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
                    v-model="discrimination[key].severity"
                    item-title="text"
                    item-value="value"
                    style="width: 200px"
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
                    v-model="discrimination[key].duration"
                    style="width: 200px"
                  ></v-select>
                </th>
                <th>
                  <v-select
                    outlined
                    density="compact"
                    variant="outlined"
                    :items="indexItems.coping"
                    item-title="text"
                    v-model="discrimination[key].coping"
                    item-value="value"
                    style="width: 200px"
                  ></v-select>
                </th>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
      <v-btn color="secondary" @click="handleButtonAction">{{
        discrimination.isExist ? "Update Data" : "Create Data"
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
  </div>
  {{ discrimination }}
</template>
<script setup>
import { ref, onMounted } from "vue";
import {
  getDiscrimination,
  createDiscrimination,
  updateDiscrimination,
} from "@/api/assesment-tool";
const props = defineProps({
  patientId: Number,
});
onMounted(async () => {
  await fetchDiscrimination();
});

const isDataLoaded = ref(false);

const discrimination = ref({
  isExist: false,
  patient_id: props.patientId,
  Age: {
    severity: "",
    duration: "",
    coping: "",
  },
  Ethnicity: {
    severity: "",
    duration: "",
    coping: "",
  },
  Religion: {
    severity: "",
    duration: "",
    coping: "",
  },
  Sex: {
    severity: "",
    duration: "",
    coping: "",
  },
  Sexual_Orientation: {
    severity: "",
    duration: "",
    coping: "",
  },
  Lifestyle: {
    severity: "",
    duration: "",
    coping: "",
  },
  NonCitizen: {
    severity: "",
    duration: "",
    coping: "",
  },
  Veteran_Status: {
    severity: "",
    duration: "",
    coping: "",
  },
  Dependency_Status: {
    severity: "",
    duration: "",
    coping: "",
  },
  Disability_Status: {
    severity: "",
    duration: "",
    coping: "",
  },
  Marital_Status: {
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
  Age: {
    label: "Age",
  },
  Ethnicity: {
    label: "Ethnicity",
  },
  Religion: {
    label: "Religion",
  },
  Sex: {
    label: "Sex",
  },
  Sexual_Orientation: {
    label: "Sexual Orientation",
  },
  Lifestyle: {
    label: "Lifestyle",
  },
  NonCitizen: {
    label: "Non-Citizen",
  },
  Veteran_Status: {
    label: "Veteran Status",
  },
  Dependency_Status: {
    label: "Dependency Status",
  },
  Disability_Status: {
    label: "Disability",
  },
  Marital_Status: {
    label: "Marital Status",
  },
};

const createDiscriinationItem = async () => {
  const response = await createDiscrimination(discrimination.value);
  console.log("response", response);
  if (response) {
    discrimination.value.isExist = true;
    handleSnackBar("create");
  }
};
const updateDiscriminationItem = async () => {
  console.log("Update Discrimination");
  const response = await updateDiscrimination(discrimination.value);
  if (response) {
    handleSnackBar("update");
  }
};

const fetchDiscrimination = async () => {
  console.log("Fetch Discrimination");
  const response = await getDiscrimination(props.patientId);
  if (response) {
    console.log("response", response);
    handlePatientData(response);
  }
  //   isDataLoaded.value = true;
};

const handleSnackBar = (type) => {
  snackBars.value[type].isActive = true;
};
const handlePatientData = (response) => {
  discrimination.value = response;
  discrimination.value.isExist = true;
};
const handleButtonAction = async () => {
  if (discrimination.value.isExist) {
    await updateDiscriminationItem();
  } else {
    await createDiscriinationItem();
  }
};
</script>
<style lang=""></style>
