<template lang="">
    <div>
        <!-- <v-data-table :items="items"></v-data-table> -->
        sdfsd
        <p>{{ authentication.token }}</p>
        <p>{{authentication.access_rights}}</p>
        <p v-if="user.department">{{user.department.dept_code}}</p>
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