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
                ></v-text-field>
                <v-select
                    :items="selectItems.sex.value"
                    label="Sex"
                    v-model="userInputs.sex.value"
                    :rules="inputRules.sex"
                ></v-select>
                <v-text-field
                    label="Contact Number"
                    v-model="userInputs.contactNumber.value"
                    :rules="inputRules.contactNumber"
                ></v-text-field>
                <v-select
                    :items="selectItems.civilStatus.value"
                    label="Civil Status"
                    v-model="userInputs.civilStatus.value"
                    :rules="inputRules.civilStatus"
                ></v-select>
            </div>
            <v-btn color="primary" @click="createUser()">Create</v-btn>
        </v-form>
    </div>

</template> 
<script setup>
import { ref } from "vue";

const createPatientForm = ref(null);

const inputRules = {
    fname: [(v) => !!v || "This field is required"],
    lastName: [(v) => !!v || "This field is required"],
    age: [(v) => !!v || "This field is required"],
    sex: [(v) => !!v || "This field is required"],
    civilStatus: [(v) => !!v || "This field is required"],
    contactNumber: [(v) => !!v || "This field is required"],
};


const selectItems = {
    sex : ref(['Male', 'Female']),
    civilStatus : ref(['Single', 'Married', 'Widowed', 'Separated'])
}

const userInputs = {
    firstName: ref(''),
    middleName: ref(''),
    lastName: ref(''),
    age: ref(null),
    contactNumber: ref(''),
    sex: ref(''),   
    civilStatus: ref(''),
}
const createUser = async () => {
    // validate form
    const form = await createPatientForm.value.validate();
    if (!form.valid) return


    const body = {
        firstName: userInputs.firstName.value,
        middleName: userInputs.middleName.value,
        lastName: userInputs.lastName.value,
        age: userInputs.age.value,
        contactNumber: userInputs.contactNumber.value,
        sex: userInputs.sex.value,
        civilStatus: userInputs.civilStatus.value,
    }
    const API_URL = "http://localhost:3000/patients";
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    if (data.error) {
        console.error(data.error);
        return;
    }
    console.log(data);
};

</script>
<style lang="">
    
</style>