<template lang="">
  <div>
    <v-card>
      <v-card-text>
        <v-container>
          <v-form ref="darForm">
            <v-row class="">
              <v-col
                cols="12"
                class="d-flex flex-wrap ga-5 align-center redborder"
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
import { inputRules, validateForm } from "@/utils/constants";
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
      items: ["Male", "Female"],
    },
    civil_status: {
      label: "Civil Status",
      formType: "select",
      items: [
        "Child",
        "Single",
        "Married",
        "Widowed",
        "Sep - In-Fact",
        "Sep - Legal",
        "CLP - Opposite Sex",
        "CLP - Same Sex",
      ],
    },
    highest_education_level: {
      label: " Educational Attainment",
      formType: "select",
      items: [
        "Undergraduate",
        "Elementary",
        "High School",
        "Vocational",
        "College",
        "Post Graduate",
        "None",
      ],
    },
    area: {
      label: "Area",
      formType: "select",
      items: ["Basic Ward", "Non-Basic Ward", "OP", "ER/ED"],
    },
    deparment: {
      label: "Department",
      formType: "select",
      items: [
        "Center for Behavioral Sciences",
        "Women and Child Protection Unit",
        "Internal Medicine",
        "Male Surgery",
        "Female Surgery",
        "Gynecology",
        "Pedia Surgery",
        "EENT",
        "Opthalmology",
        "Pedia Non-Communicable",
        "Pedia Communicable",
        "Adult Communicable",
        "Obstetrics",
        "Neo-Intensive Care Unit",
        "Newborn",
        "Orthopedic",
        "Renal/PDU",
        "Acute Respiratory Infection Department",
        "Family Medicine",
        "Primary Care",
        "Wellness",
        "Cardiology",
        "Urology",
        "Plastic Surgery",
        "Oncology",
        "Cervical Cancer Prevention",
        "Program for Young Parents",
        "Rehabilitation Center",
        "Neurosurgery (Brain & Spine Center)",
        "Intensive Care Unit",
        "Critical Care Unit",
        "Others",
      ],
    },
    case_type: {
      label: "Case Type",
      formType: "autocomplete",
      items: [
        { title: "New Case", value: 1 },
        { title: "Old Case", value: 2 },
        { title: "Case Closed", value: 3 },
      ],
    },
    indirect_contributor: {
      label: "Contributor type",
      formType: "select",
      items: [
        "Indirect - POS",
        "Indirect - Sponsored",
        "Indirect - 4PS",
        "Indirect - PWD",
        "Indirect - SC",
        "Direct - Lifetime",
        "Direct - Employed",
        "Direct - Voluntary",
        "Direct - OFW",
      ],
    },
    is_phic_member: {
      label: "PHIC Member",
      formType: "autocomplete",
      items: [
        { title: "Yes", value: 1 },
        { title: "No", value: 0 },
      ],
    },
    referring_party: {
      label: "Referring Party",
      formType: "text",
      type: "text",
    },
    classification: {
      label: "PHIC Classification",
      formType: "autocomplete",
      items: [
        { title: "Financially Capable / Capacitated - A", value: "A" },
        { title: "Financially Capable / Capacitated - B", value: "B" },
        { title: "Financially Incapable / Incapacitated - C1", value: "C1" },
        { title: "Financially Incapable / Incapacitated - C2", value: "C2" },
        { title: "Indigent - C3", value: "C3" },
        { title: "Indigent - D", value: "D" },
      ],
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
      items: [
        "SC",
        "PWD",
        "Solo Parent",
        "IP",
        "BHW",
        "Brgy. Officials",
        "Veterans",
        "Health Worker",
        "Government Worker",
        "Custodial",
        "Artisanal Fisherfolk",
        "Farmer and Landless Rural Worker",
        "Urban Poor",
        "Formal Labor & Migrant Workers",
        "Workers in Informal Sectors",
        "Victims of Disaster & Calamity",
        "Others",
      ],
    },
    source_of_referral: {
      label: "Source of Referral",
      formType: "select",
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
.redborder {
  border: 1px dashed red;
}
</style>
