<template lang="">
  <div>
    <v-container style="width: 1000px">
      <h1>Safety</h1>
      <v-divider class="mb-5"></v-divider>
      <v-table>
        <thead>
          <tr>
            <th
              v-for="(header, index) in tableheaders"
              :key="index"
              class="text-left"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(field, key) in particulars" :key="key">
            <th>{{ field.label }}</th>
            <th>
              <v-select
                outlined
                density="compact"
                variant="outlined"
                :items="indexItems.severity"
                item-title="text"
                item-value="value"
                style="width: 200px"
                v-model="safetyData[key].severity"
              ></v-select>
            </th>
            <th>
              <v-select
                outlined
                density="compact"
                variant="outlined"
                :items="indexItems.duration"
                item-title="text"
                item-value="value"
                style="width: 200px"
                v-model="safetyData[key].duration"
              ></v-select>
            </th>
            <th>
              <v-select
                outlined
                density="compact"
                variant="outlined"
                :items="indexItems.coping"
                item-title="text"
                item-value="value"
                style="width: 200px"
                v-model="safetyData[key].coping"
              ></v-select>
            </th>
          </tr>
        </tbody>
      </v-table>
      <v-btn
        :prepend-icon="safetyData.isExist ? 'mdi-update' : 'mdi-content-save'"
        color="secondary"
        @click="safetyData.isExist ? updateSafetyItem() : createSafetyItem()"
        >{{
          safetyData.isExist ? "Update Safety Data" : "Create Safety Data"
        }}</v-btn
      >
    </v-container>
    <!-- {{ safetyData }} -->
  </div>
  <snackBars :snackBarData="snackBarData" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import { handleSnackBar } from "@/utils/constants";
import { userAuthentication } from "@/stores/session";
import snackBars from "../dialogs/snackBars.vue";
import { getSafety, createSafety, updateSafety } from "@/api/assesment-tool";
const props = defineProps({
  patientId: Number,
});

const snackBarData = ref({});
const authentication = userAuthentication();
const safetyData = ref({
  isExist: false,
  patient_id: props.patientId,
  social_worker: `${authentication.user.fname} ${authentication.user.lname}`,
  voice_crime_in_community: {
    severity: "",
    duration: "",
    coping: "",
  },
  unsafe_working_conditions: {
    severity: "",
    duration: "",
    coping: "",
  },
  unsafe_codition_home: {
    severity: "",
    duration: "",
    coping: "",
  },
  absence_of_adequate_safety_services: {
    severity: "",
    duration: "",
    coping: "",
  },
  natural_disasters: {
    severity: "",
    duration: "",
    coping: "",
  },
  human_created_disasters: {
    severity: "",
    duration: "",
    coping: "",
  },
});
const tableheaders = [
  "Particulars",
  "Severity Index",
  "Duration Index",
  "Coping Index",
];
const indexItems = {
  severity: [
    { text: "No Problem", value: 1 },
    { text: "Low", value: 2 },
    { text: "Moderate", value: 3 },
    { text: "High", value: 4 },
    { text: "Very High", value: 5 },
    { text: "Catastropic", value: 4 },
  ],
  duration: [
    { text: "More than 5 years", value: 1 },
    { text: "1 to 5 years", value: 2 },
    { text: "6 months to 1 year", value: 3 },
    { text: "1 to 6 months", value: 4 },
    { text: "2 weeks to 1 month", value: 5 },
    { text: "less than 2 weeks", value: 6 },
    { text: "Not Applicable", value: 7 },
  ],
  coping: [
    { text: "Outstanding", value: 1 },
    { text: "Above Average", value: 2 },
    { text: "Adequate", value: 3 },
    { text: "Somewhat Inadequate", value: 4 },
    { text: "Inadequate", value: 5 },
    { text: "No Coping Skills", value: 6 },
    { text: "Not Applicable", value: 7 },
  ],
};
const particulars = {
  voice_crime_in_community: {
    label: "Violence or Crime in Community",
  },
  unsafe_working_conditions: {
    label: "Unsafe Working Conditions",
  },
  unsafe_codition_home: {
    label: "Unsafe Condition in Home",
  },

  absence_of_adequate_safety_services: {
    label: "Absence of Adequate Safety Services",
  },
  natural_disasters: {
    label: "Natural Disasters",
  },
  human_created_disasters: {
    label: "Human Created Disasters",
  },
};

const createSafetyItem = async () => {
  safetyData.value.activity = "Created Safety Data";
  const response = await createSafety(safetyData.value);
  if (response) {
    safetyData.value = response;
    snackBarData.value = handleSnackBar(
      "success",
      "Safety Data Created Successfully"
    );
    safetyData.value.isExist = true;
    safetyData.value.social_worker = `${authentication.user.fname} ${authentication.user.lname}`;
  }
};
const updateSafetyItem = async () => {
  safetyData.value.activity = "Updated Safety Data";
  const response = await updateSafety(safetyData.value);
  if (response) {
    snackBarData.value = handleSnackBar("success", "Updated Safety Data");
  }
};
const fetchSafetyData = async () => {
  const response = await getSafety(props.patientId);
  if (response) {
    safetyData.value = response;
    safetyData.value.isExist = true;
    safetyData.value.social_worker = `${authentication.user.fname} ${authentication.user.lname}`;
  }
};

onMounted(async () => {
  await fetchSafetyData();
});
</script>
<style lang="css"></style>
