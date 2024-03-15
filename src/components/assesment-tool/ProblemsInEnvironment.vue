<template lang="">
  <div>
    <v-tabs
      class="tabs"
      v-model="tab"
      align-tabs="center"
      color="black"
      density="compact"
    >
      <v-tab
        v-for="(header, index) in tabHeaders"
        :value="header.value"
        :key="index"
      >
        {{ header.title }}
      </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item :value="1">
        <v-container style="width: 1000px">
          <h1>Problems in the Environment</h1>
          <v-divider class="mb-5"></v-divider>
          <v-table>
            <thead>
              <tr>
                <th v-for="(header, index) in tableHeaders" :key="index">
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <th>Food and Nutrition</th>
              <tr
                v-for="(particular, index) in particulars.foodNutrition"
                :key="index"
              >
                <td>{{ particular.label }}</td>
                <td>
                  <v-select
                    density="compact"
                    variant="outlined"
                    :items="indexItems.severity"
                    item-title="text"
                    item-value="value"
                    style="width: 200px"
                    v-model="problemsInEnvironment[index].severity"
                  ></v-select>
                </td>
                <td>
                  <v-select
                    outlined
                    density="compact"
                    variant="outlined"
                    :items="indexItems.duration"
                    item-title="text"
                    item-value="value"
                    style="width: 200px"
                    v-model="problemsInEnvironment[index].duration"
                  ></v-select>
                </td>
              </tr>
              <th>Shelter</th>
              <tr
                v-for="(particular, index) in particulars.shelter"
                :key="index"
              >
                <td>{{ particular.label }}</td>
                <td>
                  <v-select
                    outlined
                    density="compact"
                    variant="outlined"
                    :items="indexItems.severity"
                    item-title="text"
                    item-value="value"
                    style="width: 200px"
                    v-model="problemsInEnvironment[index].severity"
                  ></v-select>
                </td>
                <td>
                  <v-select
                    outlined
                    density="compact"
                    variant="outlined"
                    :items="indexItems.duration"
                    item-title="text"
                    item-value="value"
                    style="width: 200px"
                    v-model="problemsInEnvironment[index].duration"
                  ></v-select>
                </td>
              </tr>
              <th>Employment</th>
              <tr
                v-for="(particular, index) in particulars.employment"
                :key="index"
              >
                <td>{{ particular.label }}</td>
                <td>
                  <v-select
                    outlined
                    density="compact"
                    variant="outlined"
                    :items="indexItems.severity"
                    item-title="text"
                    item-value="value"
                    style="width: 200px"
                    v-model="problemsInEnvironment[index].severity"
                  ></v-select>
                </td>
                <td>
                  <v-select
                    outlined
                    density="compact"
                    variant="outlined"
                    :items="indexItems.duration"
                    item-title="text"
                    item-value="value"
                    style="width: 200px"
                    v-model="problemsInEnvironment[index].duration"
                  ></v-select>
                </td>
              </tr>
              <th>Economic Resource</th>
              <tr
                v-for="(particular, index) in particulars.economicResource"
                :key="index"
              >
                <td>{{ particular.label }}</td>
                <td>
                  <v-select
                    outlined
                    density="compact"
                    variant="outlined"
                    :items="indexItems.severity"
                    item-title="text"
                    item-value="value"
                    style="width: 200px"
                    v-model="problemsInEnvironment[index].severity"
                  ></v-select>
                </td>
                <td>
                  <v-select
                    outlined
                    density="compact"
                    variant="outlined"
                    :items="indexItems.duration"
                    item-title="text"
                    item-value="value"
                    style="width: 200px"
                    v-model="problemsInEnvironment[index].duration"
                  ></v-select>
                </td>
              </tr>
              <th>Transportation</th>
              <tr
                v-for="(particular, index) in particulars.transportation"
                :key="index"
              >
                <td>{{ particular.label }}</td>
                <td>
                  <v-select
                    outlined
                    density="compact"
                    variant="outlined"
                    :items="indexItems.severity"
                    item-title="text"
                    item-value="value"
                    style="width: 200px"
                    v-model="problemsInEnvironment[index].severity"
                  ></v-select>
                </td>
                <td>
                  <v-select
                    outlined
                    density="compact"
                    variant="outlined"
                    :items="indexItems.duration"
                    item-title="text"
                    item-value="value"
                    style="width: 200px"
                    v-model="problemsInEnvironment[index].duration"
                  ></v-select>
                </td>
              </tr>
              <th>Affectional Support System</th>
              <tr
                v-for="(
                  particular, index
                ) in particulars.affectionalSupportSystem"
                :key="index"
              >
                <td>{{ particular.label }}</td>
                <td>
                  <v-select
                    outlined
                    density="compact"
                    variant="outlined"
                    :items="indexItems.severity"
                    item-title="text"
                    item-value="value"
                    style="width: 200px"
                    v-model="problemsInEnvironment[index].severity"
                  ></v-select>
                </td>
                <td>
                  <v-select
                    outlined
                    density="compact"
                    variant="outlined"
                    :items="indexItems.duration"
                    item-title="text"
                    item-value="value"
                    style="width: 200px"
                    v-model="problemsInEnvironment[index].duration"
                  ></v-select>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-container>
        {{ problemsInEnvironment}}
      </v-window-item>
      <v-window-item :value="2">2</v-window-item>
    </v-window>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import {
  getProblemsInEnvironment,
  createProblemsInEnvironment,
  updateProblemsInEnvironment,
} from "@/api/assesment-tool";
const props = defineProps({
  patientId: Number,
});
const problemsInEnvironment = ref({
  isExist: false,
  patient_id: props.patientId,
  lack_regular_food: {
    severity: "",
    duration: "",
  },
  nutritionally_inadequate_food: {
    severity: "",
    duration: "",
  },
  documented_malnutrition: {
    severity: "",
    duration: "",
  },
  absence_of_shelter: {
    severity: "",
    duration: "",
  },
  inadequate_shelter: {
    severity: "",
    duration: "",
  },
  unemployment: {
    severity: "",
    duration: "",
  },
  underemployment: {
    severity: "",
    duration: "",
  },
  inappropiate_employment: {
    severity: "",
    duration: "",
  },
  insufficient_community_resources: {
    severity: "",
    duration: "",
  },
  insufficient_provide_resources: {
    severity: "",
    duration: "",
  },
  no_personal_transportation: {
    severity: "",
    duration: "",
  },
  absence_of_affectional_support: {
    severity: "",
    duration: "",
  },
  inadequate_support_system: {
    severity: "",
    duration: "",
  },
  excessive_support_system: {
    severity: "",
    duration: "",
  },
});
const snackBars = ref({
  update: {
    isActive: false,
    text: "Data Updated",
  },
  create: {
    isActive: false,
    text: "Data Created",
  },
});
const handleSnackBar = (type) => {
  snackBars.value[type].isActive = true;
};

