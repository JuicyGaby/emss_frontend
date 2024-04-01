<template lang="">
  <div>
    <v-card>
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
                      :items="indexedNotes"
                      :items-per-page="5"
                    >
                      <template v-slot:[`item.operation`]="{ item }">
                        <div class="d-flex ga-5">
                          <v-icon
                            color="primary"
                            @click="handleEditNoteDialog(item.id)"
                            >mdi-pencil</v-icon
                          >
                          <v-icon
                            color="secondary"
                            @click="dialogs.deleteNote.isVisible = true"
                            >mdi-delete</v-icon
                          >
                          <v-icon
                            color="secondary"
                            @click="dialogs.viewNote.isVisible = true"
                            >mdi-eye</v-icon
                          >
                        </div>
                      </template>
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
  <!-- create dialog -->
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

          <!-- {{ noteData }} -->
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
  <!-- delete dialog -->
  <v-dialog v-model="dialogs.deleteNote.isVisible" width="400px">
    <dynamicDialogs :dialogData="dialogData" />
  </v-dialog>
  <!-- edit dialog -->
  <v-dialog v-model="dialogs.editNote.isVisible" width="600px">
    <v-card>
      <v-toolbar density="comfortable" color="secondary">
        <v-toolbar-title> Edit Note </v-toolbar-title>
      </v-toolbar>
      <v-form ref="noteForm">
        <v-card-text class="d-flex flex-column ga-2">
          <v-text-field
            v-for="(field, key) in inputFields.textFields"
            :key="key"
            :label="field.label"
            variant="outlined"
            density="compact"
            counter="20"
            :rules="field.rules"
            v-model="noteData[key]"
          ></v-text-field>
          <v-textarea
            v-for="(field, key) in inputFields.textAreas"
            :key="key"
            :label="field.label"
            variant="outlined"
            density="compact"
            counter="500"
            :rules="field.rules"
            v-model="noteData[key]"
          ></v-textarea>
          <v-card-actions class="justify-end">
            <v-btn color="secondary" @click="editNoteItem">Update Note</v-btn>
          </v-card-actions>
          {{ noteData }}
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
  <!-- view only dialog -->
  <snackBars :snackBarData="snackBarData" />
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { userAuthentication } from "@/stores/session";
import {
  createDarNote,
  getDarNotes,
  getDarNoteById,
  updateDarNote,
  deleteDarNote,
} from "@/api/daily-activity-report";
import snackBars from "@/components/dialogs/snackBars.vue";
import dynamicDialogs from "@/components/dialogs/dialogs.vue";
const props = defineProps({
  dar_id: Number,
});
// components
const snackBarData = ref({
  isVisible: false,
  text: "",
  type: "",
});
const dialogData = ref({
  text: "Are you sure to delete this note",
  type: "warning",
});

const authentication = userAuthentication();
const noteForm = ref(null);
const noteFetchData = ref([]);
const indexedNotes = computed(() => {
  return noteFetchData.value.map((note, index) => {
    return { ...note, number: index + 1 };
  });
});
const noteData = ref({
  dar_id: props.dar_id,
  created_by: `${authentication.user.fname} ${authentication.user.lname}`,
  creator_id: authentication.user.id,
});
const dataTable = {
  tableHeaders: [
    { title: "Number", value: "number" },
    { title: "Date Created", value: "date_created" },
    { title: "Title", value: "note_title" },
    { title: "Created By", value: "created_by" },
    { title: "Operation", value: "operation" },
  ],
};
const dialogs = ref({
  createNote: {
    isVisible: false,
  },
  editNote: {
    isVisible: false,
  },
  deleteNote: {
    isVisible: false,
  },
  viewNote: {
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
    noteFetchData.value.push(response);
    noteData.value = {
      dar_id: props.dar_id,
      created_by: `${authentication.user.fname} ${authentication.user.lname}`,
      creator_id: authentication.user.id,
    };
  }
};
const getDarNotesItems = async (dar_id) => {
  const response = await getDarNotes(dar_id);
  noteFetchData.value = response;
};
const editNoteItem = async () => {
  const isValid = await validateForm();
  if (!isValid) return;
  const response = await updateDarNote(noteData.value);
  if (response) {
    handleSnackBar("Note updated successfully", "success");
    dialogs.value.editNote.isVisible = false;
    const index = noteFetchData.value.findIndex(
      (note) => note.id === noteData.value.id
    );
    noteFetchData.value[index] = noteData.value;

    noteData.value = {
      dar_id: props.dar_id,
      created_by: `${authentication.user.fname} ${authentication.user.lname}`,
      creator_id: authentication.user.id,
    };
  }
};
const handleEditNoteDialog = async (id) => {
  const response = await getDarNoteById(id);
  noteData.value = response;
  dialogs.value.editNote.isVisible = true;
};

const handleSnackBar = (text, type) => {
  snackBarData.value.text = text;
  snackBarData.value.type = type;
  snackBarData.value.isVisible = true;
};
onMounted(() => {
  getDarNotesItems(props.dar_id);
});
</script>
<style lang=""></style>
