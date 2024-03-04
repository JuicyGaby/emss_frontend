<template lang="">
    <div>
        <div class="patientsTable">
            <v-data-table 
            :headers="tableHeaders"
            :items="patientData"
            items-per-page="10"
            density="compact"
            :items-per-page-options="[5, 10, 15]"
            >
            <template v-slot:[`item.operation`]="{ item }">
                <v-btn small color="primary" @click="editPatient(item)">Edit</v-btn>
                <v-btn small color="error" @click="deletePatient(item)">Delete</v-btn>
            </template>
        </v-data-table>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getPatients } from "@/api/patients";
import { useRouter } from 'vue-router';

onMounted(() => {
  fetchPatients();
});

const router = useRouter();

let patientData = ref([]);
const tableHeaders = [
    { title: 'First Name', value: 'first_name' },
    { title: 'Last Name', value: 'last_name' },
    { title: 'Age', value: 'age' },
    { title: 'Operation', value: 'operation' }
]
const itemsPerPage = [
    {
        value: 10,
        title: 10
    }
];


const editPatient = (patient) => {
    // Add your edit logic here
    router.push(`/EditPatient/${patient.id}`);
    console.log(patient.id);


}

const deletePatient = (patient) => {
    // Add your delete logic here
    console.log('Delete:', patient);
}

async function fetchPatients() {
    const patients = await getPatients();
    patients.forEach(patient => delete patient.middle_name);
    patientData.value = patients;
}


</script>
<style lang="">
    
</style>