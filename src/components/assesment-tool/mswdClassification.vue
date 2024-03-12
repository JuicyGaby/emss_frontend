<template lang="">
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
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
      <v-btn v-if="mswdClassification.haveClassification" color="secondary" class="" @click="updateMswdClassificationData"
        >Update MSWD Classification</v-btn
      >
      {{ mswdClassification }}
    </v-container>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import {
  getMswdClassification,
  createMswdClassification,
  updateMswdClassification,
} from "@/api/assesment-tool";
const props = defineProps({
  patientId: Number,
});

const classficationEmpty = ref(false);
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

const updateMswdClassificationData = () => {
  console.log(mswdClassification);
};

const createMswdClassificationData = async () => {
  mswdClassification.value.patient_id = props.patientId;
  const response = await createMswdClassification(mswdClassification.value);
  mswdClassification.value.haveClassification = true;

  console.log(response);
};

const fetchMswdClassification = async () => {
  const response = await getMswdClassification(props.patientId);
  if (!response) {
    classficationEmpty.value = true;
    return;
  }
  mswdClassification.value = response;
};
</script>
<style lang=""></style>
