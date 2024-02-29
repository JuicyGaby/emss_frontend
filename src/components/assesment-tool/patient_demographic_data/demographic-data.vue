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
                        density="compact"
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
                        density="compact"
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
                        :items="genderOptions"
                        variant="outlined"
                        ></v-autocomplete>
                        <v-autocomplete
                        label="Gender Identity"
                        :items="genderOptions"
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
        <div class="input-field" v-show="page == 2">
            <v-row>
                <v-col class="d-flex flex-column">
                    <v-text-field
                        v-for="input in addressInputs" :key="input"
                        :label="input"
                        type="text"
                        v-model="address.permanent.data[input]"
                        variant="outlined"
                        density="compact"
                    ></v-text-field>
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

const demographice_data_fields = {
    first: {
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
        },
        birth_date: {
            label: "Date of Birth",
            type: "date",
            data: ref(""),
        },
        age: {
            label: "Age",
            type: "number",
            data: ref(""),
        },
    },
    second: {
        contact_number: {
            label: "Contact Number",
            type: "number",
            data: ref(""),
        },
        place_of_birth: {
            label: "Place of Birth",
            type: "text",
            data: ref(""),
        },
    },
    third: {
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
    fourth: {
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
        phMembershipNumber: {
            label: "PhilHealth Membership Number",
            type: "text",
            data: ref(""),
        },

    }

}

const addressInputs = [
    'region', 'Province', 'District', 'Municipality', 'Baranggay', 'Purok'
];

const address = {
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

const radioInputs = {
    sex: {
        data: ref(null),
        options: [
            { text: "Male", value: "Male" },
            { text: "Female", value: "Female" },
        ]
    },
    educationStatus: {
        data: ref(null),
        options: [
            { text: "Level", value: "Level" },
            { text: "Graduated", value: "Graduated" },
            { text: "Ongoing", value: "Ongoing" },
        ]
    },
    phMembership: {
        data: ref(null),
        options: [
            { text: "Direct Contributor", value: "Direct Contributor" },
            { text: "Indirect Contributor", value: "Indirect Contributor" },
        ]
    }
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
const dropDownInputs = {
    civil_status: {
        label: "Civil Status",
        data: ref(null),
        options: civilStatusOptions
    },
    living_arrangement: {
        label: "Living Arrangement",
        data: ref(null),
        options: livingArrangementOptions
    },
    education: {
        label: "Education",
        data: ref(null),
        options: educationOptions
    },
    gender: {
        label: "Gender Identity",
        data: ref(null),
        options: genderOptions
    }
}

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
    firstRow: {},
    secondRow: {},
    thirdRow: {},
}
const step3 = {
    firstRow: {},
    secondRow: {},
    thirdRow: {},
    fourthRow: {},
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