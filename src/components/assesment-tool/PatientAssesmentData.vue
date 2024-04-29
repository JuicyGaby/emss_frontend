<template lang="">
  <div>
    <v-dialog v-model="dialog">
      <v-card>
        <v-toolbar color="secondary" class="pr-4">
          <v-toolbar-title>
            Patient Assesment Data {{ props.patientId }}</v-toolbar-title
          >
          <v-icon>mdi-close</v-icon>
        </v-toolbar>
        <v-container>
          <!-- interview -->
          <v-row>
            <v-col cols="12" class="d-flex flex-wrap ga-2">
              <h2>I. Initial Interview</h2>
              <v-divider></v-divider>
              <v-text-field
                v-for="(item, index) in inputFields.interview"
                :key="index"
                :label="item.label"
                readonly
                density="comfortable"
                variant="outlined"
                style="width: 300px"
                v-model="patientAssesmentData.interview[index]"
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- personal data -->
          <v-row>
            <v-col cols="12" class="d-flex flex-wrap ga-2">
              <h2>II. Personal Data</h2>
              <v-divider></v-divider>
              <v-text-field
                v-for="(item, index) in inputFields.demographicData
                  .personalData"
                :key="index"
                :label="item.label"
                readonly
                density="comfortable"
                variant="outlined"
                style="width: 400px"
                v-model="patientAssesmentData.personalData[index]"
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- permanent address -->
          <v-row v-if="patientAssesmentData.address.isExisting">
            <v-col cols="12" class="d-flex flex-wrap ga-2">
              <h2>Permanent Address</h2>
              <v-divider></v-divider>
              <v-text-field
                v-for="(item, index) in inputFields.demographicData.address"
                :key="index"
                :label="item.label"
                readonly
                density="comfortable"
                variant="outlined"
                style="width: 500px"
                v-model="patientAssesmentData.address[0][index]"
              ></v-text-field>
            </v-col>
            <!-- temporary address -->
            <v-col cols="12" class="d-flex flex-wrap ga-2">
              <h2>Temporary Address</h2>
              <v-divider></v-divider>
              <v-text-field
                v-for="(item, index) in inputFields.demographicData.address"
                :key="index"
                :label="item.label"
                readonly
                density="comfortable"
                variant="outlined"
                style="width: 500px"
                v-model="patientAssesmentData.address[1][index]"
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- family composition -->
          <v-row v-if="patientAssesmentData.familyComposition.isExisting">
            <v-col cols="12">
              <h2>Family Composition</h2>
              <v-data-table
                :headers="inputFields.demographicData.tableHeaders"
                :items="patientAssesmentData.familyComposition"
                items-per-page="5"
                density="compact"
                :items-per-page-options="[5, 10, 15]"
              >
              </v-data-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getPatientByID } from "@/api/patients";
import { inputRules } from "@/utils/constants";
import {
  getInterview,
  getPatientAddress,
  getMswdClassification,
  getFamilyComposition,
  getMonthlyExpenses,
  getMedicalData,
  getHealthAndMentalHealth,
  getDiscrimination,
  getSafety,
  getSocialFunctioning,
  getProblemsInEnvironment,
  interview,
} from "@/api/assesment-tool";

import InterviewView from "./InterviewView.vue";

const props = defineProps({
  patientId: Number,
});

const emit = defineEmits(["closeDialog"]);

