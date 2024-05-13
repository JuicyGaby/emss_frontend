<template lang="">
  <div>
    <v-card>
      <v-card-text>
        <v-container>
          <v-form ref="darForm">
            <v-row class="">
              <v-col cols="12" class="d-flex flex-wrap ga-2 align-center">
                <!-- time fields -->
                <v-template v-for="(item, index) in inputFields.timeFields">
                  <v-text-field
                    v-if="item.type === 'time'"
                    v-model="darData[index]"
                    :key="'time-' + index"
                    :label="item.label"
                    variant="outlined"
                    density="compact"
                    :type="item.type"
                    :hide-spin-buttons="true"
                    style="width: 550px"
                    :rules="[inputRules.required]"
                  ></v-text-field>
                </v-template>
                <v-template v-for="(item, index) in inputFields.part1" class="">
                  <v-text-field
                    v-if="
                      item.formType === 'text' && item.object === 'patients'
                    "
                    v-model="patientData[index]"
                    :key="'text-' + index"
                    :label="item.label"
                    variant="outlined"
                    density="compact"
                    :type="item.type"
                    :hide-spin-buttons="true"
                    style="width: 550px"
                    :rules="[inputRules.required]"
                  ></v-text-field>
                  <v-text-field
                    v-else-if="
                      item.formType === 'text' && item.object === 'darData'
                    "
                    v-model="darData[index]"
                    :key="'text-' + index"
                    :label="item.label"
                    variant="outlined"
                    density="compact"
                    :type="item.type"
                    :hide-spin-buttons="true"
                    style="width: 550px"
                    :rules="[inputRules.required]"
                  ></v-text-field>
                  <v-autocomplete
                    v-else-if="
                      item.formType === 'select' && item.object === 'patients'
                    "
                    v-model="patientData[index]"
                    :key="'select-' + index"
                    :label="item.label"
                    :items="item.items"
                    variant="outlined"
                    density="compact"
                    style="width: 550px"
                    :rules="[inputRules.required]"
                  ></v-autocomplete>
                  <v-autocomplete
                    v-else-if="
                      item.formType === 'select' && item.object === 'darData'
                    "
                    v-model="darData[index]"
                    :key="'select-' + index"
                    :label="item.label"
                    :items="item.items"
                    variant="outlined"
                    density="compact"
                    style="width: 550px"
                    :rules="[inputRules.required]"
                  ></v-autocomplete>
                  <v-autocomplete
                    v-else-if="item.formType === 'autocomplete'"
                    :key="'autocomplete-' + index"
                    v-model="darData[index]"
                    :label="item.label"
                    :items="item.items"
                    item-title="title"
                    item-value="value"
                    variant="outlined"
                    density="compact"
                    style="width: 550px"
                  ></v-autocomplete>
                </v-template>
                <v-template v-for="(item, index) in inputFields.textAreas">
                  <v-textarea
                    v-model="darData[index]"
                    :key="'textArea-' + index"
                    :label="item.label"
                    variant="outlined"
                    density="compact"
                    style="width: 1500px"
                    :rules="[inputRules.required]"
                  ></v-textarea>
                </v-template>
              </v-col>
              <v-col>
                <v-btn
                  prepend-icon="mdi-update"
                  color="secondary"
                  @click="updateDailyActivityReportItem"
                  >Update Daily Activity Report</v-btn
                >
              </v-col>
              <!-- {{ darData }} -->
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
  <snackBars :snackBarData="snackBarData" />
</template>
<script setup>
import moment from "moment";
import snackBars from "@/components/dialogs/snackBars.vue";
import { ref, onMounted, watch } from "vue";
import {
  inputRules,
  handleSnackBar,
  religion,
  validateForm,
  civilStatus,
  educationalAttainment,
  area,
  departments,
  caseType,
  contributor_type,
  mssClassification,
  sourceOfReferral2,
  sectoralGroupingList,
  sex,
} from "@/utils/constants";
import {
  getDailyActivityReportById,
  updateDailyActivityReport,
} from "@/api/daily-activity-report";
import { userAuthentication } from "@/stores/session";

const props = defineProps({
  dar_id: Number,
});

const authentication = userAuthentication();
const userFullName = `${authentication.user.fname} ${authentication.user.lname}`;
const darForm = ref(null);

