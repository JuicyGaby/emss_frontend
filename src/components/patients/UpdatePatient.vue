<template lang="">
    <!-- generate vcard -->
    <v-card>
        <v-card-title>
            <span class="headline">Update Patient</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field
                            v-model="selectedPatient.fname"
                            label="First Name"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="selectedPatient.mname"
                            label="Middle Name"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                            v-model="selectedPatient.age"
                            label="Age"
                            type="number"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="patientBirthDate"
                            label="Birthday"
                            type="date"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-radio-group v-model="selectedPatient.sex" inline label="Sex">
                            <v-radio v-for="item in radioInputs.sex" :label="item" :value="item"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-radio-group v-model="selectedPatient.civil_status" inline label="Civil Status">
                            <v-radio v-for="item in radioInputs.civil_status" :label="item" :value="item"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>

</template>
<script setup>
import moment from "moment";
import { ref, onMounted, defineProps } from "vue";
import { getPatients } from "@/api/patients";


const props = defineProps({
  patientID: Number,
});

const patientBirthDate = ref("");

const patients = ref([]);
const selectedPatient = ref({});
const radioInputs = {
    sex : ['Male', 'Female'],
    civil_status : ['Single', 'Married', 'Widowed', 'Divorced']
}

onMounted(async () => {
  patients.value = await getPatients();
  getPatient();
  console.log(selectedPatient.value);
});

const getPatient = () => {
  selectedPatient.value = patients.value.find(
    (patient) => patient.id === props.patientID
  );
  patientBirthDate.value = moment(selectedPatient.value.birth_date).format(
    "YYYY-MM-DD"
  );
  console.log(patientBirthDate.value);
};
</script>
<style lang="">
</style>