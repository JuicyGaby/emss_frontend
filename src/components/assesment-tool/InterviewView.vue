<template lang="">
  <div class="d-flex justify-center align-center">
    <v-form ref="formValidation">
      <v-container class="interview">
        <h2>Initial Interview</h2>
        <v-divider class="mb-5"></v-divider>
        <v-row>
          <v-col cols="12" class="d-flex ga-2 flex-wrap">
            <v-text-field
              v-for="(field, key) in inputField"
              :key="key"
              :label="field.label"
              :type="field.type"
              variant="outlined"
              style="width: 300px"
              density="compact"
              v-model="interviewData[key]"
            ></v-text-field>
          </v-col>
        </v-row>
        <h2>Remarks:</h2>
        <v-divider class="mb-5"></v-divider>
        <v-row>
          <v-col cols="12" class="mb-2">
            <v-textarea
              v-model="interviewData.remarks"
              label="Remarks"
              rows="5"
              auto-grow
              style="min-width: 300px"
              :rules="inputRules.remarks"
              variant="outlined"
              counter="255"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-btn color="secondary" @click="updatePatientInterview"
          >Update Interview</v-btn
        >
        <v-snackbar
          color="green"
          location="top"
          v-model="snackBars.update.isActive"
          :timeout="snackBars.update.timeout"
        >
          <div class="d-flex justify-center align-center ga-2">
            <v-icon icon="mdi-check-bold"></v-icon>
            <p>{{ snackBars.update.text }}</p>
          </div>
        </v-snackbar>
      </v-container>
    </v-form>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getInterview, updateInterview } from "@/api/assesment-tool";
const props = defineProps({
  patientId: Number,
});

const formValidation = ref(null);
let interviewData = ref({});
const snackBars = ref({
  update: {
    isActive: false,
    text: "Successfully updated patient's interview data",
    timeout: 2500,
  },
});
const inputRules = {
  remarks: [
    (v) =>
      v == null ||
      v.length <= 255 ||
      "Remarks must be less than 255 characters",
  ],
};
const inputField = ref({
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
  },
  source_of_referral: {
    label: "Source of Referral",
    type: "text",
  },
  address: {
    label: "Referal Address",
    type: "text",
  },
  contact_number: {
    label: "Referal Contact Number",
    type: "text",
  },
  informant: {
    label: "Informant",
    type: "text",
  },
  relationship_to_patient: {
    label: "Informant relationship to Patient",
    type: "text",
  },
  informant_contact_number: {
    label: "Informant Contact Number",
    type: "text",
  },
  informant_address: {
    label: "Informant Address",
    type: "text",
  },
});
onMounted(async () => {
  await getInterviewData();
});
const getInterviewData = async () => {
  const response = await getInterview(props.patientId);
  interviewData.value = response;
};
const validateForm = async () => {
  const form = await formValidation.value.validate();
  if (!form.valid) return false;
  return true;
};
const updatePatientInterview = async () => {
  const isValid = await validateForm();
  if (!isValid) return;
  const response = await updateInterview(props.patientId, interviewData.value);
  if (response) {
    toggleSnackBar();
  }
};

const toggleSnackBar = () => {
  snackBars.value.update.isActive = true;
};
</script>
<style lang="css" scoped>
.interview {
  /* border: 1px dashed red; */
  width: 1000px;
}
.rb {
  border: 1px dashed red;
}
</style>
