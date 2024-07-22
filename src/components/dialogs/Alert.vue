<template>
  <div>
    <v-sheet class="rounded-lg" height="auto" width="auto">
      <v-alert
        class="rounded-lg pa-5"
        :color="props.alertDetails.type"
        variant="tonal"
        :type="props.alertDetails.type"
        :title="props.alertDetails.title"
      >
        <div class="mt-5">
          <p>{{ props.alertDetails.text }}</p>
        </div>
        <v-card-actions class="justify-end mt-5 pa-0">
          <v-btn @click="emit('closeDialog')" variant="outlined" color=""
            >cancel</v-btn
          >
          <v-btn
            @click="emit('action')"
            variant="flat"
            :color="props.alertDetails.type"
            >{{ props.alertDetails.buttonText }}</v-btn
          >
        </v-card-actions>
      </v-alert>
    </v-sheet>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  itemId: Number,
  alertDetails: Object,
});
const emit = defineEmits(["closeDialog", "action"]);
</script>

<style lang="css" scoped></style>
