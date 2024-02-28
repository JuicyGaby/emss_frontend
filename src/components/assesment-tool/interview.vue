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
import { ref } from "vue";

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
  interview_datetime: {
    label: "Date and Time of the interview",
    type: "datetime-local",
    data: ref(""),
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
  health_record: {
    label: "Health Record Number",
    type: "text",
    data: ref(""),
  },
  mswd: {
    label: "MSWD number",
    type: "text",
    data: ref(""),
  },
  referral: {
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
  patient_relationship: {
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

const createInterview = () => {
    // loop and display the data variable of the input fields
    for (const key in inputFields) {
        console.log(inputFields[key].data.value);
    }

};

</script>
<style lang="">
</style>