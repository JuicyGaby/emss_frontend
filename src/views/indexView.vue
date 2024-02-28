<template lang="">
    <interview ></interview>
</template> 
<script setup>


import { defineProps, toRefs, onMounted } from 'vue'
import interview from '@/components/assesment-tool/interview.vue'
const { authentication, user} = defineProps(['authentication', 'user'])

onMounted(() => {
    // console.log(user);
})
</script>
<style lang="css"> 
</style>