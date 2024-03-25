<template lang="">
  <v-container
    class="d-flex flex-column justify-center align-center"
    style="width: 900px"
  >
    <!-- 1st page -->
    <div class="input-field" v-show="page == 1">
      <v-row>
        <v-col class="d-flex flex-wrap ga-2" cols="12">
          <v-text-field
            v-for="(field, key) in inputFields.step1"
            :key="key"
            :label="field.label"
            :type="field.type"
            variant="outlined"
            style="width: 300px"
            v-model="interviewInputs[key]"
            density="comfortable"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <!-- 2nd page -->
    <div class="input-field" v-show="page == 2">
      <v-row>
        <v-col class="d-flex flex-wrap ga-2" cols="12">
          <v-text-field
            v-for="(field, key) in inputFields.step2"
            :key="key"
            :label="field.label"
            :type="field.type"
            variant="outlined"
            style="width: 350px"
            v-model="interviewInputs[key]"
            density="comfortable"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <!-- {{interviewInputs}} -->
  </v-container>
  <v-pagination :length="totalPages" v-model="page"></v-pagination>
</template>
<script setup>
import moment from "moment";
import { reactive, ref, watchEffect } from "vue";
import { interview } from "../../api/assesment-tool";

const props = defineProps({
  interviewBody: Object,
});

const emit = defineEmits(["interviewData"]);

const totalPages = ref(2);
const page = ref(1);

let interviewInputs = ref({});

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
  step1: {
    interview_date_time: {
      label: "Interview Date and Time",
      type: "datetime-local",
    },
    admission_date_time: {
      label: "admission Date and Time",
      type: "datetime-local",
    },
    basic_ward: {
      label: "Basic Ward",
      type: "text",
    },
    nonbasic_ward: {
      label: "Nonbasic Ward",
      type: "text",
    },
    health_record_number: {
      label: "Health Record Number",
      type: "text",
    },
    mswd_number: {
      label: "MSWD number",
      type: "text",
    },
  },
  step2: {
    source_of_referral: {
      label: "Source of Referral",
      type: "text",
    },
    referring_party: {
      label: "Referring Party",
      type: "text",
    },
    address: {
      label: "Address",
      type: "text",
    },
    contact_number: {
      label: "Contact Number",
      type: "number",
    },
    informant: {
      label: "Informant",
      type: "text",
    },
    relationship_to_patient: {
      label: "Patient Relationship",
      type: "text",
    },
    informant_contact_number: {
      label: "Informant Contact Number",
      type: "number",
    },
    informant_address: {
      label: "Informant Address",
      type: "text",
    },
  },
};

</script>
<style lang="css">
.reb {
  border: 1px solid red;
}

.input-field {
  min-width: 300px;
  min-height: 350px;
}
</style>
