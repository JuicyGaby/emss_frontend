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
            <v-alert
              title="Personal Data Form : "
              type="info"
              variant="tonal"
            ></v-alert>
            <v-divider class="mb-5"></v-divider>
            <!-- persnal data -->
            <v-row>
              <v-col cols="12" class="d-flex ga-2 flex-wrap">
                <v-text-field
                  v-for="(value, key) in inputFields.personalData.textField"
                  :key="key"
                  :label="value.label"
                  :type="value.type"
                  variant="outlined"
                  style="width: 300px"
                  density="compact"
                  v-model="patientData[key]"
                  :rules="value.rules"
                  :counter="value.counter"
                ></v-text-field>
                <v-combobox
                  v-for="(value, key) in inputFields.personalData.comboField"
                  :key="key"
                  :label="value.label"
                  :items="value.items"
                  variant="outlined"
                  style="width: 300px"
                  density="compact"
                  v-model="patientData[key]"
                ></v-combobox>
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
              prepend-icon="mdi-update"
              @click="updatePersonalData"
              class="my-5"
              >Update Personal Data</v-btn
            >
          </v-form>
          <!-- {{ patientData }} -->
        </v-container>
      </v-window-item>
      <!-- address -->
      <v-window-item :value="1">
        <v-container style="width: 1000px">
          <v-alert
            title="Address Form : "
            type="info"
            variant="tonal"
          ></v-alert>
          <v-divider class="mb-5"></v-divider>
          <v-row>
            <h3>Permanent</h3>
            <v-col cols="12" class="d-flex flex-wrap ga-2">
              <template v-for="(value, key) in inputFields.address.permanent">
                <v-select
                  v-if="value.formType === 'select'"
                  :key="'select-' + key"
                  :label="value.label"
                  :items="value.items"
                  variant="outlined"
                  :item-title="value.title"
                  style="width: 350px"
                  v-model="patientAddress[0][key]"
                  density="compact"
                ></v-select>
                <v-combobox
                  v-else
                  :key="'text-' + key"
                  :label="value.label"
                  variant="outlined"
                  :items="value.items"
                  :item-title="value.title"
                  :item-value="value.value"
                  style="width: 350px"
                  :return-object="false"
                  v-model="patientAddress[0][key]"
                  density="compact"
                ></v-combobox>
              </template>
            </v-col>
          </v-row>
          <v-divider class="my-5"></v-divider>
          <v-row>
            <h3>Temporary</h3>
            <v-col cols="12" class="d-flex flex-wrap ga-2">
              <template v-for="(value, key) in inputFields.address.temporary">
                <v-select
                  v-if="value.formType === 'select'"
                  :key="'select-' + key"
                  :label="value.label"
                  :items="value.items"
                  variant="outlined"
                  :item-title="value.title"
                  style="width: 350px"
                  v-model="patientAddress[1][key]"
                  density="compact"
                ></v-select>
                <v-combobox
                  v-else
                  :key="'text-' + key"
                  :label="value.label"
                  variant="outlined"
                  :items="value.items"
                  :item-title="value.title"
                  :item-value="value.value"
                  style="width: 350px"
                  :return-object="false"
                  v-model="patientAddress[1][key]"
                  density="compact"
                ></v-combobox>
              </template>
            </v-col>
          </v-row>
          <v-btn
            color="secondary"
            @click="handleAddressButton"
            prepend-icon="mdi-update"
            class="mb-5"
            >{{
              patientData.addressExist ? "Update Address" : "Update Address"
            }}</v-btn
          >
        </v-container>
        <!-- {{ patientAddress }} -->
      </v-window-item>
      <!-- family composition -->
      <v-window-item :value="2">
        <v-container style="width: 90%">
          <v-alert
            title="Family Composition Form : "
            type="info"
            variant="tonal"
          ></v-alert>
          <v-divider class="mb-5"></v-divider>
          <div class="d-flex justify-end">
            <v-btn
              color="secondary"
              @click="dialogs.addFamily = !dialogs.addFamily"
              prepend-icon="mdi-account-plus"
              class="mb-5"
              >Add family member</v-btn
            >
          </div>
          <v-data-table
            :headers="tableHeaders"
            :items="familyComposition"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:[`item.operation`]="{ item }">
              <div class="d-flex">
                <v-btn @click="toggleEditFamilyDialog(item)" flat
                  ><v-icon color="primary">mdi-pencil</v-icon></v-btn
                >
                <v-btn @click="toggleDeleteFamilyDialog(item)" flat>
                  <v-icon color="error">mdi-delete</v-icon>
                </v-btn>
              </div>
            </template>
          </v-data-table>
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
  <!-- create family member dialog -->
  <v-dialog v-model="dialogs.addFamily" width="600px" persistent>
    <v-card>
      <v-toolbar color="secondary" class="px-5">
        <v-icon>mdi-account-plus</v-icon>
        <v-toolbar-title class="">Add Family Member</v-toolbar-title>
        <v-icon @click="dialogs.addFamily = !dialogs.addFamily"
          >mdi-close</v-icon
        >
      </v-toolbar>
      <v-card-text>
        <v-form ref="familyForm">
          <div class="d-flex ga-2 flex-wrap">
            <template v-for="(value, key) in inputFields.familyComposition">
              <v-text-field
                v-if="value.type === 'text'"
                :key="'text-' + key"
                :label="value.label"
                density="compact"
                variant="outlined"
                :type="value.inputType"
                v-model="inputFields.familyComposition[key].data"
                :rules="value.rules"
                style="width: 250px"
              ></v-text-field>
              <v-select
                v-else-if="value.type === 'select'"
                :key="'select-' + key"
                :label="value.label"
                :items="value.items"
                density="compact"
                variant="outlined"
                :type="value.inputType"
                :rules="value.rules"
                v-model="inputFields.familyComposition[key].data"
                style="width: 250px"
              ></v-select>
              <v-combobox
                v-else-if="value.type === 'combobox'"
                :key="'combobox-' + key"
                :label="value.label"
                :items="value.items"
                variant="outlined"
                style="width: 250px"
                v-model="inputFields.familyComposition[key].data"
                :rules="value.rules"
                density="compact"
              ></v-combobox>
            </template>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-end pa-5">
        <v-btn
          prepend-icon="mdi-account-plus"
          color="primary"
          @click="createFamilyMemberData"
        >
          Create Family Member
        </v-btn>
      </v-card-actions>
      <!-- {{ inputFields.familyComposition }} -->
    </v-card>
  </v-dialog>
  <!-- update family member dialog -->
  <v-dialog v-model="dialogs.editFamily" width="600px" persistent>
    <v-card>
      <v-toolbar color="secondary" class="px-5">
        <v-icon>mdi-account-edit</v-icon>
        <v-toolbar-title class="">Update Family Member</v-toolbar-title>
        <v-icon @click="dialogs.editFamily = !dialogs.editFamily"
          >mdi-close</v-icon
        >
      </v-toolbar>
      <v-card-text>
        <v-form ref="familyForm">
          <div class="d-flex ga-2 flex-wrap">
            <template v-for="(value, key) in inputFields.familyComposition">
              <v-text-field
                v-if="value.type === 'text'"
                :key="'text-' + key"
                :label="value.label"
                density="compact"
                variant="outlined"
                :type="value.inputType"
                v-model="toEditFamilyMember[key]"
                :rules="value.rules"
                style="width: 250px"
              ></v-text-field>
              <v-select
                v-else-if="value.type === 'select'"
                :key="'select-' + key"
                :label="value.label"
                :items="value.items"
                density="compact"
                variant="outlined"
                :type="value.inputType"
                :rules="value.rules"
                v-model="toEditFamilyMember[key]"
                style="width: 250px"
              ></v-select>
            </template>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn
          prepend-icon="mdi-account-edit"
          color="primary"
          @click="updateFamilyMemberData"
          class="pa-5 mb-5"
        >
          Update Family Member
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- delete family member dialog -->
  <v-dialog
    v-model="dialogs.deleteFamily"
    width="600px"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-card-title primary-title>
        <h3>Delete family member:</h3>
      </v-card-title>
      <v-card-text>
        <p>Are you sure you want to delete this family member?</p>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn color="error" @click="dialogs.deleteFamily = false"
          >Cancel</v-btn
        >
        <v-btn color="primary" @click="deleteFamilyMemberData">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import moment from "moment";
