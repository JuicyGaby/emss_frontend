<template lang="">
  <div class="">
    <v-card style>
      <v-card-title primary-title> DAR </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-form ref="createDARForm">
              <v-col cols="12" class="d-flex flex-wrap ga-1">
                <v-text-field
                  v-for="(field, key) in inputs.textField"
                  :key="key"
                  :label="field.label"
                  :type="field.type"
                  :rules="field.rules"
                  variant="outlined"
                  style="width: 300px"
                  density="compact"
                  v-model="patientData[key]"
                ></v-text-field>
                <v-select
                  v-for="(field, key) in inputs.selectField"
                  :key="key"
                  :label="field.label"
                  :items="field.items"
                  :rules="field.rules"
                  variant="outlined"
                  style="width: 300px"
                  density="compact"
                  v-model="patientData[key]"
                ></v-select>
                <v-textarea
                  v-for="(field, key) in inputs.textAreaField"
                  :key="key"
                  :label="field.label"
                  :rules="field.rules"
                  variant="outlined"
                  style="width: 300px"
                  density="compact"
                  v-model="patientData[key]"
                ></v-textarea>
              </v-col>
            </v-form>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="success" @click="createDARItem">Create</v-btn>
      </v-card-actions>
      <!-- {{ patientData }} -->
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
import { ref, onMounted } from "vue";
const props = defineProps({});
const emit = defineEmits(["addDAR", "closeDialog", "editDAR"]);
const dialogs = ref({
  isCreated: false,
});
const createDARForm = ref(null);
const patientData = ref({});
const inputRules = {
  required: (v) => !!v || "This field is required",
  invalidNegative: (v) => v >= 0 || "Invalid input",
  characters: (v) => v.length <= 80 || "Max 100 characters",
};
const inputs = {
  textField: {
    admission_date: {
      label: "Admission Date-Time",
      type: "datetime-local",
      rules: [inputRules.required],
    },
    patient_name: {
      label: "Patient Name",
      type: "text",
      rules: [inputRules.required, inputRules.characters],
    },
    age: {
      label: "Age",
      type: "number",
      rules: [inputRules.required, inputRules.invalidNegative],
    },
  },
  selectField: {
    sex: {
      label: "Sex",
      items: ["Male", "Female", "Others"],
      rules: [inputRules.required],
    },
  },
  textAreaField: {
    address: {
      label: "Address",
      rules: [inputRules.required],
    },
  },
};
const createDARItem = async () => {
  const isValid = await validateForm();
  if (!isValid) return;
  const response = await createDailyActivityReport(patientData.value);
  if (response) {
    console.log("DAR created successfully");
    patientData.value = response;
    dialogs.value.isCreated = true;
    emit("addDAR", response);
  }
};
const validateForm = async () => {
  const form = await createDARForm.value.validate();
  if (!form.valid) return false;
  console.log("Form is valid");
  return true;
};

const handleEditDar = () => {
  const dar_id = patientData.value.id;
  console.log(dar_id);
  dialogs.value.isCreated = false;
  emit("editDAR", dar_id);
};
const handleCloseDialog = () => {
  dialogs.value.isCreated = false;
  emit("closeDialog");
};
</script>
<style lang=""></style>
