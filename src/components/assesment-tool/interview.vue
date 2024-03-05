<template lang="">
  <v-container class="d-flex flex-column justify-center align-center">
    <!-- 1st page -->
    <div class="input-field" v-show="page == 1">
      <v-row>
      <v-col class="d-flex flex-column">
          <div class="d-flex ga-2">
            <v-text-field
            v-for="(field, key) in step1.firstRow"
            :key="key"
            :label="field.label"
            :type="field.type"
            variant="outlined"
            v-model="interviewInputs[key]"
            style="min-width: 300px;"
          ></v-text-field>
          </div>
          <div class="d-flex ga-2">
            <v-text-field
            v-for="(value, key) in step1.secondRow"
            :key="key"
            :label="value.label"
            :type="value.type"
            v-model="interviewInputs[key]"
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
          v-model="interviewInputs[key]"
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
            v-model="interviewInputs[key]"
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
            v-model="interviewInputs[key]"
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
              v-model="interviewInputs[key]"
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
              v-model="interviewInputs[key]"
              variant="outlined"
              style="min-width: 300px;"
            ></v-text-field>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
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


let interviewInputs = ref({
  interview_date_time: moment().format("YYYY-MM-DDTHH:mm"),
  admission_date_time: moment().format("YYYY-MM-DDTHH:mm"),
  basic_ward: "",
  nonbasic_ward: "",
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
});

watchEffect(() => {
  const interviewInputsCopy = Object.keys(interviewInputs.value).reduce((acc, key) => {
    acc[key] = interviewInputs.value[key];
    return acc;
  }, {});
  emit('interviewData', interviewInputsCopy);
});




const step1 = {
  firstRow: {
    interview_date_time: {
      label: "Interview Date and Time",
      type: "datetime-local",
    },
    admission_date_time: {
      label: "admission Date and Time",
      type: "datetime-local",
    },
  },
  secondRow: {
    basic_ward: {
      label: "Basic Ward",
      type: "text",
    },
    nonbasic_ward: {
      label: "Nonbasic Ward",
      type: "text",
    },
  },
  thirdRow: {
    health_record_number: {
      label: "Health Record Number",
      type: "text",
    },
    mswd_number: {
      label: "MSWD number",
      type: "text",
    },
  }
}

const step2 = {
  firstRow: {
    source_of_referral: {
      label: "Source of Referral",
      type: "text",
    },
    referring_party: {
      label: "Referring Party",
      type: "text",
    },
  },
  secondRow: {
    address: {
      label: "Address",
      type: "text",
      
    },
    contact_number: {
      label: "Contact Number",
      type: "number",
      
    },
  }
}

const step3 = {
  firstRow: {
    informant: {
      label: "Informant",
      type: "text",
    },
    relationship_to_patient: {
      label: "Patient Relationship",
      type: "text",
    },
  },
  secondRow: {
    informant_contact_number: {
      label: "Informant Contact Number",
      type: "number",
    },
    informant_address: {
      label: "Informant Address",
      type: "text",
    },
  }
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