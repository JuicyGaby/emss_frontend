<template lang="">
  <div class="display">
    <v-card width="100%" height="100vh">
      <v-toolbar color="secondary" class="d-flex align-center ga-5 px-5">
        <v-icon size="x-large">mdi-book-edit</v-icon>
        <h1>Electronic Malasakit Social Service System</h1>
      </v-toolbar>
      <v-card-text>
        <h1 class="">Welcome, {{ userFullName }}</h1>
        <div>
          <v-select
            class="ma-3"
            :items="inputFields.selectField.months.items"
            style="width: 200px"
            variant="outlined"
            label="Select Month"
            density="comfortable"
            v-model="dataInputs.month"
          ></v-select>
          <v-btn color="grey" @click="generateStatisticalReport"
            >generate Report</v-btn
          >
        </div>
        {{ dataInputs }}
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import { userAuthentication } from "@/stores/session";
import { validateForm } from "@/utils/constants";
import { getDarByMonth } from "@/api/daily-activity-report";
import { ref, onMounted } from "vue";
const authentication = userAuthentication();
const userFullName = `${authentication.user.fname} ${authentication.user.lname}`;
const dataInputs = ref({});
const inputFields = {
  selectField: {
    months: {
      label: "Months",
      items: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
  },
};

const generateStatisticalReport = async () => {
  const response = await getDarByMonth(dataInputs.value.month);
  console.log(response);
};
</script>
<style lang=""></style>
