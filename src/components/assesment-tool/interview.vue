<template lang="">
  <v-container class="d-flex flex-column justify-center align-center">
    <!-- 1st page -->
    <div class="input-field" v-show="page == 1">
      <v-row>
      <v-col class="d-flex flex-column">
          <div class="d-flex ga-2">
              <v-text-field
              v-for="(value, key) in step1.firstRow"
              :key="key"
              :label="value.label"
              :type="value.type"
              v-model="value.data.value"
              variant="outlined"
              style="min-width: 300px;"
            ></v-text-field>
          </div>
          <div class="d-flex ga-2">
            <v-text-field
            v-for="(value, key) in step1.secondRow"
            :key="key"
            :label="value.label"
            :type="value.type"
            v-model="props.interviewBody.basic_ward.value"
            variant="outlined"
            style="min-width: 300px;"
          ></v-text-field>
        </div>
        <div class="d-flex ga-2">
          <v-text-field
          v-for="(value, key) in step1.thirdRow"
          :key="key"
          :label="value.label"
          :type="value.type"
          v-model="value.data.value"
          variant="outlined"
          style="min-width: 300px;"
        ></v-text-field>
      </div>
      </v-col>
    </v-row>
    </div>
    <!-- 2nd page -->
    <div class="input-field" v-show="page == 2">
      <v-row>
        <v-col class="d-flex flex-column">
          <div class="d-flex ga-2">
            <v-text-field
            v-for="(value, key) in step2.firstRow"
            :key="key"
            :label="value.label"
            :type="value.type"
            v-model="value.data.value"
            variant="outlined"
            style="min-width: 300px;"
          ></v-text-field>
          </div>
          <div class="d-flex ga-2">
            <v-text-field
            v-for="(value, key) in step2.secondRow"
            :key="key"
            :label="value.label"
            :type="value.type"
            v-model="value.data.value"
            variant="outlined"
            style="min-width: 300px;"
          ></v-text-field>
        </div>
        </v-col>
      </v-row>
    </div>
    <!-- 3rd page -->
    <div class="input-field" v-show="page == 3">
      <v-row>
        <v-col class="d-flex flex-column">
          <div class="d-flex ga-2">
            <v-text-field
              v-for="(value, key) in step3.firstRow"
              :key="key"
              :label="value.label"
              :type="value.type"
              v-model="value.data.value"
              variant="outlined"
              style="min-width: 300px;"
            ></v-text-field>
          </div>
          <div class="d-flex ga-2">
            <v-text-field
              v-for="(value, key) in step3.secondRow"
              :key="key"
              :label="value.label"
              :type="value.type"
              v-model="value.data.value"
              variant="outlined"
              style="min-width: 300px;"
            ></v-text-field>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
  <v-btn @click="createInterview" color="success">text</v-btn>
  <v-pagination :length="totalPages" v-model="page"></v-pagination>
</template>
<script setup>
import moment from "moment";
import { reactive, ref, watchEffect} from "vue";
import { interview } from "../../api/assesment-tool";

const props = defineProps({
  interviewBody: Object,
});

const emit = defineEmits([
  "interviewData"
])




const totalPages = ref(3);
const page = ref(1);
let body = {
  interview_date_time: ref(moment().format("YYYY-MM-DDTHH:mm")),
  admission_date_time: ref(""),
  basic_ward: ref(""),
  nonbasic_ward: ref(""),
  health_record_number: ref(""),
  mswd_number: ref(""),
  source_of_referral: ref(""),
  referring_party: ref(""),
  address: ref(""),
  contact_number: ref(""),
  informant: ref(""),
  relationship_to_patient: ref(""),
  informant_contact_number: ref(""),
  informant_address: ref(""),
};
// watchEffect(() => {
//   const bodyCopy = Object.keys(body).reduce((acc, key) => {
//     acc[key] = body[key].value;
//     return acc;
//   }, {});
//   emit('interviewData', bodyCopy);
// });


const step1 = {
  firstRow: {
    interview_date_time: {
      label: "Interview Date and Time",
      type: "datetime-local",
      data: body.interview_date_time,
    },
    admission_date_time: {
      label: "admission Date and Time",
      type: "datetime-local",
      data: body.admission_date_time
    },
  },
  secondRow: {
    basic_ward: {
      label: "Basic Ward",
      type: "text",
      data: body.basic_ward,
    },
    nonbasic_ward: {
      label: "Nonbasic Ward",
      type: "text",
      data: body.nonbasic_ward,
    },
  },
  thirdRow: {
    health_record_number: {
      label: "Health Record Number",
      type: "text",
      data: body.health_record_number,
    },
    mswd_number: {
      label: "MSWD number",
      type: "text",
      data: body.mswd_number,
    },
  }
}

const step2 = {
  firstRow: {
    source_of_referral: {
      label: "Source of Referral",
      type: "text",
      data: ref(""),
    },
    referring_party: {
      label: "Referring Party",
      type: "text",
      data: ref(""),
    },
  },
  secondRow: {
    address: {
      label: "Address",
      type: "text",
      data: ref(""),
    },
    contact_number: {
      label: "Contact Number",
      type: "number",
      data: ref(""),
    },
  }
}

const step3 = {
  firstRow: {
    informant: {
      label: "Informant",
      type: "text",
      data: ref(""),
    },
    relationship_to_patient: {
      label: "Patient Relationship",
      type: "text",
      data: ref(""),
    },
  },
  secondRow: {
    informant_contact_number: {
      label: "Informant Contact Number",
      type: "number",
      data: ref(""),
    },
    informant_address: {
      label: "Informant Address",
      type: "text",
      data: ref(""),
    },
  }
};




const createInterview = async () => {
};
</script>
<style lang="css">
.reb {
  border: 1px solid red;
}

.input-field {
  min-width: 300px;
  min-height: 350px;
}
</style>