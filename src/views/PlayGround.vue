<template>
  <div>
    <v-dialog v-model="dialogs.create" width="1000">
      <v-card>
        <v-toolbar
          title="Initial Assessment"
          density="comfortable"
          color="secondary"
        >
          <v-icon class="mr-4">mdi-close</v-icon>
        </v-toolbar>
        <v-card-text>
          <v-form ref="createPatientForm">
            <v-stepper elevation="0" :items="stepperItems">
              <!-- Interview Data-->
              <template v-slot:[`item.1`]>
                <div class="pa-5 d-flex ga-2 flex-wrap">
                  <template v-for="(field, index) in inputFields.interview">
                    <v-text-field
                      v-if="field.formType === 'text'"
                      :key="'text-' + index"
                      :label="field.label"
                      :hide-spin-buttons="true"
                      variant="outlined"
                      :hint="field.hint"
                      :type="field.type"
                      style="width: 400px"
                      :rules="field.rules"
                      density="compact"
                      :persistent-hint="true"
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
                        v-model="userInputs.demographicData[index]"
                      ></v-text-field>
                    </template>
                  </div>
                </div>
                <div class="pa-5" v-show="page == 2">
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
                        v-model="userInputs.demographicData[index]"
                      ></v-text-field>
                      <v-select
                        v-else-if="value.formType === 'select'"
                        :key="'select-' + index"
                        :label="value.label"
                        variant="outlined"
                        style="width: 400px"
                        density="compact"
                        :items="value.items"
                        v-model="userInputs.demographicData[index]"
                      ></v-select>
                      <v-combobox
                        v-else-if="value.formType === 'combo'"
                        :key="'combo-' + index"
                        :label="value.label"
                        variant="outlined"
                        style="width: 400px"
                        density="compact"
                        :items="value.items"
                        v-model="userInputs.demographicData[index]"
                      ></v-combobox>
                    </template>
                  </div>
                </div>
                <v-pagination :length="totalPages" v-model="page">
                </v-pagination>
                <!-- {{ userInputs.demographicData }} -->
              </template>
              <!-- Review Data -->
              <template v-slot:[`item.3`]>
                <!-- interview data -->
                <div class="">
                  <h3>Interview Data</h3>
                  <v-table density="compact">
                    <thead>
                      <tr>
                        <th style="width: 500px">Particular</th>
                        <th style="width: 500px">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(field, index) in inputFields.interview"
                        :key="index"
                      >
                        <td>{{ field.label }}</td>
                        <td>{{ userInputs.interview[index] }}</td>
                      </tr>
                    </tbody>
                  </v-table>
                </div>
                <!-- personal data -->
                <div class="">
                  <h3>Personal Data</h3>
                  <v-table density="compact">
                    <thead>
                      <tr>
                        <th style="width: 500px">Particular</th>
                        <th style="width: 500px">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(field, index) in inputFields.personalData.page1"
                        :key="index"
                      >
                        <td>{{ field.label }}</td>
                        <td>{{ userInputs.demographicData[index] }}</td>
                      </tr>
                      <tr
                        v-for="(field, index) in inputFields.personalData.page2"
                        :key="index"
                      >
                        <td>{{ field.label }}</td>
                        <td>{{ userInputs.demographicData[index] }}</td>
                      </tr>
                    </tbody>
                  </v-table>
                </div>
                <v-card-actions class="justify-end pa-0">
                  <v-btn
                    prepend-icon="mdi-account-plus"
                    variant="flat"
                    color="secondary"
                    @click="createPatientAssessmentData"
                    >Create Patient</v-btn
                  >
                </v-card-actions>
              </template>
            </v-stepper>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogs.successAlert" width="500">
      <Alert
        :alertDetails="alertDetails"
        @closeDialog="dialogs.successAlert = false"
      />
    </v-dialog>
    <snackBars :snackBarData="snackBarData" />
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
  inputRules,
  validateForm,
  handleSnackBar,
} from "@/utils/constants";
import Alert from "@/components/dialogs/Alert.vue";
import snackBars from "@/components/dialogs/snackBars.vue";
import { ref, watchEffect } from "vue";
import { createPatient } from "@/api/patients";
import { userAuthentication } from "@/stores/session";

const authentication = userAuthentication();
const snackBarData = ref({});
const createPatientForm = ref(false);
const totalPages = ref(2);
const page = ref(1);
const stepperItems = ["Interview", "Personal Data", "Review & Create Patient"];
const alertDetails = ref({
  title: "Patient created successfully",
  type: "success",
  text: "Patient created successfully",
  buttonText: "View Patient",
});
const dialogs = ref({
  create: false,
  successAlert: false,
});
const userInputs = ref({
  interview: {
    interview_date_time: moment().format("YYYY-MM-DDTHH:mm"),
    admission_date_time: moment().format("YYYY-MM-DDTHH:mm"),
    area: "",
    department: "",
    health_record_number: "",
    mswd_number: "",
    source_of_referral: "",
    referring_party: "",
    address: "",
    contact_number: "",
    informant: "",
    relationship_to_patient: "",
    informant_contact_number: "",
    informant_address: "",
  },
  demographicData: {
    last_name: "",
    first_name: "",
    middle_name: "",
    preferred_name: "",
    birth_date: "",
    age: "",
    contact_number: "",
    place_of_birth: "",
    religion: "",
    nationality: "",
    sex: "",
    gender: "",
    civil_status: "",
    education: "",
    educationStatus: "",
    occupation: "",
    monthly_income: "",
    ph_membership_number: "",
    ph_membership_type: "",
  },
  created_by: 0,
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
      hint: " * Field Required",
      rules: [inputRules.required],
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
      rules: [inputRules.contactNumber],
      counter: 11,
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
      rules: [inputRules.contactNumber],
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
        rules: [inputRules.required],
      },
      first_name: {
        label: "First Name",
        formType: "text",
        type: "text",
        hint: " * Field Required",
        rules: [inputRules.required],
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
        rules: [inputRules.contactNumber],
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

const createPatientAssessmentData = async () => {
  const isValid = await validateForm(createPatientForm);
  if (!isValid) {
    snackBarData.value = handleSnackBar(
      "error",
      "Invalid Form. Please Try Again"
    );
    return;
  }
  userInputs.value.created_by = authentication.user.id;
  const response = await createPatient(userInputs.value);
  if (response) {
    console.log("patient created");
  }
};
watchEffect(() => {
  // watches the birthdate to generate patient's age
  if (userInputs.value.demographicData.birth_date) {
    const age = moment().diff(
      userInputs.value.demographicData.birth_date,
      "years"
    );
    userInputs.value.demographicData.age = age;
  }
});
</script>

<style lang="css" scoped></style>
