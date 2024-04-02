<template lang="">
  <div class="d-flex align-center justify-center">
    <v-card height="auto" width="1000px">
      <v-toolbar color="secondary" class="px-2 d-flex align-center">
        <v-icon size="large">mdi-book-plus</v-icon>
        <v-toolbar-title>Social Work Administration</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-form ref="swaForm">
            <v-row>
              <v-col cols="12">
                <v-select
                  label="SWA Services"
                  chips
                  clearable
                  multiple
                  closable-chips
                  :items="services"
                  item-title="service_name"
                  item-value="id"
                  variant="outlined"
                  v-model="swaInputs.services"
                  :rules="[inputRules.required, inputRules.vselect]"
                >
                </v-select>
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
</template>
<script setup>
import { ref, onMounted } from "vue";
import { userAuthentication } from "@/stores/session";
import { createSwaItem, getSwaServices } from "@/api/daily-activity-report";

// const emit = defineEmits(["addSwa", "closeDialog", "editSwa"]);
const authentication = userAuthentication();
const services = ref([]);
const swaForm = ref(null);
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
    console.log("SWA Item created successfully!");
    console.log(response);
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

onMounted(async () => {
  await fetchSwaServices();
});
</script>
<style lang=""></style>
