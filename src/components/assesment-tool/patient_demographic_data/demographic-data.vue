<template lang="">
  <v-container class="" style="width: 900px">
    <!-- 1st page -->
    <div class="pages" v-show="page == 1">
      <v-row>
        <v-col cols="12" class="d-flex ga-2 flex-wrap">
          <template v-for="(value, index) in inputFields.step1">
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
              :readonly="value.isReadOnly"
              v-model="personalDataInputs[index]"
            ></v-text-field>
            <v-combobox
              v-else-if="value.formType === 'select'"
              :key="'select-' + index"
              :label="value.label"
              variant="outlined"
              style="width: 400px"
              density="compact"
              :items="value.items"
              v-model="personalDataInputs[index]"
            ></v-combobox>
          </template>
        </v-col>
      </v-row>
    </div>
    <!-- 2nd Page -->
    <div class="pages" v-show="page == 2">
      <v-row>
        <v-col cols="12" class="d-flex ga-2 flex-wrap">
          <template v-for="(value, index) in inputFields.step2">
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
              v-model="personalDataInputs[index]"
            ></v-text-field>
            <v-select
              v-else-if="value.formType === 'select'"
              :key="'select-' + index"
              :label="value.label"
              variant="outlined"
              style="width: 400px"
              density="compact"
              :items="value.items"
              v-model="personalDataInputs[index]"
            ></v-select>
            <v-combobox
              v-else-if="value.formType === 'combo'"
              :key="'select-' + index"
              :label="value.label"
              variant="outlined"
              style="width: 400px"
              density="compact"
              :items="value.items"
              v-model="personalDataInputs[index]"
            ></v-combobox>
          </template>
        </v-col>
      </v-row>
    </div>
    {{ personalDataInputs }}
  </v-container>
  <v-pagination :length="totalPages" v-model="page"></v-pagination>
</template>
<script setup>
import { ref, watchEffect, watch, onMounted } from "vue";
import { userAuthentication } from "@/stores/session";
import moment from "moment";
import {
  educationalAttainment,
  educationStatus,
  religion,
  civilStatus,
} from "@/utils/constants";
const emit = defineEmits(["personalData"]);
const authentication = userAuthentication();
const totalPages = ref(2);
const page = ref(1);
const personalDataInputs = ref({
  birth_date: "",
  age: "",
  social_worker: `${authentication.user.fname} ${authentication.user.lname}`,
  social_worker_id: authentication.user.id,
});

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
watch(
  () => personalDataInputs.value.birth_date,
  (newBirthDate) => {
    if (newBirthDate) {
      const birthDate = moment(newBirthDate);
      const age = moment().diff(birthDate, "years");
      personalDataInputs.value.age = age;
    }
  }
);
const inputFields = {
  step1: {
    last_name: {
      label: "Last Name",
      formType: "text",
      type: "text",
      hint: "Field Required",
    },
    first_name: {
      label: "First Name",
      formType: "text",
      type: "text",
      hint: "Field Required",
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

  step2: {
    civil_status: {
      label: "Civil Status",
      formType: "select",
      items: civilStatus,
    },
    living_arrangement: {
      label: "Living Arrangement",
      formType: "select",
      items: [
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
};
</script>
<style lang="css">
.pages {
  min-width: 700px;
}
</style>