import {
  educationStatus,
  educationalAttainment,
  civilStatus,
  contributor_type,
  religion,
  inputRules,
  sex,
} from "@/utils/constants";
import { getPatientByID, updatePatient } from "@/api/patients";
import {
  getFamilyComposition,
  createFamilyMember,
  getFamilyInfo,
  updateFamilyMember,
  deleteFamilyMember,
  // address
  getRegions,
  getProvince,
  getDistrict,
  getMunicipality,
  getBarangay,
  getPatientAddress,
  updatePatientAddress,
  createPatientAddress,
} from "@/api/assesment-tool";

const props = defineProps({
  patientId: Number,
});

onMounted(async () => {
  await getPatientData();
  await getFamilyCompositionData();
  await getRegionData();
  // await getFamilyInfoData();
  await getPatientAddressData();
});
let regions = ref([]);
let patientData = ref({
  addressExist: false,
});
let patientAddress = ref([
  {
    patient_id: props.patientId,
    region: "",
    province: "",
    district: "",
    municipality: "",
    barangay: "",
    purok: "",
    address_type: "permanent",
  },
  {
    patient_id: props.patientId,
    region: "",
    province: "",
    district: "",
    municipality: "",
    barangay: "",
    purok: "",
    address_type: "temporary",
  },
]);

