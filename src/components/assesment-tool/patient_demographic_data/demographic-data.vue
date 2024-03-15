<template lang="">
  <v-container class="" style="width: 900px">
    <!-- 1st page -->
    <div class="pages" v-show="page == 1">
      <v-row>
        <v-col cols="12" class="d-flex ga-2 flex-wrap">
          <v-text-field
            v-for="(field, key) in inputFields.step1.textField"
            :key="key"
            :label="field.label"
            :type="field.type"
            variant="outlined"
            style="width: 300px"
            density="compact"
            :hint="field.hint"
            v-model="personalDataInputs[key]"
            :rules="field.rules"
          ></v-text-field>
          <v-select
            v-for="(field, key) in inputFields.step1.selectField"
            :key="key"
            :label="field.label"
            :items="field.items"
            variant="outlined"
            style="width: 300px"
            density="compact"
            v-model="personalDataInputs[key]"
          ></v-select>
        </v-col>
      </v-row>
    </div>
    <!-- 2nd Page -->
    <div class="pages" v-show="page == 2">
      <v-row>
        <v-col cols="12" class="d-flex ga-2 flex-wrap">
          <v-select
            v-for="(field, key) in inputFields.step2.selectField"
            :key="key"
            :label="field.label"
            :items="field.options"
            variant="outlined"
            style="width: 300px"
            density="compact"
            v-model="personalDataInputs[key]"
          ></v-select>
          <v-text-field
            v-for="(field, key) in inputFields.step2.textField"
            :key="key"
            :label="field.label"
            :type="field.type"
            variant="outlined"
            style="width: 300px"
            density="compact"
            v-model="personalDataInputs[key]"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    {{ personalDataInputs }}
  </v-container>
  <v-pagination :length="totalPages" v-model="page"></v-pagination>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import {
  getRegions,
  getProvince,
  getMunicipality,
  getBarangay,
} from "@/api/assesment-tool";
const emit = defineEmits(["personalData"]);
const totalPages = ref(2);
const page = ref(1);
const personalDataInputs = ref({});

watchEffect(() => {
  const personalDataInputsCopy = Object.keys(personalDataInputs.value).reduce(
    (acc, key) => {
      acc[key] = personalDataInputs.value[key];
      return acc;
    },
    {}
  );
  emit("personalData", personalDataInputsCopy);
});

const inputRules = {
  required: [(v) => !!v || "required"],
};
const inputFields = {
  step1: {
    textField: {
      last_name: {
        label: "Last Name",
        type: "text",
        rules: inputRules.required,
      },
      first_name: {
        label: "First Name",
        type: "text",
        rules: inputRules.required,
      },
      middle_name: {
        label: "Middle Name",
        type: "text",
      },
      age: {
        label: "Age",
        type: "number",
      },
      contact_number: {
        label: "Contact Number",
        type: "number",
      },
      birth_date: {
        label: "Date of Birth",
        type: "date",
      },
      place_of_birth: {
        label: "Place of Birth",
        type: "text",
      },
      religion: {
        label: "Religion",
        type: "text",
      },
      nationality: {
        label: "Nationality",
        type: "text",
      },
      preferred_name: {
        label: "Preferred Name",
        type: "text",
        hint: "For members of the LGBTQIA+ Community",
      },
    },
    selectField: {
      sex: {
        label: "Sex",
        items: ["Male", "Female"],
      },
      gender: {
        label: "Gender Identity",
        items: ["Masculine", "Feminine", "LGBTQIA+", "Other"],
      },
    },
  },
  step2: {
    selectField: {
      civil_status: {
        label: "Civil Status",
        options: [
          "Single",
          "Married",
          "Widowed",
          "Divorced",
          "Annulled",
          "Common Law OS",
          "Common Law SS",
          "Separated Legally",
          "Separated De Facto",
        ],
      },
      living_arrangement: {
        label: "Living Arrangement",
        options: [
          "owned",
          "shared",
          "rent",
          "homeless",
          "institutionalized",
          "others",
        ],
      },
      education: {
        label: "Education",
        options: [
          "Early Childhood Education",
          "Primary",
          "Secondary",
          "Tertiary",
          "Vocational",
          "Post Graduate",
          "No Educational Attainment",
        ],
      },
      educationStatus: {
        label: "Education Status",
        options: ["Level", "Graduated", "Ongoing"],
      },
    },
    textField: {
      occupation: {
        label: "Occupation",
        type: "text",
      },
      monthly_income: {
        label: "Monthly Income",
        type: "number",
      },
      ph_membership_number: {
        label: "PhilHealth Membership Number",
        type: "text",
      },
      ph_membership_type: {
        label: "PhilHealth Membership",
        options: ["Direct Contributor", "Indirect Contributor"],
      },
    },
  },
};
</script>
<style lang="css">
.pages {
  min-width: 700px;
}
</style>
