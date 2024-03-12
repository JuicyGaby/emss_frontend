<template lang="">
  <div>
    <v-container style="width: 1000px">
      <h2>MSWD Classification:</h2>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            label="Main Classification"
            v-model="mswdClassification.main_classification_type"
            :items="inputFields.mainClassification.items"
            item-title="text"
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
            chips
            multiple
            v-model="mswdClassification.membership_to_marginalized_sector"
            :label="inputFields.sectors.label"
            :items="inputFields.sectors.items"
            variant="outlined"
            hint="Specify Other"
          ></v-combobox>
          <v-textarea
            v-model="mswdClassification.remarks"
            :label="inputFields.remarks.label"
            variant="outlined"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-btn
        v-if="!mswdClassification.haveClassification"
        color="secondary"
        @click="createMswdClassificationData"
        >Create MSWD Classification</v-btn
      >
      <v-btn
        v-if="mswdClassification.haveClassification"
        color="secondary"
        class=""
        @click="updateMswdClassificationData"
        >Update MSWD Classification</v-btn
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
import {
  getMswdClassification,
  createMswdClassification,
  updateMswdClassification,
} from "@/api/assesment-tool";

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

const props = defineProps({
  patientId: Number,
});

let mswdClassification = ref({
  main_classification_type: null,
  sub_classification_type: null,
  membership_to_marginalized_sector: [],
  remarks: null,
});

const inputFields = ref({
  mainClassification: {
    label: "Main Classification",
    items: [
      { text: "Financially Capable", value: "A" },
      { text: "Financially Capacitated", value: "B" },
      { text: "Financially Incapable", value: "C1" },
      { text: "Financially Incapacitated", value: "C2" },
      { text: "Indigent", value: "C3" },
    ],
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
    ],
    data: null,
  },
  remarks: {
    label: "Remarks",
    data: null,
  },
});

onMounted(async () => {
  await fetchMswdClassification();
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
  console.log(response);
};

const fetchMswdClassification = async () => {
  const response = await getMswdClassification(props.patientId);
  mswdClassification.value = response;
};
</script>
<style lang=""></style>
