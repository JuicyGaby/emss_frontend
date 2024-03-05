<template lang="">
  <div class="d-flex flex-column">
    <v-btn 
    size="x-large" 
    color="secondary"
    prepend-icon="mdi-account-plus"
    @click="createDialog = !createDialog"
    >Assess Patient</v-btn>
    <v-card elevation-10>
      <div class="d-flex justify-space-between pa-5">
        <v-card-title class="d-flex align-center ga-5" primary-title >
          <v-icon size="x-large" icon="mdi-account-group"></v-icon><h1 class=""> Patient List</h1>
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
          items-per-page="10"
          density="comfortable"
          :items-per-page-options="[5, 10, 15]"
        >
          <template v-slot:[`item.operation`]="{ item }">
            <div class="d-flex ga-5">
              <v-icon color="primary" @click="editPatient(item)"
                >mdi-pencil</v-icon
              >
              <v-icon color="secondary" @click="deletePatient(item)"
                >mdi-eye</v-icon
              >
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog
    v-model="createDialog"
    width="auto"
    >
      <v-card>
        <v-card-title>
          <h3>Initial Assesment</h3>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <initialAssesment></initialAssesment>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import { getPatients } from "@/api/patients";
import { useRouter } from "vue-router";
import initialAssesment from "@/components/assesment-tool/initialAssesment.vue";

const props = defineProps({
  user: Object,
  authentication: Object,
});


const initialAssesmentItems = [
  "Interview",
  "Demographic Data",
  "Create Patient",
];

const router = useRouter();
const searchInput = ref("");
let patientData = ref([]);
const isLoading = ref(false);
const createDialog = ref(false);

const tableHeaders = [
  { title: "First Name", value: "first_name" },
  { title: "Middle Name", value: "middle_name" },
  { title: "Last Name", value: "last_name" },
  { title: "Age", value: "age" },
  { title: "Sex", value: "sex" },
  { title: "Civil Status", value: "civil_status" },
  { title: "Operation", value: "operation" },
];

onMounted(() => {
  fetchPatients();
});

const editPatient = (patient) => {
  // Add your edit logic here
  router.push(`/EditPatient/${patient.id}`);
  console.log(patient.id);
};

const deletePatient = (patient) => {
  // Add your delete logic here
  console.log("Delete:", patient);
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
</script>

<style lang="css">
.patientsTable {
  /* border: 1px solid red; */
  width: 40%;
}

th {
  font-weight: 1000;
  font-size: 20px;
}
</style>
