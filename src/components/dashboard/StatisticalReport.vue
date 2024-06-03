<template lang="">
  <div>
    <v-card height="100vh">
      <v-toolbar color="secondary" class="px-5">
        <v-toolbar-title>Statistical Report</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon @click="emit('closeDialog', 'statisticalReportActive')"
          >mdi-close</v-icon
        >
      </v-toolbar>
      <v-tabs
        v-model="tabData.tabValue"
        align-tabs="center"
        color="primary"
        dark
        slider-color="primary"
      >
        <v-tab
          v-for="(item, index) in tabData.tabHeaders"
          :key="index"
          :value="item.value"
        >
          {{ item.label }}
        </v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tabData.tabValue">
          <!-- source of referral -->
          <v-window-item :value="1">
            <v-container>
              <v-row>
                <v-col>
                  <v-data-table
                    density="compact"
                    :headers="dataTables.sourceOfReferral.headers"
                    :items="dataTables.sourceOfReferral.items"
                    :hover="true"
                    :items-per-page-options="[5, 10]"
                    :items-per-page="10"
                    style="border: 1px solid #e0e0e0"
                  >
                    <template v-slot:[`item.operation`]="{ item }">
                      <div class="d-flex ga-5">
                        <v-btn
                          size="x-small"
                          prepend-icon="mdi-reload"
                          color="grey"
                          @click="generateSourceOfReferral(item)"
                          >Generate</v-btn
                        >
                      </div>
                    </template>
                  </v-data-table>
                </v-col>
                <v-col>
                  <v-data-table
                    density="compact"
                    :headers="dataTables.dataTableTemplate.headers"
                    :hover="true"
                    :items-per-page-options="[5, 10]"
                    :items-per-page="10"
                    :items="dataTableGeneratedData.sourceOfReferral"
                    style="border: 1px solid #e0e0e0"
                  >
                    <template v-slot:[`item.operation`]="{ item }">
                      <div>
                        <v-icon @click="getDarItem(item)" color="secondary"
                          >mdi-eye</v-icon
                        >
                      </div>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
          <!-- caseload according to category and classification -->
          <v-window-item :value="2"> </v-window-item>
          <!-- number of patients according to place of origin -->
          <v-window-item :value="3">
            <v-container>
              <v-row>
                <v-col>
                  <v-data-table
                    density="compact"
                    :headers="dataTables.origin.regionSeven.headers"
                    :items="dataTables.origin.regionSeven.items"
                    :hover="true"
                    style="border: 1px solid #e0e0e0"
                  ></v-data-table>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-data-table
                    density="compact"
                    :headers="dataTables.origin.otherRegion.headers"
                    :items="dataTables.origin.otherRegion.items"
                    :hover="true"
                    style="border: 1px solid #e0e0e0"
                  ></v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
          <!-- services -->
          <v-window-item :value="4">
            <v-container>
              <v-row>
                <v-col>
                  <v-data-table
                    density="compact"
                    :items-per-page-options="[5, 10]"
                    :headers="dataTables.darServices.headers"
                    :items="dataTables.darServices.items"
                    :hover="true"
                    style="border: 1px solid #e0e0e0"
                  ></v-data-table>
                </v-col>
                <v-col>
                  <v-data-table
                    density="compact"
                    :headers="dataTables.dataTableTemplate.headers"
                    :hover="true"
                    style="border: 1px solid #e0e0e0"
                  ></v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
          <!-- msw documentation -->
          <v-window-item :value="5">
            <v-container>
              <v-row>
                <v-col>
                  <v-data-table
                    density="compact"
                    :items-per-page-options="[5, 10]"
                    :headers="dataTables.mswdClassification.headers"
                    :items="dataTables.mswdClassification.items"
                    :hover="true"
                    style="border: 1px solid #e0e0e0"
                  >
                  </v-data-table>
                </v-col>
                <v-col>
                  <v-data-table
                    density="compact"
                    :headers="dataTables.dataTableTemplate.headers"
                    :hover="true"
                    style="border: 1px solid #e0e0e0"
                  ></v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
          <!-- social work administration -->
          <v-window-item :value="6">
            <v-container>
              <v-row>
                <v-col>
                  <v-data-table
                    density="compact"
                    :headers="dataTables.socialWorkAdministration.headers"
                    :items="dataTables.socialWorkAdministration.items"
                    :hover="true"
                    :items-per-page-options="[5, 10]"
                    :items-per-page="16"
                    style="border: 1px solid #e0e0e0"
                  >
                    <template v-slot:[`item.operation`]="{ item }">
                      <div class="d-flex ga-5">
                        <v-btn
                          size="x-small"
                          prepend-icon="mdi-reload"
                          color="grey"
                          @click="generateSocialWorkAdministration(item)"
                          >Generate</v-btn
                        >
                      </div>
                    </template>
                  </v-data-table>
                </v-col>
                <v-col>
                  <v-data-table
                    density="compact"
                    :headers="dataTables.dataTableSwaTemplate.headers"
                    :hover="true"
                    :items-per-page-options="[5, 10]"
                    :items="dataTableGeneratedData.socialWorkAdministration"
                    style="border: 1px solid #e0e0e0"
                  ></v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
  <v-dialog
    v-model="dialogs.dar.view"
    fullscreen
    scrollable
    transition="dialog-transition"
  >
    <EditDARDialog :dar_id="dar_id" @closeDialog="handleCloseDialog" />
  </v-dialog>
  <snackBars :snackBarData="snackBarData" />