// address
let provinces = ref([]);
let municipalities = ref([]);
let districts = ref([]);
let barangays = ref([]);

let temporaryProvince = ref([]);
let temporaryMunicipalities = ref([]);
let temporaryBarangays = ref([]);

// family composition
let familyComposition = ref({});
let familyInfo = ref({});
const familyForm = ref(null);

let toEditFamilyMember = ref({});
const personalForm = ref(null);
const tab = ref(0);
const tableHeaders = [
  { title: "Fullname", value: "full_name" },
  { title: "Age", value: "age" },
  { title: "Birth Date", value: "birth_date" },
  { title: "Civil Status", value: "civil_status" },
  { title: "Relationship", value: "relationship" },
  { title: "Educational Attainment", value: "educational_attainment" },
  { title: "Occupation", value: "occupation" },
  { title: "Monthly Income", value: "monthly_income" },
  { title: "Operation", value: "operation" },
];
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
  createFamilyMember: {
    isActive: false,
    text: "Family Member Added",
  },
  updateFamilyMember: {
    isActive: false,
    text: "Family Member Updated",
  },
  deleteFamilyMember: {
    isActive: false,
    text: "Family Member Deleted",
  },
});
const dialogs = ref({
  addFamily: false,
  editFamily: false,
  deleteFamily: false,
});
const inputFields = ref({
  personalData: {
    textField: {
      first_name: {
        label: "First Name",
        type: "text",
        rules: [inputRules.required],
      },
      middle_name: {
        label: "Middle Name",
        type: "text",
      },
      last_name: {
        label: "Last Name",
        type: "text",
        rules: [inputRules.required],
      },
      preferred_name: {
        label: "Preferred Name",
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
        rules: [inputRules.invalidNegative, inputRules.contactNumber],
        type: "number",
        counter: 11,
      },
      occupation: {
        label: "Occupation",
        type: "text",
      },
      monthly_income: {
        label: "Monthly Income",
        type: "text",
      },
      ph_membership_number: {
        label: "PHIC Membership Number",
        type: "text",
      },
    },
    comboField: {
      ph_membership_type: {
        label: "PHIC Membership Category",
        items: contributor_type,
      },
      gender: {
        label: "Gender Identity",
        items: ["Masculine", "Feminine", "LGBTQIA+", "Other"],
      },
      sex: {
        label: "Sex",
        items: sex,
      },
      nationality: {
        label: "Nationality",
        items: ["Filipino", "Other"],
      },
      civil_status: {
        label: "Civil Status",
        items: civilStatus,
      },
      highest_education_level: {
        label: "Education",
        items: educationalAttainment,
      },
      education_status: {
        label: "Education Status",
        items: educationStatus,
      },
    },
  },
  familyComposition: {
    full_name: {
      label: "FullName",
      type: "text",
      data: null,
      rules: [inputRules.required],
    },
    age: {
      label: "Age",
      type: "text",
      inputType: "number",
      data: 0,
      rules: [inputRules.required],
    },
    birth_date: {
      label: "Birth Date",
      type: "text",
      inputType: "date",
      data: null,
      rules: [inputRules.required],
    },
    civil_status: {
      label: "Civil Status",
      type: "select",
      data: null,
      rules: [inputRules.required],
      items: civilStatus,
    },
    relationship: {
      label: "Relationship to patient",
      type: "combobox",
      data: null,
      rules: [inputRules.required],
      items: [
        "Father",
        "Mother",
        "Son",
        "Daughter",
        "Brother",
        "Sister",
        "Grandfather",
        "Grandmother",
        "Grandson",
        "Granddaughter",
        "Uncle",
        "Aunt",
        "Nephew",
        "Niece",
        "Cousin",
        "Spouse",
        "In-Law",
        "Others",
      ],
    },
    educational_attainment: {
      label: "Educational Attainment",
      type: "select",
      data: null,
      rules: [inputRules.required],
      items: [
        "With Early Childhood Education",
        "Completed Early Childhood Education",
        "With some Primary Education",
        "Completed Primary Education",
        "With some Secondary Education",
        "Completed Secondary Education",
        "With Some Tertiary Education",
        "Completed Tertiary Education",
        "With some Post-graduate Education",
        "Completed Post-graduate Education",
        "With some Doctorate degree Education",
        "Completed Doctorate degree Education",
        "With Some Vocational Education",
        "Completed Vocational Education",
        "on-going Early Childhood Education",
        "on-going Primary Education",
        "on-going Secondary Education",
        "og-going Tertiary Education",
        "on-going Post-graduate Education",
        "on-going Doctorate degree Education",
        "on-going Vocational Education",
        "No education",
        "Not Applicable",
      ],
    },
    occupation: {
      label: "Occupation",
      type: "text",
      data: null,
      rules: [inputRules.required],
    },
    monthly_income: {
      label: "Monthly Income",
      type: "text",
      data: null,
      rules: [inputRules.required],
      inputType: "number",
    },
  },
  address: {
    permanent: {
      region: {
        label: "Region",
        items: regions,
        title: "regDesc",
        formType: "select",
      },
      province: {
        label: "Province",
        items: provinces,
        title: "provDesc",
        formType: "select",
      },
      district: {
        label: "District",
        items: districts,
        title: "disDesc",
      },
      municipality: {
        label: "Municipality",
        items: municipalities,
        title: "citymunDesc",
        formType: "select",
      },
      barangay: {
        label: "Barangay",
        items: barangays,
        title: "brgyDesc",
        formType: "select",
      },
      purok: {
        label: "House No/Subdivision/Village/Sitio ",
      },
    },
    temporary: {
      region: {
        label: "Region",
        items: regions,
        title: "regDesc",
        formType: "select",
      },
      province: {
        label: "Province",
        items: temporaryProvince,
        title: "provDesc",
        formType: "select",
      },
      district: {
        label: "District",
        items: districts,
        title: "disDesc",
      },
      municipality: {
        label: "Municipality",
        items: temporaryMunicipalities,
        title: "citymunDesc",
        formType: "select",
      },
      barangay: {
        label: "Barangay",
        items: temporaryBarangays,
        title: "brgyDesc",
        formType: "select",
      },
      purok: {
        label: "House No/Subdivision/Village/Sitio ",
      },
    },
  },
});

