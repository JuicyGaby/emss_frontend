<template lang="">
    <div>
      <v-container>
        <!-- persnal data -->
        <h2>Personal Data</h2>
        <v-divider class="mb-5"></v-divider>
        <v-row>
          <v-col cols="3">
            <v-text-field
              v-for="(value, key) in inputFields.col1"
              :key="key"
              :label="value.label"
              :type="value.type"
              v-model="patientData[key]"
              density="compact"
              variant="outlined"
              style="min-width: 300px"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-for="(value, key) in inputFields.col2"
              :key="key"
              :label="value.label"
              :type="value.type"
              v-model="patientData[key]"
              density="compact"
              variant="outlined"
              style="min-width: 300px"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-for="(value, key) in inputFields.col3"
              :key="key"
              :label="value.label"
              :type="value.type"
              v-model="patientData[key]"
              density="compact"
              variant="outlined"
              style="min-width: 300px"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- address -->
        <h2>Address</h2>
        <v-divider class="mb-5"></v-divider>
        <v-row v-if="patientData.address">
          <v-col cols="3">
            <h4 class="mb-5">Permanent Address</h4>
            <v-text-field
              v-for="(value, key) in address.permanent"
              :key="key"
              :label="value.label"
              :type="value.type"
              v-model="patientData.address[0][key]"
              density="compact"
              variant="outlined"
              style="min-width: 300px"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <h4 class="mb-5">Temporary Address</h4>
            <v-text-field
              v-for="(value, key) in address.permanent"
              :key="key"
              :label="value.label"
              :type="value.type"
              v-model="patientData.address[1][key]"
              density="compact"
              variant="outlined"
              style="min-width: 300px"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- family composition -->
        <h2>Family Composition</h2>
  
        <v-divider class="mb-5"></v-divider>
        <v-row v-for="(item, index) in familyComposition" :key="index">
          <v-col cols="3">
            <v-text-field
              v-for="(value, key) in familyCompositionFields.col1"
              :key="key"
              :label="value.label"
              :type="value.type"
              v-model="item[key]"
              density="compact"
              variant="outlined"
              style="min-width: 300px"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-for="(value, key) in familyCompositionFields.col2"
              :key="key"
              :label="value.label"
              :type="value.type"
              v-model="item[value.label]"
              density="compact"
              variant="outlined"
              style="min-width: 300px"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- remarks -->
        <h2>Remarks</h2>
        <v-divider class="mb-5"></v-divider>
        <v-row>
          <v-col cols="6">
            <v-textarea
              v-model="patientData.remarks"
              label="Remarks"
              rows="5"
              auto-grow
              style="min-width: 300px"
              variant="outlined"
              counter="255"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-btn color="primary">Update Personal Data</v-btn>
      </v-container>
    </div>
  </template>
  <script setup>
  import { ref, onMounted } from "vue";
  import { getPatientByID } from "@/api/patients";
  import { getFamilyComposition } from "@/api/assesment-tool";
  
  let patientData = ref({});
  let familyComposition = ref({});
  
  const inputFields = {
    col1: {
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
        type: "text",
      },
      sex: {
        label: "Sex",
        type: "text",
      },
      contact_number: {
        label: "Contact Number",
        type: "text",
      },
    },
    col2: {
      gender: {
        label: "Gender Identity",
        type: "text",
      },
      religion: {
        label: "Religion",
        type: "text",
      },
      nationality: {
        label: "Nationality",
        type: "text",
      },
      civil_status: {
        label: "Civil Status",
        type: "text",
      },
      living_arrangement: {
        label: "Living Arrangement",
        type: "text",
      },
      highest_education_level: {
        label: "Education",
        type: "text",
      },
      education_status: {
        label: "Education Status",
        type: "text",
      },
    },
    col3: {
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
    },
  };
  const address = {
    permanent: {
      region: {
        label: "Region",
        type: "text",
      },
      province: {
        label: "Province",
        type: "text",
      },
      district: {
        label: "District",
        type: "text",
      },
      municipality: {
        label: "Municipality",
        type: "text",
      },
      barangay: {
        label: "Barangay",
        type: "text",
      },
      purok: {
        label: "Purok",
        type: "text",
      },
    },
    temporary: {
      region: {
        label: "Region",
        type: "text",
      },
      province: {
        label: "Province",
        type: "text",
      },
      district: {
        label: "District",
        type: "text",
      },
      municipality: {
        label: "Municipality",
        type: "text",
      },
      barangay: {
        label: "Barangay",
        type: "text",
      },
      purok: {
        label: "Purok",
        type: "text",
      },
    },
  };
  
  const familyCompositionFields = {
    col1: {
      full_name: {
        label: "Full Name",
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
      civil_status: {
        label: "Civil Status",
        type: "text",
      },
    },
    col2: {
      relationship: {
        label: "Relationship",
        type: "text",
      },
      educational_attainment: {
        label: "Educational Attainment",
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
    },
    col3: {
      other_source_of_income: {
        label: "Other Source of Income",
        type: "text",
      },
      household_size: {
        label: "Household Size",
        type: "text",
      },
      total_household_income: {
        label: "Total Household Income",
        type: "text",
      },
      per_capita_income: {
        label: "Per Capita Income",
        type: "text",
      },
    },
  };
  
  const props = defineProps({
    patientId: Number,
  });
  
  onMounted(async () => {
    await getPatientData();
    await getFamilyCompositionData();
  });
  
  const getPatientData = async () => {
    const response = await getPatientByID(props.patientId);
    console.log(response);
    patientData.value = response;
  };
  
  const getFamilyCompositionData = async () => {
    const response = await getFamilyComposition(props.patientId);
    familyComposition.value = response;
    console.log(response);
  };
  </script>
  <style lang=""></style>
  