</template>
<script setup>
import snackBars from "../dialogs/snackBars.vue";
import EditDARDialog from "../daily-activity-report/EditDARDialog.vue";
import { sourceOfReferral, handleSnackBar } from "@/utils/constants";
import {
  getMonthlyStatisticalReport,
  generateSourceOfReferralDarItems,
  generateSocialWorkAdministrationItems,
} from "@/api/statistical-report";
import moment from "moment";
import { ref, onMounted } from "vue";

const emit = defineEmits(["closeDialog"]);
const snackBarData = ref({});
const userInputs = ref({
  month: moment().format("MMMM"),
});
const tabData = ref({
  tabHeaders: [
    { value: 1, label: "I. Source of Referral" },
    {
      value: 2,
      label: "II. Caseload According to Category and Classification",
    },
    { value: 3, label: "III. Number of Patients According to Place of Origin" },
    { value: 4, label: "IV. SERVICES" },
    { value: 5, label: "V. MSW Documentation" },
    { value: 6, label: "VI. SOCIAL WORK ADMINISTRATION" },
  ],
  tabValue: 1,
});
const dataTables = ref({
  sourceOfReferral: {
    headers: [
      { title: "Referring Party", value: "name" },
      { title: "IP", value: "area_1_count" },
      { title: "OPD", value: "area_2_count" },
      { title: "ER", value: "area_3_count" },
      { title: "Total", value: "total_count" },
      { title: "Operation", value: "operation" },
    ],
    items: [],
  },
  darServices: {
    headers: [
      { title: "Particular", value: "service_name" },
      { title: "Total", value: "count" },
      { title: "Operation", value: "operation" },
    ],
    items: [],
  },
  origin: {
    regionSeven: {
      headers: [
        { title: "Region 7 Province", value: "province" },
        { title: "IP", value: "area_1_count" },
        { title: "OPD", value: "area_2_count" },
        { title: "ER", value: "area_3_count" },
        { title: "Total", value: "total_count" },
      ],
      items: [],
    },
    otherRegion: {
      headers: [
        { title: "Other Province", value: "province" },
        { title: "IP", value: "area_1_count" },
        { title: "OPD", value: "area_2_count" },
        { title: "ER", value: "area_3_count" },
        { title: "Total", value: "total_count" },
      ],
      items: [],
    },
  },
  mswdClassification: {
    headers: [
      { title: "Particular", value: "service_name" },
      { title: "Total", value: "count" },
      { title: "Operation", value: "operation" },
    ],
    items: [],
  },
  socialWorkAdministration: {
    headers: [
      { title: "Particular", value: "service_name" },
      { title: "Total", value: "count" },
      { title: "Operation", value: "operation" },
    ],
    items: [],
  },
  dataTableTemplate: {
    headers: [
      { title: "Date Created", value: "date_created" },
      { title: "Social Worker", value: "created_by" },
      { title: "Operation", value: "operation" },
    ],
  },
  dataTableSwaTemplate: {
    headers: [
      { title: "Date Created", value: "date_created" },
      { title: "Social Worker", value: "creator_name" },
      { title: "Operation", value: "operation" },
    ],
  },
});
const dataTableGeneratedData = ref({
  sourceOfReferral: [],
  socialWorkAdministration: [],
});
const dialogs = ref({
  dar: {
    view: false,
  },
  swa: {
    view: false,
  },
});
const dar_id = ref(null);
const swa_id = ref(null);
const fetchMonthlyStatisticalReport = async () => {
  const response = await getMonthlyStatisticalReport(userInputs.value);
  if (response) {
    const {
      sourceOfReferral,
      socialWorkAdministration,
      darServices,
      mswdDocumentation,
      regionSevenObject,
      otherProviceObject,
    } = response;

    dataTables.value.sourceOfReferral.items = sourceOfReferral;
    dataTables.value.socialWorkAdministration.items = socialWorkAdministration;
    dataTables.value.darServices.items = darServices;
    dataTables.value.origin.regionSeven.items = regionSevenObject;
    console.log(sourceOfReferral);
    dataTables.value.origin.otherRegion.items = otherProviceObject;
    dataTables.value.mswdClassification.items = mswdDocumentation;
  }
};
const getDarItem = async (item) => {
  dar_id.value = item.id;
  dialogs.value.dar.view = true;
};
const generateSourceOfReferral = async (item) => {
  const body = {
    month: "may",
    sor_id: item.name_id,
  };
  const response = await generateSourceOfReferralDarItems(body);
  if (response) {
    console.log(response);
    snackBarData.value = handleSnackBar(
      "primary",
      `Successfully generated ${response.length} Dar Items`
    );
    dataTableGeneratedData.value.sourceOfReferral = response;
  }
};
const generateSocialWorkAdministration = async (item) => {
  const body = {
    month: "may",
    service_id: item.service_id,
  };
  const response = await generateSocialWorkAdministrationItems(body);
  if (response) {
    console.log(response);
    snackBarData.value = handleSnackBar(
      "primary",
      `Successfully generated ${response.length} Dar Items`
    );
    dataTableGeneratedData.value.socialWorkAdministration = response;
  }
};
const handleCloseDialog = (type) => {
  dialogs.value[type].view = false;
  dialogs.value[type].view = false;
};

onMounted(async () => {
  await fetchMonthlyStatisticalReport();
});
</script>
<style lang=""></style>
