<template lang="">
  <div>
    <div>
      <h3>Initial interview</h3>
      <v-container>
        <v-row>
          <v-col>
            <div>
              <p>Interview Date-Time: {{props.dataReceived.interviewData.interview_date_time}}</p>
            </div>
            <div>
              <p>Admission Date-Time:</p>
            </div>
          </v-col>
          <v-col>
            <div>
              <p>Basic Ward:</p>
            </div>
            <div>
              <p>Non-Basic Ward:</p>
            </div>
          </v-col>
          <v-col>
            <div>
              <p>Health Record No:</p>
            </div>
            <div>
              <p>MSWD No:</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div>
      <h3>Patient's Data</h3>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  dataReceived: Object,
});
</script>
<style lang=""></style>
