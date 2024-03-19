<template lang="">
  <div>
    <v-dialog v-model="props.modelValue" width="80%">
      <v-card>
        <v-toolbar color="grey">
          <v-toolbar-title class="text-h5"
            >Patient Assessment Tool</v-toolbar-title
          >
          <v-btn color="" icon="mdi-close" @click="toggleDialog"></v-btn>
        </v-toolbar>
        <v-card-title primary-title> </v-card-title>
        <v-spacer></v-spacer>
        <v-card-text>
          <!-- initial Interview -->
          <div>
            <h2>Initial Interview:</h2>
            <v-divider></v-divider>
            <v-container>
              <v-row>
                <v-col cols="12" class="d-flex ga-1 flex-wrap">
                  <v-text-field
                    v-for="(field, key) in fields.interview"
                    :key="key"
                    :label="field.label"
                    :type="field.type"
                    style="width: 400px"
                    variant="outlined"
                    density="compact"
                    readonly
                    v-model="patientAssesmentData.interview[key]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <!-- demographic data -->
          <div>
            <h2>I. Demographic Data:</h2>
            <v-divider></v-divider>
            <div class="my-2">
              <h3>Personal Data</h3>
              <v-container>
                <v-row>
                  <v-col cols="12" class="d-flex ga-1 flex-wrap">
                    <v-text-field
                      v-for="(field, key) in fields.demographicData.personalData
                        .textField"
                      :key="key"
                      :label="field.label"
                      :type="field.type"
                      style="width: 400px"
                      variant="outlined"
                      density="compact"
                      readonly
                      v-model="
                        patientAssesmentData.demographicData.patientData[key]
                      "
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <div>
              <h3>Patient's Address</h3>
              <v-container>
                <v-row>
                  <v-col cols="12" class="d-flex ga-1 flex-wrap">
                    <v-text-field
                      v-for="(field, key) in fields.demographicData.address
                        .permanent"
                      :key="key"
                      :label="field.label"
                      :type="field.type"
                      style="width: 400px"
                      variant="outlined"
                      density="compact"
                      readonly
                      v-model="
                        patientAssesmentData.demographicData.address[0][key]
                      "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="d-flex ga-1 flex-wrap">
                    <v-text-field
                      v-for="(field, key) in fields.demographicData.address
                        .temporary"
                      :key="key"
                      :label="field.label"
                      :type="field.type"
                      style="width: 400px"
                      variant="outlined"
                      density="compact"
                      readonly
                      v-model="
                        patientAssesmentData.demographicData.address[1][key]
                      "
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <h3>Family Composition</h3>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-data-table
                      :headers="
                        patientAssesmentData.demographicData.tableHeaders
                      "
                      :items="
                        patientAssesmentData.demographicData.familyComposition
                      "
                      items-per-page="5"
                      density="compact"
                      :items-per-page-options="[5, 10, 15]"
                    >
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </div>
          <div>
            <h2>II. MSWD Classification:</h2>
            <v-divider></v-divider>
            <v-container>
              <v-row>
                <v-col cols="12" class="d-flex ga-1 flex-wrap">
                  <v-text-field
                    v-for="(field, key) in fields.mswdClassification.textField"
                    :key="key"
                    :label="field.label"
                    :type="field.type"
                    style="width: 400px"
                    variant="outlined"
                    density="compact"
                    readonly
                    v-model="patientAssesmentData.mswdClassification[key]"
                  ></v-text-field>
                  <v-combobox
                    multiple
                    chips
                    variant="outlined"
                    :label="
                      fields.mswdClassification.comboField
                        .membership_to_marginalized_sector.label
                    "
                    v-model="
                      patientAssesmentData.mswdClassification
                        .membership_to_marginalized_sector
                    "
                    readonly
                    density="compact"
                    style="width: 400px"
                  >
                  </v-combobox>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div>
            <h2>III. Monthly Expenses:</h2>
            <v-divider></v-divider>
            <v-container>
              <v-row>
                <v-col cols="12" class="d-flex flex-wrap ga-1">
                  <v-text-field
                    v-for="(field, key) in fields.monthlyExpenses.textField"
                    :key="key"
                    :label="field.label"
                    :type="field.type"
                    style="width: 400px"
                    variant="outlined"
                    density="compact"
                    readonly
                  ></v-text-field>
                  <v-combobox
                    multiple
                    chips
                    variant="outlined"
                    :label="
                      fields.monthlyExpenses.comboField.transportation_type
                        .label
                    "
                    readonly
                    density="compact"
                    style="width: 400px"
                  >
                  </v-combobox>
                  <v-text-field
                    :label="
                      fields.monthlyExpenses.comboText.transportation_cost.label
                    "
                    style="width: 400px"
                    variant="outlined"
                    density="compact"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="d-flex flex-wrap ga-1">
                  <v-text-field
                    v-for="(field, key) in fields.monthlyExpenses.sourceFields
                      .lightSource"
                    :key="key"
                    :label="field.label"
                    style="width: 400px"
                    variant="outlined"
                    density="compact"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    v-for="(field, key) in fields.monthlyExpenses.sourceFields
                      .fuelSource"
                    :key="key"
                    :label="field.label"
                    style="width: 400px"
                    variant="outlined"
                    density="compact"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    v-for="(field, key) in fields.monthlyExpenses.sourceFields
                      .waterSource"
                    :key="key"
                    :label="field.label"
                    style="width: 400px"
                    variant="outlined"
                    density="compact"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    :label="fields.monthlyExpenses.total_cost.label"
                    style="width: 400px"
                    variant="outlined"
                    density="compact"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div>
            <h2>IV. Medical Data:</h2>
            <v-divider></v-divider>
            <v-container>
              <v-row>
                <v-col cols="12" class="d-flex flex-wrap ga-1">
                  <v-textarea
                    v-for="(field, key) in fields.medicalData.textField"
                    :key="key"
                    :label="field.label"
                    :type="field.type"
                    style="width: 400px"
                    variant="outlined"
                    density="compact"
                    readonly
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div>
            <h2>V. Health and Mental Health:</h2>
            <v-divider></v-divider>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-table density="compact">
                    <thead>
                      <tr>
                        <th
                          v-for="(header, key) in fields.healthAndMentalHealth
                            .tableHeaders"
                          :key="key"
                        >
                          {{ header }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(field, key) in fields.healthAndMentalHealth
                          .textField"
                        :key="key"
                      >
                        <td>{{ field.label }}</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div>
            <h2>VI. Discrimination:</h2>
            <v-divider></v-divider>
            <v-container>
              <v-row>
                <v-col cols="12" class="d-flex flex-wrap ga-1"></v-col>
              </v-row>
            </v-container>
          </div>
          <div>
            <h2>VII. Safety:</h2>
            <v-divider></v-divider>
            <v-container>
              <v-row>
                <v-col cols="12" class="d-flex flex-wrap ga-1"></v-col>
              </v-row>
            </v-container>
          </div>
          <div>
            <h2>VIII. Assesment of Social Functioning:</h2>
            <v-divider></v-divider>
            <v-container>
              <v-row>
                <v-col cols="12" class="d-flex flex-wrap ga-1"></v-col>
              </v-row>
            </v-container>
          </div>
          <div>
            <h2>IX. Problems in the Environment:</h2>
            <v-divider></v-divider>
            <v-container>
              <v-row>
                <v-col cols="12" class="d-flex flex-wrap ga-1"></v-col>
              </v-row>
            </v-container>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import {
  getInterview,
  getPatientAddress,
  getMswdClassification,
  getFamilyComposition,
  getMonthlyExpenses,
  getMedicalData,
  getHealthAndMentalHealth,
  getDiscrimination,
  getSafety,
  getSocialFunctioning,
  getProblemsInEnvironment,
} from "@/api/assesment-tool";
import { getPatientByID } from "@/api/patients";
const props = defineProps({
  patientId: Number,
  modelValue: Boolean,
});

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      getPatientData();
    }
  }
);
const emit = defineEmits(["close"]);
onMounted(async () => {
  await getPatientData();
});
const toggleDialog = () => {
  emit("close");
};
const patientAssesmentData = ref({
  interview: {},
  demographicData: {
    patientData: {},
    address: [
      {
        region: "",
        province: "",
        district: "",
        municipality: "",
        barangay: "",
        purok: "",
      },
      {
        region: "",
        province: "",
        district: "",
        municipality: "",
        barangay: "",
        purok: "",
      },
    ],
    tableHeaders: [
      { title: "Fullname", value: "full_name" },
      { title: "Age", value: "age" },
      { title: "Birth Date", value: "birth_date" },
      { title: "Civil Status", value: "civil_status" },
      { title: "Relationship", value: "relationship" },
      { title: "Educational Attainment", value: "educational_attainment" },
      { title: "Occupation", value: "occupation" },
      { title: "Monthly Income", value: "monthly_income" },
    ],
    familyComposition: {},
  },
  mswdClassification: {},
  monthlyExpenses: {},
  medicalData: {},
  healthAndMentalHealth: {},
  discrimination: {},
  safety: {},
  socialFunctioning: {},
  problemsInEnvironment: {},
});
const fields = {
  interview: {
    interview_date: {
      label: "Interview Date",
      type: "text",
    },
    interview_time: {
      label: "Interview Time",
      type: "text",
    },
    admission_date_and_time: {
      label: "Admission Date-Time",
      type: "text",
    },
    basic_ward: {
      label: "Basic Ward",
      type: "text",
    },
    nonbasic_ward: {
      label: "Non-Basic Ward",
      type: "text",
    },
    health_record_number: {
      label: "Health Record Number",
      type: "text",
    },
    mswd_number: {
      label: "MSWD Number",
      type: "text",
    },
    referring_party: {
      label: "Referring Party",
      type: "text",
    },
    source_of_referral: {
      label: "Source of Referral",
      type: "text",
    },
    address: {
      label: "Referal Address",
      type: "text",
    },
    contact_number: {
      label: "Referal Contact Number",
      type: "text",
    },
    informant: {
      label: "Informant",
      type: "text",
    },
    relationship_to_patient: {
      label: "Informant relationship to Patient",
      type: "text",
    },
    informant_contact_number: {
      label: "Informant Contact Number",
      type: "text",
    },
    informant_address: {
      label: "Informant Address",
      type: "text",
    },
  },
  demographicData: {
    personalData: {
      textField: {
        first_name: {
          label: "First Name",
        },
        middle_name: {
          label: "Middle Name",
        },
        last_name: {
          label: "Last Name",
        },
        age: {
          label: "Age",
        },
        birth_date: {
          label: "Birth Date",
        },
        religion: {
          label: "Religion",
        },
        contact_number: {
          label: "Contact Number",
        },
        occupation: {
          label: "Occupation",
        },
        monthly_income: {
          label: "Monthly Income",
        },
        ph_membership_number: {
          label: "PH Membership Number",
        },
        ph_membership_type: {
          label: "PH Membership",
        },
        gender: {
          label: "Gender Identity",
        },
        sex: {
          label: "Sex",
        },
        nationality: {
          label: "Nationality",
        },
        civil_status: {
          label: "Civil Status",
        },
        living_arrangement: {
          label: "Living Arrangement",
        },
        highest_education_level: {
          label: "Education",
        },
        education_status: {
          label: "Education Status",
        },
      },
    },
    address: {
      permanent: {
        region: {
          label: "Region",
        },
        province: {
          label: "Province",
        },
        district: {
          label: "District",
        },
        municipality: {
          label: "Municipality",
        },
        barangay: {
          label: "Barangay",
        },
        purok: {
          label: "Purok",
        },
      },
      temporary: {
        region: {
          label: "Region",
        },
        province: {
          label: "Province",
        },
        district: {
          label: "District",
        },
        municipality: {
          label: "Municipality",
        },
        barangay: {
          label: "Barangay",
        },
        purok: {
          label: "Purok",
        },
      },
    },
  },
  mswdClassification: {
    textField: {
      main_classification_type: {
        label: "Main Classification",
      },
      sub_classification_type: {
        label: "Sub Classification",
      },
    },
    comboField: {
      membership_to_marginalized_sector: {
        label: "Sectors",
      },
    },
  },
  monthlyExpenses: {
    textField: {
      house_lot_cost: {
        label: "House and Lot Cost",
        value: "",
      },
      food_water_cost: {
        label: "Food and Water Cost",
        value: "",
      },
      education_cost: {
        label: "Education Cost",
        value: "",
      },
      communication_cost: {
        label: "Communication Cost",
        value: "",
      },
      house_help_cost: {
        label: "House Help Cost",
        value: "",
      },
      medical_cost: {
        label: "Medical Cost",
        value: "",
      },
    },
    comboField: {
      transportation_type: {
        label: "Transportation Type",
      },
    },
    comboText: {
      transportation_cost: {
        label: "Transportation Cost",
      },
    },
    sourceFields: {
      lightSource: {
        electric: {
          label: "Electricity Cost",
        },
        kerosene: {
          label: "Kerosene Cost",
        },
        candle: {
          label: "Candles Cost",
        },
      },
      fuelSource: {
        gas: {
          label: "Gas Cost",
        },
        kerosene: {
          label: "kerosene Cost",
        },
        charcoal: {
          label: "Charcoal Cost",
        },
      },
      waterSource: {
        public_artesian_well: {
          label: "Public Artesian Well Cost",
        },
        private_artesian_well: {
          label: "Private Artesian Well Cost",
        },
        water_district: {
          label: "Water District Cost",
        },
      },
    },
    total_cost: {
      label: "Total Cost",
    },
  },
  medicalData: {
    textField: {
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
    },
  },
  healthAndMentalHealth: {
    tableHeaders: [
      "Particulars",
      "Severity Index",
      "Duration Index",
      "Coping Index",
    ],
    textField: {
      abscence_of_adequate_health_services: {
        label: "Abscence of Adequate Health Services",
      },
      abscence_of_support_health_services: {
        label: "Abscence of Support Health Services",
      },
      absence_of_adequate_mental_services: {
        label: "Abscence of Adequate Mental Services",
      },
      absence_of_support_mental_services: {
        label: "Abscence of Support Mental Services",
      },
      inaccessibility_of_health_services: {
        label: "Inaccessibility of Health Services",
      },
      inaccessibility_of_mental_services: {
        label: "Inaccessibility of Mental Services",
      },
    },
  },
  discrimination: {
    textField: {},
    comboField: {},
  },
  safety: {
    textField: {},
    comboField: {},
  },
  socialFunctioning: {
    textField: {},
    comboField: {},
  },
  problemsInEnvironment: {
    textField: {},
    comboField: {},
  },
};

