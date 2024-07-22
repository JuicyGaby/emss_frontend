<template lang="">
  <div>
    <v-container style="width: 1500px">
      <v-alert
        title="Medical Data Form : "
        type="info"
        variant="tonal"
      ></v-alert>
      <v-divider class="mb-5"></v-divider>
      <v-card elevation="0" class="">
        <v-tabs v-model="tabData.tabValue" align-tabs="center">
          <v-tab
            v-for="(item, index) in tabData.tabs"
            :key="index"
            :value="item.value"
          >
            {{ item.label }}
          </v-tab>
        </v-tabs>
        <v-card-text class="">
          <v-window
            v-model="tabData.tabValue"
            class="px-5"
            style="height: 500px; overflow-y: auto"
          >
            <!-- admitting diagnosis -->
            <v-window-item :value="0">
              <div class="d-flex flex-wrap ga-2 pa-5">
                <h3 v-if="medicalDataItems.admitting_diagnosis.length === 0">
                  No Medical Data
                </h3>
                <v-card
                  v-for="(item, index) in medicalDataItems.admitting_diagnosis"
                  :key="index"
                  width="32%"
                  max-height="300"
                  elevation="3"
                  @click="toggleUpdateMedicalDataDialog(item.id)"
                >
                  <v-toolbar color="secondary" class="pa-2">
                    <v-toolbar-title>
                      <h6>
                        CREATED BY: {{ item.created_by }}<br />DATE CREATED :
                        {{ item.date_created }}
                      </h6>
                    </v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    {{ item.medical_data_note }}
                  </v-card-text>
                </v-card>
              </div>
            </v-window-item>
            <v-window-item :value="1">
              <div class="d-flex flex-wrap ga-2 pa-5">
                <h3 v-if="medicalDataItems.final_diagnosis.length === 0">
                  No Final Diagnosis
                </h3>
                <v-card
                  v-for="(item, index) in medicalDataItems.final_diagnosis"
                  :key="index"
                  width="32%"
                  max-height="300"
                  elevation="3"
                  @click="toggleUpdateMedicalDataDialog(item.id)"
                >
                  <v-toolbar color="secondary" class="pa-2">
                    <v-toolbar-title>
                      <h6>
                        CREATED BY: {{ item.created_by }}<br />DATE CREATED :
                        {{ item.date_created }}
                      </h6>
                    </v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    {{ item.medical_data_note }}
                  </v-card-text>
                </v-card>
              </div>
            </v-window-item>
            <v-window-item :value="2">
              <div class="d-flex flex-wrap ga-2 pa-5">
                <h3 v-if="medicalDataItems.duration_of_problems.length === 0">
                  No Duration of Problems
                </h3>
                <v-card
                  v-for="(item, index) in medicalDataItems.duration_of_problems"
                  :key="index"
                  width="32%"
                  max-height="300"
                  elevation="3"
                  @click="toggleUpdateMedicalDataDialog(item.id)"
                >
                  <v-toolbar color="secondary" class="pa-2">
                    <v-toolbar-title>
                      <h6>
                        CREATED BY: {{ item.created_by }}<br />DATE CREATED :
                        {{ item.date_created }}
                      </h6>
                    </v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    {{ item.medical_data_note }}
                  </v-card-text>
                </v-card>
              </div>
            </v-window-item>
            <v-window-item :value="3">
              <div class="d-flex flex-wrap ga-2 pa-5">
                <h3 v-if="medicalDataItems.previous_treatment.length === 0">
                  No Previous Treatment
                </h3>
                <v-card
                  v-for="(item, index) in medicalDataItems.previous_treatment"
                  :key="index"
                  width="32%"
                  max-height="300"
                  elevation="3"
                  @click="toggleUpdateMedicalDataDialog(item.id)"
                >
                  <v-toolbar color="secondary" class="pa-2">
                    <v-toolbar-title>
                      <h6>
                        CREATED BY: {{ item.created_by }}<br />DATE CREATED :
                        {{ item.date_created }}
                      </h6>
                    </v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    {{ item.medical_data_note }}
                  </v-card-text>
                </v-card>
              </div>
            </v-window-item>
            <v-window-item :value="4">
              <div class="d-flex flex-wrap ga-2 pa-5">
                <h3 v-if="medicalDataItems.present_treatment_plan.length === 0">
                  No Present Treatment Plan
                </h3>
                <v-card
                  v-for="(
                    item, index
                  ) in medicalDataItems.present_treatment_plan"
                  :key="index"
                  width="32%"
                  max-height="300"
                  elevation="3"
                  @click="toggleUpdateMedicalDataDialog(item.id)"
                >
                  <v-toolbar color="secondary" class="pa-2">
                    <v-toolbar-title>
                      <h6>
                        CREATED BY: {{ item.created_by }}<br />DATE CREATED :
                        {{ item.date_created }}
                      </h6>
                    </v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    {{ item.medical_data_note }}
                  </v-card-text>
                </v-card>
              </div>
            </v-window-item>
            <v-window-item :value="5">
              <div class="d-flex flex-wrap ga-2 pa-5">
                <h3
                  v-if="
                    medicalDataItems.health_accessibility_problem.length === 0
                  "
                >
                  No Health Accessibility Problem
                </h3>
                <v-card
                  v-for="(
                    item, index
                  ) in medicalDataItems.health_accessibility_problem"
                  :key="index"
                  width="32%"
                  max-height="300"
                  elevation="3"
                  @click="toggleUpdateMedicalDataDialog(item.id)"
                >
                  <v-toolbar color="secondary" class="pa-2">
                    <v-toolbar-title>
                      <h6>
                        CREATED BY: {{ item.created_by }}<br />DATE CREATED :
                        {{ item.date_created }}
                      </h6>
                    </v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    {{ item.medical_data_note }}
                  </v-card-text>
                </v-card>
              </div>
            </v-window-item>
            <v-window-item :value="6">
              <div class="d-flex flex-wrap ga-2 pa-5">
                <h3 v-if="medicalDataItems.length === 0">No Medical Data</h3>
                <v-card
                  v-for="(item, index) in medicalDataItems"
                  :key="index"
                  width="32%"
                  max-height="300"
                  elevation="3"
                  @click="toggleUpdateMedicalDataDialog(item.id)"
                >
                  <v-toolbar color="secondary" class="pa-2">
                    <v-toolbar-title>
                      <h6>
                        CREATED BY: {{ item.created_by }}<br />DATE CREATED :
                        {{ item.date_created }}
                      </h6>
                    </v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    {{ item.medical_data_note }}
                  </v-card-text>
                </v-card>
              </div>
            </v-window-item>
          </v-window>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            @click="dialogs.create = !dialogs.create"
            prepend-icon="mdi-content-save"
            color="secondary"
            variant="flat"
            >Create Entry</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-container>
    <!-- create medical dialog -->
    <v-dialog v-model="dialogs.create" width="700" persistent>
      <v-card>
        <v-toolbar color="secondary">
          <v-toolbar-title class="white--text">
            <v-icon> mdi-content-save </v-icon>
            Create Medical Data</v-toolbar-title
          >
          <v-icon class="mr-5" @click="dialogs.create = !dialogs.create"
            >mdi-close</v-icon
          >
        </v-toolbar>
        <v-card-text>
          <v-form ref="medicalDataForm" class="">
            <v-select
              label="Type"
              variant="outlined"
              :items="tabData.tabs"
              item-title="label"
              item-value="label"
              v-model="medicalData.medical_data_type"
              :rules="[inputRules.required]"
              clearable
            ></v-select>
            <v-textarea
              label="Note"
              v-model="medicalData.medical_data_note"
              variant="outlined"
              counter="500"
              :rules="[inputRules.required, inputRules.textArea]"
              clearable
            >
            </v-textarea>
            <v-card-actions class="justify-end">
              <v-btn @click="createMedicalDataItem" color="secondary"
                >Create</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogs.update" width="700" persistent>
      <v-card>
        <v-toolbar color="secondary">
          <v-toolbar-title class="white--text">
            <v-icon> mdi-content-save </v-icon>
            Update
          </v-toolbar-title>
          <v-icon class="mr-5" @click="dialogs.update = !dialogs.update"
            >mdi-close</v-icon
          >
        </v-toolbar>
        <v-card-text>
          <v-form ref="medicalDataForm" class="">
            <v-textarea
              label="Note"
              variant="outlined"
              v-model="updateMedicalDataInput.medical_data_note"
              counter="500"
              :readonly="updateMedicalDataInput.date_created !== currentDate"
              :rules="[inputRules.required, inputRules.textArea]"
            >
            </v-textarea>
            <v-card-actions
              v-if="updateMedicalDataInput.date_created === currentDate"
              class="justify-end"
            >
              <v-btn color="secondary" @click="updateMedicalDataItem"
                >Update</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <snackBars :snackBarData="snackBarData" />
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import moment from "moment";
import { validateForm, handleSnackBar, inputRules } from "@/utils/constants";
import snackBars from "../dialogs/snackBars.vue";
import { userAuthentication } from "@/stores/session";
import {
  getMedicalData,
  createMedicalData,
  getMedicalDataById,
  updateMedicalData,
} from "@/api/assesment-tool";

