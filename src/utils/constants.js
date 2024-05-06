import { ref } from "vue";
export const inputRules = {
  required: (v) => !!v || "This field is required",
  invalidNegative: (v) => v >= 0 || "Invalid negative inputs",
  characters: (v) => v === null || v.length <= 50 || "Max 50 characters",
  textArea: (v) => v === null || v.length <= 500 || "Max 500 characters",
  vselect: (v) => v.length > 0 || "This field is required",
};

// arrays
export const departments = [
  "Center for Behavioral Sciences",
  "Women and Child Protection Unit",
  "Internal Medicine",
  "Male Surgery",
  "Female Surgery",
  "Gynecology",
  "Pedia Surgery",
  "EENT",
  "Opthalmology",
  "Pedia Non-Communicable",
  "Pedia Communicable",
  "Adult Communicable",
  "Obstetrics",
  "Neo-Intensive Care Unit",
  "Newborn",
  "Orthopedic",
  "Renal/PDU",
  "Acute Respiratory Infection Department",
  "Family Medicine",
  "Primary Care",
  "Wellness",
  "Cardiology",
  "Urology",
  "Plastic Surgery",
  "Oncology",
  "Cervical Cancer Prevention",
  "Program for Young Parents",
  "Rehabilitation Center",
  "Neurosurgery (Brain & Spine Center)",
  "Intensive Care Unit",
  "Critical Care Unit",
  "Others",
];
export const educationalAttainment = [
  "Undergraduate",
  "Elementary",
  "High School",
  "Vocational",
  "College",
  "Post Graduate",
  "None",
  "Not Applicable",
];
export const educationStatus = [
  "Level",
  "Graduated",
  "Ongoing",
  "Stopped",
  "Not Applicable",
];
export const civilStatus = [
  "Child",
  "Single",
  "Married",
  "Widowed",
  "Divorced",
  "Annulled",
  "Separated Legally",
  "Separated In-Fact",
  "Common Law Partner - Opposite Sex",
  "Common Law Partner - Same Sex",
];
export const area = [
  { title: "IP - Basic Ward", value: 1 },
  { title: "IP - Non-Basic Ward", value: 2 },
  { title: "OP", value: 3 },
  { title: "ER/ED", value: 4 },
];
export const religion = [
  "Roman Catholic",
  "Iglesia Ni Cristo",
  "Islam",
  "Born Again Christian",
  "Seventh Day Adventist",
  "Aglipay",
  "Iglesia Filipina Independiente",
  "Bible Baptist Church",
  "United Church of Christ in the Philippines",
  "Church of Christ",
  "Jehovah's Witness",
  "Buddhist",
  "Hindu",
  "Atheist",
  "Agnostic",
];
export const sex = ["Male", "Female"];

export const snackBarData = ref({
  isVisible: false,
  text: "",
  type: "",
});
export const dialogData = ref({
  text: "",
  type: "",
  buttonText: "",
  buttonColor: "",
  itemId: "",
});

// functions
export const validateForm = async (formType) => {
  const form = await formType.value.validate();
  if (!form.valid) return false;
  return true;
};
export const handleSnackBar = (type, text) => {
  return {
    isVisible: true,
    type: type,
    text: text,
  };
};

// export const API_URL = "http://172.16.1.46:4000";
export const API_URL = "http://localhost:3000";
export const BASE_URL = "http://localhost:3000";
