<template lang="">
    <div>
        <div class="d-flex ga-2">
            <v-btn color="primary" @click="dialogs.createPatient = !dialogs.createPatient">Create Patient</v-btn>
        </div>
        <!-- <v-table density="compact">
            <thead>
            <tr>
                <th v-for="col in tableHeaders">{{col}}</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="patient in patients"
                :key="patient.id"
            >
                <td>{{ patient.fname }}</td>
                <td>{{ patient.mname }}</td>
                <td>{{ patient.lname }}</td>
                <td>{{ patient.age }}</td>
                <td>
                <v-btn color="primary" @click="openUpdateModal(patient.id)">Update</v-btn>
                <v-btn color="primary">Delete</v-btn>
                </td>
            </tr>
            </tbody>
        </v-table> -->
        <div>
        <v-data-table 
        :items="patients"
        :search = "search"
        ></v-data-table>
    </div>  
        <!-- create patient dialog -->
        <v-text-field
            v-model="search"
        ></v-text-field>
        <v-dialog v-model="dialogs.createPatient" max-width="500">
            <v-card>
                <v-card-title>
                    <span class="headline">Create Patient</span>
                </v-card-title>
                <v-card-text>
                    <CreatePatient @createPatient="handleCreatedPatient"/>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialogs.createPatient = false">Disagree</v-btn>
                    <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- update patient dialog -->
        <v-dialog v-model="dialogs.updatePatient" max-width="700">
            <UpdatePatient @updatePatient="handleUpdatedPatient" :patientID = "patientId" />
        </v-dialog>
    </div>
</template>
<script setup>


import { ref, onMounted } from "vue";
import { getDepartment, sayHello } from "../api/api";
import { getPatients } from "@/api/patients";
import CreatePatient from "@/components/CreatePatient.vue";
import UpdatePatient from "@/components/patients/UpdatePatient.vue";


const tableHeaders = [
  'First Name',
  'Middle Name',
  'Last Name',
  'Age',
  'Operation'
]

const search = ref("");

const dialogs = ref({
  createPatient: false,
  updatePatient: false,
});
const patients = ref([]);
const patientId = ref(null);

onMounted(async () => {
  patients.value = await getPatients();
});
const selectedDepartment = ref(null);

const openUpdateModal = (id) => {
    dialogs.value.updatePatient = true;
    patientId.value = id;
};


// * emmit handling 

const handleCreatedPatient = (response) => {
    // push response variable to the 'patients' array
    patients.value.push(response);
};

const handleUpdatedPatient = (response) => {
    // update the 'patients' array
    const index = patients.value.findIndex((patient) => patient.id === response.id);
    patients.value[index] = response;
};

</script>
<style lang="">
</style>