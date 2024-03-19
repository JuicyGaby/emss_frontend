<template lang="">
  <div>
    <v-card>
      <v-card-title primary-title>
        <h1>Patient Assessment Tool Data</h1>
      </v-card-title>
      <v-spacer></v-spacer>
      <v-card-text>
        <div>
          <h2>Initial Interview:</h2>
          <v-divider></v-divider>
          <v-container>
            <v-row>
              <v-col cols="12" class="d-flex ga-1 flex-wrap">
                <v-text-field
                  v-for="(field, key) in fields.interview"
                  :key="key"
                  :label="field.label"
                  :type="field.type"
                  style="width: 300px"
                  variant="outlined"
                  density="compact"
                  readonly
                  v-model="patientAssesmentData.interview[key]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <div>
          <h2>I. Demographi Data:</h2>
          <v-divider></v-divider>
        </div>
        <div>
          <h2>Initial Interview:</h2>
        </div>
        <v-divider></v-divider>
        <div>
          <h2>Initial Interview:</h2>
        </div>
        <v-divider></v-divider>
        <div>
          <h2>Initial Interview:</h2>
        </div>
        <v-divider></v-divider>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getInterview } from "@/api/assesment-tool";
import { getPatientByID } from "@/api/patients";
const props = defineProps({
  patientId: Number,
});

onMounted(async () => {
  await getPatientData();
});
const patientAssesmentData = ref({
  interview: {},
  demographicData: {
    patientData: {},
  },
});
const fields = {
  interview: {
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
  },
};

const getPatientData = async () => {
  await getInterviewData();
};

const getInterviewData = async () => {
  const response = await getInterview(props.patientId);
  patientAssesmentData.value.interview = response;
};
const getDemographicData = async () => {
  const response = await getPatientByID(props.patientId);
  patientAssesmentData.value.demographicData.patientData = response;
  console.log(response);
};
</script>
<style lang=""></style>
