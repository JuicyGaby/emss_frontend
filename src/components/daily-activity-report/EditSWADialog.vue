<template lang="">
  <v-card>
    <v-toolbar color="secondary">
      <v-icon>mdi-book-plus</v-icon>
      <v-toolbar-title
        >Update Social Work Administration {{ props.swa_id }}</v-toolbar-title
      >
    </v-toolbar>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <!-- documentation -->
            <h2>I. Documentation</h2>
            <div class="px-5 mt-5">
              <v-select
                multiple
                chips
                closable-chips
                :label="inputFields.documentation.label"
                :items="inputFields.documentation.items"
                item-title="text"
                item-value="value"
                variant="outlined"
                density="comfortable"
                v-model="swaData.documentation"
              ></v-select>
            </div>
            <!-- program management -->
            <h2>II. Program Management</h2>
            <div class="px-5 mt-5">
              <v-select
                multiple
                chips
                closable-chips
                :label="inputFields.programManagement.programManagement.label"
                :items="inputFields.programManagement.programManagement.items"
                item-title="text"
                item-value="value"
                variant="outlined"
                density="comfortable"
                v-model="swaData.programManagement"
              ></v-select>
              <v-select
                multiple
                chips
                closable-chips
                :label="inputFields.programManagement.committeeMeetings.label"
                :items="inputFields.programManagement.committeeMeetings.items"
                item-title="text"
                item-value="value"
                variant="outlined"
                density="comfortable"
                v-model="swaData.committeeMeetings"
              ></v-select>
              <v-select
                multiple
                chips
                closable-chips
                :label="
                  inputFields.programManagement.donationsManagementProgram.label
                "
                :items="
                  inputFields.programManagement.donationsManagementProgram.items
                "
                item-title="text"
                item-value="value"
                variant="outlined"
                density="comfortable"
                v-model="swaData.donationsManagementProgram"
              ></v-select>
            </div>
            <!-- Supervision -->
            <h2>III. Supervision</h2>
            <div class="px-5 mt-5">
              <v-select
                multiple
                chips
                closable-chips
                :label="inputFields.Supervision.supervision1.label"
                :items="inputFields.Supervision.supervision1.items"
                item-title="text"
                item-value="value"
                variant="outlined"
                density="comfortable"
                v-model="swaData.supervision1"
              ></v-select>
              <v-select
                multiple
                chips
                closable-chips
                :label="inputFields.Supervision.supervision2.label"
                :items="inputFields.Supervision.supervision2.items"
                item-title="text"
                item-value="value"
                variant="outlined"
                density="comfortable"
                v-model="swaData.supervision2"
              ></v-select>
              <v-select
                multiple
                chips
                closable-chips
                :label="inputFields.Supervision.staffMeeting.label"
                :items="inputFields.Supervision.staffMeeting.items"
                item-title="text"
                item-value="value"
                variant="outlined"
                density="comfortable"
                v-model="swaData.staffMeeting"
              ></v-select>
            </div>
            <!-- Human Resource Development -->
            <h2>IV. Human Resource Development</h2>
            <div class="px-5 mt-5">
              <v-select
                multiple
                chips
                closable-chips
                :label="
                  inputFields.humanResourceDevelopment.humanResourceDevelopment
                    .label
                "
                :items="
                  inputFields.humanResourceDevelopment.humanResourceDevelopment
                    .items
                "
                item-title="text"
                item-value="value"
                variant="outlined"
                density="comfortable"
                v-model="swaData.humanResourceDevelopment"
              ></v-select>
              <v-select
                multiple
                chips
                closable-chips
                :label="
                  inputFields.humanResourceDevelopment.affiliationProgram.label
                "
                :items="
                  inputFields.humanResourceDevelopment.affiliationProgram.items
                "
                item-title="text"
                item-value="value"
                variant="outlined"
                density="comfortable"
                v-model="swaData.affiliationProgram"
              ></v-select>
              <v-select
                multiple
                chips
                closable-chips
                :label="
                  inputFields.humanResourceDevelopment.staffDevelopment.label
                "
                :items="
                  inputFields.humanResourceDevelopment.staffDevelopment.items
                "
                item-title="text"
                item-value="value"
                variant="outlined"
                density="comfortable"
                v-model="swaData.staffDevelopment"
              ></v-select>
            </div>
            <!-- Social Work Research -->
            <h2>V. Social Work Research</h2>
            <div class="px-5 mt-5">
              <v-select
                multiple
                chips
                closable-chips
                :label="inputFields.socialWorkResearch.socialWorkResearch.label"
                :items="inputFields.socialWorkResearch.socialWorkResearch.items"
                item-title="text"
                item-value="value"
                variant="outlined"
                density="comfortable"
                v-model="swaData.socialWorkResearch"
              ></v-select>
              <v-select
                multiple
                chips
                closable-chips
                :label="inputFields.socialWorkResearch.reporting.label"
                :items="inputFields.socialWorkResearch.reporting.items"
                item-title="text"
                item-value="value"
                variant="outlined"
                density="comfortable"
                v-model="swaData.reporting"
              ></v-select>
            </div>
            <v-btn color="success" @click="updateSWA">Update</v-btn>
            {{ swaData }}
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { ref } from "vue";
import { updateSocialWorkAdministration } from "@/api/daily-activity-report";
const props = defineProps({
  swa_id: Number,
});
let swaData = ref({
  id: props.swa_id,
});
const inputFields = {
  documentation: {
    label: "Documentation",
    items: [
      { text: "MSWD Assessment Tool", value: 1 },
      { text: "Social Profile with Social Care Plan", value: 2 },
      { text: "Medical Social Worker's Progress Note", value: 3 },
      { text: "Group Work Recording", value: 4 },
      { text: "Social Case Study Report", value: 5 },
      { text: "Social Case Summary", value: 6 },
      { text: "Home Visit Report", value: 7 },
      { text: "Service Card", value: 8 },
      { text: "Registration Book", value: 9 },
      { text: "Daily Activity Report", value: 10 },
      { text: "Feedback Report", value: 11 },
    ],
  },
  programManagement: {
    programManagement: {
      label: "Program Management",
      items: [
        { text: "MSWD Fund Raising Activity", value: 14 },
        { text: "Hospital Activity", value: 16 },
        { text: "Networking (Meeting with other institutions)", value: 17 },
        { text: "Coordination with Mass Media", value: 18 },
        { text: "Utilization Review", value: 20 },
        { text: "Policy Development", value: 21 },
        { text: "Planning and Budgeting", value: 22 },
        { text: "Advocacy for MSWD Office (Head and Supervisors)", value: 23 },
      ],
    },
    committeeMeetings: {
      label: "Committee Meetings",
      items: [
        { text: "Attendance to Clinical Committees", value: 12 },
        { text: "Attendance to Clinical Committees", value: 13 },
      ],
    },
    donationsManagementProgram: {
      label: "Donations Management Program",
      items: [{ text: "Linkaged with Donors", value: 15 }],
    },
    consultativeAdvisoryServices: {
      label: "Consultative Advisory Services",
      items: [{ text: "Co-Employees", value: 19 }],
    },
  },
  Supervision: {
    supervision1: {
      label: "Supervision",
      items: [
        { text: "Monitoring (Head and Supervisors)", value: 24 },
        { text: "Checking Daily Plans and Daily Activity Report", value: 27 },
        { text: "Checking of Recording", value: 28 },
        { text: "Random checking of Charts", value: 29 },
      ],
    },
    supervision2: {
      label: "Supervision (Supervisor and Senior Staff)",
      items: [
        { text: "Clinical Supervision", value: 25 },
        { text: "Administrative Supervision", value: 26 },
      ],
    },
    staffMeeting: {
      label: "Staff Meeting",
      items: [
        { text: "Execom/Mancom", value: 30 },
        { text: "General", value: 31 },
        { text: "Team", value: 32 },
        { text: "Coaching", value: 33 },
        { text: "Mentoring", value: 34 },
        { text: "Staff Case Conference", value: 35 },
      ],
    },
  },
  humanResourceDevelopment: {
    humanResourceDevelopment: {
      label: "Human Resource Development",
      items: [
        { text: "Orientation and Interpretation of MSWD Services", value: 43 },
        { text: "Staff Recruitment and Selection", value: 44 },
      ],
    },
    affiliationProgram: {
      label: "Affiliation Program",
      items: [
        { text: "Orientation", value: 36 },
        { text: "Trialogue", value: 37 },
        { text: "Supervision", value: 38 },
      ],
    },
    staffDevelopment: {
      label: "Staff Development",
      items: [
        { text: "Attended LDI outside the health facilities", value: 39 },
        { text: "Conduct LDI Needs Assessment", value: 40 },
        { text: "Development of LDI Design", value: 41 },
        { text: "Self Directed Learnings", value: 42 },
      ],
    },
  },
  socialWorkResearch: {
    socialWorkResearch: {
      label: "Social Work Research",
      items: [{ text: "Monitoring and Evaluation", value: 53 }],
    },
    reporting: {
      label: "Reporting",
      items: [
        { text: "Statistical and Narrative", value: 45 },
        { text: "Annual Psycho-Social Profile of Patients Served", value: 46 },
        { text: "VAWC Statistical Report", value: 47 },
        { text: "HIV Report", value: 48 },
        { text: "Malasakit Center Statistical Report", value: 49 },
        {
          text: "Endowment Fund Utilization Report/Other Fund Reports",
          value: 50,
        },
        { text: "BJMP Monitoring Report", value: 51 },
        { text: "OWWA Report", value: 52 },
      ],
    },
  },
};
const updateSWA = async () => {
  const response = await updateSocialWorkAdministration(swaData.value);
};
</script>
<style lang=""></style>
