<template lang="">
  <div style="width: 100%">
    <v-card>
      <v-toolbar color="secondary" class="d-flex align-center px-5">
        <v-icon size="x-large" icon="mdi-account-group" class="mr-5"></v-icon>
        <h1 class="">Assessment Tool</h1>
      </v-toolbar>
      <div class="ma-3 d-flex justify-space-between align-center">
        <v-btn
          color="secondary"
          prepend-icon="mdi-account-plus"
          @click="createDialog = true"
          >Assess Patient</v-btn
        >
        <div class="d-flex ga-2">
          <v-text-field
            v-for="(item, key) in inputFields.search"
            :key="key"
            :label="item.label"
            v-model="searchInput[key]"
            density="compact"
            style="width: 200px"
            variant="outlined"
            @keyup.enter="searchPatientData"
          ></v-text-field>
          <v-btn
            prepend-icon="mdi-account-search"
            color="grey"
            @click="searchPatientData"
            :disabled="!searchInput.first_name && !searchInput.last_name"
          >
            Search Patient
          </v-btn>
          <!-- {{ searchInput }} -->
        </div>
      </div>
      <v-divider></v-divider>
      <v-card-text class="d-flex align-end">
        <v-data-table
          width="100%"
          :loading="isLoading"
          :headers="tableHeaders"
          :items="patientData"
          items-per-page="10"
          density="comfortable"
          :items-per-page-options="[5, 10]"
        >
          <template v-slot:[`item.operation`]="{ item }">
            <div class="d-flex ga-5">
              <v-icon color="primary" @click="toggleEditBtn(item.id)"
                >mdi-pencil</v-icon
              >
              <v-icon color="warning" @click="viewActivityLogs(item.id)"
                >mdi-note-text</v-icon
              >
              <v-icon color="secondary" @click="viewPatientAssessmentData(item)"
                >mdi-eye</v-icon
              >
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <!-- create dialog -->
    <div v-if="createDialog">
      <PatientAssessment
        @addPatient="appendCreatedPatient"
        @closeDialog="createDialog = false"
        @viewPatient="viewPatient"
      />
    </div>
    <!-- edit dialog -->
    <v-dialog
      v-model="editDialog"
      fullscreen
      scrollable
      transition="dialog-transition"
    >
      <v-card class="">
        <v-card-text class="pa-0">
          <v-toolbar color="secondary" class="px-5">
            <v-icon>mdi-pencil</v-icon>
            <v-toolbar-title> Edit Patient Assesment </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-close" @click="editDialog = !editDialog"></v-btn>
          </v-toolbar>
          <v-tabs
            class="tabs"
            v-model="tab"
            align-tabs="center"
            center-active
            color="black"
            stacked
            fixed-tabs
            density="compact"
          >
            <v-tab
              v-for="(header, index) in tabHeaders"
              :value="header.value"
              :key="index"
            >
              {{ header.title }}
            </v-tab>
          </v-tabs>
          <v-window class="" v-model="tab">
            <v-window-item class="" :value="1">
              <interviewView :patientId="patientId"></interviewView>
            </v-window-item>
            <v-window-item :value="2">
              <personalData :patientId="patientId"></personalData>
            </v-window-item>
            <v-window-item :value="3">
              <MswdClassification :patientId="patientId"></MswdClassification>
            </v-window-item>
            <v-window-item :value="4">
              <MonthlyExpenses :patientId="patientId"></MonthlyExpenses>
            </v-window-item>
            <v-window-item :value="5">
              <MedicalData :patientId="patientId"></MedicalData>
            </v-window-item>
            <v-window-item :value="6">
              <HealthAndMentalHealth
                :patientId="patientId"
              ></HealthAndMentalHealth>
            </v-window-item>
            <v-window-item :value="7">
              <Discrimination :patientId="patientId"></Discrimination>
            </v-window-item>
            <v-window-item :value="8">
              <Safety :patientId="patientId"></Safety>
            </v-window-item>
            <v-window-item :value="9">
              <AssesmentSocialFunctioning
                :patientId="patientId"
              ></AssesmentSocialFunctioning>
            </v-window-item>
            <v-window-item :value="10">
              <ProblemsInEnvironment
                :patientId="patientId"
              ></ProblemsInEnvironment>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- view assessment dialog -->
  </div>
  <v-dialog
    v-model="dialogs.viewAssessment.isVisibile"
    transition="dialog-transition"
  >
    <PatientAssesmentData
      :patientId="patientId"
      @closeDialog="dialogs.viewAssessment.isVisibile = false"
    />
  </v-dialog>
  <!-- view activity logs -->
  <v-dialog
    v-model="dialogs.activityLogs.isVisibile"
    transition="dialog-transition"
    width="50%"
  >
    <AssesmentActivityLogs
      :patientId="patientId"
      @closeDialog="dialogs.activityLogs.isVisibile = false"
    />
  </v-dialog>

  <snackBars :snackBarData="snackBarData"></snackBars>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { handleSnackBar, inputRules, validateForm } from "@/utils/constants";
