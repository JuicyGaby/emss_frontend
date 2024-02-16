<template lang="">
    <div>
        <p>is logged in {{ authentication.token}}</p>
    </div>
</template>
<script setup>

import { defineProps } from 'vue'

const { authentication } = defineProps(['authentication'])

</script>
<style lang="css"> 
</style>