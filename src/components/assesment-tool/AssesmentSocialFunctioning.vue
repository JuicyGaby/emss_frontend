<template lang="">
  <div>
    <v-container style="width: 1500px">
      <h1>Assesment of Social Functioning</h1>
      <v-divider class="mb-5"></v-divider>
      <v-table density="compact" class="pa-5" fixed-header hover="true">
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
        <tbody class="">
          <h3>Familial Roles</h3>
          <tr v-for="(item, index) in particulars.familialRoles" :key="index">
            <th>
              {{ item.label }}
            </th>
            <th>
              <v-select
                outlined
                density="compact"
                variant="outlined"
                :items="indexItems.interaction_problem"
                item-title="text"
                item-value="value"
                style="width: 200px"
                v-model="socialFunctioning[index].interaction"
              ></v-select>
            </th>
            <th>
              <v-select
                outlined
                density="compact"
                variant="outlined"
                :items="indexItems.severity"
                item-title="text"
                item-value="value"
                style="width: 200px"
                v-model="socialFunctioning[index].severity"
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
                v-model="socialFunctioning[index].duration"
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
                v-model="socialFunctioning[index].coping"
              ></v-select>
            </th>
          </tr>
          <h3>Other Interpersonal Roles</h3>
          <tr
            v-for="(item, index) in particulars.interpersonalRoles"
            :key="index"
          >
            <th>
              {{ item.label }}
            </th>
            <th>
              <v-select
                outlined
                density="compact"
                variant="outlined"
                :items="indexItems.interaction_problem"
                item-title="text"
                item-value="value"
                style="width: 200px"
                v-model="socialFunctioning[index].interaction"
              ></v-select>
            </th>
            <th>
              <v-select
                outlined
                density="compact"
                variant="outlined"
                :items="indexItems.severity"
                item-title="text"
                item-value="value"
                style="width: 200px"
                v-model="socialFunctioning[index].severity"
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
                v-model="socialFunctioning[index].duration"
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
                v-model="socialFunctioning[index].coping"
              ></v-select>
            </th>
          </tr>
          <h3>Occupational Roles</h3>
          <tr
            v-for="(item, index) in particulars.occupationalRoles"
            :key="index"
          >
            <th>
              {{ item.label }}
            </th>
            <th>
              <v-select
                outlined
                density="compact"
                variant="outlined"
                :items="indexItems.interaction_problem"
                item-title="text"
                item-value="value"
                style="width: 200px"
                v-model="socialFunctioning[index].interaction"
              ></v-select>
            </th>
            <th>
              <v-select
                outlined
                density="compact"
                variant="outlined"
                :items="indexItems.severity"
                item-title="text"
                item-value="value"
                style="width: 200px"
                v-model="socialFunctioning[index].severity"
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
                v-model="socialFunctioning[index].duration"
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
                v-model="socialFunctioning[index].coping"
              ></v-select>
            </th>
          </tr>
          <h3>Special Life Situation Roles</h3>
          <tr
            v-for="(item, index) in particulars.specialLifeRoles"
            :key="index"
          >
            <th>
              {{ item.label }}
            </th>
            <th>
              <v-select
                outlined
                density="compact"
                variant="outlined"
                :items="indexItems.interaction_problem"
                item-title="text"
                item-value="value"
                style="width: 200px"
                v-model="socialFunctioning[index].interaction"
              ></v-select>
            </th>
            <th>
              <v-select
                outlined
                density="compact"
                variant="outlined"
                :items="indexItems.severity"
                item-title="text"
                item-value="value"
                style="width: 200px"
                v-model="socialFunctioning[index].severity"
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
                v-model="socialFunctioning[index].duration"
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
                v-model="socialFunctioning[index].coping"
              ></v-select>
            </th>
          </tr>
        </tbody>
      </v-table>
    </v-container>
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
    {{ socialFunctioning }}
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  patientId: Number,
});

const socialFunctioning = ref({
  isExist: false,
  patient_id: props.patientId,
  parent: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  spouse: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  child: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  sibling: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  other_family_member: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  significant_others: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  lover: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  friend: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  neighbor: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  member: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  worker_paid_economy: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  worker_home: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  worker_volunteer: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  student: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  consumer: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  inpatient: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  outpatient: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  er_patient: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  prisoner: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  immigrant_legal: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  immigrant_undocumented: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
  imigrant_refugee: {
    interaction: "",
    severity: "",
    duration: "",
    coping: "",
  },
});

onMounted(async () => {});

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
const tableheaders = [
  "Particulars",
  "Social Interaction Problem",
  "Severity Index",
  "Duration Index",
  "Coping Index",
];
const indexItems = {
  interaction_problem: [
    { text: "Power", value: 1 },
    { text: "Ambivalence", value: 2 },
    { text: "Responsibility", value: 3 },
    { text: "Dependency", value: 4 },
    { text: "Loss", value: 5 },
    { text: "Isolation", value: 6 },
    { text: "Victimization", value: 7 },
    { text: "Mixed Others", value: 8 },
  ],
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
  coping: [
    { text: "Outstanding", value: 1 },
    { text: "Above Average", value: 2 },
    { text: "Adequate", value: 3 },
    { text: "Somewhat Inadequate", value: 4 },
    { text: "Inadequate", value: 5 },
    { text: "No Coping Skills", value: 6 },
  ],
};

const particulars = {
  familialRoles: {
    parent: {
      label: "Parent",
    },
    spouse: {
      label: "Spouse",
    },
    child: {
      label: "Child",
    },
    sibling: {
      label: "Sibling",
    },
    other_family_member: {
      label: "Other Family Member",
    },
    significant_others: {
      label: "Significant Other",
    },
  },
  interpersonalRoles: {
    lover: {
      label: "Lover",
    },
    friend: {
      label: "Friend",
    },
    neighbor: {
      label: "Neigbor",
    },
    member: {
      label: "Member",
    },
  },
  occupationalRoles: {
    worker_paid_economy: {
      label: "Work Paid Economy",
    },
    worker_home: {
      label: "Worker Home",
    },
    worker_volunteer: {
      label: "Worker Volunteer",
    },
    student: {
      label: "Student",
    },
  },
  specialLifeRoles: {
    consumer: {
      label: "Consumer",
    },
    inpatient: {
      label: "Inpatient",
    },
    outpatient: {
      label: "Outpatient",
    },
    er_patient: {
      label: "ER Patient",
    },
    prisoner: {
      label: "Prisoner",
    },
    immigrant_legal: {
      label: "Immigrant Legal",
    },
    immigrant_undocumented: {
      label: "Immigrant undocumented",
    },
    imigrant_refugee: {
      label: "Imigrant Refugee",
    },
  },
};
</script>
<style lang=""></style>
