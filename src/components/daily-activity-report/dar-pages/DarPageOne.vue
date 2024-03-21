<template lang="">
  <div>
    <v-card>
      <v-card-title class="ma-0 pa-0">
        <v-tabs v-model="tabValue" align-tabs="start" density="compact">
          <v-tab :value="1">Part 1</v-tab>
          <v-tab :value="2">Part 2</v-tab>
        </v-tabs>
      </v-card-title>
      <v-card-text>
        <v-window v-model="tabValue">
          <v-window-item :value="1">
            <v-container>
              <v-row>
                <v-col cols="12" class="d-flex flex-wrap ga-2">
                  <v-text-field
                    v-for="(field, key) in inputFields.part1.textFields"
                    :key="key"
                    :label="field.label"
                    variant="outlined"
                    density="comfortable"
                    style="width: 200px"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
          <v-window-item :value="2"></v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { getDailyActivityReportById } from "@/api/daily-activity-report";
const props = defineProps({
  dar_id: Number,
});
const tabValue = ref(0);
const darData = ref({});
const inputFields = {
  part1: {
    textFields: {
      admission_date: {
        label: "Admission Date",
      },
      patient_name: {
        label: "Patient Name",
      },
      age: {
        label: "Age",
      },
      address: {
        label: "Address",
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
      area: {
        label: "Area",
        items: ["Basic Ward", "Non-Basic Ward", "OP", "ER/ED"],
      },
      case_type: {
        label: "Case Type",
        items: ["New Case", "Old Case", "Case Closed"],
      },
      indirect_contributor: {
        label: "Indirect Contributor",
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
      direct_contributor: {
        label: "Direct Contributor",
        items: [],
      },
      phic_classification: {
        label: "PHIC Classification",
        items: [],
      },
      non_phic_classification: {
        label: "Non-PHIC Classification",
        items: [],
      },
    },
  },
  part2: {
    interview_start_time: { label: "" },
    interview_end_time: { label: "" },
    sectoral_grouping: { label: "" },
    educational_attainment: { label: "" },
    religion: { label: "" },
    occupation: { label: "" },
    household_size: { label: "" },
    monthly_income: { label: "" },
    referral_source: { label: "" },
    diagnosis: { label: "" },
    informant_name: { label: "" },
    relationship_to_patient: { label: "" },
  },
};
const fetchDarData = async () => {
  try {
    const response = await getDailyActivityReportById(props.dar_id);
    if (response) {
      darData.value = response;
      console.log("DAR Data", darData.value);
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};
onMounted(async () => {
  await fetchDarData();
});
</script>
<style lang=""></style>
