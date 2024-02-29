<template>
  <v-container>
    <v-row>
      <v-col>
        <v-stepper editable="true" alt-labels :items="stepperItems">
          <template v-slot:item.1>
            <v-card class="text-center" title="Interview" flat>
              <v-card-text class="">
                <interview></interview>
              </v-card-text>
            </v-card>
          </template>
          <template v-slot:item.2>
            <v-card class="text-center" title="Patient's Data" flat>
              <v-card-text class="">
                <demographic_data></demographic_data>
              </v-card-text>
            </v-card>
          </template>
          <template v-slot:item.3>
            <v-card title="Step Three" flat>...</v-card>
          </template>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
  <!-- <demographic_data ></demographic_data> -->
</template>
<script setup>
import { toRefs, onMounted } from 'vue'
import interview from '@/components/assesment-tool/interview.vue'
import demographic_data from '@/components/assesment-tool/patient_demographic_data/demographic-data.vue'
const { authentication, user } = defineProps(['authentication', 'user'])

const stepperItems = [
  'Interview',
  'Demographic Data',
  'Submit'
]

</script>