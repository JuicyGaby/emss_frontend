<template lang="">
  <div v-if="isLoaded">
    <v-container style="width: 1000px">
      <h1>Monthly Expenses:</h1>
      <!-- input fields -->
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col cols="12" class="d-flex ga-2 flex-wrap">
          <v-text-field
            v-for="(field, key) in InputFields.textFields"
            :key="key"
            prepend-inner-icon="mdi-currency-php"
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
            closable-chips
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
            prepend-inner-icon="mdi-currency-php"
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
            prepend-inner-icon="mdi-currency-php"
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
            prepend-inner-icon="mdi-currency-php"
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
            prepend-inner-icon="mdi-currency-php"
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
            prepend-inner-icon="mdi-currency-php"
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
          <v-btn color="secondary" @click="handleButtonAction">{{
            monthlyExpenses.isExist ? "Update Patient" : "Create Data"
          }}</v-btn>
        </v-col>
      </v-row>
      <!-- {{ monthlyExpenses }} -->
    </v-container>
    <!-- {{ monthlyExpenses }} -->
    <v-snackbar
      v-for="(bar, key) in snackBars"
      :key="key"
      color="green"
      location="top"
      :timeout="2500"
      min-width="250px"
      v-model="bar.isActive"
    >
      <div class="d-flex justify-center align-center ga-2">
        <v-icon icon="mdi-check-bold"></v-icon>
        <p class="text-subtitle-1">{{ bar.text }}</p>
      </div>
    </v-snackbar>
  </div>
</template>
<script setup>
import { ref, onMounted, watchEffect } from "vue";
import {
  getMonthlyExpenses,
  createMonthlyExpenses,
  updateMonthlyExpenses,
} from "@/api/assesment-tool";

const props = defineProps({
  patientId: Number,
});
onMounted(async () => {
  await fetchMonthlyExpenses();
});

const snackBars = ref({
  update: {
    isActive: false,
    text: ref("Successfully Updated Patient Data"),
  },
  create: {
    isActive: false,
    text: ref("Successfully Created Patient Data"),
  },
});
const monthlyExpenses = ref({
  isExist: false,
  patient_light_source: {
    electric: null,
    kerosene: null,
    candle: null,
  },
  patient_water_source: {
    public_artesian_well: null,
    private_artesian_well: null,
    water_district: null,
  },
  patient_fuel_source: {
    gas: null,
    kerosene: null,
    charcoal: null,
  },
});
const isLoaded = ref(true);
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
  if (monthlyExpenses.value.transportation_type === "") {
    monthlyExpenses.value.transportation_type = null;
  }
  // returns an object inside of the returned array data
  monthlyExpenses.value.patient_light_source = response.patient_light_source[0];
  monthlyExpenses.value.patient_fuel_source = response.patient_fuel_source[0];
  monthlyExpenses.value.patient_water_source = response.patient_water_source[0];
};

const handleButtonAction = async () => {
  if (monthlyExpenses.value.isExist) {
    await updateMonthlyExpensesData();
    return;
  }
  await createMonthlyExpensesData();
};

const createMonthlyExpensesData = async () => {
  monthlyExpenses.value.patient_id = props.patientId;
  const response = await createMonthlyExpenses(monthlyExpenses.value);
  if (response) toggleUpdate("create");
};
const updateMonthlyExpensesData = async () => {
  const response = await updateMonthlyExpenses(monthlyExpenses.value);
  if (response) toggleUpdate("update");
};
const toggleUpdate = (type) => {
  monthlyExpenses.value.isExist = true;
  snackBars.value[type].isActive = true;
};



</script>
<style lang=""></style>
