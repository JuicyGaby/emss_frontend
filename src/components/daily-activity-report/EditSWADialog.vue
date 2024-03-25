<template lang="">
  <v-card>
    <v-toolbar color="secondary">
      <v-icon>mdi-book-plus</v-icon>
      <v-toolbar-title>Update Social Work Administration</v-toolbar-title>
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
              ></v-select>
            </div>
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
              ></v-select>
            </div>
            <h2>IV. Human Resource Development</h2>
            <div class="px-5 mt-5">
                <v-select
                    multiple
                    chips
                    closable-chips
                    :label="inputFields.humanResourceDevelopment.humanResourceDevelopment.label"
                    :items="inputFields.humanResourceDevelopment.humanResourceDevelopment.items"
                    item-title="text"
                    item-value="value"
                    variant="outlined"
                    density="comfortable"
                ></v-select>
                <v-select
                    multiple
                    chips
                    closable-chips
                    :label="inputFields.humanResourceDevelopment.affiliationProgram.label"
                    :items="inputFields.humanResourceDevelopment.affiliationProgram.items"
                    item-title="text"
                    item-value="value"
                    variant="outlined"
                    density="comfortable"
                ></v-select>
                <v-select
                    multiple
                    chips
                    closable-chips
                    :label="inputFields.humanResourceDevelopment.staffDevelopment.label"
                    :items="inputFields.humanResourceDevelopment.staffDevelopment.items"
                    item-title="text"
                    item-value="value"
                    variant="outlined"
                    density="comfortable"
                ></v-select>
            </div>
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
                ></v-select>
            </div>
            <v-btn color="success">Update</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { ref } from "vue";
const inputFields = {
  documentation: {
    label: "Documentation",
    items: [
      { text: "MSWD Assessment Tool", value: "" },
      { text: "Social Profile with Social Care Plan", value: "" },
      { text: "Medical Social Worker's Progress Note", value: "" },
      { text: "Group Work Recording", value: "" },
      { text: "Social Case Study Report", value: "" },
      { text: "Social Case Summary", value: "" },
      { text: "Home Visit Report", value: "" },
      { text: "Service Card", value: "" },
      { text: "Registration Book", value: "" },
      { text: "Daily Activity Report", value: "" },
      { text: "Feedback Report", value: "" },
    ],
  },
  programManagement: {
    programManagement: {
      label: "Program Management",
      items: [
        { text: "MSWD Fund Raising Activity", value: "" },
        { text: "Hospital Activity", value: "" },
        { text: "Networking (Meeting with other institutions)", value: "" },
        { text: "Coordination with Mass Media", value: "" },
        { text: "Utilization Review", value: "" },
        { text: "Policy Development", value: "" },
        { text: "Planning and Budgeting", value: "" },
        { text: "Advocacy for MSWD Office (Head and Supervisors)", value: "" },
      ],
    },
    committeeMeetings: {
      label: "Committee Meetings",
      items: [
        { text: "Attendance to Clinical Committees", value: "" },
        { text: "Attendance to Clinical Committees", value: "" },
      ],
    },
    donationsManagementProgram: {
      label: "Donations Management Program",
      items: [{ text: "Linkaged with Donors", value: "" }],
    },
    consultativeAdvisoryServices: {
      label: "Consultative Advisory Services",
      items: [{ text: "Co-Employees", value: "" }],
    },
  },
  Supervision: {
    supervision1: {
      label: "Supervision",
      items: [
        { text: "Monitoring (Head and Supervisors)", value: "" },
        { text: "Checking Daily Plans and Daily Activity Report", value: "" },
        { text: "Checking of Recording", value: "" },
        { text: "Random checking of Charts", value: "" },
      ],
    },
    supervision2: {
      label: "Supervision (Supervisor and Senior Staff)",
      items: [
        { text: "Clinical Supervision", value: "" },
        { text: "Administrative Supervision", value: "" },
      ],
    },
    staffMeeting: {
      label: "Staff Meeting",
      items: [
        { text: "Execom/Mancom", value: "" },
        { text: "General", value: "" },
        { text: "Team", value: "" },
        { text: "Coaching", value: "" },
        { text: "Mentoring", value: "" },
        { text: "Staff Case Conference", value: "" },
      ],
    },
  },
  humanResourceDevelopment: {
    humanResourceDevelopment: {
      label: "Human Resource Development",
      items: [
        { text: "Orientation and Interpretation of MSWD Services", value: "" },
        { text: "Staff Recruitment and Selection", value: "" },
      ],
    },
    affiliationProgram: {
      label: "Affiliation Program",
      items: [
        { text: "Orientation", value: "" },
        { text: "Trialogue", value: "" },
        { text: "Supervision", value: "" },
      ],
    },
    staffDevelopment: {
      label: "Staff Development",
      items: [
        { text: "Attended LDI outside the health facilities", value: "" },
        { text: "Conduct LDI Needs Assessment", value: "" },
        { text: "Development of LDI Design", value: "" },
        { text: "Self Directed Learnings", value: "" },
      ],
    },
  },
  socialWorkResearch: {
    socialWorkResearch: {
      label: "Social Work Research",
      items: [{ text: "Monitoring and Evaluation", value: "" }],
    },
    reporting: {
      label: "Reporting",
      items: [
        { text: "Statistical and Narrative", value: "" },
        { text: "Annual Psycho-Social Profile of Patients Served", value: "" },
        { text: "VAWC Statistical Report", value: "" },
        { text: "HIV Report", value: "" },
        { text: "Malasakit Center Statistical Report", value: "" },
        {
          text: "Endowment Fund Utilization Report/Other Fund Reports",
          value: "",
        },
        { text: "BJMP Monitoring Report", value: "" },
        { text: "OWWA Report", value: "" },
      ],
    },
  },
};
</script>
<style lang=""></style>
