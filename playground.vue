<template lang="">
    <div>
        <v-btn color="primary">Create Patient</v-btn>
        <div class="patientsTable">
                <v-text-field
                    prepend-inner-icon="mdi-magnify"
                    name="name"
                    label="Search Patient"
                    v-model="searchInput"
                    id="id"
                ></v-text-field>
                <v-data-table
                :search="searchInput"
                :loading="isLoading"
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
import { ref, onMounted, computed } from "vue";
import { getPatients } from "@/api/patients";
import { useRouter } from 'vue-router';

const router = useRouter();
const searchInput = ref('');
let patientData = ref([]);
const isLoading = ref(false);



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

onMounted(() => {
    fetchPatients();
});





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
    isLoading.value = true;
    try {
        const patients = await getPatients();
        patients.forEach(patient => delete patient.middle_name);
        patientData.value = patients;
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
}


</script>

<style lang="css">
.patientsTable {
    /* border: 1px solid red; */
    width: 40%
}
</style>