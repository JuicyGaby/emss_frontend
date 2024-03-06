<template lang="">
    <div>
        this is personal data
        {{ props.patientId }}
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getPatientByID } from '@/api/patients'


const props = defineProps({
    patientId: Number
})

onMounted( async () => {
    await getPatientData()
})

const getPatientData = async () => {
    const response = await getPatientByID(props.patientId)
    console.log(response)
}


</script>
<style lang="">
    
</style>