const getPatientData = async () => {
  await getInterviewData();
  await getPatientPersonalData();
  await getMswdClassificationData();
  await getMonthlyExpensesData();
};
const getInterviewData = async () => {
  const response = await getInterview(props.patientId);
  patientAssesmentData.value.interview = response;
};
const getPatientPersonalData = async () => {
  const response = await getPatientByID(props.patientId);
  const address = await getPatientAddress(props.patientId);
  const familyComposition = await getFamilyComposition(props.patientId);
  if (address) {
    patientAssesmentData.value.demographicData.address[0] = address[0];
    patientAssesmentData.value.demographicData.address[1] = address[1];
  }
  patientAssesmentData.value.demographicData.patientData = response;
  patientAssesmentData.value.demographicData.familyComposition =
    familyComposition;
};
const getMswdClassificationData = async () => {
  const response = await getMswdClassification(props.patientId);
  patientAssesmentData.value.mswdClassification = response;
};

const getMonthlyExpensesData = async () => {
  const response = await getMonthlyExpenses(props.patientId);
  console.log(response);
};
const getMedicalDataItem = async () => {
  const response = await getMedicalData(props.patientId);
};
const getHealthAndMentalHealthData = async () => {
  const response = await getHealthAndMentalHealth(props.patientId);
};
const getDiscriminationData = async () => {
  const response = await getDiscrimination(props.patientId);
};
const getSafetyData = async () => {
  const response = await getSafety(props.patientId);
};
const getSocialFunctioningData = async () => {
  const response = await getSocialFunctioning(props.patientId);
};
const getProblemsInEnvironmentData = async () => {
  const response = await getProblemsInEnvironment(props.patientId);
};
</script>
<style lang=""></style>
