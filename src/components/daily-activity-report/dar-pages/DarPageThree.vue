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
                <v-select
                  chips
                  multiple
                  closable-chips
                  :label="inputFields.managed_care.selectField.label"
                  :items="inputFields.managed_care.selectField.items"
                  item-title="text"
                  item-value="value"
                  variant="outlined"
                  density="compact"
                ></v-select>
                <v-select
                  chips
                  multiple
                  closable-chips
                  :label="inputFields.managed_care.eligibility_assessment.label"
                  :items="inputFields.managed_care.eligibility_assessment.items"
                  item-title="text"
                  item-value="value"
                  variant="outlined"
                  density="compact"
                ></v-select>
                <v-text-field
                  label="Managed Care Remarks"
                  variant="outlined"
                ></v-text-field>
              </div>
              <h2>V. Social Group Work</h2>
              <div class="px-5 mt-5">
                <v-select
                  chips
                  multiple
                  closable-chips
                  :label="inputFields.social_group_work.label"
                  :items="inputFields.social_group_work.items"
                  item-title="text"
                  item-value="value"
                  variant="outlined"
                  density="compact"
                ></v-select>
                <v-text-field label="Remarks" variant="outlined"></v-text-field>
              </div>
              <h2>VI. Community Organizing</h2>
              <div class="px-5 mt-5">
                <v-select
                  chips
                  multiple
                  closable-chips
                  :label="inputFields.community_organizing.label"
                  :items="inputFields.community_organizing.items"
                  item-title="text"
                  item-value="value"
                  variant="outlined"
                  density="compact"
                ></v-select>
                <v-text-field label="Remarks" variant="outlined"></v-text-field>
              </div>
              <h2>VII. MSW Documentation</h2>
              <div class="px-5 mt-5">
                <v-select
                  chips
                  multiple
                  closable-chips
                  :label="inputFields.msw_documentation.label"
                  :items="inputFields.msw_documentation.items"
                  item-title="text"
                  item-value="value"
                  variant="outlined"
                  density="compact"
                ></v-select>
                <v-text-field label="Remarks" variant="outlined"></v-text-field>
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
    selectField: {
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
      { text: "Social Action", value: "" },
    ],
  },
  msw_documentation: {
    label: "MSW Documentation",
    items: [
      { text: "MSWD Assessment Tool", value: "" },
      { text: "Social Profile with Social Care Plan", value: "" },
      { text: "Medical Social Worker's Progress Note", value: "" },
      { text: "Group Work Recording", value: "" },
      { text: "Social Case Study Report", value: "" },
      { text: "Home Visit Report", value: "" },
      { text: "Service Card", value: "" },
      { text: "Registration Book", value: "" },
      { text: "Daily Activity Report", value: "" },
      { text: "Feedback Report", value: "" },
    ],
  },
};
</script>
<style lang=""></style>