watch(
  () => inputFields.value.familyComposition.birth_date.data,
  (newBirthDate) => {
    if (newBirthDate) {
      const birthDate = moment(newBirthDate);
      const age = moment().diff(birthDate, "years");
      inputFields.value.familyComposition.age.data = age;
    }
  }
);

const validateForm = async (formType) => {
  const form = await formType.value.validate();
  if (!form.valid) return false;
  return true;
};
const toggleEditFamilyDialog = (familyMember) => {
  toEditFamilyMember.value = familyMember;
  dialogs.value.editFamily = true;
};
const toggleDeleteFamilyDialog = (familyMember) => {
  toEditFamilyMember.value = familyMember;
  dialogs.value.deleteFamily = true;
};

const handleAddressButton = async () => {
  if (!patientData.value.addressExist) {
    await createPatientAddressData();
    return;
  }
  await updatePatientAddressData();
};
// * create section
const createFamilyMemberData = async () => {
  const isValid = await validateForm(familyForm);
  if (!isValid) return;
  let familyMember = {};
  for (const key in inputFields.value.familyComposition) {
    familyMember[key] = inputFields.value.familyComposition[key].data;
  }
  familyMember.patient_id = props.patientId;
  const response = await createFamilyMember(familyMember);
  if (response) {
    updateBars.value.createFamilyMember.isActive = true;
    familyComposition.value.push(response);
    dialogs.value.addFamily = false;
  }
};
const createPatientAddressData = async () => {
  const response = await createPatientAddress(patientAddress.value);
  if (response) {
    updateBars.value.addressData.isActive = true;
    patientAddress.value.addressExist = true;
  }
};
// * Fetch Section
const getPatientData = async () => {
  const response = await getPatientByID(props.patientId);
  patientData.value = response;
};
const getPatientAddressData = async () => {
  const response = await getPatientAddress(props.patientId);
  if (!response) {
    return;
  }
  patientData.value.addressExist = true;
  patientAddress.value = response;
};

