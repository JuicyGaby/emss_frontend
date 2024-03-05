<template lang="">
    <v-container class="d-flex flex-column justify-center align-center">
        <!-- 1st page -->
        <div class="pages" v-show="page == 1">
            <v-row>
                <v-col class="d-flex flex-column">
                    <!-- 1st row -->
                    <div class="d-flex ga-2">
                        <v-text-field
                        v-for="(value, key) in step1.firstRow"
                        :key="key"
                        :label="value.label"
                        :type="value.type"
                        v-model="personalDataInputs[key]"
                        variant="outlined"
                        style="min-width: 300px;"
                        ></v-text-field>
                    </div>
                    <!-- 2nd row -->
                    <div class="d-flex ga-2">
                        <v-text-field
                        v-for="(value, key) in step1.secondRow"
                        :key="key"
                        :label="value.label"
                        :type="value.type"
                        v-model="personalDataInputs[key]"
                        variant="outlined"
                        style="min-width: 300px;"
                        ></v-text-field>
                    </div>
                    <!-- 3rd row -->
                    <div class="d-flex ga-2">
                        <v-text-field
                        v-for="(value, key) in step1.thirdRow"
                        :key="key"
                        :label="value.label"
                        :type="value.type"
                        v-model="personalDataInputs[key]"
                        variant="outlined"
                        style="min-width: 300px;"
                        ></v-text-field>
                    </div>
                    <!-- 4th row -->
                    <div class="d-flex justify-space-between align-center ga-2">
                        <v-autocomplete
                        label="Sex"
                        :items="step1.fourthRow.sex.options"
                        v-model="personalDataInputs.sex"
                        variant="outlined"
                        ></v-autocomplete>
                        <v-autocomplete
                        label="Gender Identity"
                        :items="step1.fourthRow.gender.options"
                        v-model="personalDataInputs.gender"
                        variant="outlined"
                        ></v-autocomplete>
                    </div>
                    <!-- 5th row -->
                    <div class="d-flex ga-2">
                        <v-text-field
                        v-for="(value, key) in step1.fifthRow"
                        :key="key"
                        :label="value.label"
                        :type="value.type"
                        v-model="personalDataInputs[key]"
                        variant="outlined"
                        style="min-width: 300px;"
                        ></v-text-field>
                    </div>
                </v-col>
            </v-row>
        </div>
        <!-- 2nd page -->
        <div class="pages" v-show="page == 2">
            <v-card-title sub-title>
                Permanent Address
            </v-card-title>
            <v-autocomplete
                label="Region"
                variant="outlined"
                :items="options.regions"
                item-title="regDesc"
                item-value="regCode"
                v-model="personalDataInputs.address.permanent.region"
            ></v-autocomplete>
            <v-autocomplete
                label="Province"
                variant="outlined"
                :items="options.provinces"
                item-title="provDesc"
                item-value="provCode"
                v-model="personalDataInputs.address.permanent.province"
            >
            </v-autocomplete>
            <v-autocomplete
                label="Municipality"
                variant="outlined"
                :items="options.municipality"
                item-title="citymunDesc"
                item-value="citymunCode"
                v-model="personalDataInputs.address.permanent.municipality"
            >
            </v-autocomplete>
            <v-autocomplete
                label="Baranggay"
                variant="outlined"
                :items="options.barangay"
                item-title="brgyDesc"
                item-value="brgyCode"
                v-model="personalDataInputs.address.permanent.baranggay"
            >
            </v-autocomplete>
        </div>
        <!-- 3rd page -->
        <div class="pages" v-show="page == 3">
            <v-card-title sub-title>
                Temporary Address
            </v-card-title>
            <v-autocomplete
                label="Region"
                variant="outlined"
                :items="options.regions"
                item-title="regDesc"
                item-value="regCode"
                v-model="personalDataInputs.address.temporary.region"
            ></v-autocomplete>
            <v-autocomplete
                label="Province"
                variant="outlined"
                :items="options.provinces"
                item-title="provDesc"
                item-value="provCode"
                v-model="personalDataInputs.address.temporary.province"
            >
            </v-autocomplete>
            <v-autocomplete
                label="Municipality"
                variant="outlined"
                :items="options.municipality"
                item-title="citymunDesc"
                item-value="citymunCode"
                v-model="personalDataInputs.address.temporary.municipality"
            >
            </v-autocomplete>
            <v-autocomplete
                label="Baranggay"
                variant="outlined"
                :items="options.barangay"
                item-title="brgyDesc"
                item-value="brgyCode"
                v-model="personalDataInputs.address.temporary.baranggay"
            >
            </v-autocomplete>
        </div>
        <!-- 4th page -->
        <div class="pages" v-show="page == 4">
            <v-row>
                <v-col class="d-flex flex-column">
                    <!-- row 1 -->
                    <div class="d-flex ga-2">
                        <v-autocomplete
                            :items="step3.firstRow.civil_status.options"
                            v-model="personalDataInputs.civil_status"
                            :label="step3.firstRow.civil_status.label"
                            variant="outlined"
                            style="min-width: 300px;"
                        ></v-autocomplete>
                        <v-autocomplete
                            :items="step3.firstRow.living_arrangement.options"
                            v-model="personalDataInputs.living_arrangement"
                            :label="step3.firstRow.living_arrangement.label"
                            variant="outlined"
                            style="min-width: 300px;"
                        ></v-autocomplete>
                    </div>
                    <!-- row 2 -->
                    <div class="d-flex align-center">
                        <v-autocomplete
                            :items="step3.secondRow.education.options"
                            v-model="personalDataInputs.education"
                            :label="step3.secondRow.education.label"
                            variant="underlined"
                            style="min-width: 300px;"
                            class=""
                        ></v-autocomplete>
                        <v-radio-group inline v-model="personalDataInputs.educationStatus">
                            <v-radio
                                v-for="option in step3.secondRow.educationStatus.options"
                                :key="option.value"
                                :label="option.text"
                                :value="option.value"
                            ></v-radio>
                        </v-radio-group>
                    </div>
                    <!-- row 3 -->
                    <div class="d-flex ga-2">
                        <v-text-field
                            v-for="(value, key) in step3.thirdRow"
                            :key="key"
                            :label="value.label"
                            :type="value.type"
                            v-model="personalDataInputs[key]"
                            variant="outlined"
                            style="min-width: 300px;"
                        ></v-text-field>
                    </div>
                    <!-- row 4 -->
                    <div class="d-flex align-center">
                        <v-text-field
                        v-model="personalDataInputs.phMembershipNumber"
                        :label="step3.fourthRow.phMembershipNumber.label"
                        :type="step3.fourthRow.phMembershipNumber.type"
                        variant="outlined"
                        style="min-width: 300px;"
                        ></v-text-field>
                        <v-radio-group inline v-model="personalDataInputs.phMembership">
                            <v-radio
                                v-for="option in step3.fourthRow.phMembership.options"
                                :key="option.value"
                                :label="option.text"
                                :value="option.value"
                            ></v-radio>
                        </v-radio-group>
                    </div>
                </v-col>
            </v-row>
        </div>
        <v-btn color="success" @click="dataDebugger">text</v-btn>
    </v-container>
    <v-pagination :length="totalPages" v-model="page"></v-pagination>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { getRegions, getProvince, getMunicipality, getBarangay } from "@/api/assesment-tool"

