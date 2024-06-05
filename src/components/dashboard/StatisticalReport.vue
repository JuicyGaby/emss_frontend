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
          <v-window-item :value="2">
            <v-container>
              <v-row>
                <v-col>
                  <v-table density="compact">
                    <thead>
                      <tr>
                        <th colspan="18" class="text-center">
                          Without Philhealth
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          v-for="(item, index) in caseLoadTable.nonPhicHeader1"
                          :key="index"
                          colspan="6"
                          class="text-center"
                        >
                          {{ item }}
                        </td>
                      </tr>
                      <tr>
                        <td
                          v-for="(item, index) in caseLoadTable.header2"
                          :key="index"
                          class="text-center"
                          colspan="1"
                        >
                          {{ item }}
                        </td>
                        <td
                          v-for="(item, index) in caseLoadTable.header2"
                          :key="index"
                          class="text-center"
                          colspan="1"
                        >
                          {{ item }}
                        </td>
                        <td
                          v-for="(item, index) in caseLoadTable.header2"
                          :key="index"
                          class="text-center"
                          colspan="1"
                        >
                          {{ item }}
                        </td>
                      </tr>
                      <tr>
                        <td
                          v-for="(item, index) in dataTableGeneratedData
                            .caseLoad.nonPhic.ip"
                          :key="index"
                          class="text-center"
                          colspan="1"
                        >
                          {{ item.count }}
                        </td>
                        <td
                          v-for="(item, index) in dataTableGeneratedData
                            .caseLoad.nonPhic.op"
                          :key="index"
                          class="text-center"
                          colspan="1"
                        >
                          {{ item.count }}
                        </td>
                        <td
                          v-for="(item, index) in dataTableGeneratedData
                            .caseLoad.nonPhic.er"
                          :key="index"
                          class="text-center"
                          colspan="1"
                        >
                          {{ item.count }}
                        </td>
                        <td colspan="6" class="text-center">
                          {{
                            dataTableGeneratedData.caseLoad.nonPhic.totalCount
                          }}
                        </td>
                        <td
                          colspan="6"
                          class="text-center"
                          v-for="(item, index) in dataTableGeneratedData
                            .caseLoad.nonPhic.caseCount"
                          :key="index"
                        >
                          {{ item }}
                        </td>
                        <td colspan="6" class="text-center">
                          {{
                            dataTableGeneratedData.caseLoad.nonPhic.totalCount
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-table
                    density="compact"
                    v-if="
                      dataTableGeneratedData.caseLoad.phic
                        .transformedContributorTypeData
                    "
                  >
                    <thead>
                      <tr>
                        <th colspan="24" class="text-center">
                          With Philhealth
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          v-for="(item, index) in caseLoadTable.phicHeader1"
                          :key="index"
                          colspan="6"
                          class="text-center"
                        >
                          {{ item }}
                        </td>
                      </tr>
                      <tr>
                        <th
                          v-for="(item, index) in caseLoadTable.header2"
                          :key="index"
                          class="text-center"
                          colspan="1"
                        ></th>
                        <th
                          v-for="(item, index) in caseLoadTable.header2"
                          :key="index"
                          class="text-center"
                          colspan="1"
                        >
                          {{ item }}
                        </th>
                        <th
                          v-for="(item, index) in caseLoadTable.header2"
                          :key="index"
                          class="text-center"
                          colspan="1"
                        >
                          {{ item }}
                        </th>
                        <th
                          v-for="(item, index) in caseLoadTable.header2"
                          :key="index"
                          class="text-center"
                          colspan="1"
                        >
                          {{ item }}
                        </th>
                      </tr>
                      <tr
                        v-for="(item, index) in dataTableGeneratedData.caseLoad
                          .phic.transformedContributorTypeData"
                        :key="index"
                      >
                        <td
                          class="text-center"
                          colspan="6"
                          v-for="(data, key) in item"
                          :key="key"
                        >
                          {{ key }}
                        </td>
                        <template v-for="(data, key) in item">
                          <template
                            v-for="(areaValue, areaKey) in data.area_1"
                            :key="areaKey"
                          >
                            <td colspan="1" class="text-center">
                              {{ areaValue }}
                            </td>
                          </template>
                        </template>
                        <template v-for="(data, key) in item">
                          <template
                            v-for="(areaValue, areaKey) in data.area_3"
                            :key="areaKey"
                          >
                            <td colspan="1" class="text-center">
                              {{ areaValue }}
                            </td>
                          </template>
                        </template>
                        <template v-for="(data, key) in item">
                          <template
                            v-for="(areaValue, areaKey) in data.area_4"
                            :key="areaKey"
                          >
                            <td colspan="1" class="text-center">
                              {{ areaValue }}
                            </td>
                          </template>
                        </template>
                      </tr>
                    </tbody>
                  </v-table>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
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
                  >
                    <template v-slot:[`item.operation`]="{ item }">
                      <div class="d-flex ga-5">
                        <v-btn
                          size="x-small"
                          prepend-icon="mdi-reload"
                          color="grey"
                          @click="generateServices(item)"
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
                    :items="dataTableGeneratedData.services"
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
                    <template v-slot:[`item.operation`]="{ item }">
                      <div class="d-flex ga-5">
                        <v-btn
                          size="x-small"
                          prepend-icon="mdi-reload"
                          color="grey"
                          @click="generateMSWDocumentation(item)"
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
                    :items="dataTableGeneratedData.mswDocumentation"
                    :hover="true"
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
                  >
                    <template v-slot:[`item.operation`]="{ item }">
                      <div>
                        <v-icon @click="getSwaItem(item)" color="secondary"
                          >mdi-eye</v-icon
                        >
                      </div>
                    </template>
                  </v-data-table>
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
  <v-dialog
    v-model="dialogs.swa.view"
    fullscreen
    scrollable
    transition="dialog-transition"
  >
    <EditSWADialog :swa_id="swa_id" @closeDialog="dialogs.swa.view = false" />
  </v-dialog>
  <snackBars :snackBarData="snackBarData" />
</template>
<script setup>
import snackBars from "../dialogs/snackBars.vue";
import EditDARDialog from "../daily-activity-report/EditDARDialog.vue";
import EditSWADialog from "../daily-activity-report/EditSWADialog.vue";
import { sourceOfReferral, handleSnackBar, area } from "@/utils/constants";
import {
  getMonthlyStatisticalReport,
  generateSourceOfReferralDarItems,
  generateSocialWorkAdministrationItems,
  generateMswDocumentationItems,
  generateDarServicesItems,
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
  tabValue: 2,
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
const caseLoadTable = {
  nonPhicHeader1: ["IP", "OP", "ER", "TOTAL", "NC", "OL", "CC", "TOTAL"],
  header2: ["A", "B", "C1", "C2", "C3", "D"],
  phicHeader1: ["Particular", "IP", "OP", "ER"],
};

const dataTableGeneratedData = ref({
  sourceOfReferral: [],
  services: [],
  socialWorkAdministration: [],
  mswDocumentation: [],
  caseLoad: {
    nonPhic: {
      ip: [],
      op: [],
      er: [],
      caseCount: {
        1: 0,
        2: 0,
        3: 0,
      },
      totalCount: 0,
    },
    phic: {
      transformedContributorTypeData: {},
    },
  },
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
      caseLoad,
    } = response;

    dataTables.value.sourceOfReferral.items = sourceOfReferral;
    dataTables.value.socialWorkAdministration.items = socialWorkAdministration;
    dataTables.value.darServices.items = darServices;
    dataTables.value.origin.regionSeven.items = regionSevenObject;
    dataTables.value.origin.otherRegion.items = otherProviceObject;
    dataTables.value.mswdClassification.items = mswdDocumentation;
    dataTableGeneratedData.value.caseLoad = caseLoad;
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
const getSwaItem = async (item) => {
  swa_id.value = item.id;
  dialogs.value.swa.view = true;
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
const generateServices = async (item) => {
  const body = {
    month: "may",
    dar_service_id: item.dar_service_id,
  };
  const response = await generateDarServicesItems(body);
  if (response) {
    console.log(response);
    snackBarData.value = handleSnackBar(
      "primary",
      `Successfully generated ${response.length} Dar Items`
    );
    dataTableGeneratedData.value.services = response;
  }
};
const generateMSWDocumentation = async (item) => {
  const body = {
    month: "may",
    dar_service_id: item.dar_service_id,
  };
  const response = await generateMswDocumentationItems(body);
  if (response) {
    console.log(response);
    snackBarData.value = handleSnackBar(
      "primary",
      `Successfully generated ${response.length} Dar Items`
    );
    dataTableGeneratedData.value.mswDocumentation = response;
  }
};
const handleCaseLoadData = () => {
  handleCaseLoadPhic();
  handleCaseLoadNonPhic();
};
const handleCaseLoadNonPhic = () => {
  const { nonPhic } = dataTableGeneratedData.value.caseLoad;
  const nonPhicData = ref({
    ip: [],
    op: [],
    er: [],
    caseCount: {
      1: 0,
      2: 0,
      3: 0,
    },
    totalCount: 0,
  });
  nonPhicData.value.caseCount = calculateSumByCaseType(nonPhic);
  const ipCaseData = filterCaseLoadArea(nonPhic, 1);
  const opCaseData = filterCaseLoadArea(nonPhic, 3);
  const erCaseData = filterCaseLoadArea(nonPhic, 4);
  // log 3 areas
  nonPhicData.value.ip = transformedNonPhicData(ipCaseData);
  nonPhicData.value.op = transformedNonPhicData(opCaseData);
  nonPhicData.value.er = transformedNonPhicData(erCaseData);
  nonPhicData.value.totalCount = nonPhic.reduce(
    (sum, item) => sum + item.count,
    0
  );

  dataTableGeneratedData.value.caseLoad.nonPhic = nonPhicData.value;
};
const handleCaseLoadPhic = () => {
  const { phic } = dataTableGeneratedData.value.caseLoad;
  const contributor_type = [
    "Indirect - POS",
    "Indirect - Sponsored",
    "Indirect - 4PS",
    "Indirect - PWD",
    "Indirect - SC",
    "Direct - Lifetime",
    "Direct - Employed",
    "Direct - Voluntary",
    "Direct - OFW",
  ];
  const transformedContributorTypeData = [];
  const contributorTypeData = {};
  const filterByContributorType = (type) =>
    phic.filter((item) => item.contributor_type === type);
  contributorTypeData.posData = filterByContributorType(contributor_type[0]);
  contributorTypeData.sponsoredData = filterByContributorType(
    contributor_type[1]
  );
  contributorTypeData.fourPsData = filterByContributorType(contributor_type[2]);
  contributorTypeData.pwdData = filterByContributorType(contributor_type[3]);
  contributorTypeData.scData = filterByContributorType(contributor_type[4]);
  contributorTypeData.lifetimeData = filterByContributorType(
    contributor_type[5]
  );
  contributorTypeData.employedData = filterByContributorType(
    contributor_type[6]
  );
  contributorTypeData.voluntaryData = filterByContributorType(
    contributor_type[7]
  );
  contributorTypeData.ofwData = filterByContributorType(contributor_type[8]);
  console.log(contributorTypeData);
  Object.keys(contributorTypeData).forEach((key) => {
    const data = contributorTypeData[key];
    if (data.length > 0) {
      transformedContributorTypeData.push(transformedPhicData(data));
    }
  });
  dataTableGeneratedData.value.caseLoad.phic.transformedContributorTypeData =
    transformedContributorTypeData;
  // log all items in contributorTypeData
};

const filterCaseLoadArea = (data, area_id) => {
  if (area_id === 1) {
    return data.filter((item) => item.area_id === 1 || item.area_id === 2);
  }
  return data.filter((item) => item.area_id === area_id);
};
const transformedNonPhicData = (data) => {
  let result = [
    { type: "A", count: 0 },
    { type: "B", count: 0 },
    { type: "C1", count: 0 },
    { type: "C2", count: 0 },
    { type: "C3", count: 0 },
    { type: "D", count: 0 },
  ];

  data.forEach((item) => {
    let found = result.find((r) => r.type === item.phic_classification);
    if (!found) {
      result.push({ type: item.phic_classification, count: 0 });
      found = result[result.length - 1];
    }
    found.count += item.count;
  });

  return result;
};
const transformedPhicData = (data) => {
  const result = {};
  data.forEach((item) => {
    if (!result[item.contributor_type]) {
      result[item.contributor_type] = {
        area_1: {
          A: 0,
          B: 0,
          C1: 0,
          C2: 0,
          C3: 0,
          D: 0,
        },
        area_3: {
          A: 0,
          B: 0,
          C1: 0,
          C2: 0,
          C3: 0,
          D: 0,
        },
        area_4: {
          A: 0,
          B: 0,
          C1: 0,
          C2: 0,
          C3: 0,
          D: 0,
        },
      };
    }
    const area = result[item.contributor_type];
    if (item.area_id === 1 || item.area_id === 2) {
      area.area_1[item.phic_classification] += 1;
    } else if (item.area_id === 3) {
      area.area_3[item.phic_classification] += 1;
    } else if (item.area_id === 4) {
      area.area_4[item.phic_classification] += 1;
    }
  });
  return result;
};

const calculateSumByCaseType = (data) => {
  const sumCounts = {};

  // Iterate through the data
  data.forEach((entry) => {
    const case_type_id = entry.case_type_id;
    const count = entry.count;
    // Sum the counts for each case_type_id
    if (sumCounts[case_type_id]) {
      sumCounts[case_type_id] += count;
    } else {
      sumCounts[case_type_id] = count;
    }
  });
  return sumCounts;
};

const handleCloseDialog = (type) => {
  dialogs.value[type].view = false;
  dialogs.value[type].view = false;
};

onMounted(async () => {
  await fetchMonthlyStatisticalReport();
  handleCaseLoadData();
});
</script>
<style lang=""></style>
