<template lang="">
  <div class="" style="width: 100%">
    <v-card width="100%" height="100vh">
      <v-toolbar color="secondary" class="d-flex align-center ga-5 px-5">
        <v-icon size="x-large">mdi-book-edit</v-icon>
        <h1>Electronic Malasakit Social Service System</h1>
      </v-toolbar>
      <v-card-text>
        <h1 class="text-h4">
          {{ currentDate }} - {{ moment().format("dddd") }}
        </h1>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import moment from "moment";
import { userAuthentication } from "@/stores/session";
import { validateForm } from "@/utils/constants";
import { getDarByMonth } from "@/api/daily-activity-report";
import { ref, onMounted } from "vue";
const authentication = userAuthentication();
const userFullName = `${authentication.user.fname} ${authentication.user.lname}`;
const currentDate = moment().format("MMMM Do YYYY");
</script>
<style lang=""></style>
