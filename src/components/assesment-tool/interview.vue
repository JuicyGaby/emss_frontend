<template lang="">
    <div>
        <v-form>
            <v-text-field
                v-for="(inputField, key) in inputFields"
                :key="key"
                v-model="inputField.data.value"
                :label="inputField.label"
                :type="inputField.type"
            ></v-text-field>
            <v-btn @click="createInterview" color="success">Create Interview</v-btn>
        </v-form>
    </div>
</template>
<script setup>
import moment from "moment";
import { ref } from "vue";
import { interview } from "../../api/assesment-tool";

const inputFields = {
  interview_date: {
    label: "Date of the interview",
    type: "date",
    data: ref(""),
  },
  interview_time: {
    label: "Time of the interview",
    type: "time",
    data: ref(""),
  },
  admission_date_and_time: {
    label: "Date and Time of the interview",
    type: "datetime-local",
    data: ref(moment().format("YYYY-MM-DDTHH:mm")),
  },
  basic_ward: {
    label: "Basic Ward",
    type: "text",
    data: ref(""),
  },
  nonbasic_ward: {
    label: "Nonbasic Ward",
    type: "text",
    data: ref(""),
  },
  health_record_number: {
    label: "Health Record Number",
    type: "text",
    data: ref(""),
  },
  mswd_number: {
    label: "MSWD number",
    type: "text",
    data: ref(""),
  },
  referring_party: {
    label: "Referring Party",
    type: "text",
    data: ref(""),
  },
  address: {
    label: "Address",
    type: "text",
    data: ref(""),
  },
  contact_number: {
    label: "Contact Number",
    type: "number",
    data: ref(""),
  },
  informant: {
    label: "Informant",
    type: "text",
    data: ref(""),
  },
  relationship_to_patient: {
    label: "Patient Relationship",
    type: "text",
    data: ref(""),
  },
  informant_contact_number: {
    label: "Informant Contact Number",
    type: "number",
    data: ref(""),
  },
  informant_address: {
    label: "Informant Address",
    type: "text",
    data: ref(""),
  },
};

const createInterview = async () => {
  const body = Object.fromEntries(
    Object.entries(inputFields).map(([key, value]) => [key, value.data.value])
  );
  const response = await interview(body);
  console.log(response);
};
</script>
<style lang="">
</style>