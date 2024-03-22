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
              <h2>I. Social Work Assesment</h2>
              <div class="px-5 mt-5">
                <v-autocomplete
                  chips
                  multiple
                  closable-chips
                  :label="inputFields.social_work.label"
                  :items="inputFields.social_work.items"
                  variant="outlined"
                  density="compact"
                  item-title="text"
                  item-value="value"
                  clearable
                >
                </v-autocomplete>
                <v-text-field
                  :label="inputFields.remarks.label"
                  variant="outlined"
                ></v-text-field>
              </div>
              <h2 class="">II. Psychosocial Interventions</h2>
              <div class="px-5 my-5">
                <h3 class="my-5">Multi Disciplinary Case Consultation</h3>
                <!-- physicians -->
                <v-autocomplete
                  chips
                  multiple
                  closable-chips
                  :label="
                    inputFields.psychosocial_interventions.Physicians.label
                  "
                  :items="
                    inputFields.psychosocial_interventions.Physicians.items
                  "
                  variant="outlined"
                  density="compact"
                  item-title="text"
                  item-value="value"
                  autocomplete
                  clearable
                ></v-autocomplete>
                <!-- md case consultation -->
                <v-autocomplete
                  chips
                  multiple
                  closable-chips
                  :label="
                    inputFields.psychosocial_interventions.md_case_consultation
                      .label
                  "
                  :items="
                    inputFields.psychosocial_interventions.md_case_consultation
                      .items
                  "
                  variant="outlined"
                  density="compact"
                  item-title="text"
                  item-value="value"
                  clearable
                ></v-autocomplete>
                <!--  Ward Rounds / Pavilion / Dorm Visitation -->
                <v-select
                  :label="
                    inputFields.psychosocial_interventions.ward_rounds.label
                  "
                  :items="
                    inputFields.psychosocial_interventions.ward_rounds.items
                  "
                  variant="outlined"
                  density="compact"
                ></v-select>
                <!-- Information and Referral -->
                <v-select
                  :label="
                    inputFields.psychosocial_interventions.information_referral
                      .label
                  "
                  :items="
                    inputFields.psychosocial_interventions.information_referral
                      .items
                  "
                  variant="outlined"
                  density="compact"
                ></v-select>
                <!-- remarks -->
                <v-text-field
                  :label="inputFields.remarks.label"
                  variant="outlined"
                ></v-text-field>
              </div>
              <h2>III. Strategies in Psychosocial Intervention</h2>
              <div class="px-5 my-5">
                <h3 class="my-5">Multi Disciplinary Case Consultation</h3>
                <v-autocomplete
                  chips
                  multiple
                  closable-chips
                  :label="
                    inputFields.psychosocial_interventions
                      .strategies_intervention.social_work_counseling.label
                  "
                  :items="
                    inputFields.psychosocial_interventions
                      .strategies_intervention.social_work_counseling.items
                  "
                  variant="outlined"
                  density="compact"
                  item-title="text"
                  item-value="value"
                  clearable
                ></v-autocomplete>
                <v-autocomplete
                  chips
                  multiple
                  closable-chips
                  :label="
                    inputFields.psychosocial_interventions
                      .strategies_intervention.therapeutic.label
                  "
                  :items="
                    inputFields.psychosocial_interventions
                      .strategies_intervention.therapeutic.items
                  "
                  variant="outlined"
                  density="compact"
                  item-title="text"
                  item-value="value"
                  clearable
                ></v-autocomplete>
                <v-text-field
                  :label="inputFields.remarks.label"
                  variant="outlined"
                  counter="255"
                ></v-text-field>
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
  social_work: {
    label: "Social Work Assessment",
    items: [
      { text: "Psychosocial Assessment", value: "1" },
      { text: "Risk Assessment", value: "2" },
      { text: "Social Care Plan", value: "3" },
    ],
  },
  psychosocial_interventions: {
    Physicians: {
      label: "Physician",
      items: [
        { text: "Attending Physician", value: "" },
        { text: "Consultant or Specialist", value: "" },
      ],
    },
    md_case_consultation: {
      label: "Multi Disciplinary Case Consultation",
      items: [
        { text: "Nurses", value: "" },
        { text: "Pharmacist", value: "" },
        { text: "Nutritionist", value: "" },
        { text: "Pathology & Laboratory", value: "" },
        { text: "Radiologist", value: "" },
        { text: "Rehabilitation Medicine", value: "" },
        { text: "Psychologist", value: "" },
        { text: "Administrative Service", value: "" },
        { text: "Finance Service", value: "" },
        { text: "Management", value: "" },
        { text: "Pastoral Care", value: "" },
        { text: "Other Staff", value: "" },
        { text: "Meditation and Conflict Resolution", value: "" },
        { text: "Hospice and Palliative Care", value: "" },
        { text: "Placement of Abandoned Patients", value: "" },
        { text: "Home Visitation", value: "" },
        { text: "Home conduction", value: "" },
        { text: "Grief Work and Bereavement", value: "" },
        {
          text: "Referral of Abandoned Unclaimed and Unidentified Cadavers",
          value: "",
        },
      ],
    },
    ward_rounds: {
      label: "Ward Rounds / Pavilion / Dorm Visitation",
      items: ["Team", "Individual"],
    },
    information_referral: {
      label: "Information and Referral",
      items: [
        "Incoming Referral",
        "Inter-agency Referral",
        "Welfare Referrals",
      ],
    },
    strategies_intervention: {
      social_work_counseling: {
        label: "Social Work Counseling",
        items: [
          { text: "Financial Literacy", value: "" },
          { text: "Spiritual", value: "" },
          { text: "Motivational Interviewing", value: "" },
          { text: "Marital Conciliation", value: "" },
        ],
      },
      therapeutic: {
        label: "Therapeutic",
        items: [
          { text: "Children and Adolescent", value: "" },
          { text: "Adult and Elderly", value: "" },
        ],
      },
    },
  },
  remarks: {
    label: "Remarks",
  },
};
</script>
<style lang=""></style>
