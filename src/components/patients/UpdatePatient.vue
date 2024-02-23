<template lang="">
    <!-- generate vcard -->
    <v-form>
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
                        <v-col>
                            <v-text-field
                                v-model="selectedPatient.lname"
                                label="Last Name"
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
            <v-card-actions class="text-end">
                <v-btn color="primary" @click="updatePatientData">Update</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>

</template>
<script setup>
import moment from "moment";
import { ref, onMounted } from "vue";
import { getPatients, updatePatient } from "@/api/patients";

const props = defineProps({
  patientID: Number,
});

const emit = defineEmits([
    "updatePatient"
]);

const patientBirthDate = ref("");
const patients = ref([]);
const selectedPatient = ref({});
const radioInputs = {
  sex: ["Male", "Female"],
  civil_status: ["Single", "Married", "Widowed", "Divorced"],
};

onMounted(getData)

async function getData() {
    await fetchPatients();
    findAndSetPatient();
}


const fetchPatients = async () => {
  patients.value = await getPatients();
};

const updatePatientData = async () => {
  const body = {
    id: selectedPatient.value.id,
    fname: selectedPatient.value.fname,
    mname: selectedPatient.value.mname,
    lname: selectedPatient.value.lname,
    age: selectedPatient.value.age,
    birth_date: patientBirthDate.value,
    civil_status: selectedPatient.value.civil_status,
    sex: selectedPatient.value.sex
  }
    // console.log(body);
    const response = await updatePatient(body);
    emit("updatePatient", response);
};

const findAndSetPatient = () => {
  selectedPatient.value = patients.value.find(
    (patient) => patient.id === props.patientID
  );
    updatePatientBirthdate();
};

const updatePatientBirthdate = () => {
    if (selectedPatient.value) {
        patientBirthDate.value = moment(selectedPatient.value.birth_date).format(
        "YYYY-MM-DD"
        );
    }
}
</script>
<style lang="">
</style>