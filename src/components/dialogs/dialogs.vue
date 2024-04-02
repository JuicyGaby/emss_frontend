<template lang="">
  <div>
    <v-sheet rounded>
      <v-alert :type="props.dialogData.type" variant="outlined">
        <v-alert-title>
          {{ props.dialogData.text }}
        </v-alert-title>
        <v-card-actions class="justify-end mt-5">
          <v-btn :color="props.dialogData.buttonColor" @click="handleAction">{{
            props.dialogData.buttonText
          }}</v-btn>
          <v-btn color="error" @click="">Close</v-btn>
        </v-card-actions>
      </v-alert></v-sheet
    >
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  dialogData: Object,
});
const emit = defineEmits(["closeDialog", "handleAction"]);
onMounted(() => {
  // console.log(props.dialogData);
});
const handleAction = () => {
  emit("handleAction", props.dialogData.itemId);
};
</script>
<style lang=""></style>
