<template lang="">
  <div>
    <v-container style="width: 1500px">
      <h1>Medical Data</h1>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col cols="12" class="d-flex flex-wrap ga-2">
          <v-textarea
            v-for="(field, key) in inputFields"
            :key="key"
            :label="field.label"
            variant="outlined"
            v-model="medicalData[key]"
            style="width: 500px"
            class=""
            type="number"
            density="comfortable"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-btn color="secondary" @click="handleButtonAction">{{
        medicalData.isExist ? "Update Data" : "Create Data"
      }}</v-btn>
    </v-container>
    <!-- {{ medicalData }} -->
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
import {
  getMedicalData,
  createMedicalData,
  updateMedicalData,
} from "@/api/assesment-tool";

const props = defineProps({
  patientId: Number,
});
onMounted(async () => {
  await fetchMedicalData();
});

const snackBars = ref({
  update: {
    isActive: false,
    text: "Medical Data Updated",
  },
  create: {
    isActive: false,
    text: "Medical Data Created",
  },
});
const medicalData = ref({
  isExist: false,
  patient_id: props.patientId,
});
const inputFields = {
  admitting_diagnosis: {
    label: "Admitting Diagnosis",
  },
  final_diagnosis: {
    label: "Final Diagnosis",
  },
  duration_of_problems: {
    label: "Duration of Problems",
  },
  previous_treatment: {
    label: "Previous Treatment",
  },
  present_treatment_plan: {
    label: "Present Treatment Plan",
  },
  health_accessibility_problem: {
    label: "Health Accessibility Problem",
  },
};

const fetchMedicalData = async () => {
  const response = await getMedicalData(props.patientId);
  if (response) {
    handlePatientData(response);
  }
};
const handlePatientData = (response) => {
  medicalData.value = response;
  medicalData.value.isExist = true;
};

const createMedicalDataItem = async () => {
  console.log("createMedicalDataItem");
  const response = await createMedicalData(medicalData.value);
  if (response) {
    medicalData.value.isExist = true;
    handleSnackBar("create");
  }
};
const updateMedicalDataItem = async () => {
  console.log("updateMedicalDataItem");
  const response = await updateMedicalData(medicalData.value);
  if (response) {
    handleSnackBar("update");
  }
};
const handleSnackBar = (type) => {
  snackBars.value[type].isActive = true;
};

const handleButtonAction = async () => {
  if (medicalData.value.isExist) {
    await updateMedicalDataItem();
    return;
  }
  await createMedicalDataItem();
};
</script>
<style lang=""></style>
