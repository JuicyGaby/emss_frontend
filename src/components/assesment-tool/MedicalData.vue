<template lang="">
  <div>
    <v-container style="width: 1500px">
      <h1>Medical Data</h1>
      <v-divider class="mb-5"></v-divider>
      <v-form ref="medicalDataForm">
        <v-row>
          <v-col cols="12" class="d-flex flex-wrap ga-2">
            <v-textarea
              v-for="(field, key) in inputFields"
              :key="key"
              :label="field.label"
              variant="outlined"
              v-model="medicalData[key]"
              counter="500"
              :rules="[inputRules.textArea]"
              style="width: 500px"
              density="comfortable"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
      <v-btn
        :prepend-icon="medicalData.isExist ? 'mdi-update' : 'mdi-content-save'"
        color="secondary"
        @click="
          medicalData.isExist
            ? updateMedicalDataItem()
            : createMedicalDataItem()
        "
        >{{
          medicalData.isExist ? "Update Medical Data" : "Create Medical Data"
        }}</v-btn
      >
    </v-container>
    <!-- {{ medicalData }} -->
    <snackBars :snackBarData="snackBarData" />
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { validateForm, handleSnackBar } from "@/utils/constants";
import snackBars from "../dialogs/snackBars.vue";
import { userAuthentication } from "@/stores/session";
import {
  getMedicalData,
  createMedicalData,
  updateMedicalData,
} from "@/api/assesment-tool";

const medicalDataForm = ref(null);
const snackBarData = ref({});
const props = defineProps({
  patientId: Number,
});
const inputRules = {
  textArea: (v) => v === null || v.length <= 500 || "Max 500 characters",
};

const authentication = userAuthentication();

const medicalData = ref({
  admitting_diagnosis: "",
  final_diagnosis: "",
  duration_of_problems: "",
  previous_treatment: "",
  present_treatment_plan: "",
  health_accessibility_problem: "",
  isExist: false,
  patient_id: props.patientId,
  social_worker: `${authentication.user.fname} ${authentication.user.lname}`,
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
    medicalData.value = response;
    medicalData.value.isExist = true;
    medicalData.value.social_worker = `${authentication.user.fname} ${authentication.user.lname}`;
  }
};
const createMedicalDataItem = async () => {
  const isValid = await validateForm(medicalDataForm);
  if (!isValid) return;
  const response = await createMedicalData(medicalData.value);
  if (response) {
    medicalData.value.isExist = true;
    handleSnackBar("create");
  }
};
const updateMedicalDataItem = async () => {
  const isValid = await validateForm(medicalDataForm);
  if (!isValid) return;
  const response = await updateMedicalData(medicalData.value);
  if (response) {
    // handleSnackBar("update");
    snackBarData.value = handleSnackBar("success", "Medical Data Updated");
  }
};

onMounted(async () => {
  await fetchMedicalData();
});
</script>
<style lang=""></style>
