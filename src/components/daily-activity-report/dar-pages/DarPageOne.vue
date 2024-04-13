<template lang="">
  <div>
    <v-card>
      <v-card-text>
        <v-container>
          <v-form ref="darForm">
            <v-row class="">
              <v-col cols="12" class="d-flex flex-wrap ga-2">
                <!-- time fields -->
                <v-text-field
                  v-for="(field, key) in inputFields.part2.timeFields"
                  :key="key"
                  :label="field.label"
                  variant="outlined"
                  density="compact"
                  type="time"
                  style="width: 500px"
                  v-model="darData[key]"
                  :rules="[inputRules.required]"
                ></v-text-field>
                <v-text-field
                  label="Admission Date"
                  variant="outlined"
                  density="compact"
                  style="width: 500px"
                  type="datetime-local"
                  v-model="darData.admission_date"
                  :rules="[inputRules.required]"
                ></v-text-field>
                <v-text-field
                  v-for="(field, key) in inputFields.part1.textFields"
                  :key="key"
                  :label="field.label"
                  variant="outlined"
                  density="compact"
                  style="width: 500px"
                  :type="field.type"
                  v-model="patientData[key]"
                  :rules="[inputRules.required]"
                ></v-text-field>
                <v-select
                  v-for="(field, key) in inputFields.part1.selectFields"
                  :key="key"
                  :label="field.label"
                  :items="field.items"
                  variant="outlined"
                  density="compact"
                  style="width: 500px"
                  v-model="patientData[key]"
                  autocomplete
                  :rules="[inputRules.required]"
                ></v-select>
                <!-- dar values -->
                <v-select
                  v-for="(field, key) in inputFields.part1.darSelectFields"
                  :key="key"
                  :label="field.label"
                  :items="field.items"
                  variant="outlined"
                  density="compact"
                  style="width: 500px"
                  autocomplete
                  v-model="darData[key]"
                  :rules="[inputRules.required]"
                ></v-select>
                <v-select
                  v-for="(field, key) in inputFields.part1.titleValueFields"
                  :key="key"
                  :label="field.label"
                  :items="field.items"
                  item-title="title"
                  item-value="value"
                  variant="outlined"
                  density="compact"
                  style="width: 500px"
                  autocomplete
                  v-model="darData[key]"
                  readonly
                ></v-select>
                <v-select
                  v-for="(field, key) in inputFields.part2.selectFields"
                  :key="key"
                  :label="field.label"
                  :items="field.items"
                  variant="outlined"
                  density="compact"
                  style="width: 500px"
                  v-model="darData[key]"
                  autocomplete
                  :rules="[inputRules.required]"
                ></v-select>
                <v-text-field
                  v-for="(field, key) in inputFields.part2.textFields"
                  :key="key"
                  :label="field.label"
                  variant="outlined"
                  density="compact"
                  style="width: 500px"
                  :type="field.type"
                  v-model="darData[key]"
                  :rules="[inputRules.required]"
                ></v-text-field>
                <v-textarea
                  label="Diagnosis"
                  variant="outlined"
                  style="width: 1000px"
                  density="compact"
                  :rules="[inputRules.required]"
                  v-model="darData.diagnosis"
                >
                </v-textarea>
                <v-textarea
                  label="Remarks"
                  variant="outlined"
                  style="width: 1000px"
                  density="compact"
                  v-model="darData.remarks"
                ></v-textarea>
              </v-col>
              <v-col>
                <v-btn color="primary" @click="updateDailyActivityReportItem"
                  >Update Dar</v-btn
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
const props = defineProps({
  dar_id: Number,
});
onMounted(async () => {
  await fetchDarData();
});
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
    textFields: {
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
        type: "number",
      },
      occupation: {
        label: "Occupation",
      },
      monthly_income: {
        label: "Monthly Income",
        type: "number",
      },
      religion: {
        label: "Religion",
      },
    },
    selectFields: {
      sex: {
        label: "Sex",
        items: ["Male", "Female"],
      },
      civil_status: {
        label: "Civil Status",
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
        items: [
          "Undergraduate",
          "Elementary",
          "High School",
          "Vocational",
          "College",
          "Post Graduate",
        ],
      },
    },
    darSelectFields: {
      area: {
        label: "Area",
        items: ["Basic Ward", "Non-Basic Ward", "OP", "ER/ED"],
      },
      case_type: {
        label: "Case Type",
        items: ["New Case", "Old Case", "Case Closed"],
      },
      indirect_contributor: {
        label: "Contributor type",
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
    },
    titleValueFields: {
      is_phic_member: {
        label: "PHIC Member",
        items: [
          { title: "Yes", value: 1 },
          { title: "No", value: 0 },
        ],
      },
      classification: {
        label: "PHIC Classification",
        items: [
          { title: "Financially Capable - A", value: "A" },
          { title: "Financially Capacitated - B", value: "B" },
          { title: "Financially Incapable - C1", value: "C1" },
          { title: "Financially Incapacitated - C2", value: "C2" },
          { title: "Indigent - C3", value: "C3" },
          { title: "Indigent - D", value: "D" },
        ],
      },
    },
  },
  part2: {
    textFields: {
      house_hold_size: {
        label: "Household Size",
      },
      informant: {
        label: "Informant Name",
      },
      relationship_to_patient: {
        label: "Relationship to Patient",
      },
    },
    selectFields: {
      sectoral_grouping: {
        label: "Sectoral Grouping",
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
};
const handleSnackBar = (type, text) => {
  snackBarData.value.isVisible = true;
  snackBarData.value.type = type;
  snackBarData.value.text = text;
};
</script>
<style lang=""></style>
