<template lang="">
  <div>
    <v-card>
      <v-card-title primary-title>
        <h1>Services</h1>
      </v-card-title>
      <v-card-text>
        <v-container>
          <h2>I. Services Notes</h2>
          <v-row>
            <v-col cols="12" class="">
              <div class="px-5 my-5">
                <v-card>
                  <v-toolbar
                    density="compact"
                    color="secondary"
                    class="px-5"
                    rounded
                  >
                    <v-icon>mdi-book-plus</v-icon>
                    <v-toolbar-title>Services Notes</v-toolbar-title>
                    <v-btn
                      variant="outlined"
                      prepend-icon="mdi-plus"
                      @click="dialogs.createNote.isVisible = true"
                      >add note</v-btn
                    >
                  </v-toolbar>
                  <v-card-text>
                    <v-data-table
                      density="compact"
                      :headers="dataTable.tableHeaders"
                      :items="[]"
                      :items-per-page="5"
                    >
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </div>
            </v-col>
          </v-row>
          <h2>II. List of Services</h2>
          <v-row>
            <v-col cols="12" class="">
              <div class="px-5 mt-5">
                <v-autocomplete
                  chips
                  multiple
                  closable-chips
                  label="Services"
                  variant="outlined"
                  density="compact"
                  item-title="text"
                  item-value="value"
                  clearable
                >
                </v-autocomplete>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
  <v-dialog v-model="dialogs.createNote.isVisible" width="600px">
    <v-card>
      <v-toolbar density="comfortable" color="secondary">
        <v-toolbar-title> Add Note </v-toolbar-title>
      </v-toolbar>
      <v-form ref="noteForm">
        <v-card-text class="d-flex flex-column ga-2">
          <v-text-field
            v-for="(field, key) in inputFields.textFields"
            :key="key"
            :label="field.label"
            variant="outlined"
            density="compact"
            v-model="noteData[key]"
            counter="20"
            :rules="field.rules"
          ></v-text-field>
          <v-textarea
            v-for="(field, key) in inputFields.textAreas"
            :key="key"
            :label="field.label"
            variant="outlined"
            density="compact"
            v-model="noteData[key]"
            counter="500"
            :rules="field.rules"
          ></v-textarea>
          <v-card-actions class="justify-end">
            <v-btn color="secondary" @click="createNoteItem">Create Note</v-btn>
          </v-card-actions>

          {{ noteData }}
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
  <snackBars :snackBarData="snackBarData" />
</template>
<script setup>
import { ref } from "vue";
import { userAuthentication } from "@/stores/session";
import {
  createDarNote,
  getDarNotes,
  getDarNoteById,
  updateDarNote,
  deleteDarNote,
} from "@/api/daily-activity-report";
import snackBars from "@/components/dialogs/snackBars.vue";
const props = defineProps({
  dar_id: Number,
});
const snackBarData = ref({
  isVisible: false,
  text: "",
  type: "",
});
const authentication = userAuthentication();
const noteForm = ref(null);
const noteData = ref({
  dar_id: props.dar_id,
  created_by: `${authentication.user.fname} ${authentication.user.lname}`,
  creator_id: authentication.user.id,
});
const dataTable = {
  tableHeaders: [
    { title: "Number", value: "number" },
    { title: "Title", value: "note_title" },
    { title: "Date Created", value: "date" },
    { title: "Operation", value: "operation" },
  ],
};
const dialogs = ref({
  createNote: {
    isVisible: false,
  },
});
const inputRules = {
  required: (value) => !!value || "Required.",
  // create a rule for max length of characters
  maxLengthTextField: (value) =>
    value.length <= 20 || "Max 20 characters are allowed",
  maxLengthTextArea: (value) =>
    value.length <= 500 || "Max 500 characters are allowed",
};
const inputFields = {
  textFields: {
    note_title: {
      label: "Note Title",
      rules: [inputRules.required, inputRules.maxLengthTextField],
    },
  },
  textAreas: {
    note_body: {
      label: "Note Body",
      rules: [inputRules.required, inputRules.maxLengthTextArea],
    },
  },
};
const validateForm = async () => {
  const form = await noteForm.value.validate();
  if (!form.valid) return false;
  return true;
};
const createNoteItem = async () => {
  const isValid = await validateForm();
  if (!isValid) return;
  const response = await createDarNote(noteData.value);
  if (response) {
    handleSnackBar("Note created successfully", "success");
    dialogs.value.createNote.isVisible = false;
  }
};

const handleSnackBar = (text, type) => {
  snackBarData.value.text = text;
  snackBarData.value.type = type;
  snackBarData.value.isVisible = true;
};
</script>
<style lang=""></style>
