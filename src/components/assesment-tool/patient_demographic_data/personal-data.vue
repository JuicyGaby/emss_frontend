<template lang="">
    <v-form>
        <v-container>
            <v-container>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field
                            v-for="(inputField, key) in demographice_data_fields.first"
                            :key="key"
                            v-model="inputField.data.value"
                            :label="inputField.label"
                            :type="inputField.type"
                            :rules="inputField.rules"
                            density="compact"
                        ></v-text-field>
                        <v-radio-group inline v-model="radioInputs.sex.data.value" label="Sex">
                            <v-radio
                            v-for="(option, index) in radioInputs.sex.options"
                            :key="index"
                            :label="option.text"
                            :value="option.value"
                            ></v-radio>
                        </v-radio-group>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field
                            v-for="(inputField, key) in demographice_data_fields.second"
                            :key="key"
                            v-model="inputField.data.value"
                            :label="inputField.label"
                            :type="inputField.type"
                            density="compact"
                        ></v-text-field>
                        <!-- create autocomplete with the label of gender -->
                        <v-autocomplete
                        label="Gender Identity"
                        :items="genderOptions"
                        ></v-autocomplete>
                        <v-text-field
                            v-for="(inputField, key) in demographice_data_fields.third"
                            :key="key"
                            v-model="inputField.data.value"
                            :label="inputField.label"
                            :type="inputField.type"
                            density="compact"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                    <v-autocomplete
                        label="Civil Status"
                        :items="civilStatusOptions"
                    ></v-autocomplete>
                    <v-autocomplete
                        label="Living Arrangement"
                        :items="livingArrangementOptions"
                    ></v-autocomplete>
                    <div class="">
                        <v-autocomplete
                        label="Educational Attainment"
                        :items="educationOptions"
                        ></v-autocomplete>
                        <v-radio-group 
                        label="Educational Status"
                        inline v-model="radioInputs.educationStatus.data.value">
                            <v-radio
                            v-for="(option, index) in radioInputs.educationStatus.options"
                            :key="index"
                            :label="option.text"
                            :value="option.value"

                            ></v-radio>
                        </v-radio-group>
                    </div>

                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field
                            v-for="(inputField, key) in demographice_data_fields.fourth"
                            :key="key"
                            v-model="inputField.data.value"
                            :label="inputField.label"
                            :type="inputField.type"
                            density="compact"
                        ></v-text-field>
                        <v-radio-group inline v-model="radioInputs.phMembership.data.value">
                            <v-radio 
                            v-for="(option, index) in radioInputs.phMembership.options"
                            :key="index"
                            :label="option.text"
                            :value="option.value"
                            ></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col cols="12" md="4">
                        <div v-for="(addressType, key) in address" :key="key">
                            <h3>{{ addressType.label }}</h3>
                            <v-text-field
                            v-for="(input, index) in addressInputs"
                            :key="index"
                            v-model="addressType.data.value[input]"
                            :label="input"
                            density="compact"
                            ></v-text-field>
                        </div>
                </v-col>                
                </v-row>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-btn @click="createInterview" color="success">Create Interview</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
    </v-form>
</template>
<script setup>
import { ref, computed } from "vue";
const inputRules = {
    firstName: [(v) => !!v || "First Name is required"],
    lastName: [(v) => !!v || "Last Name is required"],
}
const demographice_data_fields = {
    first: {
        last_name: {
            label: "Last Name",
            type: "text",
            data: ref(""),
            rules: inputRules.lastName
        },
        first_name: {
            label: "First Name",
            type: "text",
            data: ref(""),
            rules: inputRules.firstName
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