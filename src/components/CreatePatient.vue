<template lang="">
    <div>
        <v-form ref="createPatientForm">
            <div class="">
                <v-text-field
                    label="First Name"
                    v-model="userInputs.firstName.value"
                    :rules="inputRules.fname"
                ></v-text-field>
                <v-text-field
                    label="Middle Name"
                    v-model="userInputs.middleName.value"
                ></v-text-field>
                <v-text-field
                    label="Last Name"
                    v-model="userInputs.lastName.value"
                    :rules="inputRules.lastName"
                ></v-text-field>
                <v-text-field
                    label="Age"
                    v-model="userInputs.age.value"
                    :rules="inputRules.age"
                    type="number"
                ></v-text-field>
                <v-radio-group
                    label="Sex" 
                    inline
                    ripple 
                    color="primary" 
                    v-model="userInputs.sex.value"
                    :rules="inputRules.sex"
                    >
                    <v-radio v-for="sex in radioInputs.sex.value" :label="sex" :value="sex"></v-radio>
                </v-radio-group>
                <v-text-field
                    label="Contact Number"
                    v-model="userInputs.contactNumber.value"
                    :rules="inputRules.contactNumber"
                ></v-text-field>
                <div class="">
                    <v-text-field
                        name="name"
                        v-model="userInputs.birthDate.value"
                        label="Birthday"
                        type="date"
                        :rules="inputRules.birthDate"
                    ></v-text-field>
                </div>
                <v-radio-group 
                v-model="userInputs.civilStatus.value"
                label="Civil Status"
                ripple
                color="primary"
                inline
                :rules="inputRules.civilStatus"
                >
                    <v-radio v-for="status in radioInputs.civilStatus.value" :label="status" :value="status"></v-radio>
                </v-radio-group>
            </div>
            <v-btn color="primary" @click="createPatient()">Create</v-btn>
        </v-form>
    </div>
</template> 
<script setup>
// import moment library

import moment from "moment";
import { ref } from "vue";
// import { createPatientData } from "@/api/patients";

const createPatientForm = ref(null);
const emit = defineEmits([
  "createPatient"
])

const inputRules = {
  fname: [(v) => !!v || "This field is required"],
  lastName: [(v) => !!v || "This field is required"],
  age: [(v) => !!v || "This field is required"],
  sex: [(v) => !!v || "This field is required"],
  civilStatus: [(v) => !!v || "This field is required"],
  contactNumber: [(v) => !!v || "This field is required"],
  birthDate: [(v) => !!v || "This field is required"],
};

const radioInputs = {
  sex: ref(["Male", "Female"]),
  civilStatus: ref(["Single", "Married", "Widowed", "Separated"]),
};

const userInputs = {
  firstName: ref(""),
  middleName: ref(""),
  lastName: ref(""),
  age: ref(null),
  contactNumber: ref(""),
  sex: ref(null),
  civilStatus: ref(""),
  birthDate: ref(moment().format("YYYY-MM-DD")),
};
const createPatient = async () => {
  validateForm();
  const body = {
    firstName: userInputs.firstName.value,
    middleName: userInputs.middleName.value,
    lastName: userInputs.lastName.value,
    age: userInputs.age.value,
    contactNumber: userInputs.contactNumber.value,
    sex: userInputs.sex.value,
    civilStatus: userInputs.civilStatus.value,
    birthDate: userInputs.birthDate.value,
  };
  const response = await createPatientData(body);
  emit("createPatient", response);
};

const validateForm = async () => {
  const form = await createPatientForm.value.validate();
  if (!form.valid) return;
};

const displayInput = async () => {
  console.log(userInputs);
  const form = await createPatientForm.value.validate();
  if (!form.valid) return;
};
</script>
<style lang="">
</style>