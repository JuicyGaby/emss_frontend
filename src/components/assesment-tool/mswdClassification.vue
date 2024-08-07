<template lang="">
  <div>
    <v-container style="width: 1000px">
      <v-alert
        title="MSWD Classification Form : "
        type="info"
        variant="tonal"
      ></v-alert>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            label="Main Classification"
            v-model="mswdClassification.main_classification_type"
            :items="inputFields.mainClassification.items"
            item-title="title"
            item-value="value"
            variant="outlined"
            density="comfortable"
            clearable
          >
          </v-autocomplete>
          <v-autocomplete
            v-model="mswdClassification.sub_classification_type"
            :label="inputFields.subClassification.label"
            density="comfortable"
            variant="outlined"
            clearable
            :items="inputFields.subClassification.items"
          >
          </v-autocomplete>
          <v-combobox
            multiple
            chips
            closable-chips
            variant="outlined"
            label="Sectors"
            :items="inputFields.sectors.items"
            v-model="mswdClassification.membership_to_marginalized_sector"
            hint="Specify Other"
          >
          </v-combobox>
          <v-textarea
            v-model="mswdClassification.remarks"
            :label="inputFields.remarks.label"
            variant="outlined"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-btn
        :prepend-icon="
          mswdClassification.isExisting ? 'mdi-update' : 'mdi-content-save'
        "
        color="secondary"
        @click="handleButtonAction"
        >{{
          mswdClassification.isExisting
            ? "Update Classification"
            : "Create Classification"
        }}</v-btn
      >
    </v-container>
  </div>
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
</template>
<script setup>
import { ref, onMounted } from "vue";
import { userAuthentication } from "@/stores/session";
import { mssClassification } from "@/utils/constants";

import {
  getMswdClassification,
  createMswdClassification,
  updateMswdClassification,
} from "@/api/assesment-tool";

const props = defineProps({
  patientId: Number,
});
onMounted(async () => {
  await fetchMswdClassification();
});
const authentication = userAuthentication();

const classficationEmpty = ref(false);

const snackBars = ref({
  update: {
    isActive: false,
    text: "MSWD Classification Updated",
  },
  create: {
    isActive: false,
    text: "MSWD Classification Created",
  },
});

const mswdClassification = ref({
  patient_id: props.patientId,
  social_worker: `${authentication.user.fname} ${authentication.user.lname}`,
  isExisting: false,
});

const inputFields = ref({
  mainClassification: {
    label: "MSS Classification",
    items: mssClassification,
  },
  subClassification: {
    label: "Sub Classification",
    items: ["C1", "C2", "C3", "D"],
    data: null,
  },
  sectors: {
    label: "Sectors",
    items: [
      "Artisanal Fisher folk",
      "Farmer and Landless Rural Worker",
      "Urban Poor",
      "Indigenous Peoples",
      "Senior Citizen",
      "Formal Labor and Migrant Workers",
      "Workers in Informal Sector",
      "PWD",
      "Victims of Disaster and Calamity",
      "Children in need of special protection",
      "Youth in need of special protection",
      "Women in especially difficult circumstance",
      "Family Head & Other Needy Adult",
      "Personnel",
      "Personnel dependent",
      "4Ps",
      "Government employee",
      "None",
      "Not Applicable",
    ],
    data: null,
  },
  remarks: {
    label: "Remarks",
    data: null,
  },
});

const updateMswdClassificationData = async () => {
  const response = await updateMswdClassification(mswdClassification.value);
  console.log("updated", response);
  snackBars.value.update.isActive = true;
};
const createMswdClassificationData = async () => {
  mswdClassification.value.patient_id = props.patientId;
  const response = await createMswdClassification(mswdClassification.value);
  mswdClassification.value.haveClassification = true;
  snackBars.value.create.isActive = true;
  mswdClassification.value.isExisting = true;
  console.log(response);
};
const handleButtonAction = async () => {
  if (!mswdClassification.value.isExisting) {
    await createMswdClassificationData();
    return;
  }
  await updateMswdClassificationData();
};
const fetchMswdClassification = async () => {
  const response = await getMswdClassification(props.patientId);
  if (!response) {
    console.log("No MSWD Classification");
    return;
  }
  mswdClassification.value = response;
  if (mswdClassification.value.membership_to_marginalized_sector === "") {
    mswdClassification.value.membership_to_marginalized_sector = null;
  }
  mswdClassification.value.isExisting = true;
  mswdClassification.value.social_worker = `${authentication.user.fname} ${authentication.user.lname}`;
};
</script>
<style lang=""></style>
