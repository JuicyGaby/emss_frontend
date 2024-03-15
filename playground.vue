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
            density="comfortable"
            :hint="field.hint"
          ></v-text-field>
          <v-select
            v-for="(field, key) in inputFields.step1.selectField"
            :key="key"
            :label="field.label"
            :items="field.items"
            variant="outlined"
            style="width: 300px"
            density="comfortable"
          ></v-select>
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
        <v-col cols="12" class="d-flex ga-2 flex-wrap">
          <v-select
            v-for="(field, key) in inputFields.step3.selectField"
            :key="key"
            :label="field.label"
            :items="field.options"
            variant="outlined"
            style="width: 300px"
            density="comfortable"
          ></v-select>
          <v-text-field
            v-for="(field, key) in inputFields.step3.textField"
            :key="key"
            :label="field.label"
            :type="field.type"
            variant="outlined"
            style="width: 300px"
            density="comfortable"
          ></v-text-field>
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

const inputFields = {
  step1: {
    textField: {
      last_name: {
        label: "Last Name",
        type: "text",
      },
      first_name: {
        label: "First Name",
        type: "text",
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
  },
  step3: {
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