const emit = defineEmits([
  "personalData",
])


const totalPages = ref(4);
const page = ref(1);
const regions = ref({});

onMounted(async () => {
    options.value.regions = await getRegions(); 
});

// create a watch for personalDataInputs.address.permanent.region if theres a change


const personalDataInputs = ref({
    last_name: "",
    first_name: "",
    middle_name: "",
    age: "",
    contact_number: "",
    birth_date: "",
    place_of_birth: "",
    sex: null,
    gender: null,
    religion: "",
    nationality: "",
    civil_status: null,
    living_arrangement: null,
    education: null,
    educationStatus: null,
    occupation: "",
    monthly_income: "",
    phMembershipNumber: "",
    phMembership: null,
    address: {
        permanent: {
            region: "",
            province: "",
            district: "",
            municipality: "",
            baranggay: "",
            purok: "",
        },
        temporary: {
            region: "",
            Province: "",
            district: "",
            municipality: "",
            baranggay: "",
            purok: "",
        }
    }
})


const inputRules = {
    firstName: [(v) => !!v || "Username is required"],
}

const educationOptions = [
    'Early Childhood Education', 'Primary', 'Secondary', 'Tertiary', 'Vocational', 'Post Graduate', 'No Educational Attainment'
];

const civilStatusOptions = [
    'Single', 'Married', 'Widowed', 'Divorced', 'Annulled', 'Common Law OS', 'Common Law SS',
    'Separated Legally', 'Separated De Facto'
];

