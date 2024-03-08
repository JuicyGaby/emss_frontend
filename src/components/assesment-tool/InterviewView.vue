<template lang="">
  <div class="">
    <v-form>
      <v-container>
        <h2>Initial Interview</h2>
        <v-divider class="mb-5"></v-divider>
        <v-row>
          <v-col cols="3">
            <v-text-field
              v-for="(field, key) in inputField1"
              :key="key"
              :label="field.label"
              :type="field.type"
              v-model="interviewData[key]"
              variant="outlined"
              style="min-width: 300px"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-for="(field, key) in inputField2"
              :key="key"
              :label="field.label"
              :type="field.type"
              v-model="interviewData[key]"
              variant="outlined"
              style="min-width: 300px"
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>
        <h2>Remarks:</h2>
        <v-divider class="mb-5"></v-divider>
        <v-row>
          <v-col cols="6">
            <v-textarea
              v-model="interviewData.remarks"
              outlined
              rows="5"
              auto-grow
              style="min-width: 300px"
              variant="outlined"
              counter="255"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-btn color="primary">Update Interview</v-btn>
      </v-container>
    </v-form>
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
  },
  interview_time: {
    label: "Interview Time",
    type: "text",
  },
  admission_date_and_time: {
    label: "Admission Date-Time",
    type: "text",
  },
  basic_ward: {
    label: "Basic Ward",
    type: "text",
  },
  nonbasic_ward: {
    label: "Non-Basic Ward",
    type: "text",
  },
  health_record_number: {
    label: "Health Record Number",
    type: "text",
  },
  mswd_number: {
    label: "MSWD Number",
    type: "text",
  },
  referring_party: {
    label: "Referring Party",
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