const tab = ref(0);
const tabHeaders = [
  { title: "slide1", value: 1 },
  { title: "slide2", value: 2 },
];
const tableHeaders = ["Particulars", "Severity Index", "Duration Index"];
const particulars = {
  foodNutrition: {
    lack_regular_food: {
      label: "Lack of regular food supply",
    },
    nutritionally_inadequate_food: {
      label: "Nutritionally inadequate food supply",
    },
    documented_malnutrition: {
      label: "Documented malnutrition",
    },
  },
  shelter: {
    absence_of_shelter: {
      label: "Absence of shelter",
    },
    inadequate_shelter: {
      label: "Substandard or inadequate shelter",
    },
  },
  employment: {
    unemployment: {
      label: "Unemployment",
    },
    underemployment: {
      label: "Underemployment",
    },
    inappropiate_employment: {
      label: "Inappropriate employment",
    },
  },
  economicResource: {
    insufficient_community_resources: {
      label: "Insufficient community resources for basic sustenance",
    },
    insufficient_provide_resources: {
      label:
        "Insufficient resources in the community to provide for needed services beyond",
    },
  },
  transportation: {
    no_personal_transportation: {
      label: "No personal/public transportation to job/needed services",
    },
  },
  affectionalSupportSystem: {
    absence_of_affectional_support: {
      label: "Absence of affectional support system",
    },
    inadequate_support_system: {
      label: "Support system inadequate to meet affectional needs",
    },
    excessive_support_system: {
      label: "exccessive involved support system",
    },
  },
};

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
  ],
};

const handleButtonAction = async () => {};
const handlePatientData = (response) => {
  problemsInEnvironment.value = response;
  problemsInEnvironment.value.isExist = true;
};
</script>
<style lang="css"></style>
