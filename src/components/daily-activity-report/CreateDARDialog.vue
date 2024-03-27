<template lang="">
  <div class="">
    <v-card>
      <v-toolbar color="secondary" class="px-5 d-flex align-center">
        <v-icon size="large">mdi-book-plus</v-icon>
        <v-toolbar-title>Create Daily Activity Report</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" class="d-flex flex-wrap ga-1">
              <v-text-field
                v-for="(item, index) in inputFields.search"
                :key="index"
                variant="outlined"
                :label="item.label"
                density="compact"
                style="width: 200px"
                v-model="searchPatientInput[index]"
              ></v-text-field>
              <v-btn
                prepend-icon="mdi-magnify"
                variant="plain"
                color="secondary"
                @click="searchPatientData"
                >Search</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="justify-end pa-8">
        <!-- <v-btn variant="tonal" color="success" @click="createDARItem"
          >Create</v-btn
        > -->
      </v-card-actions>
      <!-- {{ darData }} -->
    </v-card>
  </div>
  <!-- dialog -->
  <div>
    <v-dialog v-model="dialogs.isCreated" width="auto" persistent>
      <v-card>
        <v-card-text>
          <h2>Successfully Created Patient DAR</h2>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="success" @click="handleEditDar">Edit</v-btn>
          <v-btn color="success" @click="handleCloseDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { createDailyActivityReport } from "@/api/daily-activity-report";
import { searchPatient } from "@/api/patients";
import { ref, onMounted, watch, watchEffect } from "vue";
import moment from "moment";
const props = defineProps({});
const emit = defineEmits(["addDAR", "closeDialog", "editDAR"]);
const dialogs = ref({
  isCreated: false,
});
onMounted(async () => {
  // await getPatientsData();
});
const createDARForm = ref(null);
const searchPatientInput = ref({});
const darData = ref({
  admission_date: moment().format("YYYY-MM-DDTHH:mm"),
});
const isLoaded = ref(false);
let patients = ref([]);
const inputRules = {
  required: (v) => !!v || "This field is required",
  invalidNegative: (v) => v >= 0 || "Invalid input",
  characters: (v) => v.length <= 80 || "Max 100 characters",
};
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
  textField: {
    admission_date: {
      label: "Admission Date-Time",
      type: "datetime-local",
      rules: [inputRules.required],
    },
  },
  selectField: {
    patient_name: {
      label: "Patient Name",
      type: "text",
      rules: [inputRules.required, inputRules.characters],
    },
  },
};
const createDARItem = async () => {
  const isValid = await validateForm();
  if (!isValid) return;
  const response = await createDailyActivityReport(darData.value);
  if (response) {
    darData.value = response;
    dialogs.value.isCreated = true;
    handleAddedItem(response);
  }
};
const handleAddedItem = (item) => {
  const type = "dar";
  emit("addDAR", type, item);
};
const validateForm = async () => {
  const form = await createDARForm.value.validate();
  if (!form.valid) return false;
  console.log("Form is valid");
  return true;
};
const handleEditDar = () => {
  const dar_id = darData.value.id;
  console.log(dar_id);
  dialogs.value.isCreated = false;
  emit("editDAR", dar_id);
};
const handleCloseDialog = () => {
  dialogs.value.isCreated = false;
  emit("closeDialog", "dar");
};

const searchPatientData = async () => {
  const response = await searchPatient(searchPatientInput.value);
  if (response) {
    console.log(response);
  }
};
</script>
<style lang=""></style>
