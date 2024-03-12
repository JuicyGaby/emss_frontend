<template lang="">
  <div v-if="isLoaded">
    <v-container style="width: 1000px">
      <h2>Monthly Expenses:</h2>
      <!-- input fields -->
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col cols="12" class="d-flex ga-2 flex-wrap">
          <v-text-field
            v-for="(field, key) in InputFields.textFields"
            :key="key"
            :label="field.label"
            v-model="monthlyExpenses[key]"
            variant="outlined"
            style="width: 400px"
            class=""
            type="number"
            density="comfortable"
          ></v-text-field>
          <v-combobox
            chips
            multiple
            :label="InputFields.comboFields.transportation_type.label"
            :items="InputFields.comboFields.transportation_type.items"
            v-model="monthlyExpenses.transportation_type"
            variant="outlined"
            style="width: 400px"
            class=""
            density="comfortable"
          ></v-combobox>
          <v-text-field
            :label="InputFields.comboTextFields.transportation_cost.label"
            variant="outlined"
            v-model="monthlyExpenses.transportation_cost"
            style="width: 400px"
            class=""
            type="number"
            density="comfortable"
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- sources -->
      <h3>Light Source:</h3>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col cols="12" class="d-flex ga-2 flex-wrap">
          <v-text-field
            v-for="(field, key) in InputFields.sourceFields.lightSource"
            :key="key"
            :label="field.label"
            variant="outlined"
            style="width: 200px"
            v-model="monthlyExpenses.patient_light_source[key]"
            type="number"
            class=""
            density="comfortable"
          ></v-text-field>
        </v-col>
      </v-row>
      <h3>Fuel Source:</h3>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col cols="12" class="d-flex ga-2 flex-wrap">
          <v-text-field
            v-for="(field, key) in InputFields.sourceFields.fuelSource"
            :key="key"
            :label="field.label"
            v-model="monthlyExpenses.patient_fuel_source[key]"
            variant="outlined"
            style="width: 200px"
            type="number"
            class=""
            density="comfortable"
          ></v-text-field>
        </v-col>
      </v-row>
      <h3>Water Source:</h3>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col cols="12" class="d-flex ga-2 flex-wrap">
          <v-text-field
            v-for="(field, key) in InputFields.sourceFields.waterSource"
            :key="key"
            :label="field.label"
            v-model="monthlyExpenses.patient_water_source[key]"
            variant="outlined"
            style="width: 200px"
            type="number"
            class=""
            density="comfortable"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="Total Cost"
            variant="outlined"
            density="comfortable"
          ></v-text-field>
          <v-textarea
            label="Remarks"
            variant="outlined"
            class=""
            v-model="monthlyExpenses['remarks']"
            density="comfortable"
          >
          </v-textarea>
          <v-btn color="secondary" @click="handleAction">{{
            monthlyExpenses.isExist ? "Update Patient" : "Create Data"
          }}</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <!-- {{ monthlyExpenses }} -->
  </div>
</template>
<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { getMonthlyExpenses, createMonthlyExpenses } from "@/api/assesment-tool";

const props = defineProps({
  patientId: Number,
});

const monthlyExpenses = ref({
  isExist: false,
  patient_light_source: {
    electric: "",
    kerosene: "",
    candle: "",
  },
  patient_water_source: {
    public_artesian_well: "",
    private_artesian_well: "",
    water_district: "",
  },
  patient_fuel_source: {
    gas: "",
    kerosene: "",
    charcoal: "",
  },
});
const isLoaded = ref(true);

onMounted(async () => {
  await fetchMonthlyExpenses();
});

const monthlyExpensesData = ref({});
const InputFields = {
  comboFields: {
    transportation_type: {
      label: "Transportation Type",
      items: [
        "Jeep",
        "Bus",
        "Tricycle",
        "Taxi",
        "Motorcycle",
        "Boat",
        "Habal-habal",
        "Bicycle",
      ],
    },
  },
  textFields: {
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
  comboTextFields: {
    transportation_cost: {
      label: "Transportation Cost",
      value: "",
    },
  },
};

const fetchMonthlyExpenses = async () => {
  const response = await getMonthlyExpenses(props.patientId);
  if (!response) {
    console.log("No Monthly Expenses");
    return;
  }
  monthlyExpenses.value = response;
  monthlyExpenses.value.isExist = true;
  monthlyExpenses.value.patient_light_source = response.patient_light_source[0];
  monthlyExpenses.value.patient_fuel_source = response.patient_fuel_source[0];
  monthlyExpenses.value.patient_water_source = response.patient_water_source[0];
  console.log(monthlyExpenses.value);
};

const handleAction = async () => {
  if (monthlyExpenses.value.isExist) {
    await updateMonthlyExpenses();
    return;
  }
  await createMonthlyExpensesData();
};

const createMonthlyExpensesData = async () => {
    // const response = await createMonthlyExpenses(monthlyExpenses.value);
};

const updateMonthlyExpenses = async () => {
  console.log("Update Monthly Expenses");
};
</script>
<style lang=""></style>
