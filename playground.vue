<template lang="">
  <div>
    <v-card>
      <v-tabs v-model="tabValue" align-tabs="center" density="compact">
        <v-tab :value="1">Part 1</v-tab>
        <v-tab :value="2">Part 2</v-tab>
      </v-tabs>
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
                    style="width: 400px"
                    :type="field.type"
                    v-model="darData[key]"
                  ></v-text-field>
                  <v-select
                    v-for="(field, key) in inputFields.part1.selectFields"
                    :key="key"
                    :label="field.label"
                    :items="field.items"
                    variant="outlined"
                    density="comfortable"
                    style="width: 400px"
                    autocomplete
                    v-model="darData[key]"
                  ></v-select>
                  <v-select
                    v-for="(field, key) in inputFields.part1.titleValueFields"
                    :key="key"
                    :label="field.label"
                    :items="field.items"
                    item-title="title"
                    item-value="value"
                    variant="outlined"
                    density="comfortable"
                    style="width: 400px"
                    autocomplete
                    v-model="darData[key]"
                  ></v-select>
                </v-col>
                <!-- {{ darData }} -->
              </v-row>
            </v-container>
          </v-window-item>
          <v-window-item :value="2">
            <v-container>
              <v-row>
                <v-col cols="12" class="d-flex flex-wrap ga-2">
                  <v-select
                    v-for="(field, key) in inputFields.part2.selectFields"
                    :key="key"
                    :label="field.label"
                    :items="field.items"
                    variant="outlined"
                    density="comfortable"
                    style="width: 400px"
                    autocomplete
                    v-model="darData[key]"
                  ></v-select>
                  <v-text-field
                    v-for="(field, key) in inputFields.part2.textFields"
                    :key="key"
                    :label="field.label"
                    variant="outlined"
                    density="comfortable"
                    style="width: 400px"
                    :type="field.type"
                    v-model="darData[key]"
                  ></v-text-field>
                </v-col>
                <!-- {{ darData }} -->
              </v-row>
            </v-container>
          </v-window-item>
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
onMounted(async () => {
  await fetchDarData();
});
const tabValue = ref(0);
const darData = ref({
  id: props.dar_id,
});
const inputFields = {
  part1: {
    textFields: {
      admission_date: {
        label: "Admission Date",
        type: "datetime-local",
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
      contributor_type: {
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
    },
    titleValueFields: {
      phic_classification: {
        label: "PHIC Classification",
        items: [
          { title: "Financially Capable", value: "A" },
          { title: "Financially Capacitated", value: "B" },
          { title: "Financially Incapable", value: "C1" },
          { title: "Financially Incapacitated", value: "C2" },
          { title: "Indigent - C3", value: "C3" },
          { title: "Indigent - D", value: "D" },
        ],
      },
      non_phic_classification: {
        label: "Non-PHIC Classification",
        items: [
          { title: "Financially Capable", value: "A" },
          { title: "Financially Capacitated", value: "B" },
          { title: "Financially Incapable", value: "C1" },
          { title: "Financially Incapacitated", value: "C2" },
          { title: "Indigent - C3", value: "C3" },
          { title: "Indigent - D", value: "D" },
        ],
      },
    },
  },
  part2: {
    textFields: {
      religion: {
        label: "Religion",
      },
      occupation: {
        label: "Occupation",
      },
      household_size: {
        label: "Household Size",
      },
      monthly_income: {
        label: "Monthly Income",
      },
      referral_source: {
        label: "Referral Source",
      },
      diagnosis: {
        label: "Diagnosis",
      },
      informant_name: {
        label: "Informant Name",
      },
      relationship_to_patient: {
        label: "Relationship to Patient",
      },
      interview_start_time: {
        label: "Interview Start Time",
        type: "time",
      },
      interview_end_time: {
        label: "Interview End Time",
        type: "time",
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
      educational_attainment: {
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
  },
};
const fetchDarData = async () => {
  const response = await getDailyActivityReportById(props.dar_id);
  darData.value = response;
  darData.value.admission_date = new Date(response.admission_date)
    .toISOString()
    .slice(0, 16);
};
</script>
<style lang=""></style>
