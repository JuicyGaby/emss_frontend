<template lang="">
  <div>
    <v-card height="100vh">
      <v-toolbar color="secondary">
        <v-toolbar-title>Edit SWA</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="">
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
                    variant="outlined"
                    @click="dialogs.createDialog.isVisible = true"
                    >Create Note</v-btn
                  >
                </v-toolbar>
                <v-card-text>
                  <v-data-table
                    :headers="dataTable.headers"
                    :items="[]"
                    :items-per-page="5"
                  >
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
                label="Services Availed"
                v-model="userServicesAvailed"
              ></v-select>
              <v-card-actions class="justify-end">
                <v-btn
                  color="primary"
                  @click="dialogs.addServicesDialog.isVisible = true"
                  >Add Services</v-btn
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
        <v-toolbar color="secondary">
          <v-toolbar-title>Create Note</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogs.createDialog.isVisible = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-combobox
                    :items="[]"
                    label="Note Title"
                    variant="outlined"
                    counter="50"
                    :rules="inputFields.comboFields.note_title.rules"
                  ></v-combobox>
                  <v-textarea
                    label="Note"
                    variant="outlined"
                    counter="500"
                    :rules="inputFields.textAreaFields.note_body.rules"
                  ></v-textarea>
                  <v-card-actions class="justify-end">
                    <v-btn color="primary">Create</v-btn>
                  </v-card-actions>
                  {{ inputData }}
                </v-col>
              </v-row>
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
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-combobox
                    :items="[]"
                    label="Note Title"
                    variant="outlined"
                    counter="50"
                    :rules="inputFields.comboFields.note_title.rules"
                  ></v-combobox>
                  <v-textarea
                    label="Note"
                    variant="outlined"
                    counter="500"
                    :rules="inputFields.textAreaFields.note_body.rules"
                  ></v-textarea>
                  <v-card-actions class="justify-end">
                    <v-btn color="primary">Update</v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- read -->
    <!-- delete -->
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
                ></v-autocomplete>
                <v-card-actions class="justify-end">
                  <v-btn color="primary">Add Service</v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
  <!-- snackbars -->
  <!-- <snackBars /> -->
  <!-- dynamic dialogs -->
  <!-- <dynamicDialogs /> -->
</template>
<script setup>
import { ref, onMounted } from "vue";
import { userAuthentication } from "@/stores/session";
import {
  getSwaServices,
  getDarSwaId,
  createSwaNote,
  getSwaNotes,
  getSwaNoteById,
  updateSwaNote,
  deleteSwaNote,
} from "@/api/daily-activity-report";
import { inputRules } from "@/utils/constants";
import snackBars from "../dialogs/snackBars.vue";
import dynamicDialogs from "../dialogs/dialogs.vue";
const props = defineProps({
  swa_id: Number,
});
// variables
const authentication = userAuthentication();
const servicesList = ref([]);
const userServicesAvailed = ref([]);

// Objects
const inputData = ref({
  dar_swa_id: props.swa_id,
  created_by: `${authentication.user.fname} ${authentication.user.lname}`,
  creator_id: authentication.user.id,
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
// functions
const getDarSwaServicesItem = async () => {
  const response = await getDarSwaId(props.swa_id);
  if (response) {
    userServicesAvailed.value = response;
    console.log("User Services Availed", userServicesAvailed.value);
  }
};
const getSwaServicesItems = async () => {
  const response = await getSwaServices();
  servicesList.value = response;
};
onMounted(async () => {
  await getDarSwaServicesItem();
  await getSwaServicesItems();
});
</script>
<style lang=""></style>
