<template lang="">
  <div>
    <h1>Services</h1>
    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" class="">
              <h2>Social Work Assesment</h2>
              <div class="mt-5">
                <v-combobox
                  chips
                  multiple
                  closable-chips
                  :label="inputFields.comboFields.social_work.label"
                  :items="inputFields.comboFields.social_work.items"
                  variant="outlined"
                  density="comfortable"
                  autocomplete
                  clearable
                >
                </v-combobox>
                <v-textarea
                  :label="inputFields.comboFields.social_work.sw_remarks.label"
                  variant="outlined"
                  density="comfortable"
                ></v-textarea>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  dar_id: Number,
});

const inputFields = {
  comboFields: {
    social_work: {
      label: "Social Work Assessment",
      items: ["Psychosocial Assessment", "Risk Assessment", "Social Care Plan"],
      sw_remarks: {
        label: "Remarks",
      },
    },
  },
};
</script>
<style lang=""></style>
