<template lang="">
  <div>
    <v-container style="width: 1000px">
      <h2>Monthly Expenses:</h2>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col cols="12" class="d-flex ga-2 flex-wrap">
          <v-text-field
            v-for="(field, key) in InputFields.textFields"
            :key="key"
            :label="field.label"
            v-model="field.value"
            variant="outlined"
            style="width: 400px"
            class=""
            density="comfortable"
          ></v-text-field>
          <v-combobox
            chips
            multiple
            :label="InputFields.comboFields.transportation_type.label"
            :items="InputFields.comboFields.transportation_type.items"
            variant="outlined"
            style="width: 400px"
            class=""
            density="comfortable"
          ></v-combobox>
          <v-text-field
            :label="InputFields.comboTextFields.transportation_cost.label"
            variant="outlined"
            style="width: 400px"
            class=""
            density="comfortable"
          ></v-text-field>
        </v-col>
      </v-row>
      <h3>Light Source:</h3>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col cols="12" class="d-flex ga-2 flex-wrap">
          <v-text-field
            v-for="(field, key) in InputFields.sourceFields.lightSource"
            :key="key"
            :label="field.label"
            v-model="field.value"
            variant="outlined"
            style="width: 200px"
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
            v-model="field.value"
            variant="outlined"
            style="width: 200px"
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
            v-model="field.value"
            variant="outlined"
            style="width: 200px"
            class=""
            density="comfortable"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field label="Total Cost" variant="outlined" density="comfortable"></v-text-field>
          <v-textarea
            v-model="remarks"
            label="Remarks"
            variant="outlined"
            class=""
            density="comfortable"
          >
          </v-textarea>
          <v-btn color="success">Update Monthly Expenses</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  patientId: Number,
});
onMounted(() => {});
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
      candles: {
        label: "Candles Cost",
      },
    },
    fuelSource: {
      gas: {
        label: "Gas Cost",
      },
      firewood: {
        label: "Firewood Cost",
      },
      charcoal: {
        label: "Charcoal Cost",
      },
    },
    waterSource: {
      publice_artesian_well: {
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
</script>
<style lang=""></style>
