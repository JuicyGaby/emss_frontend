<template lang="">
  <div>
    <v-card>
      <v-toolbar color="secondary" class="px-5 d-flex align-center">
        <v-icon size="large">mdi-book-plus</v-icon>
        <v-toolbar-title>Social Work Administration</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-form ref="createSWAForm">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :label="inputFields.admission_dateTime.label"
                  :type="inputFields.admission_dateTime.type"
                  v-model="swaData.admission_dateTime"
                  variant="outlined"
                ></v-text-field>
                <!-- {{ swaData }} -->
              </v-col>
            </v-row>
            <v-card-actions class="justify-end">
                <v-btn color="success" @click="">Create</v-btn>
            </v-card-actions>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import { ref } from "vue";
import moment from "moment";
const createSWAForm = ref(null);
const swaData = ref({
  admission_dateTime: moment().format("YYYY-MM-DDTHH:mm"),
});
const inputFields = {
  admission_dateTime: {
    label: "Admission Date",
    type: "datetime-local",
    rules: [(v) => !!v || "Admission Date is required"],
  },
};
</script>
<style lang=""></style>
