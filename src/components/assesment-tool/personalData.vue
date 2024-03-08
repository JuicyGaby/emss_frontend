<template lang="">
  <div>
    <v-container class="" style="width: 1000px">
      <h2>Personal Data:</h2>
      <v-divider class="mb-5"></v-divider>
      <!-- persnal data -->
      <v-row>
        <!-- col1 -->
        <v-col cols="4">
          <v-text-field
            v-for="(value, key) in inputFields.col1"
            :key="key"
            :label="value.label"
            :type="value.type"
            v-model="patientData[key]"
            density="compact"
            variant="outlined"
            style="min-width: 300px"
          ></v-text-field>
        </v-col>
        <!-- col2 -->
        <v-col cols="4">
          <v-combobox
            v-for="(value, key) in inputFields.col2"
            :key="key"
            :label="value.label"
            :items="value.items"
            density="compact"
            variant="outlined"
            v-model="patientData[key]"
            style="min-width: 300px"
          >
          </v-combobox>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-for="(value, key) in inputFields.col3"
            :key="key"
            :label="value.label"
            :type="value.type"
            v-model="patientData[key]"
            density="compact"
            variant="outlined"
            style="min-width: 300px"
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- remarks -->
      <h2>Remarks:</h2>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="patientData.remarks"
            label="Remarks"
            rows="5"
            auto-grow
            style="min-width: 300px"
            variant="outlined"
            counter="255"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-btn
        color="secondary"
        @click="updatePersonalData"
        prepend-icon="mdi-content-save"
        class="mb-5"
        >Update Personal Data</v-btn
      >
      <!-- address -->
      <h2>Address:</h2>
      <v-divider class="mb-5"></v-divider>
      <v-row v-if="patientData.address">
        <v-col cols="6">
          <h4 class="mb-5">Permanent Address</h4>
          <v-text-field
            v-for="(value, key) in address.permanent"
            :key="key"
            :label="value.label"
            :type="value.type"
            v-model="patientData.address[0][key]"
            density="compact"
            variant="outlined"
            style="min-width: 300px"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <h4 class="mb-5">Temporary Address</h4>
          <v-text-field
            v-for="(value, key) in address.permanent"
            :key="key"
            :label="value.label"
            :type="value.type"
            v-model="patientData.address[1][key]"
            density="compact"
            variant="outlined"
            style="min-width: 300px"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn color="secondary" prepend-icon="mdi-content-save" class="mb-5"
        >Update Address</v-btn
      >
      <!-- family composition -->
      <h2>Family Composition:</h2>
      <v-divider class="mb-5"></v-divider>
      <div v-if="showFamilyComposition">
        <v-row
          v-if="familyComposition"
          v-for="(item, index) in familyComposition"
          :key="index"
        >
          <!-- display the current number -->
          <v-col cols="12">
            <h4>Family Member : {{ index + 1 }}</h4>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-for="(value, key) in familyCompositionFields.col1"
              :key="key"
              :label="value.label"
              :type="value.type"
              v-model="item[key]"
              density="compact"
              variant="outlined"
              style="min-width: 300px"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-for="(value, key) in familyCompositionFields.col2"
              :key="key"
              :label="value.label"
              :type="value.type"
              v-model="item[key]"
              density="compact"
              variant="outlined"
              style="min-width: 300px"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-for="(item, key) in familyCompositionFields.col3"
              :key="key"
              :label="item.label"
              :type="item.type"
              v-model="familyComposition[key]"
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn color="secondary" prepend-icon="mdi-content-save" class="mb-5"
          >Update family composition</v-btn
        >
      </div>
      <v-btn
        color="grey"
        class="mb-5"
        @click="showFamilyComposition = !showFamilyComposition"
        :append-icon="showFamilyComposition ? 'mdi-menu-up' : 'mdi-menu-down'"
        >Toggle Family Composition</v-btn
      >
    </v-container>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getPatientByID, updatePatient } from "@/api/patients";
import { getFamilyComposition } from "@/api/assesment-tool";

let patientData = ref({});
let familyComposition = ref({});
const showFamilyComposition = ref(false);

