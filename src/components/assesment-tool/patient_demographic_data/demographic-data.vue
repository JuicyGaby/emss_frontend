<template lang="">
  <v-container class="d-flex flex-column">
    <!-- 1st page -->
    <div class="pages" v-show="page == 1">
      <v-row>
        <v-col class="d-flex flex-column">
          <!-- 1st row -->
          <div class="d-flex ga-2">
            <v-text-field
              v-for="(value, key) in step1.firstRow"
              :key="key"
              :label="value.label"
              :type="value.type"
              v-model="personalDataInputs[key]"
              variant="outlined"
              :rules="value.rules"
              style="min-width: 300px"
            ></v-text-field>
          </div>
          <!-- 2nd row -->
          <div class="d-flex ga-2">
            <v-text-field
              v-for="(value, key) in step1.secondRow"
              :key="key"
              :label="value.label"
              :type="value.type"
              v-model="personalDataInputs[key]"
              variant="outlined"
              style="min-width: 300px"
            ></v-text-field>
          </div>
          <!-- 3rd row -->
          <div class="d-flex ga-2">
            <v-text-field
              v-for="(value, key) in step1.thirdRow"
              :key="key"
              :label="value.label"
              :type="value.type"
              v-model="personalDataInputs[key]"
              variant="outlined"
              style="min-width: 300px"
            ></v-text-field>
          </div>
          <!-- 4th row -->
          <div class="d-flex justify-space-between align-center ga-2">
            <v-autocomplete
              label="Sex"
              :items="step1.fourthRow.sex.options"
              v-model="personalDataInputs.sex"
              variant="outlined"
            ></v-autocomplete>
            <v-autocomplete
              label="Gender Identity"
              :items="step1.fourthRow.gender.options"
              v-model="personalDataInputs.gender"
              variant="outlined"
            ></v-autocomplete>
          </div>
          <!-- 5th row -->
          <div class="d-flex ga-2">
            <v-text-field
              v-for="(value, key) in step1.fifthRow"
              :key="key"
              :label="value.label"
              :type="value.type"
              v-model="personalDataInputs[key]"
              variant="outlined"
              style="min-width: 300px"
            ></v-text-field>
          </div>
        </v-col>
      </v-row>
    </div>
    <!-- 2nd page -->
    <div class="pages" v-show="page == 2">
      <v-card-title sub-title> Permanent Address </v-card-title>
      <v-autocomplete
        label="Region"
        variant="outlined"
        :items="options.regions"
        item-title="regDesc"
        item-value="regCode"
        v-model="personalDataInputs.address.permanent.region"
      ></v-autocomplete>
      <v-autocomplete
        label="Province"
        variant="outlined"
        :items="options.provinces"
        item-title="provDesc"
        item-value="provCode"
        v-model="personalDataInputs.address.permanent.province"
      >
      </v-autocomplete>
      <v-autocomplete
        label="Municipality"
        variant="outlined"
        :items="options.municipality"
        item-title="citymunDesc"
        item-value="citymunCode"
        v-model="personalDataInputs.address.permanent.municipality"
      >
      </v-autocomplete>
      <v-text-field
        label="District"
        variant="outlined"
        v-model="personalDataInputs.address.permanent.district"
      ></v-text-field>
      <v-autocomplete
        label="Baranggay"
        variant="outlined"
        :items="options.barangay"
        item-title="brgyDesc"
        item-value="brgyCode"
        v-model="personalDataInputs.address.permanent.baranggay"
      >
      </v-autocomplete>
        <v-text-field
            label="Purok"
            variant="outlined"
            v-model="personalDataInputs.address.permanent.purok"
        ></v-text-field>

    </div>
    <!-- 3rd page -->
    <div class="pages" v-show="page == 3">
      <v-card-title sub-title> Temporary Address </v-card-title>
      <v-autocomplete
        label="Region"
        variant="outlined"
        :items="options.regions"
        item-title="regDesc"
        item-value="regCode"
        v-model="personalDataInputs.address.temporary.region"
      ></v-autocomplete>
      <v-autocomplete
        label="Province"
        variant="outlined"
        :items="options.provinces"
        item-title="provDesc"
        item-value="provCode"
        v-model="personalDataInputs.address.temporary.province"
      >
      </v-autocomplete>
      <v-autocomplete
        label="Municipality"
        variant="outlined"
        :items="options.municipality"
        item-title="citymunDesc"
        item-value="citymunCode"
        v-model="personalDataInputs.address.temporary.municipality"
      >
      </v-autocomplete>
        <v-text-field
            label="District"
            variant="outlined"
            v-model="personalDataInputs.address.temporary.district"
        ></v-text-field>
      <v-autocomplete
        label="Baranggay"
        variant="outlined"
        :items="options.barangay"
        item-title="brgyDesc"
        item-value="brgyCode"
        v-model="personalDataInputs.address.temporary.baranggay"
      >
      </v-autocomplete>
        <v-text-field
            label="Purok"
            variant="outlined"
            v-model="personalDataInputs.address.temporary.purok"
        ></v-text-field>
    </div>
    <!-- 4th page -->
    <div class="pages" v-show="page == 4">
      <v-row>
        <v-col class="d-flex flex-column">
          <!-- row 1 -->
          <div class="d-flex ga-2">
            <v-autocomplete
              :items="step3.firstRow.civil_status.options"
              v-model="personalDataInputs.civil_status"
              :label="step3.firstRow.civil_status.label"
              variant="outlined"
              style="min-width: 300px"
            ></v-autocomplete>
            <v-autocomplete
              :items="step3.firstRow.living_arrangement.options"
              v-model="personalDataInputs.living_arrangement"
              :label="step3.firstRow.living_arrangement.label"
              variant="outlined"
              style="min-width: 300px"
            ></v-autocomplete>
          </div>
          <!-- row 2 -->
          <div class="d-flex align-center">
            <v-autocomplete
              :items="step3.secondRow.education.options"
              v-model="personalDataInputs.education"
              :label="step3.secondRow.education.label"
              variant="underlined"
              style="min-width: 300px"
              class=""
            ></v-autocomplete>
            <v-radio-group inline v-model="personalDataInputs.educationStatus">
              <v-radio
                v-for="option in step3.secondRow.educationStatus.options"
                :key="option.value"
                :label="option.text"
                :value="option.value"
              ></v-radio>
            </v-radio-group>
          </div>
          <!-- row 3 -->
          <div class="d-flex ga-2">
            <v-text-field
              v-for="(value, key) in step3.thirdRow"
              :key="key"
              :label="value.label"
              :type="value.type"
              v-model="personalDataInputs[key]"
              variant="outlined"
              style="min-width: 300px"
            ></v-text-field>
          </div>
          <!-- row 4 -->
          <div class="d-flex align-center">
            <v-text-field
              v-model="personalDataInputs.ph_membership_number"
              :label="step3.fourthRow.ph_membership_number.label"
              :type="step3.fourthRow.ph_membership_number.type"
              variant="outlined"
              style="min-width: 300px"
            ></v-text-field>
            <v-radio-group inline v-model="personalDataInputs.ph_membership_type">
              <v-radio
                v-for="option in step3.fourthRow.ph_membership_type.options"
                :key="option.value"
                :label="option.text"
                :value="option.value"
              ></v-radio>
            </v-radio-group>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
  <v-pagination :length="totalPages" v-model="page"></v-pagination>