const darData = ref({
  patients: {},
});
const patientData = ref({});
const tabValue = ref(0);
const snackBarData = ref({});

const inputFields = {
  part1: {
    admission_date: {
      label: "Admission Date",
      formType: "text",
      type: "date",
      object: "darData",
    },
    first_name: {
      label: "First Name",
      formType: "text",
      type: "text",
      object: "patients",
    },
    middle_name: {
      label: "Middle Name",
      formType: "text",
      type: "text",
      object: "patients",
    },
    last_name: {
      label: "Last Name",
      formType: "text",
      type: "text",
      object: "patients",
    },
    birth_date: {
      label: "Birth Date",
      formType: "text",
      type: "date",
      object: "patients",
    },
    age: {
      label: "Age",
      formType: "text",
      type: "number",
      object: "patients",
    },
    occupation: {
      label: "Occupation",
      formType: "text",
      type: "text",
      object: "patients",
    },
    monthly_income: {
      label: "Monthly Income",
      formType: "text",
      type: "number",
      object: "patients",
    },
    religion: {
      label: "Religion",
      formType: "select",
      items: religion,
      object: "patients",
    },
    sex: {
      label: "Sex",
      formType: "select",
      items: sex,
      object: "patients",
    },
    civil_status: {
      label: "Civil Status",
      formType: "select",
      items: civilStatus,
      object: "patients",
    },
    highest_education_level: {
      label: " Educational Attainment",
      formType: "select",
      items: educationalAttainment,
      object: "patients",
    },
    area_id: {
      label: "Area",
      formType: "select",
      items: area,
      object: "darData",
    },
    department: {
      label: "Department",
      formType: "select",
      items: departments,
      object: "darData",
    },
    case_type_id: {
      label: "Case Type",
      formType: "autocomplete",
      items: caseType,
      object: "darData",
    },
    indirect_contributor: {
      label: "Contributor type",
      formType: "select",
      items: contributor_type,
      object: "darData",
    },
    is_phic_member: {
      label: "PHIC Member",
      formType: "autocomplete",
      items: [
        { title: "Yes", value: 1 },
        { title: "No", value: 0 },
      ],
    },
    phic_classification: {
      label: "MSS Classification",
      formType: "autocomplete",
      items: mssClassification,
      object: "darData",
    },

    house_hold_size: {
      label: "Household Size",
      formType: "text",
      type: "number",
      object: "darData",
    },
    informant: {
      label: "Informant Name",
      formType: "text",
      type: "text",
      object: "darData",
    },
    relationship_to_patient: {
      label: "Relationship to Patient",
      formType: "text",
      type: "text",
      object: "darData",
    },
    sectoral_grouping: {
      label: "Sectoral Grouping",
      formType: "select",
      items: sectoralGroupingList,
      object: "darData",
    },
    source_of_referral_id: {
      label: "Source of Referral",
      formType: "select",
      items: sourceOfReferral2,
      object: "darData",
    },
    referring_party: {
      label: "Name of Referring Party",
      formType: "text",
      type: "text",
      object: "darData",
    },
  },
  timeFields: {
    interview_start_time: {
      label: "Interview Start Time",
      type: "time",
    },
    interview_end_time: {
      label: "Interview End Time",
      type: "time",
    },
  },
  textAreas: {
    diagnosis: {
      label: "Diagnosis",
      formType: "textArea",
    },
    remarks: {
      label: "Remarks",
      formType: "textArea",
    },
  },
};
const updateDailyActivityReportItem = async () => {
  const isValid = await validateForm(darForm);
  if (!isValid) return;
  console.log("darData", darData.value);
  const response = await updateDailyActivityReport(darData.value);
  if (response) {
    console.log("update", response);
    snackBarData.value = handleSnackBar(
      "success",
      "Daily Activity Report Updated"
    );
  }
};
const fetchDarData = async () => {
  const response = await getDailyActivityReportById(props.dar_id);
  darData.value = response;
  if (!response.interview_start_time) {
    darData.value.interview_start_time = moment().format("HH:mm");
  }
  patientData.value = darData.value.patients;
  darData.value.created_by = userFullName;
  console.log("darData", darData.value);
  console.log("patientData", patientData.value);
};

onMounted(async () => {
  await fetchDarData();
});
</script>
<style lang="css"></style>
