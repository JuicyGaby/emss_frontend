<template lang="">
  <div>
    <v-container style="width: 1000px">
      <h1>Monthly Expenses:</h1>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col cols="12" class="d-flex ga-2 flex-wrap">
          <template v-for="(value, key) in inputFields.row1">
            <v-text-field
              v-if="value.type === 'text'"
              :key="'text-' + key"
              :label="value.label"
              :hide-spin-buttons="true"
              variant="outlined"
              :type="value.inputType"
              style="width: 400px"
              prefix="₱"
              :rules="value.rules"
              v-model="userMonthlyExpenses.number[key]"
              density="comfortable"
            ></v-text-field>
            <v-select
              v-else-if="value.type === 'select'"
              multiple
              chips
              closable-chips
              :key="'select-' + key"
              :label="value.label"
              :items="value.items"
              variant="outlined"
              style="width: 400px"
              v-model="userMonthlyExpenses.text[key]"
              density="comfortable"
            ></v-select>
            <v-combobox
              v-if="value.type === 'combobox'"
              :key="'combobox-' + key"
              :label="value.label"
              :items="value.items"
              v-model="userMonthlyExpenses.text[key]"
              variant="outlined"
              style="width: 400px"
              density="comfortable"
              multiple
              chips
              closable-chips
            ></v-combobox>
          </template>
        </v-col>
      </v-row>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col cols="12" class="d-flex ga-2 flex-wrap">
          <template v-for="(value, key) in inputFields.row2">
            <v-combobox
              v-if="value.type === 'combobox'"
              :key="'combobox-' + key"
              :label="value.label"
              :items="value.items"
              v-model="userMonthlyExpenses.text[key]"
              variant="outlined"
              style="width: 400px"
              density="comfortable"
              multiple
              chips
              closable-chips
            ></v-combobox>
            <v-text-field
              v-else-if="value.type === 'text'"
              :key="'text-' + key"
              :label="value.label"
              :hide-spin-buttons="true"
              variant="outlined"
              :type="value.inputType"
              style="width: 400px"
              prefix="₱"
              :rules="value.rules"
              v-model="userMonthlyExpenses.number[key]"
              density="comfortable"
            ></v-text-field>
          </template>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            prefix="₱"
            label="Total Cost"
            variant="outlined"
            readonly
            v-model="totalCost"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn
            variant="flat"
            :prepend-icon="
              userMonthlyExpenses.isExist ? 'mdi-update' : 'mdi-content-save'
            "
            :color="userMonthlyExpenses.isExist ? 'secondary' : 'success'"
            @click="
              userMonthlyExpenses.isExist
                ? updateMonthlyExpensesItem()
                : createMonthlyExpensesItem()
            "
          >
            {{
              userMonthlyExpenses.isExist 
                ? "Update Monthly Expenses"
                : "Create Monthly Expenses"
            }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <snack-bars :snackBarData="snackBarData" />
</template>
<script setup>
import snackBars from "../dialogs/snackBars.vue";
import { ref, onMounted, computed, watch } from "vue";
import { inputRules, handleSnackBar } from "@/utils/constants";
import {
  getMonthlyExpenses,
  createMonthlyExpenses,
  updateMonthlyExpenses,
} from "@/api/assesment-tool";

const snackBarData = ref({});

const props = defineProps({
  patientId: Number,
});
const totalCost = computed(() => {
  let total = 0;
  for (let key in userMonthlyExpenses.value.number) {
    total += Number(userMonthlyExpenses.value.number[key]);
  }
  return total;
});
const userMonthlyExpenses = ref({
  isExist: false,
  id: props.patientId,
  number: {
    house_lot_cost: "",
    food_water_cost: "",
    education_cost: "",
    clothing_cost: "",
    communication_cost: "",
    others_cost: "",
    house_help_cost: "",
    medical_cost: "",
    transportation_cost: "",
    light_source_cost: "",
    fuel_source_cost: "",
    water_source_cost: "",
  },
  text: {},
});
const inputFields = ref({
  row1: {
    house_lot_cost: {
      label: "House and Lot Cost",
      inputType: "Number",
      rules: [inputRules.invalidNegative],
      type: "text",
    },
    food_water_cost: {
      label: "Food and Water Cost",
      inputType: "Number",
      rules: [inputRules.invalidNegative],
      type: "text",
    },
    education_cost: {
      label: "Education Cost",
      inputType: "Number",
      rules: [inputRules.invalidNegative],
      type: "text",
    },
    clothing_cost: {
      label: "Clothing Cost",
      inputType: "Number",
      rules: [inputRules.invalidNegative],
      type: "text",
    },
    communication_cost: {
      label: "Communication Cost",
      inputType: "Number",
      rules: [inputRules.invalidNegative],
      type: "text",
    },
    house_help_cost: {
      label: "House Help Cost",
      inputType: "Number",
      rules: [inputRules.invalidNegative],
      type: "text",
    },
    transportation_type: {
      label: "Transportation Type",
      type: "select",
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
    transportation_cost: {
      label: "Transportation Cost",
      inputType: "Number",
      rules: [inputRules.invalidNegative],
      type: "text",
    },
    others_description: {
      label: "Others. Please specify:",
      type: "combobox",
    },
    others_cost: {
      label: "Others Cost",
      inputType: "Number",
      rules: [inputRules.invalidNegative],
      type: "text",
    },
    medical_cost: {
      label: "Medical Cost",
      inputType: "Number",
      rules: [inputRules.invalidNegative],
      type: "text",
    },
  },
  row2: {
    light_source_type: {
      label: "Light Sources",
      type: "combobox",
      items: ["Electricity", "Kerosene", "Candles", "Solar"],
    },
    light_source_cost: {
      label: "Light Source Cost",
      inputType: "Number",
      rules: [inputRules.invalidNegative],
      type: "text",
    },
    fuel_source_type: {
      label: "Fuel Sources",
      type: "combobox",
      items: ["Gas", "Kerosene", "Charcoal"],
    },
    fuel_source_cost: {
      label: "Fuel Source Cost",
      inputType: "Number",
      rules: [inputRules.invalidNegative],
      type: "text",
    },
    water_source_type: {
      label: "Water Sources",
      type: "combobox",
      items: [
        "Tap",
        "Deep Well",
        "Spring",
        "River",
        "Public Artisan Well",
        "Private Artisan Well",
        "Water District",
      ],
    },
    water_source_cost: {
      label: "Water Source Cost",
      inputType: "Number",
      rules: [inputRules.invalidNegative],
      type: "text",
    },
  },
  totalCost: {
    label: "Total Cost",
    type: "text",
  },
});

// async functions

const createMonthlyExpensesItem = async () => {
  const total_cost = totalCost.value;
  userMonthlyExpenses.value.total_cost = total_cost;
  const response = await createMonthlyExpenses(userMonthlyExpenses.value);
  if (response) {
    snackBarData.value = handleSnackBar("success", "Data Created Successfully");
    userMonthlyExpenses.value.isExist = true;
  }
};

const getMonthlyExpensesItem = async () => {
  const response = await getMonthlyExpenses(props.patientId);
  if (response) {
    userMonthlyExpenses.value = {
      isExist: true,
      id: response.id,
      number: {
        house_lot_cost: response.house_lot_cost,
        food_water_cost: response.food_water_cost,
        education_cost: response.education_cost,
        clothing_cost: response.clothing_cost,
        communication_cost: response.communication_cost,
        house_help_cost: response.house_help_cost,
        transportation_cost: response.transportation_cost,
        others_cost: response.others_cost,
        medical_cost: response.medical_cost,
        light_source_cost: response.light_source_cost,
        fuel_source_cost: response.fuel_source_cost,
        water_source_cost: response.water_source_cost,
      },
      text: {
        transportation_type: response.transportation_type,
        others_description: response.others_description,
        light_source_type: response.light_source_type,
        fuel_source_type: response.fuel_source_type,
        water_source_type: response.water_source_type,
      },
    };
    console.log(userMonthlyExpenses.value);
  }
};
const updateMonthlyExpensesItem = async () => {
  const total_cost = totalCost.value;
  userMonthlyExpenses.value.total_cost = total_cost;
  const response = await updateMonthlyExpenses(userMonthlyExpenses.value);
  if (response) {
    snackBarData.value = handleSnackBar("success", "Data Updated Successfully");
  }
};

onMounted(async () => {
  await getMonthlyExpensesItem();
});
</script>
<style lang=""></style>
