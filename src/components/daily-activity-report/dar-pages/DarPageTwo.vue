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
                            v-if="item.creator_id === authentication.user.id"
                            color="primary"
                            @click="handleNoteDialogs(item.id, 'editNote')"
                            >mdi-pencil</v-icon
                          >
                          <v-icon
                            color="secondary"
                            @click="handleNoteDialogs(item.id, 'viewNote')"
                            >mdi-eye</v-icon
                          >
                          <v-icon
                            v-if="item.creator_id === authentication.user.id"
                            color="secondary"
                            @click="handleNoteDialogs(item.id, 'deleteNote')"
                            >mdi-delete</v-icon
                          >
                        </div>
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </div>
            </v-col>
          </v-row>
          <h2>II. Availed Services</h2>
          <v-row>
            <v-col cols="12" class="">
              <div class="px-5 mt-5">
                <v-autocomplete
                  chips
                  multiple
                  label="Services"
                  variant="outlined"
                  density="compact"
                  :items="servicesData"
                  item-title="service_name"
                  v-model="servicesData"
                  readonly
                >
                </v-autocomplete>
                <v-card-actions class="justify-end">
                  <v-btn
                    prepend-icon="mdi-plus"
                    variant="default"
                    color="primary"
                    @click="dialogs.createService.isVisible = true"
                    >Add Service</v-btn
                  >
                </v-card-actions>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>

  <!-- create note dialog -->
  <v-dialog v-model="dialogs.createNote.isVisible" width="600px">
    <v-card>
      <v-toolbar density="comfortable" color="secondary">
        <v-toolbar-title> Add Note </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialogs.createNote.isVisible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form ref="noteForm">
        <v-card-text class="d-flex flex-column ga-2">
          <v-combobox
            v-for="(field, key) in inputFields.textFields"
            :key="key"
            :label="field.label"
            variant="outlined"
            density="compact"
            counter="20"
            :items="servicesData"
            item-title="service_name"
            :return-object="false"
            v-model="noteCreateData[key]"
          ></v-combobox>
          <v-textarea
            v-for="(field, key) in inputFields.textAreas"
            :key="key"
            :label="field.label"
            variant="outlined"
            density="compact"
            v-model="noteCreateData[key]"
            counter="500"
            :rules="field.rules"
          ></v-textarea>
          <v-card-actions class="justify-end">
            <v-btn color="secondary" @click="createNoteItem">Create Note</v-btn>
          </v-card-actions>

          <!-- {{ noteCreateData }} -->
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
  <!-- delete note dialog -->
  <v-dialog v-model="dialogs.deleteNote.isVisible" width="400px">
    <dynamicDialogs
      :dialogData="dialogData"
      @handleAction="deleteNoteItem"
      @closeDialog="dialogs.deleteNote.isVisible = false"
    />
  </v-dialog>
  <!-- edit note dialog -->
  <v-dialog v-model="dialogs.editNote.isVisible" width="600px">
    <v-card>
      <v-toolbar density="comfortable" color="secondary">
        <v-toolbar-title> Edit Note </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialogs.editNote.isVisible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form ref="noteForm">
        <v-card-text class="d-flex flex-column ga-2">
          <v-combobox
            v-for="(field, key) in inputFields.textFields"
            :key="key"
            :label="field.label"
            variant="outlined"
            density="compact"
            counter="20"
            :items="servicesData"
            item-title="service_name"
            :return-object="false"
            v-model="noteData[key]"
            :rules="[inputRules.required]"
          ></v-combobox>
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
          <!-- {{ noteData }} -->
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
  <!-- view only note dialog -->
  <v-dialog v-model="dialogs.viewNote.isVisible" width="600px">
    <v-card>
      <v-toolbar density="comfortable" color="secondary">
        <v-toolbar-title> View Note </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialogs.viewNote.isVisible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
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
          readonly
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
          readonly
        ></v-textarea>
        <!-- {{ noteData }} -->
      </v-card-text>
    </v-card>
  </v-dialog>
  <!-- create service dialog -->
  <v-dialog v-model="dialogs.createService.isVisible" width="600px">
    <v-card>
      <v-toolbar density="compact" color="secondary">
        <v-toolbar-title> Add Service </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialogs.createService.isVisible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form ref="noteForm">
        <v-card-text>
          <v-autocomplete
            chips
            multiple
            closable-chips
            label="Services"
            variant="outlined"
            density="compact"
            :items="servicesItems"
            item-title="service_name"
            item-value="id"
            v-model="servicesInput.services"
            :rules="[inputRules.required, inputRules.vselect]"
          >
          </v-autocomplete>
          <v-card-actions class="justify-end">
            <v-btn color="secondary" @click="createDarServices"
              >Add Service</v-btn
            >
          </v-card-actions>
          <!-- {{ servicesInput }} -->
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
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
  getDarServices,
  getDarServicesByDarId,
  createDarServicesItem,
} from "@/api/daily-activity-report";
import { inputRules } from "@/utils/constants";
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
  buttonText: "Delete",
  buttonColor: "error",
  itemId: "",
});
// user session
const authentication = userAuthentication();
// data
const noteForm = ref(null);
const noteFetchData = ref([]);
const indexedNotes = computed(() => {
  return noteFetchData.value.map((note, index) => {
    return { ...note, number: index + 1 };
  });
});
const noteCreateData = ref({
  dar_id: props.dar_id,
  created_by: `${authentication.user.fname} ${authentication.user.lname}`,
  creator_id: authentication.user.id,
});
const noteData = ref({});
const servicesData = ref([]);
const servicesItems = ref([]);
const servicesInput = ref({
  services: [],
  dar_id: props.dar_id,
});

