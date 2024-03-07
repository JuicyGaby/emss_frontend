<template lang="">
    <div>
        <v-container>
            
        </v-container>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getInterview } from '@/api/assesment-tool'

const props = defineProps({
    patientId: Number
})

onMounted( async () => {
    await getInterviewData()
})

const getInterviewData = async () => {
    const response = await getInterview(props.patientId)
    console.log(response)
}

</script>
<style lang="">
    
</style>