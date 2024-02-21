<template lang="">
    <div>
        <!-- <v-form>
            <v-autocomplete
            label="Department"
            item-title="dept_name"
            item-value="id"
            :items="departments"
            v-model="selectedDepartment"
            variant="outlined"
            >
            </v-autocomplete>
            <v-btn color="success" @click="displayInput()">text</v-btn>
        </v-form> -->
        <CreatePatient />
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getDepartment, sayHello } from "../api/api";
import CreatePatient from "@/components/CreatePatient.vue";

let departments = ref([]);
onMounted(async () => {
    departments.value = await getDepartment();
});

const selectedDepartment = ref(null);
const displayInput = () => {
    console.log(selectedDepartment.value);
};
</script>
<style lang="">
</style>