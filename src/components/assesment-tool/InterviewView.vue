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
                :counter="value.counter"
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
              <v-select
                v-else-if="value.type === 'autocomplete'"
                :key="'autocomplete-' + index"
                :label="value.label"
                :items="value.items"
                item-title="title"
                item-value="value"
                variant="outlined"
                style="width: 400px"
                v-model="interviewInputData[index]"
                density="comfortable"
              ></v-select>
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
    </v-container>
  </div>
  <snackBars :snackBarData="snackBarData" />
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import moment from "moment";
import { area, departments } from "@/utils/constants";
import snackBars from "../dialogs/snackBars.vue";
import { inputRules, validateForm, handleSnackBar } from "@/utils/constants";
import { getInterview, updateInterview, interview } from "@/api/assesment-tool";
import { userAuthentication } from "@/stores/session";

const authentication = userAuthentication();
const rules = {
  // make a rule for a contact number containing 11 digits
  contactNumber: (v) => {
    if (v.length !== 11) return "Contact Number must be 11 digits";
    return true;
  },
};

const props = defineProps({
  patientId: Number,
});

const interviewForm = ref(null);
const snackBarData = ref({});

const interviewInputData = ref({
  interview_time: "",
  interview_end_time: "",
  interview_time_duration: "",
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
  admission_date_and_time: {
    label: "Admission Date-Time",
    type: "text",
    formType: "datetime-local",
  },
  interview_time: {
    label: "Interview Start Time",
    type: "text",
    formType: "time",
  },
  interview_end_time: {
    label: "Interview End Time",
    type: "text",
    formType: "time",
  },
  interview_time_duration: {
    label: "Interview Time Duration",
    type: "text",
    formType: "text",
  },
  area: {
    label: "Area",
    type: "select",
    items: ["IP - Basic Ward", "IP - Non-Basic Ward", "OP", "ER/ED"],
  },
  department: {
    label: "Department",
    type: "select",
    items: departments,
  },
  health_record_number: {
    label: "Health Record Number",
    type: "text",
    formType: "text",
    rules: [inputRules.required],
  },
  mswd_number: {
    label: "MSWD Number",
    type: "text",
    formType: "number",
    rules: [inputRules.invalidNegative],
  },
  referring_party: {
    label: "Name of Referring Party",
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
    rules: [inputRules.contactNumber, inputRules.invalidNegative],
    counter: 11,
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
    rules: [inputRules.invalidNegative, inputRules.contactNumber],
    counter: 11,
  },
  informant_address: {
    label: "Informant Address",
    type: "text",
  },
});

watch(
  () => [
    interviewInputData.value.interview_time,
    interviewInputData.value.interview_end_time,
  ],
  ([newInterviewTime, newInterviewEndTime]) => {
    const duration = calculateInterviewDuration(
      newInterviewTime,
      newInterviewEndTime
    );
    if (duration) {
      interviewInputData.value.interview_time_duration = duration;
    }
  }
);

const calculateInterviewDuration = (newInterviewTime, newInterviewEndTime) => {
  if (newInterviewTime && newInterviewEndTime) {
    const start = moment(newInterviewTime, "HH:mm");
    const end = moment(newInterviewEndTime, "HH:mm");
    const duration = moment.duration(end.diff(start));
    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes()) - hours * 60;
    return `${hours}:${minutes}`;
  }
  return null;
};
// asyn functions
const getInterviewData = async () => {
  const response = await getInterview(props.patientId);
  if (response) {
    interviewInputData.value = response;
    interviewInputData.value.isExist = true;
    interviewInputData.value.social_worker = `${authentication.user.fname} ${authentication.user.lname}`;
  }
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
