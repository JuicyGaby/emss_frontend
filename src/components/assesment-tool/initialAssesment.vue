<template>
  <v-stepper alt-labels :items="stepperItems">
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
                  <td class="font-weight-bold">{{ dataReceived.interview[key] }}</td>
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
                  <td class="font-weight-bold">{{ dataReceived.demographicData[key] }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-cols>
        </v-row>
      </v-container>
      <v-btn color="secondary" @click="createPatientData">Create Patient</v-btn>
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
    <v-alert type="success" title="Successfully Accessed Patient">
      <div class="my-5 d-flex justify-end ga-2">
        <v-btn color="primary" @click="viewPatient(patient.id)"
          >Edit Patient</v-btn
        >
        <v-btn color="error" @click="toggleCloseBtn">Close</v-btn>
      </div>
    </v-alert>
    <!-- error dialog -->
  </v-dialog>
  <v-dialog v-model="dialogs.error" max-width="500">
    <v-alert
      title="Please input neccesary fields"
      text="Fields : First Name, Last Name"
      color="error"
    ></v-alert>
  </v-dialog>
</template>
<script setup>
import { ref } from "vue";
import interview from "@/components/assesment-tool/interview.vue";
import demographic_data from "@/components/assesment-tool/patient_demographic_data/demographic-data.vue";
import { createPatient } from "@/api/patients";

const props = defineProps({
  user: Object,
});

const emit = defineEmits(["closeCreateDialog", "viewPatient", "addPatient"]);

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
  phMembershipNumber: "PH Membership Number: ",
  phMembership: "PH Membership: ",
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
  const user_id = props.user.id;
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
