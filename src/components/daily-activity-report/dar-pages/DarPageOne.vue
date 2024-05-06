<template lang="">
  <div>
    <v-card>
      <v-card-text>
        <v-container>
          <v-form ref="darForm">
            <v-row class="">
              <v-col
                cols="12"
                class="d-flex flex-wrap ga-5 align-center"
              >
                <!-- time fields -->
                <v-template v-for="(item, index) in inputFields.part1" class="">
                  <v-text-field
                    v-if="item.formType === 'text'"
                    :key="'text-' + index"
                    :label="item.label"
                    variant="outlined"
                    density="compact"
                    :type="item.type"
                    :hide-spin-buttons="true"
                    style="width: 550px"
                  ></v-text-field>
                  <v-autocomplete
                    v-else-if="item.formType === 'select'"
                    :key="'select-' + index"
                    :label="item.label"
                    :items="item.items"
                    variant="outlined"
                    density="compact"
                    style="width: 550px"
                  ></v-autocomplete>
                  <v-autocomplete
                    v-else-if="item.formType === 'autocomplete'"
                    :key="'autocomplete-' + index"
                    :label="item.label"
                    :items="item.items"
                    item-title="title"
                    item-value="value"
                    variant="outlined"
                    density="compact"
                    style="width: 550px"
                  ></v-autocomplete>
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
  validateForm,
  civilStatus,
  educationalAttainment,
  area,
  departments,
  caseType,
  contributor_type,
  mssClassification,
  sourceOfReferral,
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
onMounted(async () => {
  await fetchDarData();
});

const authentication = userAuthentication();
const userFullName = `${authentication.user.fname} ${authentication.user.lname}`;
const darForm = ref(null);

const darData = ref({});
const patientData = ref({});
const tabValue = ref(0);
const snackBarData = ref({
  isVisible: false,
  type: "",
  text: "",
});
const inputFields = {
  part1: {
    first_name: {
      label: "First Name",
      formType: "text",
      type: "text",
    },
    middle_name: {
      label: "Middle Name",
      formType: "text",
      type: "text",
    },
    last_name: {
      label: "Last Name",
      formType: "text",
      type: "text",
    },
    birth_date: {
      label: "Birth Date",
      formType: "text",
      type: "date",
    },
    age: {
      label: "Age",
      formType: "text",
      type: "number",
    },
    occupation: {
      label: "Occupation",
      formType: "text",
      type: "text",
    },
    monthly_income: {
      label: "Monthly Income",
      formType: "text",
      type: "number",
    },
    religion: {
      label: "Religion",
      formType: "text",
      type: "text",
    },
    sex: {
      label: "Sex",
      formType: "select",
      items: sex,
    },
    civil_status: {
      label: "Civil Status",
      formType: "select",
      items: civilStatus,
    },
    highest_education_level: {
      label: " Educational Attainment",
      formType: "select",
      items: educationalAttainment,
    },
    area: {
      label: "Area",
      formType: "select",
      items: area,
    },
    deparment: {
      label: "Department",
      formType: "select",
      items: departments,
    },
    case_type: {
      label: "Case Type",
      formType: "autocomplete",
      items: caseType,
    },
    indirect_contributor: {
      label: "Contributor type",
      formType: "select",
      items: contributor_type,
    },
    is_phic_member: {
      label: "PHIC Member",
      formType: "autocomplete",
      items: [
        { title: "Yes", value: 1 },
        { title: "No", value: 0 },
      ],
    },
    classification: {
      label: "MSS Classification",
      formType: "autocomplete",
      items: mssClassification,
    },
    referring_party: {
      label: "Referring Party",
      formType: "text",
      type: "text",
    },

    house_hold_size: {
      label: "Household Size",
      formType: "text",
      type: "number",
    },
    informant: {
      label: "Informant Name",
      formType: "text",
      type: "text",
    },
    relationship_to_patient: {
      label: "Relationship to Patient",
      formType: "text",
      type: "text",
    },
    sectoral_grouping: {
      label: "Sectoral Grouping",
      formType: "select",
      items: sectoralGroupingList,
    },
    source_of_referral: {
      label: "Source of Referral",
      formType: "select",
      items: sourceOfReferral,
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
};
const updateDailyActivityReportItem = async () => {
  const isValid = await validateForm(darForm);
  if (!isValid) return;
  console.log("darData", darData.value);
  const response = await updateDailyActivityReport(darData.value);
  if (response) {
    console.log("update", response);
    handleSnackBar("success", "Daily Activity Report Updated");
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
};
const handleSnackBar = (type, text) => {
  snackBarData.value.isVisible = true;
  snackBarData.value.type = type;
  snackBarData.value.text = text;
};
</script>
<style lang="css">

</style>
