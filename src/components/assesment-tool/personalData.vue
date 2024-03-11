<template lang="">
  <div>
    <v-tabs
      class="tabs"
      v-model="tab"
      align-tabs="center"
      color="black"
      density="compact"
    >
      <v-tab
        v-for="(header, index) in tabHeaders"
        :value="header.value"
        :key="index"
      >
        {{ header.title }}
      </v-tab>
    </v-tabs>
    <v-window class="" v-model="tab">
      <!-- personal data -->
      <v-window-item :value="0">
        <v-container style="width: 1000px">
          <v-form ref="personalForm">
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
                  :rules="value.rules"
                  v-model="patientData[key]"
                  density="compact"
                  variant="outlined"
                  style="min-width: 300px"
                  class=""
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
                  :rules="inputRules.remarks"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-btn
              color="secondary"
              @click="updatePersonalData"
              prepend-icon="mdi-content-save"
              class="my-5"
              >Update Personal Data</v-btn
            >
          </v-form>
        </v-container>
      </v-window-item>
      <!-- address -->
      <v-window-item :value="1">
        <v-container style="width: 1000px">
          <h2>Address:</h2>
          <v-divider class="mb-5"></v-divider>
          <v-row v-if="patientData.address">
            <v-col cols="6">
              <v-combobox
                :label="regionsCombo.permanent.label"
                :items="regions"
                v-model="patientData.address[0].region"
                item-title="regDesc"
                item-value="regCode"
                density="compact"
                variant="outlined"
              >
              </v-combobox>
              <v-combobox
                v-for="(value, key) in address.permanent"
                :key="key"
                variant="outlined"
                density="compact"
                :label="value.label"
                v-model="patientData.address[0][key]"
              >
              </v-combobox>
            </v-col>
            <v-col cols="6">
              <v-combobox
                :label="regionsCombo.temporary.label"
                :items="regions"
                v-model="patientData.address[1].region"
                item-title="regDesc"
                item-value="regCode"
                density="compact"
                variant="outlined"
              >
              </v-combobox>
              <v-combobox
                v-for="(value, key) in address.permanent"
                :key="key"
                variant="outlined"
                density="compact"
                :label="value.label"
                v-model="patientData.address[1][key]"
              >
              </v-combobox>
            </v-col>
          </v-row>
          <v-btn
            color="secondary"
            @click="updatePatientAddressData"
            prepend-icon="mdi-content-save"
            class="mb-5"
            >Update Address</v-btn
          >
        </v-container>
      </v-window-item>
      <!-- family composition -->
      <v-window-item :value="2">
        <v-container style="width: 1000px">
          <h2>Family Composition:</h2>
          <v-divider class="mb-5"></v-divider>
          <div class="d-flex justify-end">
            <v-btn
              color="grey"
              @click="dialogs.addFamily = !dialogs.addFamily"
              prepend-icon="mdi-account-plus"
              >Add family member</v-btn
            >
          </div>
          <div v-if="familyComposition && familyComposition.length">
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
                <!-- <v-col cols="12">
                  <v-text-field
                    v-for="(item, key) in familyCompositionFields.col3"
                    :key="key"
                    :label="item.label"
                    :type="item.type"
                    v-model="familyComposition[key]"
                    variant="outlined"
                    density="compact"
                  ></v-text-field>
                </v-col> -->
              </v-row>
              <v-btn
                color="secondary"
                prepend-icon="mdi-content-save"
                class="mb-5"
                >Update family composition</v-btn
              >
            </div>
            <v-btn
              color="grey"
              class="mb-5"
              @click="showFamilyComposition = !showFamilyComposition"
              :append-icon="
                showFamilyComposition ? 'mdi-menu-up' : 'mdi-menu-down'
              "
              >Toggle Family Composition</v-btn
            >
          </div>
        </v-container>
      </v-window-item>
    </v-window>
    <v-snackbar
      v-for="(bar, key) in updateBars"
      :key="key"
      color="green"
      location="top"
      :timeout="2500"
      min-width="250px"
      v-model="bar.isActive"
    >
      <div class="d-flex justify-center align-center ga-2">
        <v-icon icon="mdi-check-bold"></v-icon>
        <p class="text-subtitle-1">{{ bar.text }}</p>
      </div>
    </v-snackbar>
  </div>
  <v-dialog v-model="dialogs.addFamily" width="600px" persistent>
    <v-card>
      <v-card-title primary-title> Family Composition </v-card-title>
      <v-card-text>
        <div class="d-flex ga-2 flex-wrap">
          <v-text-field
            v-for="(value, key) in inputFields.familyComposition"
            :key="key"
            :label="value.label"
            :type="value.type"
            density="compact"
            variant="outlined"
            v-model="inputFields.familyComposition[key].data"
            style="width: 250px"
          ></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn color="error" @click="dialogs.addFamily = !dialogs.addFamily"
          >Cancel</v-btn
        >
        <v-btn color="primary" @click="createFamilyMemberData">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { getPatientByID, updatePatient } from "@/api/patients";
