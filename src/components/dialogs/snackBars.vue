<template lang="">
  <div>
    <v-snackbar
      :color="props.snackBarData.type"
      v-model="props.snackBarData.isVisible"
      location="top"
      timeout="2000"
    >
      {{ props.snackBarData.text }}
    </v-snackbar>
  </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  snackBarData: Object,
});
</script>
<style lang=""></style>
