<template lang="">
  <v-container style="width: 900px">
    <v-row>
      <v-col cols="12" class="d-flex ga-2 flex-wrap">
        <template v-for="(value, index) in inputFields">
          <v-text-field
            v-if="value.formType === 'text'"
            :key="'text-' + index"
            :label="value.label"
            :hide-spin-buttons="true"
            variant="outlined"
            :type="value.type"
            style="width: 400px"
            :rules="value.rules"
            density="compact"
            v-model="interviewInputs[index]"
          ></v-text-field>
          <v-combobox
            v-else-if="value.formType === 'select'"
            :key="'select-' + index"
            :label="value.label"
            variant="outlined"
            style="width: 400px"
            density="compact"
            :items="value.items"
            v-model="interviewInputs[index]"
          ></v-combobox>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import moment from "moment";
import { area, sourceOfReferral, departments } from "@/utils/constants";
import { ref, watchEffect } from "vue";

const emit = defineEmits(["interviewData"]);
const interviewInputs = ref({
  interview_date_time: moment().format("YYYY-MM-DDTHH:mm"),
  admission_date_time: moment().format("YYYY-MM-DDTHH:mm"),
});

watchEffect(() => {
  const interviewInputsCopy = Object.keys(interviewInputs.value).reduce(
    (acc, key) => {
      acc[key] = interviewInputs.value[key];
      return acc;
    },
    {}
  );
  emit("interviewData", interviewInputsCopy);
});
const inputFields = {
  interview_date_time: {
    label: "Interview Date and Time",
    type: "datetime-local",
    formType: "text",
  },
  admission_date_time: {
    label: "Admission Date Time",
    type: "datetime-local",
    formType: "text",
  },
  area: {
    label: "Area",
    formType: "select",
    items: area,
  },
  departments: {
    label: "Department",
    formType: "select",
    items: departments,
  },
  health_record_number: {
    label: "Health Record Number",
    type: "number",
    formType: "text",
  },
  mswd_number: {
    label: "MSWD Number",
    type: "number",
    formType: "text",
  },
  source_of_referral: {
    label: "Source of Referral",
    formType: "select",
    items: sourceOfReferral,
  },
  referring_party: {
    label: "Name Of Referring Party",
    type: "text",
    formType: "text",
  },
  address: {
    label: "Address",
    type: "text",
    formType: "text",
  },
  contact_number: {
    label: "Contact Number",
    type: "number",
    formType: "text",
  },
  informant: {
    label: "Informant",
    type: "text",
    formType: "text",
  },
  relationship_to_patient: {
    label: "Relationship to Patient",
    formType: "select",
    items: [
      "Friends",
      "Workmates",
      "Neighbors",
      "Relatives",
      "Spouse",
      "Children",
      "Parents",
      "Siblings",
      "Others",
    ],
  },
  informant_contact_number: {
    label: "Informant Contact Number",
    type: "number",
    formType: "text",
  },
  informant_address: {
    label: "Informant Address",
    type: "text",
    formType: "text",
  },
};
</script>
<style lang="css">
.reb {
  border: 1px solid red;
}
</style>
