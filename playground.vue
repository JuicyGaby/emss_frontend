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
      </v-window-item>
      <v-window-item :value="2">
        <v-container style="width: 1500px">
          <h1>Problems in the Environment</h1>
          <v-divider class="bm-5"></v-divider>
          <v-row>
            <v-col
              cols="12"
              v-for="(field, key) in inputFields.comboBox"
              :key="key"
            >
              <v-combobox
                chips
                multiple
                clearable
                closable-chips
                variant="outlined"
                :label="field.label"
                :items="field.items"
                v-model="problemsInEnvironment[key]"
              ></v-combobox>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="4"
              v-for="(field, key) in inputFields.textArea"
              :key="key"
            >
              <v-textarea
                variant="outlined"
                :label="field.label"
                v-model="problemsInEnvironment[key]"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="4"
              v-for="(field, key) in inputFields.textField"
              :key="key"
            >
              <v-text-field
                variant="outlined"
                :label="field.label"
                v-model="problemsInEnvironment[key]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn color="secondary" @click="handleButtonAction">{{
            problemsInEnvironment.isExist ? "Update Data" : "Create Data"
          }}</v-btn>
        </v-container>
      </v-window-item>
    </v-window>
    <v-snackbar
      v-for="(bar, key) in snackBars"
      :key="key"
      color="green"
      location="top"
      :timeout="2500"
      min-width="250px"
      v-model="bar.isActive"
    >
      <div class="d-flex justify-center align-center ga-2">
        <v-icon icon="mdi-check-bold"></v-icon>
        <p class="text-subtitle-1">{{ bar.text }}</p>
      </div>
    </v-snackbar>
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
onMounted(async () => {
  await fetchProblemsInEnvironmentItem();
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
const inputFields = {
  comboBox: {
    problems_presented: {
      label: "Problems Presented At Intake",
      items: [
        "Housing",
        "Medical Management",
        "Food/Nutrition",
        "Lack of knowledge/information about where to get medical assistance",
        "Employment",
        "Lack of knowledge/information about hospital protocol",
        "Economic Resources",
        "No immediate family members to assist the patient",
        "Health Condition of the Patient",
      ],
    },
    reasons_psychosocial_counselling: {
      label: "Reasons for Psychosocial Counselling",
      items: [
        "Anxiety of feelings of helplessness about the treatment expenses",
        "Large family as reason for not being able to provide for their economic needs",
        "Anxiety over illness and treatment",
        "Complacency and dependency for assistance",
        "Unsure and unprepared for the responsibilities of parenting including young parents’ issues",
        "Environment/role adjustment problem",
        "Confusion about the delivery system",
        "Unfounded fear of death, disfigurement",
        "Stress of patient’s relatives",
        "Emotional disturbance/imbalance",
        "Aggressiveness/hostility/stubbornness and demanding traits",
        "Inadequate/absence of affectional support system",
        "Inadequate/absence of coping skills for problem solving and decision making",
        "Marital and family relationship issues",
        "Worried about the loss of income because of illness",
        "Responsibility type of social interaction problem",
        "Refusal to follow rules and hospital policies",
        "Lack of confidence about support of partner",
        "Poor compliance to the doctors ‘instructions",
        "Victim of abuse",
        "Going home against medical advice",
        "Advocacy for patient’s rights on work-related and medico-legal issues",
        "Suicide and self-inflected injuries",
        "Alcohol, cigarette and other substance abuse",
      ],
    },
  },
  textArea: {
    assesment_findings: {
      label: "Assesment Findings",
    },
    recommended_intervention: {
      label: "Recommended Intervention",
    },
    action_taken: {
      label: "Action Taken",
    },
  },
  textField: {
    person_emergency: {
      label: "Person to be notified in case of emergency",
    },
    relationship_to_patient: {
      label: "Relation to the patient",
    },
    address: {
      label: "Address",
    },
    contact_number: {
      label: "Contact Number",
    },
    interviewed_by: {
      label: "Interviewer",
    },
  },
};
const createProblemsInEnvironmentItem = async () => {
  const response = await createProblemsInEnvironment(
    problemsInEnvironment.value
  );
  if (response) {
    console.log("created", response);
    problemsInEnvironment.value.isExist = true;
    handleSnackBar("create");
  }
};
const updateProblemsInEnvironmentItem = async () => {
  const response = await updateProblemsInEnvironment(
    problemsInEnvironment.value
  );
  if (response) {
    console.log("updated", response);
    handleSnackBar("update");
  }
};
const fetchProblemsInEnvironmentItem = async () => {
  const response = await getProblemsInEnvironment(props.patientId);
  if (response) {
    
    handlePatientData(response);
  }
};
const handleButtonAction = async () => {
  if (problemsInEnvironment.value.isExist) {
    await updateProblemsInEnvironmentItem();
    return;
  }
  await createProblemsInEnvironmentItem();
};
const handlePatientData = (response) => {
  problemsInEnvironment.value = response;
  if (problemsInEnvironment.value.problems_presented === "") {
    problemsInEnvironment.value.problems_presented = null;
  }
  if (problemsInEnvironment.value.reasons_psychosocial_counselling === "") {
    problemsInEnvironment.value.reasons_psychosocial_counselling = null;
  }
  problemsInEnvironment.value.isExist = true;
};
</script>
<style lang="css"></style>
