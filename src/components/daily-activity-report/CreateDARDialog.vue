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
                ></v-select>
                <v-textarea
                  v-for="(field, key) in inputs.textAreaField"
                  :key="key"
                  :label="field.label"
                  :rules="field.rules"
                  variant="outlined"
                  style="width: 300px"
                  density="compact"
                ></v-textarea>
              </v-col>
            </v-form>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="success" @click="createDARItem">Create</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({});

const createDARForm = ref(null);

const patientData = ref({});
const inputRules = {
  required: (v) => !!v || "This field is required",
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
      rules: [inputRules.required],
    },
    age: {
      label: "Age",
      type: "number",
      rules: [inputRules.required],
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
  console.log("Create DAR Item");
};
const validateForm = async () => {
  const form = await createDARForm.value.validate();
  if (!form.valid) return false;
  console.log("Form is valid");
  return true;
};
</script>
<style lang=""></style>