import {
  getFamilyComposition,
  getRegions,
  updatePatientAddress,
  createFamilyMember,
} from "@/api/assesment-tool";

let patientData = ref({});
let regions = ref([]);
let familyComposition = ref({});
const showFamilyComposition = ref(false);
const personalForm = ref(null);

const inputRules = {
  first_name: [(v) => !!v || "First Name is required"],
  last_name: [(v) => !!v || "Last Name is required"],
  remarks: [
    (v) =>
      v == null ||
      v.length <= 255 ||
      "Remarks must be less than 255 characters",
  ],
};
const tab = ref(0);
const tabHeaders = {
  personalData: {
    title: "Personal Data",
  },
  addressData: {
    title: "Address Data",
  },
  familyComposition: {
    title: "Family Composition",
  },
};

const updateBars = ref({
  personalData: {
    isActive: false,
    text: "Personal Data Updated",
  },
  addressData: {
    isActive: false,
    text: "Address Updated",
  },
  familyComposition: {
    isActive: false,
    text: "Successfully Added Family Member",
  },
});

const dialogs = ref({
  addFamily: false,
});

const inputFields = ref({
  col1: {
    first_name: {
      label: "First Name",
      type: "text",
      rules: inputRules.first_name,
    },
    middle_name: {
      label: "Middle Name",
      type: "text",
    },
    last_name: {
      label: "Last Name",
      type: "text",
      rules: inputRules.last_name,
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
  familyComposition: {
    full_name: {
      label: "FullName",
      type: "text",
      data: "",
    },
    age: {
      label: "Age",
      type: "text",
      data: "",
    },
    birth_date: {
      label: "Birth Date",
      type: "date",
      data: "",
    },
    civil_status: {
      label: "Civil Status",
      type: "text",
      data: "",
    },
    relationship: {
      label: "Relationship",
      type: "text",
      data: "",
    },
    educational_attainment: {
      label: "Educational Attainment",
      type: "text",
      data: "",
    },
    occupation: {
      label: "Occupation",
      type: "text",
      data: "",
    },
    monthly_income: {
      label: "Monthly Income",
      type: "text",
      data: "",
    },
  },
});

const regionsCombo = {
  permanent: {
    label: "Region",
    items: regions,
  },
  temporary: {
    label: "Region",
    items: regions,
  },
};
const address = {
  permanent: {
    province: {
      label: "Province",
    },
    district: {
      label: "District",
    },
    municipality: {
      label: "Municipality",
    },
    barangay: {
      label: "Barangay",
    },
    purok: {
      label: "Purok",
    },
  },
  temporary: {
    region: {
      label: "Region",
    },
    province: {
      label: "Province",
    },
    district: {
      label: "District",
    },
    municipality: {
      label: "Municipality",
    },
    barangay: {
      label: "Barangay",
    },
    purok: {
      label: "Purok",
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
  await getRegionData();
});

const validateForm = async (formType) => {
  const form = await formType.value.validate();
  if (!form.valid) return false;
  return true;
};

const createFamilyMemberData = async () => {
  let familyMember = {};
  for (const key in inputFields.value.familyComposition) {
    familyMember[key] = inputFields.value.familyComposition[key].data;
  }
  familyMember.patient_id = props.patientId;
  console.log(familyMember);
  const response = await createFamilyMember(familyMember);
  if (response) {
    updateBars.value.familyComposition.isActive = true;
    familyComposition.value.push(familyMember);
  }
};

// * Fetch Section
const getPatientData = async () => {
  const response = await getPatientByID(props.patientId);
  patientData.value = response;
};
const getFamilyCompositionData = async () => {
  const response = await getFamilyComposition(props.patientId);
  familyComposition.value = response;
};
const getRegionData = async () => {
  const response = await getRegions();
  regions.value = response;
};

// * Update Section
const updatePersonalData = async () => {
  const validate = await validateForm(personalForm);
  if (!validate) return;
  const response = await updatePatient(patientData.value);
  if (response) {
    updateBars.value.personalData.isActive = true;
  }
};
const updatePatientAddressData = async () => {
  const patientAddress = patientData.value.address;
  const response = await updatePatientAddress(patientAddress);
  if (response) {
    updateBars.value.addressData.isActive = true;
  }
};
</script>
<style lang="css" scoped></style>