const props = defineProps({
  patientId: Number,
});

const authentication = userAuthentication();
const medicalDataForm = ref(null);
const currentDate = moment().format("YYYY-MM-DD");
const snackBarData = ref({});
const medicalData = ref({
  patient_id: props.patientId,
  creator_id: authentication.user.id,
  created_by: `${authentication.user.fname} ${authentication.user.lname}`,
});
const medicalDataItems = ref({
  admitting_diagnosis: [],
  final_diagnosis: [],
  duration_of_problems: [],
  previous_treatment: [],
  present_treatment_plan: [],
  health_accessibility_problem: [],
});
const tabData = ref({
  tabValue: 0,
  tabs: [
    { label: "Admitting Diagnosis", value: 0 },
    { label: "Final Diagnosis", value: 1 },
    { label: "Duration of Problems", value: 2 },
    { label: "Previous Treatment", value: 3 },
    { label: "Present Treatment Plan", value: 4 },
    { label: "Health Accessibility Problem", value: 5 },
  ],
});
const dialogs = ref({
  create: false,
  update: false,
  delete: false,
});
const dataTable = {
  headers: [
    { title: "Date Created", value: "dateCreated" },
    { title: "Created By", value: "createdBy" },
    { title: "Operation", value: "operation" },
  ],
};
const inputFields = {
  admitting_diagnosis: {
    label: "Admitting Diagnosis",
  },
  final_diagnosis: {
    label: "Final Diagnosis",
  },
  duration_of_problems: {
    label: "Duration of Problems",
  },
  previous_treatment: {
    label: "Previous Treatment",
  },
  present_treatment_plan: {
    label: "Present Treatment Plan",
  },
  health_accessibility_problem: {
    label: "Health Accessibility Problem",
  },
};