</template>
<script setup>
import { ref, onMounted, watch, watchEffect } from "vue";
import {
  getRegions,
  getProvince,
  getMunicipality,
  getBarangay,
} from "@/api/assesment-tool";

const emit = defineEmits(["personalData"]);

const totalPages = ref(4);
const page = ref(1);
const regions = ref({});

onMounted(async () => {
  options.value.regions = await getRegions();
});

// create a watch for personalDataInputs.address.permanent.region if theres a change

const personalDataInputs = ref({
  last_name: null,
  first_name: null,
  middle_name: "",
  age: "",
  contact_number: "",
  birth_date: "",
  place_of_birth: "",
  sex: null,
  gender: null,
  religion: "",
  nationality: "",
  civil_status: null,
  living_arrangement: null,
  education: null,
  educationStatus: null,
  occupation: "",
  monthly_income: "",
  ph_membership_number: "",
  ph_membership_type: null,
  address: {
    permanent: {
      region: "",
      province: "",
      district: "",
      municipality: "",
      baranggay: "",
      purok: "",
    },
    temporary: {
      region: "",
      province: "",
      district: "",
      municipality: "",
      baranggay: "",
      purok: "",
    },
  },
});

watchEffect(() => {
  const personalDataInputsCopy = Object.keys(personalDataInputs.value).reduce((acc, key) => {
    acc[key] = personalDataInputs.value[key];
    return acc;
  }, {});
  emit('personalData', personalDataInputsCopy);
});



