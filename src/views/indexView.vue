<template lang="">
    <div>
        <p>token: {{ authentication.token}}</p>
        <p>logged in : {{ authentication.isLoggedIn }}</p>
        <!-- <p>user: {{ user }}</p> -->
    </div>  
</template>


<script setup>
import { defineProps, toRefs, onMounted } from 'vue'

const { authentication, user} = defineProps(['authentication', 'user'])


onMounted(() => {
    console.log(user);
})
</script>
<style lang="css"> 
</style>