<template>
  <v-stepper flat alt-labels :items="stepperItems">
    <!-- stepper 1 -->
    <template v-slot:[`item.1`]>
      <v-card class="text-center" title="" flat>
        <v-card-text class="">
          <interview @interviewData="handleInterviewData"></interview>
        </v-card-text>
      </v-card>
    </template>
    <!-- stepper 2 -->
    <template v-slot:[`item.2`]>
      <v-card class="text-center" flat>
        <v-card-text class="">
          <demographic_data
            @personalData="handlePersonalData"
          ></demographic_data>
        </v-card-text>
      </v-card>
    </template>
    <!-- stepper 3 -->
    <template v-slot:[`item.3`]>
      <h2>Patient Details</h2>
      <v-divider></v-divider>
      <v-container style="width: 1000px">
        <v-row>
          <h4>Interview Data</h4>
          <v-cols>
            <v-table density="compact" style="width: 1000px">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) in interviewDisplay" :key="key">
                  <td>{{ value }}</td>
                  <td class="font-weight-bold">
                    {{ dataReceived.interview[key] }}
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-cols>
        </v-row>
        <v-row class="my-5">
          <h4>Personal Data</h4>
          <v-divider></v-divider>
          <v-cols>
            <v-table density="compact" style="width: 1000px">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) in personalDataDisplay" :key="key">
                  <td>{{ value }}</td>
                  <td class="font-weight-bold">
                    {{ dataReceived.demographicData[key] }}
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-cols>
        </v-row>
        <v-row>
          <v-col cols="12" class="justify-end">
            <v-btn color="secondary" class="" @click="createPatientData"
              >Create Patient</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-stepper>
  <!-- created Dialog -->
  <v-dialog
    v-model="dialogs.created"
    max-width="500"
    hide-overlay
    persistent
    transition="dialog-transition"
  >
    <v-card>
      <v-card-text>
        <h2>Successfully Assesed Patient</h2>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          variant="outlined"
          prepend-icon="mdi-pencil"
          color="primary"
          @click="viewPatient(patient.id)"
          >Edit Patient</v-btn
        >
        <v-btn color="error" @click="toggleCloseBtn" variant="outlined"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
    <!-- error dialog -->
  </v-dialog>
  <v-dialog v-model="dialogs.error" max-width="500">
    <v-card>
      <v-alert
        variant="outlined"
        icon="mdi-alert-circle-outline"
        title="Please input neccesary fields"
        text="Fields : First Name, Last Name"
        color="error"
      ></v-alert>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref } from "vue";
import interview from "@/components/assesment-tool/interview.vue";
import demographic_data from "@/components/assesment-tool/patient_demographic_data/demographic-data.vue";
import { createPatient } from "@/api/patients";
import { userAuthentication } from "@/stores/session";

const emit = defineEmits(["closeCreateDialog", "viewPatient", "addPatient"]);
const authentication = userAuthentication();

const dialogs = ref({
  created: false,
  error: false,
});
const patient = ref({});

const dataReceived = {
  interview: ref({}),
  demographicData: ref({}),
};

const handleInterviewData = (data) => {
  dataReceived.interview = data;
};
const handlePersonalData = (data) => {
  dataReceived.demographicData = data;
};

const interviewDisplay = {
  interview_date_time: "Interview Date Time: ",
  admission_date_time: "Admission Date Time: ",
  basic_ward: "Basic Ward: ",
  nonbasic_ward: "Non-Basic Ward: ",
  health_record_number: "Health Record Number: ",
  mswd_number: "MSWD Number: ",
  source_of_referral: "Source of Referral: ",
  referring_party: "Referring Party: ",
  address: "Address: ",
  contact_number: "Contact Number: ",
  informant: "Informant: ",
  relationship_to_patient: "Relationship to Patient: ",
  informant_contact_number: "Informant Contact Number: ",
  informant_address: "Informant Address: ",
};
const personalDataDisplay = {
  last_name: "Last Name: ",
  first_name: "First Name: ",
  middle_name: "Middle Name: ",
  age: "Age: ",
  contact_number: "Contact Number: ",
  birth_date: "Birth Date: ",
  place_of_birth: "Place of Birth: ",
  sex: "Sex: ",
  gender: "Gender: ",
  religion: "Religion: ",
  nationality: "Nationality: ",
  civil_status: "Civil Status: ",
  living_arrangement: "Living Arrangement: ",
  education: "Education: ",
  educationStatus: "Education Status: ",
  occupation: "Occupation: ",
  monthly_income: "Monthly Income: ",
  ph_membership_number: "PH Membership Number: ",
  ph_membership_type: "PH Membership: ",
};

const toggleCloseBtn = () => {
  dialogs.value.created = false;
  emit("closeCreateDialog");
};

const viewPatient = (patientId) => {
  toggleCloseBtn();
  emit("viewPatient", patientId);
};

const addPatient = () => {
  emit("addPatient", patient);
};

const createPatientData = async () => {
  if (!validateInput()) return;
  console.log(dataReceived.demographicData);
  console.log(dataReceived.interview);
  const user_id = authentication.user.id;
  dataReceived.demographicData.created_by = user_id;
  const response = await createPatient(dataReceived);
  if (response) {
    dialogs.value.created = true;
    patient.value = response;
    addPatient();
  }
};
const handleError = () => {
  dialogs.value.error = true;
};

const validateInput = () => {
  const { first_name, last_name } = dataReceived.demographicData;
  if (!first_name || !last_name) {
    handleError();
    return false;
  }
  return true;
};
const stepperItems = ["Interview", "Personal Data", "Review & Create Patient"];
</script>
