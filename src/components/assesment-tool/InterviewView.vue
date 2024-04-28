<template lang="">
  <div class="d-flex justify-center align-center">
    <v-container style="width: 1000px">
      <h1>Initial Interview</h1>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-form ref="interviewForm">
          <v-col cols="12" class="d-flex ga-2 flex-wrap">
            <template v-for="(value, index) in inputFields">
              <v-text-field
                v-if="value.type === 'text'"
                :key="'text-' + index"
                :label="value.label"
                :hide-spin-buttons="true"
                variant="outlined"
                :type="value.formType"
                style="width: 400px"
                :rules="value.rules"
                v-model="interviewInputData[index]"
                density="comfortable"
              ></v-text-field>
              <v-combobox
                v-else-if="value.type === 'select'"
                :key="'select-' + index"
                :label="value.label"
                :items="value.items"
                variant="outlined"
                style="width: 400px"
                v-model="interviewInputData[index]"
                density="comfortable"
              ></v-combobox>
            </template>
          </v-col>
        </v-form>
      </v-row>
      <v-card-actions class="pa-0">
        <v-btn
          :prepend-icon="
            interviewInputData.isExist ? 'mdi-update' : 'mdi-content-save'
          "
          variant="flat"
          :color="interviewInputData.isExist ? 'secondary' : 'success'"
          @click="
            interviewInputData.isExist
              ? updateInterviewData()
              : createInterviewData()
          "
          >{{
            interviewInputData.isExist ? "Update Interview" : "Create Interview"
          }}</v-btn
        >
      </v-card-actions>
      <!-- {{ interviewInputData }} -->
      <!-- {{ userFullName }} -->
    </v-container>
  </div>
  <snackBars :snackBarData="snackBarData" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import snackBars from "../dialogs/snackBars.vue";
import { inputRules, validateForm, handleSnackBar } from "@/utils/constants";
import { getInterview, updateInterview, interview } from "@/api/assesment-tool";
import { userAuthentication } from "@/stores/session";

const authentication = userAuthentication();
const props = defineProps({
  patientId: Number,
});

const interviewForm = ref(null);
const snackBarData = ref({});

const interviewInputData = ref({
  isExist: false,
  patientId: props.patientId,
  health_record_number: "",
  mswd_number: "",
  contact_number: "",
  informant_contact_number: "",
  social_worker: `${authentication.user.fname} ${authentication.user.lname}`,
});
const inputFields = ref({
  interview_date: {
    label: "Interview Date",
    type: "text",
    formType: "date",
  },
  interview_time: {
    label: "Interview Time",
    type: "text",
    formType: "time",
  },
  admission_date_and_time: {
    label: "Admission Date-Time",
    type: "text",
    formType: "datetime-local",
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
    formType: "number",
    rules: [inputRules.invalidNegative],
  },
  mswd_number: {
    label: "MSWD Number",
    type: "text",
    formType: "number",
    rules: [inputRules.invalidNegative],
  },
  referring_party: {
    label: "Referring Party",
    type: "text",
  },
  source_of_referral: {
    label: "Source of Referral",
    type: "select",
    items: [
      "Government Hospital",
      "Private Hospitals/Clinics",
      "Politicians",
      "Media",
      "Health Care Team",
      "NGO’s/Private Welfare Agencies",
      "Government Agencies",
      "Walk – in",
      "Others",
    ],
  },
  address: {
    label: "Referal Address",
    type: "text",
  },
  contact_number: {
    label: "Referal Contact Number",
    type: "text",
    formType: "number",
    rules: [inputRules.invalidNegative],
  },
  informant: {
    label: "Informant",
    type: "text",
  },
  relationship_to_patient: {
    label: "Informant relationship to Patient",
    type: "select",
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
    type: "text",
    formType: "number",
    rules: [inputRules.invalidNegative],
  },
  informant_address: {
    label: "Informant Address",
    type: "text",
  },
});

// asyn functions
const getInterviewData = async () => {
  const response = await getInterview(props.patientId);
  if (response) {
    interviewInputData.value = response;
    interviewInputData.value.isExist = true;
    interviewInputData.value.social_worker = `${authentication.user.fname} ${authentication.user.lname}`;
  }
  console.log(interviewInputData.value);
};
const createInterviewData = async () => {
  const isValid = await validateForm(interviewForm);
  if (!isValid) return;
  const response = await interview(interviewInputData.value);
  if (response) {
    snackBarData.value = handleSnackBar(
      "success",
      "Interview Created Successfully"
    );
    interviewInputData.value.isExist = true;
  }
};
const updateInterviewData = async () => {
  const isValid = await validateForm(interviewForm);
  if (!isValid) return;
  const response = await updateInterview(
    props.patientId,
    interviewInputData.value
  );
  if (response) {
    snackBarData.value = handleSnackBar(
      "success",
      "Interview Updated Successfully"
    );
  }
};
onMounted(async () => {
  await getInterviewData();
});
</script>
<style lang=""></style>