const livingArrangementOptions = [
    'owned', 'shared', 'rent', 'homeless', 'institutionalized', 'others'
];

const genderOptions = [
    'Masculine', 'Feminine', 'LGBTQIA+', 'Other'
];


const step1 = {
    firstRow: {
        last_name: {
            label: "Last Name",
            type: "text",
            data: ref(""),
            rules: inputRules.firstName
        },
        first_name: {
            label: "First Name",
            type: "text",
            data: ref(""),
        },
        middle_name: {
            label: "Middle Name",
            type: "text",
            data: ref(""),
        }
    },
    secondRow: {
        age: {
            label: "Age",
            type: "number",
            data: ref(""),
        },
        contact_number: {
            label: "Contact Number",
            type: "number",
            data: ref(""),
        }
    },
    thirdRow: {
        birth_date: {
            label: "Date of Birth",
            type: "date",
            data: ref(""),
        },
        place_of_birth: {
            label: "Place of Birth",
            type: "text",
            data: ref(""),
        }
    },
    fourthRow: {
        sex: {
            label: "Sex",
            options: ["Male", "Female"],
            data: ref(null),
        },
        gender: {
            label: "Gender Identity",
            options: genderOptions,
            data: ref(null),
        }
    },
    fifthRow: {
        religion: {
            label: "Religion",
            type: "text",
            data: ref(""),
        },
        nationality: {
            label: "Nationality",
            type: "text",
            data: ref(""),
        }
    },
}
const step2 = {
    address: {
        permanent: {
        label: "Permanent Address",
        type: "text",
        data: ref({
            region: "",
            Province: "",
            District: "",
            Municipality: "",
            Baranggay: "",
            Purok: "",
        }),
        },
        temporary: {
            label: "Temporary Address",
            type: "text",
            data: ref({
                region: "",
                Province: "",
                District: "",
                Municipality: "",
                Baranggay: "",
                Purok: "",
            }),
        }
    }
}
const step3 = {
    firstRow: {
        civil_status: {
            label: "Civil Status",
            options: civilStatusOptions,
            data: ref(null),
        },
        living_arrangement: {
            label: "Living Arrangement",
            options: livingArrangementOptions,
            data: ref(null),
        }
    },
    secondRow: {
        education: {
            label: "Education",
            options: educationOptions,
            data: ref(null),
        },
        educationStatus: {
            label: "Education Status",
            options: [
                { text: "Level", value: "Level" },
                { text: "Graduated", value: "Graduated" },
                { text: "Ongoing", value: "Ongoing" },
            ],
            data: ref(null),
        }
    },
    thirdRow: {
        occupation: {
            label: "Occupation",
            type: "text",
            data: ref(""),
        },
        monthly_income: {
            label: "Monthly Income",
            type: "number",
            data: ref(""),
        },
    },
    fourthRow: {
        phMembershipNumber: {
            label: "PhilHealth Membership Number",
            type: "text",
            data: ref(""),
        },
        phMembership: {
            label: "PhilHealth Membership",
            options: [
                { text: "Direct Contributor", value: "Direct Contributor" },
                { text: "Indirect Contributor", value: "Indirect Contributor" },
            ],
            data: ref(null),
        }
    }
}


const watchAddressChange = (addressType, key, apiCall, optionKey) => {
    watch(() => personalDataInputs.value.address[addressType][key], async (newVal) => {
        options.value[optionKey] = await apiCall(newVal);
    });
};
watchAddressChange('permanent', 'region', getProvince, 'provinces');
watchAddressChange('permanent', 'province', getMunicipality, 'municipality');
watchAddressChange('permanent', 'municipality', getBarangay, 'barangay');
watchAddressChange('temporary', 'region', getProvince, 'provinces');
watchAddressChange('temporary', 'province', getMunicipality, 'municipality');
watchAddressChange('temporary', 'municipality', getBarangay, 'barangay');


const options = ref({
    regions: [],
    provinces: [],
    municipality: [],
    barangay: [],
    purok: [],

})


const dataDebugger = () => {
    console.log(personalDataInputs.value);
}

</script>
<style lang="css">
.pages {
    min-width: 700px;
    min-height: 400px;
}
</style>