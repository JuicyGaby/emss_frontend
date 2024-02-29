<template>
    <v-card>
        <v-tabs v-model="tab" bg-color="secondary" dark slider-color="primary">
            <v-tab value="one">Interview</v-tab>
            <v-tab value="two">Patient Data</v-tab>
            <v-tab value="three">Item Three</v-tab>
        </v-tabs>
        <v-card-text>
            <v-window v-model="tab">
                <v-window-item value="one">
                    <interview></interview>
                </v-window-item>
                <v-window-item value="two">
                    Two
                </v-window-item>
                <v-window-item value="three">
                    Three
                </v-window-item>
            </v-window>
        </v-card-text>
    </v-card>
</template>
<script setup>




import { ref, computed } from "vue";
import interview from '@/components/assesment-tool/interview.vue'
const inputRules = {
    firstName: [(v) => !!v || "First Name is required"],
    lastName: [(v) => !!v || "Last Name is required"],
}
const tab = ref(null);

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