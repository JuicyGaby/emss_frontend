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
                  :label="inputFields.admission_date.label"
                  :type="inputFields.admission_date.type"
                  v-model="swaData.admission_date"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-card-actions class="justify-end">
              <v-btn color="success" @click="createSWAItem">Create</v-btn>
            </v-card-actions>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
  <v-dialog v-model="createdDialog" width="auto">
    <v-sheet>
      <v-alert type="success" variant="outlined">
        <v-alert-title>
          Social Work Administration created successfully!
        </v-alert-title>
        <v-card-actions class="justify-end mt-5">
          <v-btn color="primary">Edit</v-btn>
          <v-btn color="error" @click="handleCloseDialog">Close</v-btn>
        </v-card-actions>
      </v-alert></v-sheet
    >
  </v-dialog>
</template>
<script setup>
import { createSocialWorkAdministration } from "@/api/daily-activity-report";
import { ref, onMounted } from "vue";
import moment from "moment";

const emit = defineEmits(["addedItem", "closeDialog"]);
onMounted(async () => {
  console.log("User:", props.user);
});
const createdDialog = ref(false);
const createSWAForm = ref(null);
const swaData = ref({
  id: props.user.id,
  fullname: `${props.user.fname} ${props.user.lname}`,
  admission_date: moment().format("YYYY-MM-DDTHH:mm"),
});


const inputFields = {
  admission_date: {
    label: "Admission Date",
    type: "datetime-local",
    rules: [(v) => !!v || "Admission Date is required"],
  },
};

const createSWAItem = async () => {
  const isValid = await handleFormValidation();
  if (!isValid) return;
  const response = await createSocialWorkAdministration(swaData.value);
  if (response) {
    handleCreateDialog();
    handleAddedItem(response);
  }
};
const handleCreateDialog = () => {
  createdDialog.value = true;
};
const handleCloseDialog = () => {
  createdDialog.value = false;
  emit("closeDialog", 'swa');
};
const handleAddedItem = (item) => {
  const type = "swa";
  emit("addedItem", type, item);
};

const handleFormValidation = async () => {
  const isValid = await createSWAForm.value.validate();
  return isValid;
};
</script>
<style lang=""></style>