const getFamilyCompositionData = async () => {
  const response = await getFamilyComposition(props.patientId);
  familyComposition.value = response;
};
const getFamilyInfoData = async () => {
  const response = await getFamilyInfo(props.patientId);
};
const getRegionData = async () => {
  const response = await getRegions();
  regions.value = response;
};
const watchAddressChange = (addressType, key, apiCall, optionKey) => {
  watch(
    () => patientAddress.value[addressType][key],
    async (newVal) => {
      optionKey.value = await apiCall(newVal);
    }
  );
};
watchAddressChange(0, "region", getProvince, provinces);
watchAddressChange(0, "province", getMunicipality, municipalities);
watchAddressChange(0, "province", getDistrict, districts);
watchAddressChange(0, "municipality", getBarangay, barangays);
watchAddressChange(1, "region", getProvince, temporaryProvince);
watchAddressChange(1, "province", getMunicipality, temporaryMunicipalities);
watchAddressChange(1, "province", getDistrict, districts);
watchAddressChange(1, "municipality", getBarangay, temporaryBarangays);

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
  const response = await updatePatientAddress(patientAddress.value);
  if (response) {
    updateBars.value.addressData.isActive = true;
  }
};
const updateFamilyMemberData = async () => {
  const isValid = await validateForm(familyForm);
  if (!isValid) return;
  const response = await updateFamilyMember(toEditFamilyMember.value);
  if (response) {
    updateBars.value.updateFamilyMember.isActive = true;
    dialogs.value.editFamily = false;
  }
};
// * Delete Section
const deleteFamilyMemberData = async () => {
  const familyMemberId = toEditFamilyMember.value.id;
  // remove the item from the  family composition object using the toEditFamilyMember.id
  const response = await deleteFamilyMember(familyMemberId);
  if (response) {
    familyComposition.value = familyComposition.value.filter(
      (member) => member.id !== familyMemberId
    );
    updateBars.value.deleteFamilyMember.isActive = true;
    dialogs.value.deleteFamily = false;
  }
};
</script>
<style lang="css" scoped></style>
