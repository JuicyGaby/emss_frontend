<template>
  <v-stepper alt-labels :items="stepperItems">
    <template v-slot:[`item.1`]>
      <v-card class="text-center" title="Interview" flat>
        <v-card-text class="">
          <interview @interviewData="handleInterviewData"></interview>
        </v-card-text>
      </v-card>
    </template>
    <template v-slot:[`item.2`]>
      <v-card class="text-center" flat>
        <v-card-text class="">
          <demographic_data @personalData="handlePersonalData"></demographic_data>
        </v-card-text>
      </v-card>
    </template>
    <template v-slot:[`item.3`]>
      <v-card title="Step Three" flat>
        <v-btn color="success" @click="printData">print data</v-btn>
      </v-card>
    </template>
  </v-stepper>
</template>
<script setup>
import { ref } from "vue";
import interview from "@/components/assesment-tool/interview.vue";
import demographic_data from "@/components/assesment-tool/patient_demographic_data/demographic-data.vue";

const dataReceived = {
  interview: ref({}),
  demographicData: ref({}),
};

const handleInterviewData = (data) => {
  dataReceived.interview = data;
};
const handlePersonalData = (data) => {
  dataReceived.demographicData = data;
};

const printData = () => {
  console.log(dataReceived.interview);
};

const stepperItems = ["Interview", "Personal Data", "Create Patient"];
</script>
