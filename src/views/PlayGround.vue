<template>
  <div>
    <v-dialog v-model="dialog" width="1000">
      <v-card>
        <v-toolbar
          title="Initial Assessment"
          density="comfortable"
          color="secondary"
        >
          <v-icon class="mr-4">mdi-close</v-icon>
        </v-toolbar>
        <v-card-text>
          <v-stepper elevation="0" :items="stepperItems">
            <!-- Interview -->
            <template v-slot:[`item.1`]>
              <div class="pa-5 d-flex ga-2 flex-wrap">
                <template v-for="(field, index) in inputFields.interview">
                  <v-text-field
                    v-if="field.formType === 'text'"
                    :key="'text-' + index"
                    :label="field.label"
                    :hide-spin-buttons="true"
                    variant="outlined"
                    :type="field.type"
                    style="width: 400px"
                    :rules="field.rules"
                    density="compact"
                    v-model="userInputs.interview[index]"
                  ></v-text-field>
                </template>
                <!-- {{ userInputs.interview }} -->
              </div>
            </template>
            <!-- Personal Data -->
            <template v-slot:[`item.2`]>
              <div class="pa-5" v-show="page == 1">
                <div class="d-flex ga-2 flex-wrap">
                  <template
                    v-for="(field, index) in inputFields.personalData.page1"
                  >
                    <v-text-field
                      v-if="field.formType === 'text'"
                      :key="'text-' + index"
                      :label="field.label"
                      :hide-spin-buttons="true"
                      variant="outlined"
                      :type="field.type"
                      style="width: 400px"
                      :rules="field.rules"
                      density="compact"
                      :hint="field.hint"
                      :persistent-hint="true"
                      :readonly="field.isReadOnly"
                      v-model="userInputs.personalData[index]"
                    ></v-text-field>
                  </template>
                </div>
              </div>
              <div class="" v-show="page == 2">
                <div class="d-flex ga-2 flex-wrap">
                  <template
                    v-for="(value, index) in inputFields.personalData.page2"
                  >
                    <v-text-field
                      v-if="value.formType === 'text'"
                      :key="'text-' + index"
                      :label="value.label"
                      :hide-spin-buttons="true"
                      variant="outlined"
                      :type="value.type"
                      style="width: 400px"
                      :rules="value.rules"
                      density="compact"
                      :hint="value.hint"
                      :persistent-hint="true"
                      v-model="userInputs.personalData[index]"
                    ></v-text-field>
                    <v-select
                      v-else-if="value.formType === 'select'"
                      :key="'select-' + index"
                      :label="value.label"
                      variant="outlined"
                      style="width: 400px"
                      density="compact"
                      :items="value.items"
                    ></v-select>
                    <v-combobox
                      v-else-if="value.formType === 'combo'"
                      :key="'combo-' + index"
                      :label="value.label"
                      variant="outlined"
                      style="width: 400px"
                      density="compact"
                      :items="value.items"
                    ></v-combobox>
                  </template>
                </div>
              </div>
              <v-pagination :length="totalPages" v-model="page"> </v-pagination>
            </template>
          </v-stepper>
          <!-- {{ userInputs.personalData }} -->
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import moment from "moment";
import {
  sourceOfReferral,
  departments,
  educationalAttainment,
  educationStatus,
  religion,
  civilStatus,
} from "@/utils/constants";
import { ref, watchEffect } from "vue";
const dialog = ref(true);
const totalPages = ref(2);
const page = ref(1);
const stepperItems = ["Interview", "Personal Data", "Review & Create Patient"];
const userInputs = ref({
  interview: {
    interview_date_time: moment().format("YYYY-MM-DDTHH:mm"),
    admission_date_time: moment().format("YYYY-MM-DDTHH:mm"),
    area: null,
    department: null,
    health_record_number: null,
    mswd_number: null,
    source_of_referral: null,
    referring_party: null,
    address: null,
    contact_number: null,
    informant: null,
    relationship_to_patient: null,
    informant_contact_number: null,
    informant_address: null,
  },
  personalData: {
    last_name: null,
    first_name: null,
    middle_name: null,
    preferred_name: null,
    birth_date: null,
    age: null,
    contact_number: null,
    place_of_birth: null,
    religion: null,
    nationality: null,
    sex: null,
    gender: null,
    civil_status: null,
    education: null,
    educationStatus: null,
    occupation: null,
    monthly_income: null,
    ph_membership_number: null,
    ph_membership_type: null,
  },
});
const inputFields = ref({
  interview: {
    interview_date_time: {
      label: "Interview Date and Time",
      type: "datetime-local",
      formType: "text",
    },
    admission_date_time: {
      label: "Admission Date Time",
      type: "datetime-local",
      formType: "text",
    },
    area: {
      label: "Area",
      formType: "select",
      items: ["IP - Basic Ward", "IP - Non-Basic Ward", "OP", "ER/ED"],
    },
    department: {
      label: "Department",
      formType: "select",
      items: departments,
    },
    health_record_number: {
      label: "Health Record Number",
      type: "number",
      formType: "text",
    },
    mswd_number: {
      label: "MSWD Number",
      type: "number",
      formType: "text",
    },
    source_of_referral: {
      label: "Source of Referral",
      formType: "select",
      items: sourceOfReferral,
    },
    referring_party: {
      label: "Name Of Referring Party",
      type: "text",
      formType: "text",
    },
    address: {
      label: "Address",
      type: "text",
      formType: "text",
    },
    contact_number: {
      label: "Contact Number",
      type: "number",
      formType: "text",
    },
    informant: {
      label: "Informant",
      type: "text",
      formType: "text",
    },
    relationship_to_patient: {
      label: "Relationship to Patient",
      formType: "select",
      items: [
        "Friends",
        "Workmates",
        "Neighbors",
        "Relatives",
        "Spouse",
        "Children",
        "Parents",
        "Siblings",
        "Others",
      ],
    },
    informant_contact_number: {
      label: "Informant Contact Number",
      type: "number",
      formType: "text",
      counter: 11,
    },
    informant_address: {
      label: "Informant Address",
      type: "text",
      formType: "text",
    },
  },
  personalData: {
    page1: {
      last_name: {
        label: "Last Name",
        formType: "text",
        type: "text",
        hint: " * Field Required",
      },
      first_name: {
        label: "First Name",
        formType: "text",
        type: "text",
        hint: " * Field Required",
      },
      middle_name: {
        label: "Middle Name",
        formType: "text",
        type: "text",
      },
      preferred_name: {
        label: "Preferred Name",
        formType: "text",
        type: "text",
        hint: "For members of the LGBTQIA+ Community",
      },
      birth_date: {
        label: "Date of Birth",
        formType: "text",
        type: "date",
      },
      age: {
        label: "Age",
        formType: "text",
        type: "number",
        isReadOnly: true,
      },
      contact_number: {
        label: "Contact Number",
        formType: "text",
        type: "number",
      },
      place_of_birth: {
        label: "Place of Birth",
        formType: "text",
        type: "text",
      },
      religion: {
        label: "Religion",
        formType: "select",
        type: "text",
        items: religion,
      },
      nationality: {
        label: "Nationality",
        formType: "select",
        type: "text",
        items: ["Filipino", "Others"],
      },
      sex: {
        label: "Sex",
        items: ["Male", "Female"],
        formType: "select",
      },
      gender: {
        label: "Gender Identity",
        items: ["Masculine", "Feminine", "LGBTQIA+", "Other"],
        formType: "select",
      },
    },
    page2: {
      civil_status: {
        label: "Civil Status",
        formType: "select",
        items: civilStatus,
      },
      education: {
        label: "Education",
        formType: "combo",
        items: educationalAttainment,
      },
      educationStatus: {
        label: "Education Status",
        formType: "select",
        items: educationStatus,
      },
      occupation: {
        label: "Occupation",
        formType: "text",
        type: "text",
      },
      monthly_income: {
        label: "Monthly Income",
        formType: "text",
        type: "number",
      },
      ph_membership_number: {
        label: "PhilHealth Membership Number",
        formType: "text",
        type: "text",
      },
      ph_membership_type: {
        label: "PhilHealth Membership",
        formType: "select",
        items: ["Direct Contributor", "Indirect Contributor"],
      },
    },
  },
});

watchEffect(() => {
  // watches the birthdate to generate patient's age
  if (userInputs.value.personalData.birth_date) {
    const age = moment().diff(
      userInputs.value.personalData.birth_date,
      "years"
    );
    userInputs.value.personalData.age = age;
  }
});
</script>

<style lang="css" scoped></style>
