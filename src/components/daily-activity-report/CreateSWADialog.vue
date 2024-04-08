<template lang="">
  <div class="d-flex align-center justify-center">
    <v-card height="auto" width="600px">
      <v-toolbar color="secondary" class="px-2 d-flex align-center">
        <v-icon size="large">mdi-book-plus</v-icon>
        <v-toolbar-title>Social Work Administration</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('closeDialog')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-form ref="swaForm">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Social Worker"
                  variant="outlined"
                  readonly
                  v-model="swaInputs.creator_fullname"
                ></v-text-field>
                <v-autocomplete
                  label="SWA Services"
                  chips
                  clearable
                  multiple
                  closable-chips
                  :items="services"
                  item-title="service_name"
                  item-value="id"
                  variant="outlined"
                  hint="Double Check Services Availed"
                  :persistent-hint="true"
                  v-model="swaInputs.services"
                  :rules="[inputRules.required, inputRules.vselect]"
                >
                </v-autocomplete>
                <!-- {{ swaInputs }} -->
                <v-card-actions class="justify-end">
                  <v-btn color="secondary" @click="createSWAItemData"
                    >Create</v-btn
                  >
                </v-card-actions>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
  <!-- * dialogs -->
  <!-- created -->
  <v-dialog v-model="dialogs.create.isVisible" width="500">
    <dynamic-dialog
      :dialogData="dialogData"
      @closeDialog="handleCloseDialog"
      @handleAction="handleEditSwa"
    ></dynamic-dialog>
  </v-dialog>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { userAuthentication } from "@/stores/session";
import { createSwaItem, getSwaServices } from "@/api/daily-activity-report";
import dynamicDialog from "@/components/dialogs/dialogs.vue";

const emit = defineEmits(["addSwa", "closeDialog", "editSwa"]);
const authentication = userAuthentication();
const services = ref([]);
const swaForm = ref(null);

const dialogs = ref({
  create: {
    isVisible: false,
  },
});
const dialogData = ref({
  text: "Social Work Administration Item created successfully!",
  type: "success",
  buttonText: "Edit",
  buttonColor: "primary",
  itemId: "",
});
const inputRules = {
  required: (v) => !!v || "This field is required",
  invalidNegative: (v) => v >= 0 || "Invalid input",
  characters: (v) => v.length <= 20 || "Max 20 characters",
  vselect: (v) => v.length > 0 || "This field is required",
};
const swaInputs = ref({
  creator_id: authentication.user.id,
  creator_fullname: `${authentication.user.fname} ${authentication.user.lname}`,
});

const createSWAItemData = async () => {
  const isValid = await validateForm();
  if (!isValid) return;
  const response = await createSwaItem(swaInputs.value);
  if (response) {
    dialogData.value.itemId = response.id;
    dialogs.value.create.isVisible = true;
    console.log(response);
    emit("addSwa", "swa", response);
  }
};

const validateForm = async () => {
  const form = await swaForm.value.validate();
  if (!form.valid) return false;
  console.log("Form is valid");
  return true;
};

const fetchSwaServices = async () => {
  const response = await getSwaServices();
  services.value = response;
};
const handleCloseDialog = () => {
  dialogs.value.create.isVisible = false;
  emit("closeDialog");
};
const handleEditSwa = (swa_id) => {
  dialogs.value.create.isVisible = false;
  emit("editSwa", "swa", swa_id);
  emit("closeDialog");
};
onMounted(async () => {
  await fetchSwaServices();
});
</script>
<style lang=""></style>
