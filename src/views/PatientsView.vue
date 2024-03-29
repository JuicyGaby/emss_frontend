<template lang="">
  <div class="d-flex flex-column">
    <v-btn
      size="x-large"
      color="secondary"
      prepend-icon="mdi-account-plus"
      @click="createDialog = !createDialog"
      >Assess Patient</v-btn
    >
    <!-- patient list -->
    <v-card elevation-10>
      <div class="d-flex justify-space-between pa-5">
        <v-card-title class="d-flex align-center ga-5" primary-title>
          <v-icon size="x-large" icon="mdi-account-group"></v-icon>
          <h1 class="">Patient List</h1>
        </v-card-title>
        <v-text-field
          style="max-width: 400px"
          name="name"
          label="Search Patient"
          id="id"
          flat
          v-model="searchInput"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
        ></v-text-field>
      </div>
      <v-divider></v-divider>
      <v-card-text class="d-flex align-end">
        <v-data-table
          width="100%"
          :search="searchInput"
          :loading="isLoading"
          :headers="tableHeaders"
          :items="patientData"
          items-per-page="5"
          density="comfortable"
          :items-per-page-options="[5, 10, 15]"
        >
          <template v-slot:[`item.operation`]="{ item }">
            <div class="d-flex ga-5">
              <v-icon color="primary" @click="toggleEditBtn(item.id)"
                >mdi-pencil</v-icon
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
    <v-dialog v-model="createDialog" width="auto">
      <v-card>
        <v-card-title>
          <h3>Initial Assesment</h3>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <initialAssesment
            @viewPatient="viewPatient"
            @closeCreateDialog="toggleCreateDialog"
            @addPatient="appendCreatedPatient"
            :user="props.user"
          ></initialAssesment>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- edit dialog -->
    <v-dialog
      class=""
      v-model="editDialog"
      fullscreen
      scrollable
      persistent
      transition="dialog-transition"
    >
      <v-card class="">
        <v-card-text class="">
          <v-card-title class="pa-0 my-2 d-flex justify-end">
            <v-btn
              icon="mdi-close"
              color="red-lighten-1"
              size="x-small"
              @click="editDialog = !editDialog"
            ></v-btn>
          </v-card-title>
          <v-tabs
            class="tabs"
            v-model="tab"
            align-tabs="center"
            center-active
            bg-color="secondary"
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
    <PatientAssesmentData
      :modelValue="dialogs.viewAssessment.isVisibile"
      :patientId="patientId"
      @close="toggleViewAssessment"
    ></PatientAssesmentData>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import { getPatients } from "@/api/patients";
import { useRouter } from "vue-router";
import initialAssesment from "@/components/assesment-tool/initialAssesment.vue";
import interviewView from "@/components/assesment-tool/InterviewView.vue";
import MswdClassification from "@/components/assesment-tool/MswdClassification.vue";
import personalData from "@/components/assesment-tool/personalData.vue";
import MonthlyExpenses from "@/components/assesment-tool/MonthlyExpenses.vue";
import MedicalData from "@/components/assesment-tool/MedicalData.vue";
import HealthAndMentalHealth from "@/components/assesment-tool/HealthAndMentalHealth.vue";
import Discrimination from "@/components/assesment-tool/Discrimination.vue";
import Safety from "@/components/assesment-tool/Safety.vue";
import AssesmentSocialFunctioning from "@/components/assesment-tool/AssesmentSocialFunctioning.vue";
import ProblemsInEnvironment from "@/components/assesment-tool/ProblemsInEnvironment.vue";
import PatientAssesmentData from "@/components/assesment-tool/PatientAssesmentData.vue";

const props = defineProps({
  user: Object,
  authentication: Object,
});

const searchInput = ref("");
let patientData = ref([]);
const isLoading = ref(false);
const createDialog = ref(false);
const editDialog = ref(false);
const dialogs = ref({
  viewAssessment: {
    isVisibile: false,
  },
});
const tab = ref(0);
const patientId = ref(0);

const tableHeaders = [
  { title: "First Name", value: "first_name" },
  { title: "Middle Name", value: "middle_name" },
  { title: "Last Name", value: "last_name" },
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

onMounted(() => {
  fetchPatients();
});

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
const toggleCreateDialog = () => {
  createDialog.value = !createDialog.value;
};

const viewPatient = (patientId) => {
  toggleEditBtn(patientId);
};
const appendCreatedPatient = (patient) => {
  patientData.value.push(patient.value);
  console.log("successfuly added", patientData.value);
};
</script>

<style lang="css" scoped>
.card-bg {
  background-color: #3d0f0f;
}
.patientsTable {
  /* border: 1px solid red; */
  width: 40%;
}
.rb {
  border: 1px solid red;
}
.tabs {
  z-index: 1000;
}
th {
  font-weight: 1000;
  font-size: 20px;
}
</style>