const inputRules = {
  required: [(v) => !!v || "required"],
};

const educationOptions = [
  "Early Childhood Education",
  "Primary",
  "Secondary",
  "Tertiary",
  "Vocational",
  "Post Graduate",
  "No Educational Attainment",
];

const civilStatusOptions = [
  "Single",
  "Married",
  "Widowed",
  "Divorced",
  "Annulled",
  "Common Law OS",
  "Common Law SS",
  "Separated Legally",
  "Separated De Facto",
];

const livingArrangementOptions = [
  "owned",
  "shared",
  "rent",
  "homeless",
  "institutionalized",
  "others",
];

const genderOptions = ["Masculine", "Feminine", "LGBTQIA+", "Other"];

const step1 = {
  firstRow: {
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
  },
  secondRow: {
    age: {
      label: "Age",
      type: "number",
    },
    contact_number: {
      label: "Contact Number",
      type: "number",
    },
  },
  thirdRow: {
    birth_date: {
      label: "Date of Birth",
      type: "date",
    },
    place_of_birth: {
      label: "Place of Birth",
      type: "text",
    },
  },
  fourthRow: {
    sex: {
      label: "Sex",
      options: ["Male", "Female"],
    },
    gender: {
      label: "Gender Identity",
      options: genderOptions,
    },
  },
  fifthRow: {
    religion: {
      label: "Religion",
      type: "text",
    },
    nationality: {
      label: "Nationality",
      type: "text",
    },
  },
};
const step2 = {
  address: {
    permanent: {
      label: "Permanent Address",
      type: "text",
      data: ref({
        region: "",
        Province: "",
        District: "",
        Municipality: "",
        Baranggay: "",
        Purok: "",
      }),
    },
    temporary: {
      label: "Temporary Address",
      type: "text",
      data: ref({
        region: "",
        Province: "",
        District: "",
        Municipality: "",
        Baranggay: "",
        Purok: "",
      }),
    },
  },
};
const step3 = {
  firstRow: {
    civil_status: {
      label: "Civil Status",
      options: civilStatusOptions,
    },
    living_arrangement: {
      label: "Living Arrangement",
      options: livingArrangementOptions,
    },
  },
  secondRow: {
    education: {
      label: "Education",
      options: educationOptions,
    },
    educationStatus: {
      label: "Education Status",
      options: [
        { text: "Level", value: "Level" },
        { text: "Graduated", value: "Graduated" },
        { text: "Ongoing", value: "Ongoing" },
      ],
    },
  },
  thirdRow: {
    occupation: {
      label: "Occupation",
      type: "text",
    },
    monthly_income: {
      label: "Monthly Income",
      type: "number",
    },
  },
  fourthRow: {
    ph_membership_number: {
      label: "PhilHealth Membership Number",
      type: "text",
    },
    ph_membership_type: {
      label: "PhilHealth Membership",
      options: [
        { text: "Direct Contributor", value: "Direct Contributor" },
        { text: "Indirect Contributor", value: "Indirect Contributor" },
      ],
    },
  },
};

const watchAddressChange = (addressType, key, apiCall, optionKey) => {
  watch(
    () => personalDataInputs.value.address[addressType][key],
    async (newVal) => {
      options.value[optionKey] = await apiCall(newVal);
    }
  );
};
watchAddressChange("permanent", "region", getProvince, "provinces");
watchAddressChange("permanent", "province", getMunicipality, "municipality");
watchAddressChange("permanent", "municipality", getBarangay, "barangay");
watchAddressChange("temporary", "region", getProvince, "provinces");
watchAddressChange("temporary", "province", getMunicipality, "municipality");
watchAddressChange("temporary", "municipality", getBarangay, "barangay");

const options = ref({
  regions: [],
  provinces: [],
  municipality: [],
  barangay: [],
  purok: [],
});

const dataDebugger = () => {
  console.log(personalDataInputs.value);
};
</script>
<style lang="css">
.pages {
  min-width: 700px;
}
</style>