const inputFields = {
  col1: {
    first_name: {
      label: "First Name",
      type: "text",
    },
    middle_name: {
      label: "Middle Name",
      type: "text",
    },
    last_name: {
      label: "Last Name",
      type: "text",
    },
    age: {
      label: "Age",
      type: "text",
    },
    birth_date: {
      label: "Birth Date",
      type: "date",
    },
    religion: {
      label: "Religion",
      type: "text",
    },
    contact_number: {
      label: "Contact Number",
      type: "text",
    },
  },
  col2: {
    gender: {
      label: "Gender Identity",
      items: ["Masculine", "Feminine", "LGBTQIA+", "Other"],
    },
    sex: {
      label: "Sex",
      items: ["Male", "Female"],
    },
    nationality: {
      label: "Nationality",
      items: ["Filipino", "Other"],
    },
    civil_status: {
      label: "Civil Status",
      items: [
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
      items: [
        "owned",
        "shared",
        "rent",
        "homeless",
        "institutionalized",
        "others",
      ],
    },
    highest_education_level: {
      label: "Education",
      items: [
        "Early Childhood Education",
        "Primary",
        "Secondary",
        "Tertiary",
        "Vocational",
        "Post Graduate",
        "No Educational Attainment",
      ],
    },
    education_status: {
      label: "Education Status",
      items: ["OnGoing", "Graduated", "Stopped", "Others"],
    },
  },
  col3: {
    occupation: {
      label: "Occupation",
      type: "text",
    },
    monthly_income: {
      label: "Monthly Income",
      type: "text",
    },
    ph_membership_number: {
      label: "PH Membership Number",
      type: "text",
    },
    ph_membership_type: {
      label: "PH Membership",
      type: "text",
    },
  },
};
const address = {
  permanent: {
    region: {
      label: "Region",
      type: "text",
    },
    province: {
      label: "Province",
      type: "text",
    },
    district: {
      label: "District",
      type: "text",
    },
    municipality: {
      label: "Municipality",
      type: "text",
    },
    barangay: {
      label: "Barangay",
      type: "text",
    },
    purok: {
      label: "Purok",
      type: "text",
    },
  },
  temporary: {
    region: {
      label: "Region",
      type: "text",
    },
    province: {
      label: "Province",
      type: "text",
    },
    district: {
      label: "District",
      type: "text",
    },
    municipality: {
      label: "Municipality",
      type: "text",
    },
    barangay: {
      label: "Barangay",
      type: "text",
    },
    purok: {
      label: "Purok",
      type: "text",
    },
  },
};

const familyCompositionFields = {
  col1: {
    full_name: {
      label: "Full Name",
      type: "text",
    },
    age: {
      label: "Age",
      type: "text",
    },
    birth_date: {
      label: "Birth Date",
      type: "date",
    },
    civil_status: {
      label: "Civil Status",
      type: "text",
    },
  },
  col2: {
    relationship: {
      label: "Relationship",
      type: "text",
    },
    educational_attainment: {
      label: "Educational Attainment",
      type: "text",
    },
    occupation: {
      label: "Occupation",
      type: "text",
    },
    monthly_income: {
      label: "Monthly Income",
      type: "text",
    },
  },
  col3: {
    other_source_of_income: {
      label: "Other Source of Income",
      type: "text",
    },
    household_size: {
      label: "Household Size",
      type: "text",
    },
    total_household_income: {
      label: "Total Household Income",
      type: "text",
    },
    per_capita_income: {
      label: "Per Capita Income",
      type: "text",
    },
  },
};

const props = defineProps({
  patientId: Number,
});

onMounted(async () => {
  await getPatientData();
  await getFamilyCompositionData();
});

const getPatientData = async () => {
  const response = await getPatientByID(props.patientId);
  patientData.value = response;
};

const getFamilyCompositionData = async () => {
  const response = await getFamilyComposition(props.patientId);
  familyComposition.value = response;
};

const updatePersonalData = async () => {
  console.log(patientData.value);
};
</script>
<style lang="css" scoped></style>
