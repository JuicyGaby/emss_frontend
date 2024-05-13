<template lang="">
  <div class="">
    <v-card height="auto" width="auto">
      <v-toolbar color="secondary" class="px-2 d-flex align-center">
        <v-icon size="large">mdi-book-plus</v-icon>
        <v-toolbar-title>Create Daily Activity Report</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="handleCloseDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-tabs v-model="tabValue" density="compact" align-tabs="center">
        <v-tab :value="1">Not Existing</v-tab>
        <v-tab :value="2">Existing</v-tab>
      </v-tabs>
      <v-window v-model="tabValue">
        <v-window-item :value="1">
          <v-card-text>
            <v-container>
              <v-row>
                <v-form ref="createDARForm">
                  <v-col cols="12" class="py-0 d-flex flex-wrap ga-1">
                    <v-text-field
                      v-for="(item, index) in inputFields.creation.textFields"
                      :key="index"
                      variant="outlined"
                      :label="item.label"
                      density="compact"
                      style="width: 200px"
                      :type="item.type"
                      :rules="[inputRules.required]"
                      v-model="patientCreationData[index]"
                    ></v-text-field>
                    <v-select
                      :label="inputFields.creation.sex.label"
                      variant="outlined"
                      density="compact"
                      style="width: 200px"
                      :items="inputFields.creation.sex.items"
                      v-model="patientCreationData.sex"
                    ></v-select>
                    <v-select
                      :label="inputFields.creation.civil_status.label"
                      variant="outlined"
                      density="compact"
                      style="width: 200px"
                      :items="inputFields.creation.civil_status.items"
                      v-model="patientCreationData.civil_status"
                    ></v-select>
                    <v-select
                      :label="
                        inputFields.creation.highest_education_level.label
                      "
                      variant="outlined"
                      density="compact"
                      style="width: 200px"
                      :items="
                        inputFields.creation.highest_education_level.items
                      "
                      :rules="[inputRules.required]"
                      v-model="patientCreationData.highest_education_level"
                    ></v-select>
                  </v-col>
                </v-form>
              </v-row>
              <v-card-actions class="justify-end mt-5">
                <v-btn
                  prepend-icon="mdi-book-plus"
                  color="secondary"
                  @click="createDARItem(false)"
                  >Create Patient</v-btn
                >
              </v-card-actions>
              <!-- {{ patientCreationData }} -->
            </v-container>
          </v-card-text>
        </v-window-item>
        <v-window-item :value="2">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" class="py-0 d-flex flex-wrap ga-1">
                  <v-text-field
                    v-for="(item, index) in inputFields.search"
                    :key="index"
                    variant="outlined"
                    :label="item.label"
                    density="compact"
                    style="width: 200px"
                    v-model="searchPatientInput[index]"
                    @keyup.enter="searchPatientData"
                  ></v-text-field>
                  <v-btn
                    prepend-icon="mdi-magnify"
                    variant="flat"
                    color="secondary"
                    :disabled="
                      !searchPatientInput.first_name &&
                      !searchPatientInput.last_name
                    "
                    @click="searchPatientData"
                    >Search</v-btn
                  >
                </v-col>
              </v-row>
              <v-form ref="createDARForm">
                <v-row v-if="patients && patients.length > 0" class="ma-0">
                  <v-col cols="12" class="ma-0 pa-0 d-flex flex-wrap ga-1">
                    <v-select
                      label="Patient Name"
                      :items="patients"
                      item-title="fullname"
                      item-value="id"
                      variant="outlined"
                      density="compact"
                      style="width: 550px"
                      v-model="darData.patient_id"
                      :rules="[inputRules.required]"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-card-actions class="justify-end">
                      <v-btn
                        color="secondary"
                        prepend-icon="mdi-book-plus"
                        @click="createDARItem(true)"
                        >Create Report</v-btn
                      >
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-window-item>
      </v-window>
      <v-card-actions class="justify-end pa-8"> </v-card-actions>
      <!-- {{ darData }} -->
    </v-card>
  </div>
  <!-- <snackBars /> -->
  <!-- dialog -->
  <div>
    <v-dialog v-model="dialogs.isCreated" width="auto" persistent>
      <promptDialogs
        :dialogData="dialogData"
        @handleAction="editDarItem"
        @closeDialog="handleCloseDialog"
      />
    </v-dialog>
  </div>
  <snackBars :snackBarData="snackBarData" />
