<template lang="">
  <div>
    This is page 1 {{ dar_id }}
  </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  dar_id: Number,
});
</script>
<style lang="">
</style>
