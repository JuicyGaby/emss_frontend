<template>
  <v-stepper alt-labels :items="stepperItems">
    <!-- stepper 1 -->
    <template v-slot:[`item.1`]>
      <v-card class="text-center" title="Interview" flat>
        <v-card-text class="">
          <interview @interviewData="handleInterviewData"></interview>
        </v-card-text>
      </v-card>
    </template>
    <!-- stepper 2 -->
    <template v-slot:[`item.2`]>
      <v-card title="I. Demographic Data" class="text-center" flat>
        <v-card-text class="">
          <demographic_data
            @personalData="handlePersonalData"
          ></demographic_data>
        </v-card-text>
      </v-card>
    </template>
    <!-- stepper 3 -->
    <template v-slot:[`item.3`]>
      <v-card title="Review Details" flat>
        <div style="width: 1000px" class="pa-5">
          <div class="Interview Data">
            <!-- <v-table density="dense" hover>
              <thead>
                <tr>
                  <th>Interview Data</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) in dataReceived.interview" :key="key">
                  <td>{{ interviewDisplay[key] }}</td>
                  <td>
                    <strong>{{ value }}</strong>
                  </td>
                </tr>
              </tbody>
            </v-table> -->
          </div>
          <v-btn color="secondary" @click="createPatientData">Create Patient</v-btn>
        </div>
      </v-card>
    </template>
  </v-stepper>
</template>
<script setup>
import { ref } from "vue";
import interview from "@/components/assesment-tool/interview.vue";
import demographic_data from "@/components/assesment-tool/patient_demographic_data/demographic-data.vue";
import reviewPatientData from "@/components/assesment-tool/reviewPatientData.vue";
import { createPatient } from "@/api/patients";

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



const createPatientData = async () => {
  const response = await createPatient(dataReceived);
  console.log(response);
};

const stepperItems = ["Interview", "Personal Data", "Review & Create Patient"];
</script>
