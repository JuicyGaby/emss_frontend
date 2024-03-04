<template>
  <v-container>
    <v-row>
      <v-col>
        <v-stepper alt-labels :items="stepperItems">
          <template v-slot:item.1>
            <v-card class="text-center" title="Interview" flat>
              <v-card-text class="">
                <interview :interviewBody="interviewBody" @interviewData="handleInterviewData"></interview>
              </v-card-text>
            </v-card>
          </template>
          <template v-slot:item.2>
            <v-card class="text-center" flat>
              <v-card-text class="">
                <demographic_data></demographic_data>
              </v-card-text>
            </v-card>
          </template>
          <template v-slot:item.3>
            <v-card title="Step Three" flat>...</v-card>
          </template>
        </v-stepper>
        <p>{{ dataReceived.interview }}</p>
      </v-col>
    </v-row>
  </v-container>

  <!-- <demographic_data ></demographic_data> -->
</template>
<script setup>
import { ref, reactive, toRefs, onMounted } from 'vue'
import interview from '@/components/assesment-tool/interview.vue'
import demographic_data from '@/components/assesment-tool/patient_demographic_data/demographic-data.vue'
import moment from 'moment'

const { authentication, user } = defineProps(['authentication', 'user'])


const dataReceived = {
  interview: ref({}),
  demographicData: ref({})
};

const interviewBody = reactive({
  interview_date_time: moment().format("YYYY-MM-DDTHH:mm"),
    admission_date_time: "",
    basic_ward: "",
    nonbasic_ward: "sdfsd",
    health_record_number: "",
    mswd_number: "",
    source_of_referral: "",
    referring_party: "",
    address: "",
    contact_number: "",
    informant: "",
    relationship_to_patient: "",
    informant_contact_number: "",
    informant_address: "",
})
const demographicDataBody = ref({})




const handleInterviewData = data => {
  dataReceived.interview.value = data
}


const stepperItems = [
  'Interview',
  'Demographic Data',
  'Submit'
]

</script>