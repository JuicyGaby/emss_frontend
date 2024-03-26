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
              </div>
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
