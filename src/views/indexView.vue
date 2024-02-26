<template lang="">
    <div>
        <!-- <v-data-table :items="items"></v-data-table> -->
        sdfsd
        <p>{{ authentication.token }}</p>
    </div>  
</template>


<script setup>


import { defineProps, toRefs, onMounted } from 'vue'

const { authentication, user} = defineProps(['authentication', 'user'])

onMounted(() => {
    // console.log(user);
})
</script>
<style lang="css"> 
</style>