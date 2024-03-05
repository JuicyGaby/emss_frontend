<template lang="">
    <div>
        <div>
            <h2>Interview</h2>
            
        </div>
        <div>
            <h2>Demographic Data</h2>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getPatientByID } from "@/api/patients";




onMounted(async () => {
    const id = useRoute().params.id;
    const patient = await getPatientByID(id);
    console.log(patient);
});

</script>

<style lang="">

</style>