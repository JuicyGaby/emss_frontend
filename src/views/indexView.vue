<template lang="">
    <!-- <interview ></interview> -->
    <demographic_data ></demographic_data>
</template> 
<script setup>


import { defineProps, toRefs, onMounted } from 'vue'
import interview from '@/components/assesment-tool/interview.vue'
import demographic_data from '@/components/assesment-tool/patient_demographic_data/personal-data.vue'
const { authentication, user} = defineProps(['authentication', 'user'])

onMounted(() => {
    // console.log(user);
})
</script>
<style lang="css"> 
</style>