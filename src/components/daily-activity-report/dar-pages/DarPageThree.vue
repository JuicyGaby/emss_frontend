<template lang="">
  <div>
    <v-card>
      <v-card-title primary-title>
        <h1>Services</h1>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" class="">
              <h2>IV. Managed Care</h2>
              <div class="px-5 mt-5">
                <v-text-field label="" variant="outlined"></v-text-field>
              </div>
              <h2>V. Social Group Work</h2>
              <div class="px-5 mt-5">
                <v-text-field label="" variant="outlined"></v-text-field>
              </div>
              <h2>VI. Community Organizing</h2>
              <div class="px-5 mt-5">
                <v-text-field label="" variant="outlined"></v-text-field>
              </div>
              <h2>VII. MSW Documentation</h2>
              <div class="px-5 mt-5">
                <v-text-field label="" variant="outlined"></v-text-field>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  dar_id: Number,
});

const inputFields = {
  managed_care: {
    comboBox: {
      label: "Managed Care",
      items: [
        { text: "Provision of Pre-admission Planning", value: "" },
        { text: "Discharge Planning Resource", value: "" },
        { text: "Mobilization", value: "" },
        { text: "Utilization Review", value: "" },
      ],
    },
    eligibility_assessment: {
      label: "Eligibility Assessment",
      items: [
        { text: "Point of Service Enrollment", value: "" },
        { text: "Eligibility / Indigibility Certification", value: "" },
      ],
    },
  },
  social_group_work: {
    label: "Social Group Work",
    items: [
      { text: "Family Life Education", value: "" },
      { text: "Group Therapy", value: "" },
      { text: "Mutual Help/Peer Group (Face to Face/Virtual)", value: "" },
      { text: "Patient and Community Education", value: "" },
      { text: "Development of a Therapeutic Milieu", value: "" },
      { text: "Family Therapy", value: "" },
      { text: "Mental Health and Psychosocial Support (MHPSS)", value: "" },
      { text: "CISD", value: "" },
    ],
  },
  community_organizing: {
    label: "Community Organizing",
    items: [
      { text: "Community-Based Patient Navigation", value: "" },
      { text: "Establishment of Advisory Councils", value: "" },
      {
        text: "Partnership with Neighborhood Organizations and Businesses",
        value: "",
      },
      { text: "Partnership with Civic Organizations", value: "" },
      { text: "Online Community", value: "" },
      { text: "Adopt a Community Program", value: "" },
    ],
  },
  msw_documentation: {
    label: "MSW Documentation",
    items: [],
  },
};
</script>
<style lang=""></style>
