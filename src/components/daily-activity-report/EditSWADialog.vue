<template lang="">
  <div>
    <v-card height="100vh">
      <v-toolbar color="secondary">
        <v-toolbar-title>Edit SWA</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="emit('closeDialog')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <h2 class="my-5">I. Social Work Administration</h2>
              <v-card>
                <v-toolbar color="secondary">
                  <v-toolbar-title>SWA Notes</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn
                    prepend-icon="mdi-note-plus"
                    variant="outlined"
                    @click="dialogs.createDialog.isVisible = true"
                    >Create Note</v-btn
                  >
                </v-toolbar>
                <v-card-text>
                  <v-data-table
                    :headers="dataTable.headers"
                    :items="indexedSwaNotes"
                    :items-per-page="5"
                  >
                    <template v-slot:[`item.operation`]="{ item }">
                      <div class="d-flex ga-5">
                        <v-icon
                          v-if="item.creator_id === authentication.user.id"
                          color="primary"
                          @click="handleSwaNoteDialogs(item.id, 'updateDialog')"
                          >mdi-pencil</v-icon
                        >
                        <v-icon
                          color="secondary"
                          @click="handleSwaNoteDialogs(item.id, 'readDialog')"
                          >mdi-eye</v-icon
                        >
                        <v-icon
                          v-if="item.creator_id === authentication.user.id"
                          color="error"
                          @click="handleSwaNoteDialogs(item.id, 'deleteDialog')"
                          >mdi-delete</v-icon
                        >
                      </div>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
              <h2 class="my-5">II. Services</h2>
              <v-select
                chips
                multiple
                variant="outlined"
                readonly
                :items="userServicesAvailed"
                item-title="service_name"
                obj
                item-value="id"
                label="Services Availed"
                v-model="userServicesAvailed"
              ></v-select>
              <v-card-actions class="justify-end">
                <v-btn
                  prepend-icon="mdi-plus"
                  color="primary"
                  @click="dialogs.addServicesDialog.isVisible = true"
                >
                  Add Services</v-btn
                >
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
  <!-- dialogs -->
  <div>
    <!-- create -->
    <v-dialog v-model="dialogs.createDialog.isVisible" width="600">
      <v-card>
        <v-toolbar color="secondary" class="pl-5">
          <v-icon>mdi-book-plus</v-icon>
          <v-toolbar-title>Create Note</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogs.createDialog.isVisible = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-container>
              <v-form ref="swaForm">
                <v-row>
                  <v-col cols="12">
                    <v-combobox
                      label="Note Title"
                      variant="outlined"
                      counter="50"
                      :items="userServicesAvailed"
                      item-title="service_name"
                      :return-object="false"
                      :rules="inputFields.comboFields.note_title.rules"
                      v-model="inputData.note.note_title"
                    ></v-combobox>
                    <v-textarea
                      label="Note"
                      variant="outlined"
                      counter="500"
                      :rules="inputFields.textAreaFields.note_body.rules"
                      v-model="inputData.note.note_body"
                    ></v-textarea>
                    <v-card-actions class="justify-end">
                      <v-btn color="primary" @click="createDarSwaNotesItem"
                        >Create Note</v-btn
                      >
                    </v-card-actions>
                    <!-- {{ inputData.note }} -->
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- update -->
    <v-dialog v-model="dialogs.updateDialog.isVisible" width="600">
      <v-card>
        <v-toolbar color="secondary">
          <v-toolbar-title>Update Note</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogs.updateDialog.isVisible = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-form ref="swaForm">
              <v-row>
                <v-col cols="12">
                  <v-combobox
                    :items="userServicesAvailed"
                    item-title="service_name"
                    :return-object="false"
                    label="Note Title"
                    variant="outlined"
                    counter="50"
                    v-model="inputData.dynamicInput.note_title"
                    :rules="inputFields.comboFields.note_title.rules"
                  ></v-combobox>
                  <v-textarea
                    label="Note"
                    variant="outlined"
                    counter="500"
                    v-model="inputData.dynamicInput.note_body"
                    :rules="inputFields.textAreaFields.note_body.rules"
                  ></v-textarea>
                  <v-card-actions class="justify-end">
                    <v-btn color="primary" @click="updateDarSwaNotesItem"
                      >Update</v-btn
                    >
                  </v-card-actions>
                  <!-- {{ inputData.dynamicInput }} -->
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- read -->
    <v-dialog v-model="dialogs.readDialog.isVisible" width="600">
      <v-card>
        <v-toolbar color="secondary">
          <v-toolbar-title>Read Note</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogs.readDialog.isVisible = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-combobox
                  :items="userServicesAvailed"
                  item-title="service_name"
                  :return-object="false"
                  label="Note Title"
                  variant="outlined"
                  counter="50"
                  v-model="inputData.dynamicInput.note_title"
                  readonly
                ></v-combobox>
                <v-textarea
                  label="Note"
                  variant="outlined"
                  counter="500"
                  v-model="inputData.dynamicInput.note_body"
                  readonly
                ></v-textarea>
                <!-- {{ inputData.dynamicInput }} -->
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- delete -->
    <v-dialog v-model="dialogs.deleteDialog.isVisible" width="500">
      <dynamicDialogs
        :dialogData="dialogData"
        @handleAction="deleteDarSwaNotesItem"
        @closeDialog="dialogs.deleteDialog.isVisible = false"
      />
    </v-dialog>
    <!-- add services -->
    <v-dialog v-model="dialogs.addServicesDialog.isVisible" width="600">
      <v-card>
        <v-toolbar color="secondary">
          <v-toolbar-title> Add Services </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogs.addServicesDialog.isVisible = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-form ref="swaForm">
              <v-row>
                <v-col cols="12">
                  <v-autocomplete
                    chips
                    multiple
                    closable-chips
                    :items="servicesList"
                    item-title="service_name"
                    item-value="id"
                    label="Services"
                    variant="outlined"
                    v-model="inputData.services.services"
                    :rules="[inputRules.required, inputRules.vselect]"
                  ></v-autocomplete>
                  <v-card-actions class="justify-end">
                    <v-btn color="primary" @click="createDarSwaServicesItem">
                      Add Service</v-btn
                    >
                  </v-card-actions>
                  <!-- {{ inputData.services }} -->
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
  <!-- snackbars -->
  <snackBars :snackBarData="snackBarData" />
  <!-- dynamic dialogs -->
  <!-- <dynamicDialogs /> -->
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { userAuthentication } from "@/stores/session";
import {
  getSwaServices,
  getDarSwaId,
  createSwaNote,
  getSwaNotes,
  getSwaNoteById,
  updateSwaNote,
  deleteSwaNote,
  createSwaServicesItem,
} from "@/api/daily-activity-report";
import { inputRules } from "@/utils/constants";
import snackBars from "../dialogs/snackBars.vue";
import dynamicDialogs from "../dialogs/dialogs.vue";
const props = defineProps({
  swa_id: Number,
});
const emit = defineEmits(["closeDialog"]);
// variables
const authentication = userAuthentication();
const swaForm = ref(null);
const servicesList = ref([]);
const userServicesAvailed = ref([]);
const swaNotes = ref([]);

