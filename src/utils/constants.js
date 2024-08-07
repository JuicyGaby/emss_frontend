import { ref } from "vue";
export const inputRules = {
  required: (v) => !!v || "This field is required",
  invalidNegative: (v) => v >= 0 || "Invalid negative inputs",
  contactNumber: (v) => {
    if (!v) return true;
    if (v.length !== 11) return "Contact Number must be 11 digits";
    return true;
  },
  characters: (v) => v === null || v.length <= 50 || "Max 50 characters",
  textArea: (v) => {
    if (!v) return true;
    if (v.length <= 500) return true;
    return "Max 500 characters";
  },
  vselect: (v) => v.length > 0 || "This field is required",
};

// start of arrays
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
  "Early Childhood Education",
  "Primary",
  "Secondary",
  "Tertiary",
  "Vocational",
  "Post Graduate",
  "No educational attainment",
  "Not Applicable",
];
export const educationStatus = [
  "Level",
  "Graduated",
  "Ongoing",
  "Undergraduate",
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
export const area = [
  { title: "IP - Basic Ward", value: 1 },
  { title: "IP - Non-Basic Ward", value: 2 },
  { title: "OP", value: 3 },
  { title: "ER/ED", value: 4 },
];
export const caseType = [
  { title: "New Case", value: 1 },
  { title: "Old Case", value: 2 },
  { title: "Case Closed", value: 3 },
];
export const contributor_type = [
  "Indirect - POS",
  "Indirect - Sponsored",
  "Indirect - 4PS",
  "Indirect - PWD",
  "Indirect - SC",
  "Direct - Lifetime",
  "Direct - Employed",
  "Direct - Voluntary",
  "Direct - OFW",
  "Non Phic",
];
export const mssClassification = [
  { title: "Financially Capable / Capacitated - A", value: "A" },
  { title: "Financially Capable / Capacitated - B", value: "B" },
  { title: "Financially Incapable / Incapacitated - C1", value: "C1" },
  { title: "Financially Incapable / Incapacitated - C2", value: "C2" },
  { title: "Indigent - C3", value: "C3" },
  { title: "Indigent - D", value: "D" },
];

export const sourceOfReferral2 = [
  { title: "Government Hospital", value: 1 },
  { title: "Private Hospitals/Clinics", value: 2 },
  { title: "Politicians", value: 3 },
  { title: "Media", value: 4 },
  { title: "Health Care Team", value: 5 },
  { title: "NGO’s/Private Welfare Agencies", value: 6 },
  { title: "Government Agencies", value: 7 },
  { title: "Walk – in", value: 8 },
  { title: "Others", value: 9 },
];
export const sourceOfReferral = [
  "Government Hospital",
  "Private Hospitals/Clinics",
  "Politicians",
  "Media",
  "Health Care Team",
  "NGO’s/Private Welfare Agencies",
  "Government Agencies",
  "Walk – in",
  "Others",
];
export const sectoralGroupingList = [
  "SC",
  "PWD",
  "Solo Parent",
  "IP",
  "BHW",
  "Brgy. Officials",
  "Veterans",
  "Health Worker",
  "Government Worker",
  "Custodial",
  "Artisanal Fisherfolk",
  "Farmer and Landless Rural Worker",
  "Urban Poor",
  "Formal Labor & Migrant Workers",
  "Workers in Informal Sectors",
  "Victims of Disaster & Calamity",
  "None",
  "Not Applicable",
  "Others",
];
export const livingArrangement = [
  "owned",
  "shared",
  "rent",
  "homeless",
  "institutionalized",
  "others",
];
export const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const sex = ["Male", "Female"];

// end of arrays
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

// export const BASE_URL = "http://172.16.1.46:4000";
export const BASE_URL = "http://localhost:3000";