const dialog = ref(true);
const inputFields = ref({
  interview: {
    interview_date: {
      label: "Interview Date",
      type: "text",
      formType: "date",
    },
    interview_time: {
      label: "Interview Time",
      type: "text",
      formType: "time",
    },
    admission_date_and_time: {
      label: "Admission Date-Time",
      type: "text",
      formType: "datetime-local",
    },
    basic_ward: {
      label: "Basic Ward",
      type: "text",
    },
    nonbasic_ward: {
      label: "Non-Basic Ward",
      type: "text",
    },
    health_record_number: {
      label: "Health Record Number",
      type: "text",
      formType: "number",
    },
    mswd_number: {
      label: "MSWD Number",
      type: "text",
      formType: "number",
    },
    referring_party: {
      label: "Referring Party",
      type: "text",
    },
    source_of_referral: {
      label: "Source of Referral",
      type: "select",
      items: [
        "Government Hospital",
        "Private Hospitals/Clinics",
        "Politicians",
        "Media",
        "Health Care Team",
        "NGO’s/Private Welfare Agencies",
        "Government Agencies",
        "Walk – in",
        "Others",
      ],
    },
    address: {
      label: "Referal Address",
      type: "text",
    },
    contact_number: {
      label: "Referal Contact Number",
      type: "text",
      formType: "number",
      rules: [inputRules.invalidNegative],
    },
    informant: {
      label: "Informant",
      type: "text",
    },
    relationship_to_patient: {
      label: "Informant relationship to Patient",
      type: "select",
      items: [
        "Friends",
        "Workmates",
        "Neighbors",
        "Relatives",
        "Spouse",
        "Children",
        "Parents",
        "Siblings",
        "Others",
      ],
    },
    informant_contact_number: {
      label: "Informant Contact Number",
      type: "text",
      formType: "number",
      rules: [inputRules.invalidNegative],
    },
    informant_address: {
      label: "Informant Address",
      type: "text",
    },
  },
  demographicData: {
    personalData: {
      first_name: {
        label: "First Name",
      },
      middle_name: {
        label: "Middle Name",
      },
      last_name: {
        label: "Last Name",
      },
      age: {
        label: "Age",
      },
      birth_date: {
        label: "Birth Date",
      },
      religion: {
        label: "Religion",
      },
      contact_number: {
        label: "Contact Number",
      },
      occupation: {
        label: "Occupation",
      },
      monthly_income: {
        label: "Monthly Income",
      },
      ph_membership_number: {
        label: "PH Membership Number",
      },
      ph_membership_type: {
        label: "PH Membership",
      },
      gender: {
        label: "Gender Identity",
      },
      sex: {
        label: "Sex",
      },
      nationality: {
        label: "Nationality",
      },
      civil_status: {
        label: "Civil Status",
      },
      living_arrangement: {
        label: "Living Arrangement",
      },
      highest_education_level: {
        label: "Education",
      },
      education_status: {
        label: "Education Status",
      },
    },
    address: {
      region: {
        label: "Region",
      },
      province: {
        label: "Province",
      },
      district: {
        label: "District",
      },
      municipality: {
        label: "Municipality",
      },
      barangay: {
        label: "Barangay",
      },
      purok: {
        label: "Purok",
      },
    },
    tableHeaders: [
      { title: "Fullname", value: "full_name" },
      { title: "Age", value: "age" },
      { title: "Birth Date", value: "birth_date" },
      { title: "Civil Status", value: "civil_status" },
      { title: "Relationship", value: "relationship" },
      { title: "Educational Attainment", value: "educational_attainment" },
      { title: "Occupation", value: "occupation" },
      { title: "Monthly Income", value: "monthly_income" },
    ],
  },
  mswdClassification: {},
  familyComposition: {},
  monthlyExpenses: {},
  medicalData: {},
  healthAndMentalHealth: {},
  discrimination: {},
  safety: {},
  socialFunctioning: {},
  problemsInEnvironment: {},
});

const patientAssesmentData = ref({
  interview: {},
  personalData: {},
  address: {
    isExisting: false,
  },
  familyComposition: {
    isExisting: false,
  },
  mswdClassification: {
    isExisting: false,
  },
  monthlyExpenses: {},
  medicalData: {},
  healthAndMentalHealth: {},
  discrimination: {},
  safety: {},
  socialFunctioning: {},
  problemsInEnvironment: {},
});
// async functions

const getInterviewData = async () => {
  const response = await getInterview(props.patientId);
  patientAssesmentData.value.interview = response;
};

const getPatientPersonalData = async () => {
  const response = await getPatientByID(props.patientId);
  patientAssesmentData.value.personalData = response;
};
const getPatientAddressData = async () => {
  const response = await getPatientAddress(props.patientId);
  console.log(response);
  if (response.length > 0) {
    patientAssesmentData.value.address = response;
    patientAssesmentData.value.address.isExisting = true;
  }
};
const getMswdClassificationData = async () => {
  const response = await getMswdClassification(props.patientId);
  patientAssesmentData.value.mswdClassification = response;
};
const getFamilyCompositionData = async () => {
  const response = await getFamilyComposition(props.patientId);
  patientAssesmentData.value.familyComposition = response;
  patientAssesmentData.value.familyComposition.isExisting = true;
};
const getMonthlyExpensesData = async () => {
  const response = await getMonthlyExpenses(props.patientId);
  patientAssesmentData.value.monthlyExpenses = response;
};
const getMedicalDataItem = async () => {
  const response = await getMedicalData(props.patientId);
  patientAssesmentData.value.medicalData = response;
};
const getHealthAndMentalHealthData = async () => {
  const response = await getHealthAndMentalHealth(props.patientId);
  patientAssesmentData.value.healthAndMentalHealth = response;
};
const getDiscriminationData = async () => {
  const response = await getDiscrimination(props.patientId);
  patientAssesmentData.value.discrimination = response;
};
const getSafetyData = async () => {
  const response = await getSafety(props.patientId);
  patientAssesmentData.value.safety = response;
};
const getSocialFunctioningData = async () => {
  const response = await getSocialFunctioning(props.patientId);
  patientAssesmentData.value.socialFunctioning = response;
};
const getProblemsInEnvironmentData = async () => {
  const response = await getProblemsInEnvironment(props.patientId);
  patientAssesmentData.value.problemsInEnvironment = response;
};

const getAsessmentData = async () => {
  await getInterviewData();
  await getPatientPersonalData();
  await getPatientAddressData();
  await getMswdClassificationData();
  await getFamilyCompositionData();
  await getMonthlyExpensesData();
  await getMedicalDataItem();
  await getHealthAndMentalHealthData();
  await getDiscriminationData();
  await getSafetyData();
  await getSocialFunctioningData();
  await getProblemsInEnvironmentData();
};
onMounted(async () => {
  await getAsessmentData();
});
</script>
<style lang=""></style>