const updateMedicalDataInput = ref({});

const createMedicalDataItem = async () => {
  const isValid = await validateForm(medicalDataForm);
  if (!isValid) return;
  medicalData.value.social_worker = `${authentication.user.fname} ${authentication.user.lname}`;
  medicalData.value.activity = `Created Medical Data Entry : ${medicalData.value.medical_data_type}`;
  const response = await createMedicalData(medicalData.value);
  if (response) {
    pushMedicalDataItem(response);
    medicalData.value.medical_data_type = null;
    medicalData.value.medical_data_note = null;
    dialogs.value.create = false;
    snackBarData.value = handleSnackBar("success", "Medical Data Created");
  }
};
const pushMedicalDataItem = (item) => {
  const typeMapping = {
    "Admitting Diagnosis": "admitting_diagnosis",
    "Final Diagnosis": "final_diagnosis",
    "Duration of Problems": "duration_of_problems",
    "Previous Treatment": "previous_treatment",
    "Present Treatment Plan": "present_treatment_plan",
    "Health Accessibility Problem": "health_accessibility_problem",
  };
  const key = typeMapping[item.medical_data_type];
  if (key) {
    medicalDataItems.value[key].push(item);
    console.log("pushed");
  }
};
const toggleUpdateMedicalDataDialog = async (id) => {
  const response = await getMedicalDataById(id);
  if (response) {
    updateMedicalDataInput.value = response;
    dialogs.value.update = true;
  }
};
const updateMedicalDataItem = async () => {
  const isValid = await validateForm(medicalDataForm);
  if (!isValid) return;
  updateMedicalDataInput.value.social_worker = `${authentication.user.fname} ${authentication.user.lname}`;
  updateMedicalDataInput.value.activity = `Updated Medical Data Entry : ${updateMedicalDataInput.value.medical_data_type}`;
  const response = await updateMedicalData(updateMedicalDataInput.value);
  if (response) {
    snackBarData.value = handleSnackBar("success", "Medical Data Updated");
    dialogs.value.update = false;
    const typeMapping = {
      "Admitting Diagnosis": "admitting_diagnosis",
      "Final Diagnosis": "final_diagnosis",
      "Duration of Problems": "duration_of_problems",
      "Previous Treatment": "previous_treatment",
      "Present Treatment Plan": "present_treatment_plan",
      "Health Accessibility Problem": "health_accessibility_problem",
    };
    const key = typeMapping[response.medical_data_type];
    if (key) {
      const index = medicalDataItems.value[key].findIndex(
        (item) => item.id === response.id
      );
      if (index !== -1) {
        medicalDataItems.value[key][index] = response;
      }
    }
  }
};
const fetchMedicalData = async () => {
  const response = await getMedicalData(props.patientId);
  if (response) {
    // filter medical data medical_data_type == "Medical Data"
    medicalDataItems.value.admitting_diagnosis = response.filter(
      (item) => item.medical_data_type === "Admitting Diagnosis"
    );
    medicalDataItems.value.final_diagnosis = response.filter(
      (item) => item.medical_data_type === "Final Diagnosis"
    );
    medicalDataItems.value.duration_of_problems = response.filter(
      (item) => item.medical_data_type === "Duration of Problems"
    );
    medicalDataItems.value.previous_treatment = response.filter(
      (item) => item.medical_data_type === "Previous Treatment"
    );
    medicalDataItems.value.present_treatment_plan = response.filter(
      (item) => item.medical_data_type === "Present Treatment Plan"
    );
    medicalDataItems.value.health_accessibility_problem = response.filter(
      (item) => item.medical_data_type === "Health Accessibility Problem"
    );
  }
};
onMounted(async () => {
  await fetchMedicalData();
});
</script>
<style lang="css">
.rb {
  border: 1px solid red;
}
</style>
