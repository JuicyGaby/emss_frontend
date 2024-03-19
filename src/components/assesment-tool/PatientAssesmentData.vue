<template lang="">
  <div>
    <v-dialog v-model="props.modelValue">
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
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </div>
          <div>
            <h2>Initial Interview:</h2>
          </div>
          <v-divider></v-divider>
          <div>
            <h2>Initial Interview:</h2>
          </div>
          <v-divider></v-divider>
          <div>
            <h2>Initial Interview:</h2>
          </div>
          <v-divider></v-divider>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getInterview, getPatientAddress } from "@/api/assesment-tool";
import { getPatientByID } from "@/api/patients";
const props = defineProps({
  patientId: Number,
  modelValue: Boolean,
});
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
    address: [],
  },
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
          type: "text",
        },
        middle_name: {
          label: "Middle Name",
          type: "text",
        },
        last_name: {
          label: "Last Name",
          type: "text",
        },
        age: {
          label: "Age",
          type: "text",
        },
        birth_date: {
          label: "Birth Date",
          type: "date",
        },
        religion: {
          label: "Religion",
          type: "text",
        },
        contact_number: {
          label: "Contact Number",
          type: "text",
        },
        occupation: {
          label: "Occupation",
          type: "text",
        },
        monthly_income: {
          label: "Monthly Income",
          type: "text",
        },
        ph_membership_number: {
          label: "PH Membership Number",
          type: "text",
        },
        ph_membership_type: {
          label: "PH Membership",
          type: "text",
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
};

const getPatientData = async () => {
  await getInterviewData();
  //   await getDemographicData();
};
const getInterviewData = async () => {
  const response = await getInterview(props.patientId);
  patientAssesmentData.value.interview = response;
};
const getDemographicData = async () => {
  //   const personalData = await getPatientByID(props.patientId);
  //   const address = await getPatientAddress(props.patientId);
  //   patientAssesmentData.value.demographicData.patientData = personalData;
  //   patientAssesmentData.value.demographicData.address = address;
  //   console.log(patientAssesmentData.value.demographicData);
};
</script>
<style lang=""></style>