</template>
<script setup>
import promptDialogs from "../dialogs/dialogs.vue";
import snackBars from "../dialogs/snackBars.vue";
import { userAuthentication } from "@/stores/session";
import {
  createDailyActivityReport,
  getDarServices,
  darCreatePatient,
} from "@/api/daily-activity-report";
import { searchPatient } from "@/api/patients";
import {
  sex,
  civilStatus,
  educationalAttainment,
  inputRules,
} from "@/utils/constants";
import { ref, onMounted, watch } from "vue";
import moment from "moment";
const emit = defineEmits(["addDAR", "closeDialog", "editDAR"]);

const dialogs = ref({
  isCreated: false,
});
onMounted(async () => {
  await getDarServicesData();
});

const dialogData = ref({
  type: "success",
  text: "Social Work Administration created successfully!",
  buttonText: "Edit",
  buttonColor: "primary",
  itemId: "",
});
const snackBarData = ref({
  isVisible: false,
  type: "",
  text: "",
});

const authentication = userAuthentication();
const tabValue = ref(2);
const createDARForm = ref(null);
const searchPatientInput = ref({});
const darData = ref({
  isExisting: true,
  creatorFullName: `${authentication.user.fname} ${authentication.user.lname}`,
  creatorId: authentication.user.id,
});
const patientCreationData = ref({
  isExisting: false,
  birth_date: "",
  age: "",
  creatorFullName: `${authentication.user.fname} ${authentication.user.lname}`,
  creatorId: authentication.user.id,
});
const createdPatient = ref({});
const darServices = ref([]);
const patients = ref([]);

// Determine patient's age based on birth date
watch(
  () => patientCreationData.value.birth_date,
  (newBirthDate) => {
    if (newBirthDate) {
      const birthDate = moment(newBirthDate);
      const age = moment().diff(birthDate, "years");
      patientCreationData.value.age = age;
    }
  }
);

const inputFields = {
  search: {
    first_name: {
      label: "First Name",
      type: "text",
    },
    last_name: {
      label: "Last Name",
      type: "text",
    },
  },
  creation: {
    textFields: {
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
      birth_date: {
        label: "Birth Date",
        type: "date",
      },
      age: {
        label: "Age",
        type: "number",
      },
      occupation: {
        label: "Occupation",
        type: "text",
      },
    },
    sex: {
      label: "Sex",
      items: sex,
    },
    civil_status: {
      label: "Civil Status",
      items: civilStatus,
    },
    highest_education_level: {
      label: "Education Attainment",
      items: educationalAttainment,
    },
  },
};
const handleAddedItem = (item) => {
  const type = "dar";
  emit("addDAR", type, item);
};
const handleCloseDialog = () => {
  dialogs.value.isCreated = false;
  emit("closeDialog", "dar");
};
const createDARItem = async (isExisting) => {
  const data = isExisting ? darData.value : patientCreationData.value;
  const isValid = await validateForm();
  if (!isValid) return;
  const response = await createDailyActivityReport(data);
  if (response) {
    dialogData.value.itemId = response.id;
    dialogs.value.isCreated = true;
    emit("addDAR", "dar", response);
  }
};
const validateForm = async () => {
  const form = await createDARForm.value.validate();
  if (!form.valid) return false;
  console.log("Form is valid");
  return true;
};
const searchPatientData = async () => {
  const response = await searchPatient(searchPatientInput.value);
  if (response.length <= 0) {
    patients.value = [];
    handleSnackBar("error", "No patient found");
    return;
  }
  handleSnackBar("success", `${response.length} Patients found`);
  patients.value = response;
};
const getDarServicesData = async () => {
  const response = await getDarServices();
  darServices.value = response;
};
const handleSnackBar = (type, text) => {
  snackBarData.value = {
    isVisible: true,
    type: type,
    text: text,
  };
};
const editDarItem = (dar_id) => {
  emit("editDAR", dar_id);
  dialogs.value.isCreated = false;
};
</script>
<style lang=""></style>
