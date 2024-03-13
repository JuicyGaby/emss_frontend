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
    {{ medicalData }}
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getMedicalData } from "@/api/assesment-tool";

const props = defineProps({
  patientId: Number,
});
onMounted(async () => {
  await fetchMedicalData();
});

const medicalData = ref({
  isExist: false,
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
    console.log("fetchMedicalData", response);
    handlePatientData(response);
  }
};
const handlePatientData = (response) => {
  medicalData.value = response;
  medicalData.isExist = true;
};

const createMedicalDataItem = async () => {
  console.log("createMedicalDataItem");
};
const updateMedicalDataItem = async () => {
  console.log("updateMedicalDataItem");
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
