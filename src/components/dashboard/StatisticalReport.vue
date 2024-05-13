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
          <v-window-item :value="1">
            <v-container>
              <v-row>
                <v-col>
                  <v-data-table
                    :headers="dataTables.sourceOfReferral.headers"
                    :items="dataTables.sourceOfReferral.items"
                  ></v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
          <v-window-item :value="2">
            
          </v-window-item>
          <v-window-item :value="3"> Three </v-window-item>
          <v-window-item :value="4"> Four </v-window-item>
          <v-window-item :value="5"> Five </v-window-item>
          <v-window-item :value="6"> Six </v-window-item>
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
      { title: "OPD", value: "area_3_count" },
      { title: "ER", value: "area_4_count" },
      { title: "Total", value: "total" },
    ],
    items: [],
  },
});

const fetchMonthlyStatisticalReport = async () => {
  const response = await getMonthlyStatisticalReport(userInputs.value);
  if (response) {
    const { sourceOfReferral } = response;
    dataTables.value.sourceOfReferral.items = sourceOfReferral;
  }
};

onMounted(async () => {
  await fetchMonthlyStatisticalReport();
});
</script>
<style lang=""></style>
