<template lang="">
  <div>
    <v-dialog v-model="dialog">
      <v-card>
        <v-toolbar color="secondary" class="pr-4">
          <v-toolbar-title>
            Patient Assesment Data {{ props.patientId }}</v-toolbar-title
          >
          <v-icon @click="emit('closeDialog')">mdi-close</v-icon>
        </v-toolbar>
        <v-container>
          <!-- interview -->
          <v-row>
            <v-col cols="12" class="d-flex flex-wrap ga-2">
              <h2>Initial Interview</h2>
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
              <h2>I. Personal Data</h2>
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
          <!-- mswd classification -->
          <v-row v-if="patientAssesmentData.mswdClassification.isExisting">
            <v-col cols="12" class="d-flex flex-wrap ga-2">
              <h2>II. MSWD Classification</h2>
              <v-divider></v-divider>
              <v-template
                v-for="(item, index) in inputFields.mswdClassification"
                style="width: 550px"
              >
                <v-text-field
                  v-if="item.formType === 'text'"
                  :key="index"
                  :label="item.label"
                  readonly
                  density="comfortable"
                  variant="outlined"
                  v-model="patientAssesmentData.mswdClassification[index]"
                ></v-text-field>
                <v-combobox
                  v-else-if="item.formType === 'select'"
                  multiple
                  chips
                  readonly
                  :key="'select-' + index"
                  :label="item.label"
                  variant="outlined"
                  density="comfortable"
                  v-model="patientAssesmentData.mswdClassification[index]"
                ></v-combobox>
              </v-template>
            </v-col>
          </v-row>
          <!-- monthly expenses -->
          <v-row
            class=""
            v-if="patientAssesmentData.monthlyExpenses.isExisting"
          >
            <v-col cols="12" class="d-flex flex-wrap ga-2">
              <h2>III. Monthly Expenses</h2>
              <v-divider></v-divider>
            </v-col>
            <v-template
              v-for="(item, index) in inputFields.monthlyExpenses.row1"
            >
              <v-col cols="12" class="d-flex flex-wrap">
                <v-text-field
                  v-if="item.formType === 'text'"
                  :key="`text-${index}`"
                  :label="item.label"
                  readonly
                  density="comfortable"
                  variant="outlined"
                  style="width: 550px"
                  v-model="patientAssesmentData.monthlyExpenses[index]"
                ></v-text-field>
                <v-combobox
                  v-else-if="item.formType === 'combobox'"
                  multiple
                  chips
                  :key="`combobox-${index}`"
                  :label="item.label"
                  readonly
                  v-model="patientAssesmentData.monthlyExpenses[index]"
                  style="width: 550px"
                  density="comfortable"
                  variant="outlined"
                ></v-combobox>
              </v-col>
            </v-template>
            <v-template
              v-for="(item, index) in inputFields.monthlyExpenses.row2"
            >
              <v-col cols="12" class="d-flex flex-wrap">
                <v-text-field
                  v-if="item.formType === 'text'"
                  :key="`text-${index}`"
                  :label="item.label"
                  readonly
                  density="comfortable"
                  variant="outlined"
                  style="width: 550px"
                  v-model="patientAssesmentData.monthlyExpenses[index]"
                ></v-text-field>
                <v-combobox
                  v-else-if="item.formType === 'combobox'"
                  multiple
                  chips
                  :key="`combobox-${index}`"
                  :label="item.label"
                  readonly
                  v-model="patientAssesmentData.monthlyExpenses[index]"
                  style="width: 550px"
                  density="comfortable"
                  variant="outlined"
                ></v-combobox>
              </v-col>
            </v-template>
          </v-row>
          <!-- medical data -->
          <v-row v-if="patientAssesmentData.medicalData.isExisting">
            <v-col cols="12" class="d-flex flex-wrap ga-2">
              <h2>IV. Medical Data</h2>
              <v-divider></v-divider>
              <v-textarea
                v-for="(item, index) in inputFields.medicalData"
                :key="index"
                :label="item.label"
                readonly
                density="comfortable"
                variant="outlined"
                style="width: 500px"
                v-model="patientAssesmentData.medicalData[index]"
              ></v-textarea>
            </v-col>
          </v-row>
          <!-- problems in environment -->
          <v-row v-if="patientAssesmentData.problemsInEnvironment.isExisting">
            <v-col cols="12" class="d-flex flex-wrap">
              <h2>V. Problems in Environment</h2>
              <v-divider></v-divider>
              <v-container>
                <v-row>
                  <v-col cols="12" class="d-flex flex-wrap ga-2">
                    <v-combobox
                      v-for="(item, index) in inputFields.problemsInEnvironment
                        .combo"
                      :key="index"
                      :label="item.label"
                      readonly
                      chips
                      multiple
                      density="comfortable"
                      variant="outlined"
                      style="width: 500px"
                      v-model="
                        patientAssesmentData.problemsInEnvironment[index]
                      "
                    ></v-combobox>
                  </v-col>
                  <v-col cols="12" class="d-flex flex-wrap ga-2">
                    <v-textarea
                      v-for="(item, index) in inputFields.problemsInEnvironment
                        .textareas"
                      :key="index"
                      :label="item.label"
                      readonly
                      density="comfortable"
                      variant="outlined"
                      style="width: 500px"
                      v-model="
                        patientAssesmentData.problemsInEnvironment[index]
                      "
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" class="d-flex flex-wrap ga-2">
                    <v-text-field
                      v-for="(item, index) in inputFields.problemsInEnvironment
                        .text"
                      :key="index"
                      :label="item.label"
                      readonly
                      density="comfortable"
                      variant="outlined"
                      style="width: 700px"
                      v-model="
                        patientAssesmentData.problemsInEnvironment[index]
                      "
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
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
  mswdClassification: {
    main_classification_type: {
      formType: "text",
      label: "Main Classification",
    },
    sub_classification_type: {
      formType: "text",
      label: "Sub Classification",
    },
    membership_to_marginalized_sector: {
      formType: "select",
      label: "Sectors",
    },
  },
  monthlyExpenses: {
    row1: {
      house_lot_cost: {
        label: "House and Lot Cost",
        formType: "text",
      },
      food_water_cost: {
        label: "Food and Water Cost",
        formType: "text",
      },
      education_cost: {
        label: "Education Cost",
        formType: "text",
      },
      clothing_cost: {
        label: "Clothing Cost",
        formType: "text",
      },
      communication_cost: {
        label: "Communication Cost",
        formType: "text",
      },
      house_help_cost: {
        label: "House Help Cost",
        formType: "text",
      },
      transportation_type: {
        label: "Transportation Type",
        formType: "combobox",
      },
      transportation_cost: {
        label: "Transportation Cost",
        formType: "text",
      },
      others_description: {
        label: "Others. Please specify:",
        formType: "combobox",
      },
      others_cost: {
        label: "Others Cost",
        formType: "text",
      },
      medical_cost: {
        label: "Medical Cost",
        formType: "text",
      },
    },
    row2: {
      light_source_type: {
        label: "Light Sources",
        formType: "combobox",
      },
      light_source_cost: {
        label: "Light Source Cost",
        inputType: "Number",
        formType: "text",
      },
      fuel_source_type: {
        label: "Fuel Sources",
        formType: "combobox",
      },
      fuel_source_cost: {
        label: "Fuel Source Cost",
        inputType: "Number",
        formType: "text",
      },
      water_source_type: {
        label: "Water Sources",
        formType: "combobox",
      },
      water_source_cost: {
        label: "Water Source Cost",
        inputType: "Number",
        formType: "text",
      },
      total_cost: {
        label: "Total Cost",
        formType: "text",
      },
    },
  },
  medicalData: {
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
  },
  healthAndMentalHealth: {},
  discrimination: {},
  safety: {},
  socialFunctioning: {},
  problemsInEnvironment: {
    combo: {
      problems_presented: {
        label: "Problems Presented",
        formType: "combobox",
      },
      reasons_psychosocial_counselling: {
        label: "Reasons for Psychosocial Counselling",
        formType: "combobox",
      },
    },
    textareas: {
      assesment_findings: {
        label: "Assesment Findings",
        formType: "textarea",
      },
      recommended_intervention: {
        label: "Recommended Intervention",
        formType: "textarea",
      },
      action_taken: {
        label: "Action Taken",
        formType: "textarea",
      },
    },
    text: {
      person_emergency: {
        label: "Person to be notified in case of emergency",
        formType: "text",
      },
      relationship_to_patient: {
        label: "Relation to the patient",
        formType: "text",
      },
      address: {
        label: "Address",
        formType: "text",
      },
      contact_number: {
        label: "Contact Number",
        formType: "text",
      },
      interviewed_by: {
        label: "Interviewer",
        formType: "text",
      },
    },
  },
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
  monthlyExpenses: {
    isExisting: false,
  },
  medicalData: {
    isExisting: false,
  },
  healthAndMentalHealth: {},
  discrimination: {},
  safety: {},
  socialFunctioning: {},
  problemsInEnvironment: {
    isExisting: false,
  },
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
  if (response.length > 0) {
    patientAssesmentData.value.address = response;
    patientAssesmentData.value.address.isExisting = true;
  }
};
const getMswdClassificationData = async () => {
  const response = await getMswdClassification(props.patientId);
  console.log(response);
  patientAssesmentData.value.mswdClassification = response;
  patientAssesmentData.value.mswdClassification.isExisting = true;
};
const getFamilyCompositionData = async () => {
  const response = await getFamilyComposition(props.patientId);
  patientAssesmentData.value.familyComposition = response;
  patientAssesmentData.value.familyComposition.isExisting = true;
};
const getMonthlyExpensesData = async () => {
  const response = await getMonthlyExpenses(props.patientId);
  patientAssesmentData.value.monthlyExpenses = response;
  patientAssesmentData.value.monthlyExpenses.isExisting = true;
};
const getMedicalDataItem = async () => {
  const response = await getMedicalData(props.patientId);
  patientAssesmentData.value.medicalData = response;
  patientAssesmentData.value.medicalData.isExisting = true;
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
  if (response) {
    patientAssesmentData.value.problemsInEnvironment = response;
    patientAssesmentData.value.problemsInEnvironment.isExisting = true;
    console.log(patientAssesmentData.value.problemsInEnvironment);
  }
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
<style lang="css">
.rb {
  border: 1px dashed red;
}
</style>