// data table
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
  createService: {
    isVisible: false,
  },
});
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

// functions

const validateForm = async () => {
  const form = await noteForm.value.validate();
  if (!form.valid) return false;
  return true;
};
// ? services functions
const getDarServicesItems = async () => {
  const response = await getDarServices();
  servicesItems.value = response;
};
const getDarServicesByDarIdItems = async (dar_id) => {
  const response = await getDarServicesByDarId(dar_id);
  servicesData.value = response;
  // create an array that stores the id of the services
  servicesInput.value.services = servicesData.value.map(
    (service) => service.id
  );
};
const getDarNotesItems = async (dar_id) => {
  const response = await getDarNotes(dar_id);
  noteFetchData.value = response;
};
const createDarServices = async () => {
  const isValid = await validateForm();
  if (!isValid) return;
  const response = await createDarServicesItem(servicesInput.value);
  if (response) {
    handleSnackBar("Service added successfully", "success");
    dialogs.value.createService.isVisible = false;
    // response is an array of object. push all objects from the response array to the servicesData array
    servicesData.value = servicesData.value.concat(response);
  }
};

// ? note functions
const createNoteItem = async () => {
  const isValid = await validateForm();
  if (!isValid) return;
  const response = await createDarNote(noteCreateData.value);
  if (response) {
    handleSnackBar("Note created successfully", "success");
    dialogs.value.createNote.isVisible = false;
    noteFetchData.value.push(response);
    noteCreateData.value = {
      dar_id: props.dar_id,
      created_by: `${authentication.user.fname} ${authentication.user.lname}`,
      creator_id: authentication.user.id,
    };
  }
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
const handleNoteDialogs = async (id, dialogType) => {
  const response = await getDarNoteById(id);
  dialogData.value.itemId = id;
  noteData.value = response;
  dialogs.value[dialogType].isVisible = true;
};
const deleteNoteItem = async () => {
  console.log(dialogData.value.itemId);
  dialogs.value.deleteNote.isVisible = false;
  const response = await deleteDarNote(dialogData.value.itemId);
  if (response) {
    handleSnackBar("Note deleted successfully", "success");
    const index = noteFetchData.value.findIndex(
      (note) => note.id === dialogData.value.itemId
    );
    noteFetchData.value.splice(index, 1);
  }
};

const handleSnackBar = (text, type) => {
  snackBarData.value.text = text;
  snackBarData.value.type = type;
  snackBarData.value.isVisible = true;
};
onMounted(async () => {
  await getDarNotesItems(props.dar_id);
  await getDarServicesItems();
  await getDarServicesByDarIdItems(props.dar_id);
});
</script>
<style lang=""></style>
