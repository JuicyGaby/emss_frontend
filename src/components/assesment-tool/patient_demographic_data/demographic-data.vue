<template lang="">
    <v-container class="d-flex flex-column justify-center align-center">
        <!-- 1st page -->
        <div class="" v-show="page == 1">
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
                        v-model="value.data.value"
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
                        v-model="value.data.value.value"
                        variant="outlined"
                        style="min-width: 300px;"
                        ></v-text-field>
                    </div>
                    <div class="d-flex justify-space-between align-center ga-2">
                        <v-autocomplete
                        label="Sex"
                        :items="step1.fourthRow.sex.options"
                        v-model="step1.fourthRow.sex.data.value"
                        variant="outlined"
                        ></v-autocomplete>
                        <v-autocomplete
                        label="Gender Identity"
                        :items="step1.fourthRow.gender.options"
                        v-model="step1.fourthRow.gender.data.value"
                        variant="outlined"
                        ></v-autocomplete>
                    </div>
                    <div class="d-flex ga-2">
                        <v-text-field
                        v-for="(value, key) in step1.fifthRow"
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
        <div class="" v-show="page == 2">
            <v-row>
                <v-col class="d-flex flex-column">
                    <v-card-title secondary-title>
                        Permanent address
                    </v-card-title>
                    <v-text-field
                        v-for="input in addressInputs" :key="input"
                        :label="input"
                        type="text"
                        v-model="step2.address.permanent.data.value[input]"
                        variant="outlined"
                        style="min-width: 300px;"
                    ></v-text-field>
                </v-col>
                <v-col class="d-flex flex-column">
                    <v-card-title secondary-title>
                        Temporary address
                    </v-card-title>
                    <v-text-field
                        v-for="input in addressInputs" :key="input"
                        :label="input"
                        type="text"
                        v-model="step2.address.temporary.data.value[input]"
                        variant="outlined"
                        style="min-width: 300px;"
                    ></v-text-field>
                </v-col>
            </v-row>
        </div>
        <!-- 3rd page -->
        <div class="" v-show="page == 3">
            <v-row>
                <v-col class="d-flex flex-column">
                    <!-- row 1 -->
                    <div class="d-flex ga-2">
                        <v-autocomplete
                            :items="step3.firstRow.civil_status.options"
                            v-model="step3.firstRow.civil_status.data.value"
                            :label="step3.firstRow.civil_status.label"
                            variant="outlined"
                            style="min-width: 300px;"
                        ></v-autocomplete>
                        <v-autocomplete
                            :items="step3.firstRow.living_arrangement.options"
                            v-model="step3.firstRow.living_arrangement.data.value"
                            :label="step3.firstRow.living_arrangement.label"
                            variant="outlined"
                            style="min-width: 300px;"
                        ></v-autocomplete>
                    </div>
                    <!-- row 2 -->
                    <div class="d-flex align-center">
                        <v-autocomplete
                            :items="step3.secondRow.education.options"
                            v-model="step3.secondRow.education.data.value"
                            :label="step3.secondRow.education.label"
                            variant="underlined"
                            style="min-width: 300px;"
                            class=""
                        ></v-autocomplete>
                        <v-radio-group inline v-model="step3.secondRow.educationStatus.data.value">
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
                            v-model="value.data.value"
                            variant="outlined"
                            style="min-width: 300px;"
                        ></v-text-field>
                    </div>
                    <!-- row 4 -->
                    <div class="d-flex align-center">
                        <v-text-field
                        v-model="step3.fourthRow.phMembershipNumber.data.value"
                        :label="step3.fourthRow.phMembershipNumber.label"
                        :type="step3.fourthRow.phMembershipNumber.type"
                        variant="outlined"
                        style="min-width: 300px;"
                        ></v-text-field>
                        <v-radio-group inline v-model="step3.fourthRow.phMembership.data.value">
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
    </v-container>
    <v-pagination :length="totalPages" v-model="page"></v-pagination>
</template>
<script setup>
import { ref, computed } from "vue";


const totalPages = ref(3);
const page = ref(1);

const inputRules = {
    firstName: [(v) => !!v || "Username is required"],
}

const addressInputs = [
    'region', 'Province', 'District', 'Municipality', 'Baranggay', 'Purok'
];
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
                region: "dsfds",
                Province: "sdfsdfsdf",
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
const createInterview = () => {
    const body = {};
    for (const section in demographice_data_fields) {
        for (const field in demographice_data_fields[section]) {
            body[field] = demographice_data_fields[section][field].data.value;
        }
    }
    const addressData = {};
    for (const section in address) {
        for (const field in address[section].data.value) {
            if (!addressData[section]) {
                addressData[section] = {};
            }
            addressData[section][field] = address[section].data.value[field];
        }
    }
    console.log(body);
    console.log(addressData);
};


</script>
<style lang="">
</style>