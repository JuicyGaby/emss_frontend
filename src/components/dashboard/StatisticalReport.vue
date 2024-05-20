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
                    :headers="dataTables.sourceOfReferral.headers"
                    :items="dataTables.sourceOfReferral.items"
                    :hover="true"
                    style="border: 1px solid #e0e0e0"
                  ></v-data-table>
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
                    :headers="dataTables.darServices.headers"
                    :items="dataTables.darServices.items"
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
                    :headers="dataTables.mswdClassification.headers"
                    :items="dataTables.mswdClassification.items"
                    density="comfortable"
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
                    :headers="dataTables.socialWorkAdministration.headers"
                    :items="dataTables.socialWorkAdministration.items"
                    :hover="true"
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
</template>
<script setup>
import { sourceOfReferral } from "@/utils/constants";
import { getMonthlyStatisticalReport } from "@/api/statistical-report";
import moment from "moment";
import { ref, onMounted } from "vue";
const emit = defineEmits(["closeDialog"]);

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
    ],
    items: [],
  },
  darServices: {
    headers: [
      { title: "Particular", value: "service_name" },
      { title: "Total", value: "count" },
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
        { title: "Other Regions", value: "province" },
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
    ],
    items: [],
  },
  socialWorkAdministration: {
    headers: [
      { title: "Particular", value: "service_name" },
      { title: "Total", value: "count" },
    ],
    items: [],
  },
});
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
    dataTables.value.origin.otherRegion.items = otherProviceObject;
    dataTables.value.mswdClassification.items = mswdDocumentation;
  }
};
onMounted(async () => {
  await fetchMonthlyStatisticalReport();
});
</script>
<style lang=""></style>
