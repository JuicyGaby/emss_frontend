<template lang="">
  <div class="">
    <v-container>
        <h2>Initial Interview</h2>
        <v-divider class="mb-5"></v-divider>
    </v-container>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getInterview } from "@/api/assesment-tool";
const props = defineProps({
  patientId: Number,
});
onMounted(async () => {
  await getInterviewData();
});
let interviewData = ref({});

const inputField1 = ref({
  interview_date: {
    label: "Interview Date",
    type: "text",
    value: "",
  },
  interview_time: {
    label: "Interview Time",
    type: "text",
    value: "",
  },
  admission_date_and_time: {
    label: "Admission Date-Time",
    type: "text",
    value: "",
  },
  basic_ward: {
    label: "Basic Ward",
    type: "text",
    value: "",
  },
  nonbasic_ward: {
    label: "Non-Basic Ward",
    type: "text",
    value: "",
  },
  health_record_number: {
    label: "Health Record Number",
    type: "text",
    value: "",
  },
  mswd_number: {
    label: "MSWD Number",
    type: "text",
    value: "",
  },
});
const inputField2 = {
  source_of_referral: {
    label: "Source of Referral",
    type: "text",
    value: "",
  },
  referring_party: {
    label: "Referring Party",
    type: "text",
    value: "",
  },
  address: {
    label: "Referal Address",
    type: "text",
    value: "",
  },
  contact_number: {
    label: "Referal Contact Number",
    type: "number",
    value: "",
  },
  informant: {
    label: "Informant",
    type: "text",
    value: "",
  },

  relationship_to_patient: {
    label: "Informant relationship to Patient",
    type: "text",
    value: "",
  },
  informant_contact_number: {
    label: "Informant Contact Number",
    type: "number",
    value: "",
  },
  informant_address: {
    label: "Informant Address",
    type: "text",
    value: "",
  },
};

const getInterviewData = async () => {
  const response = await getInterview(props.patientId);
  interviewData.value = response;
  console.log(response);
};
</script>
<style lang="css" scoped>
.rb {
  border: 1px solid red;
}
</style>
