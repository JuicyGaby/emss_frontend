<template lang="">
  <div class="d-flex align-center justify-center">
    <v-card height="auto" width="1000px">
      <v-toolbar color="secondary" class="px-2 d-flex align-center">
        <v-icon size="large">mdi-book-plus</v-icon>
        <v-toolbar-title>Social Work Administration</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col class="d-flex flex-wrap">
              <v-autocomplete
                label="SWA Services"
                variant="outlined"
                style="width: 600px"
                v-model="swaInputs.swaServices"
              >
              </v-autocomplete>
              {{ swaInputs.swaServices }}
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="justify-end">
          <v-btn color="success" @click="createSWAItem">Create</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
const swaInputs = ref({
  swaServices: [],
});


const createSWAItem = () => {
  console.log("SWA Services:", swaInputs.swaServices);
};

</script>
<style lang=""></style>
