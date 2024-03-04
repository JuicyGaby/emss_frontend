<template lang="">
    <div>
        this is edit patient
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getPatientByID } from "@/api/patients";


onMounted(async () => {
    const id = useRoute().params.id;
    console.log(id);
    const patient = await getPatientByID(id);
    console.log(patient);
});

</script>
<style lang="">
    
</style>