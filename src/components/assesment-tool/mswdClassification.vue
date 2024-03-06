<template lang="">
    <div>
        this is mswdClassification
        {{ props.patientId }}
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    patientId: Number
})

onMounted(() => {
    console.log('patientId', props.patientId)
})

</script>
<style lang="">
    
</style>