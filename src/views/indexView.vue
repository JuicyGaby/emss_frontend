<template lang="">
  <div class="display">
    <v-card width="100%" height="100vh">
      <v-toolbar color="secondary" class="d-flex align-center ga-5 px-5">
        <v-icon size="x-large">mdi-book-edit</v-icon>
        <h1>Electronic Malasakit Social Service System</h1>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <h1 class="">Welcome, {{ userFullName }}</h1>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import { userAuthentication } from "@/stores/session";
const authentication = userAuthentication();
const userFullName = `${authentication.user.fname} ${authentication.user.lname}`;
</script>
<style lang=""></style>