// Objects
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
const inputData = ref({
  note: {
    dar_swa_id: props.swa_id,
    created_by: `${authentication.user.fname} ${authentication.user.lname}`,
    creator_id: authentication.user.id,
  },
  services: {
    services: [],
    swa_id: props.swa_id,
  },
  dynamicInput: {},
});
const dataTable = ref({
  headers: [
    { title: "Number", value: "number" },
    { title: "Date Created", value: "date_created" },
    { title: "Title", value: "note_title" },
    { title: "Created By", value: "created_by" },
    { title: "Operation", value: "operation" },
  ],
});
const dialogs = ref({
  createDialog: {
    isVisible: false,
  },
  updateDialog: {
    isVisible: false,
  },
  readDialog: {
    isVisible: false,
  },
  deleteDialog: {
    isVisible: false,
  },
  addServicesDialog: {
    isVisible: false,
  },
});
const inputFields = ref({
  comboFields: {
    note_title: {
      label: "Note Title",
      rules: [inputRules.required, inputRules.characters],
    },
  },
  textAreaFields: {
    note_body: {
      label: "Note",
      rules: [inputRules.required, inputRules.textArea],
    },
  },
});
const indexedSwaNotes = computed(() => {
  return swaNotes.value.map((note, index) => {
    return { ...note, number: index + 1 };
  });
});

// functions
const getDarSwaServicesItem = async () => {
  const response = await getDarSwaId(props.swa_id);
  if (response) {
    userServicesAvailed.value = response;
    inputData.value.services.services = userServicesAvailed.value.map(
      (service) => service.id
    );
    // console.log("User Services Availed", userServicesAvailed.value);
  }
};
const getSwaServicesItems = async () => {
  const response = await getSwaServices();
  servicesList.value = response;
};
const getSwaNotesItems = async () => {
  const response = await getSwaNotes(props.swa_id);
  if (response) {
    swaNotes.value = response;
  }
};
const createDarSwaServicesItem = async () => {
  const isValid = await validateForm();
  if (!isValid) return;
  const response = await createSwaServicesItem(inputData.value.services);
  if (response) {
    handleSnackBar("Service added successfully!", "success");
    userServicesAvailed.value = userServicesAvailed.value.concat(response);
    dialogs.value.addServicesDialog.isVisible = false;
  }
};
const createDarSwaNotesItem = async () => {
  const isValid = await validateForm();
  if (!isValid) return;
  console.log(inputData.value.note);
  const response = await createSwaNote(inputData.value.note);
  handleSnackBar("Note created successfully!", "success");
  console.log(response);
  swaNotes.value.push(response);
  dialogs.value.createDialog.isVisible = false;
  inputData.value.note = {
    dar_swa_id: props.swa_id,
    created_by: `${authentication.user.fname} ${authentication.user.lname}`,
    creator_id: authentication.user.id,
  };
};
const updateDarSwaNotesItem = async () => {
  const isValid = await validateForm();
  if (!isValid) return;
  const response = await updateSwaNote(inputData.value.dynamicInput);
  if (response) {
    handleSnackBar("Note updated successfully!", "success");
    const index = swaNotes.value.findIndex(
      (note) => note.id === inputData.value.dynamicInput.id
    );
    swaNotes.value[index] = response;
    dialogs.value.updateDialog.isVisible = false;
  }
};
const deleteDarSwaNotesItem = async (id) => {
  // console.log(id);
  const response = await deleteSwaNote(id);
  if (response) {
    handleSnackBar("Note deleted successfully!", "success");
    swaNotes.value = swaNotes.value.filter((note) => note.id !== id);
    dialogs.value.deleteDialog.isVisible = false;
  }
};

const validateForm = async () => {
  const form = await swaForm.value.validate();
  if (!form.valid) return false;
  return true;
};
const handleSnackBar = (message, color) => {
  snackBarData.value.text = message;
  snackBarData.value.type = color;
  snackBarData.value.isVisible = true;
};
const handleSwaNoteDialogs = async (id, dialogType) => {
  const response = await getSwaNoteById(id);
  inputData.value.dynamicInput = response;
  dialogData.value.itemId = id;
  dialogs.value[dialogType].isVisible = true;
};

onMounted(async () => {
  await getDarSwaServicesItem();
  await getSwaServicesItems();
  await getSwaNotesItems();
});
</script>
<style lang=""></style>