import { getPatients, searchPatient } from "@/api/patients";
import { useRouter } from "vue-router";
import snackBars from "@/components/dialogs/snackBars.vue";
import interviewView from "@/components/assesment-tool/InterviewView.vue";
import MswdClassification from "@/components/assesment-tool/mswdClassification.vue";
import personalData from "@/components/assesment-tool/personalData.vue";
import MonthlyExpenses from "@/components/assesment-tool/MonthlyExpenses.vue";
import MedicalData from "@/components/assesment-tool/MedicalData.vue";
import HealthAndMentalHealth from "@/components/assesment-tool/HealthAndMentalHealth.vue";
import Discrimination from "@/components/assesment-tool/Discrimination.vue";
import Safety from "@/components/assesment-tool/Safety.vue";
import AssesmentSocialFunctioning from "@/components/assesment-tool/AssesmentSocialFunctioning.vue";
import ProblemsInEnvironment from "@/components/assesment-tool/ProblemsInEnvironment.vue";
import PatientAssesmentData from "@/components/assesment-tool/PatientAssesmentData.vue";
import AssesmentActivityLogs from "@/components/assesment-tool/AssesmentActivityLogs.vue";
import PatientAssessment from "@/components/assesment-tool/PatientAssessment.vue";

let patientData = ref([]);
const isLoading = ref(false);
const createDialog = ref(false);
const editDialog = ref(false);
const isReadOnly = ref(false);
const tab = ref(0);
const patientId = ref(0);
const searchInput = ref({
  first_name: "",
  last_name: "",
});
const searchForm = ref(null);
const snackBarData = ref({});
const dialogs = ref({
  viewAssessment: {
    isVisibile: false,
  },
  activityLogs: {
    isVisibile: false,
  },
});
const inputFields = ref({
  search: {
    first_name: {
      label: "First Name",
    },
    last_name: {
      label: "Last Name",
    },
  },
});

const tableHeaders = [
  { title: "Date Created : ", value: "created_at" },
  { title: "Full Name", value: "fullname" },
  { title: "Age", value: "age" },
  { title: "Sex", value: "sex" },
  { title: "Civil Status", value: "civil_status" },
  { title: "Operation", value: "operation" },
];
const tabHeaders = [
  { title: "Interview", value: 1 },
  { title: "I - Demographic Data", value: 2 },
  { title: "II - MSWD Classification", value: 3 },
  { title: "III - Monthly Expenses", value: 4 },
  { title: "IV - Medical Data", value: 5 },
  { title: "V - Health and Mental Health", value: 6 },
  { title: "VI - Discrimination", value: 7 },
  { title: "VII - Safety", value: 8 },
  { title: "VIII - Assesment of Social Functioning", value: 9 },
  { title: "IV - Problems in the Environment", value: 10 },
];

const toggleEditBtn = (id) => {
  patientId.value = id;
  editDialog.value = !editDialog.value;
  tab.value = 1;
};
const toggleViewAssessment = () => {
  dialogs.value.viewAssessment.isVisibile = false;
};
const viewPatientAssessmentData = (patient) => {
  console.log("View Assesment:", patient.id);
  patientId.value = patient.id;
  dialogs.value.viewAssessment.isVisibile = true;
};
async function fetchPatients() {
  isLoading.value = true;
  try {
    const patients = await getPatients();
    patientData.value = patients;
  } finally {
    isLoading.value = false;
  }
}
async function searchPatientData() {
  const patients = await searchPatient(searchInput.value);
  if (patients.length <= 0) {
    snackBarData.value = handleSnackBar("error", "No data found");
    patientData.value = [];
    return;
  }
  snackBarData.value = handleSnackBar(
    "success",
    `${patients.length} Data found`
  );
  patientData.value = patients;
}

const toggleCreateDialog = () => {
  createDialog.value = !createDialog.value;
};
const viewPatient = (patientId) => {
  toggleEditBtn(patientId);
};
const viewActivityLogs = (id) => {
  console.log("View Activity Logs:", patientId);
  patientId.value = id;
  dialogs.value.activityLogs.isVisibile = true;
};
const appendCreatedPatient = (patient) => {
  // appending the patient data to the top
  patientData.value.unshift(patient);
};
onMounted(async () => {
  await fetchPatients();
});
</script>

<style lang="css" scoped></style>
