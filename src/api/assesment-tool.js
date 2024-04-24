import { BASE_URL } from "@/utils/constants";

// * activity logs
const getActivityLogs = async (patient_id) => {
  console.log(patient_id);
  const API_URL = `${BASE_URL}/emss/activity-logs/${patient_id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

const interview = async (body) => {
  const API_URL = `${BASE_URL}/emss/interview`;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};
// * interview
const getInterview = async (patient_id) => {
  const API_URL = `${BASE_URL}/emss/interview/${patient_id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const createInterview = async (body) => {
  const API_URL = `${BASE_URL}/emss/interview`;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};
const updateInterview = async (patient_id, body) => {
  const API_URL = `${BASE_URL}/emss/interview/${patient_id}`;
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

// * family composition
const getFamilyComposition = async (patient_id) => {
  const API_URL = `${BASE_URL}/emss/family-composition/${patient_id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const createFamilyMember = async (body) => {
  const API_URL = `${BASE_URL}/emss/family-composition`;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};
const updateFamilyMember = async (body) => {
  const API_URL = `${BASE_URL}/emss/family-composition`;
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};
const deleteFamilyMember = async (id) => {
  const API_URL = `${BASE_URL}/emss/family-composition/${id}`;
  const response = await fetch(API_URL, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

const getFamilyInfo = async (patient_id) => {
  const API_URL = `${BASE_URL}/emss/family-info/${patient_id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

// mswd

// * ph address

const getRegions = async () => {
  const API_URL = `${BASE_URL}/emss/region`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const getProvince = async (regionCode) => {
  const API_URL = `${BASE_URL}/emss/province/${regionCode}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const getMunicipality = async (provinceCode) => {
  const API_URL = `${BASE_URL}/emss/municipality/${provinceCode}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const getBarangay = async (municipalityCode) => {
  const API_URL = `${BASE_URL}/emss/barangay/${municipalityCode}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const getPatientAddress = async (patient_id) => {
  const API_URL = `${BASE_URL}/emss/address/${patient_id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const updatePatientAddress = async (body) => {
  const API_URL = `${BASE_URL}/emss/address`;
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};
const createPatientAddress = async (body) => {
  const API_URL = `${BASE_URL}/emss/address`;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

// * mswd classification
const getMswdClassification = async (patient_id) => {
  const API_URL = `${BASE_URL}/emss/mswd-classification/${patient_id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

const createMswdClassification = async (body) => {
  const API_URL = `${BASE_URL}/emss/mswd-classification`;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

const updateMswdClassification = async (body) => {
  const API_URL = `${BASE_URL}/emss/mswd-classification`;
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};
// * monthly expenses

const getMonthlyExpenses = async (patient_id) => {
  const API_URL = `${BASE_URL}/emss/monthly-expenses/${patient_id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

const createMonthlyExpenses = async (body) => {
  const API_URL = `${BASE_URL}/emss/monthly-expenses`;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

const updateMonthlyExpenses = async (body) => {
  const API_URL = `${BASE_URL}/emss/monthly-expenses`;
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

// * medical data

const getMedicalData = async (patient_id) => {
  const API_URL = `${BASE_URL}/emss/medical-data/${patient_id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const createMedicalData = async (body) => {
  const API_URL = `${BASE_URL}/emss/medical-data`;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};
const updateMedicalData = async (body) => {
  const API_URL = `${BASE_URL}/emss/medical-data`;
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

// * health and mental health

const getHealthAndMentalHealth = async (patient_id) => {
  const API_URL = `${BASE_URL}/emss/health-and-mental-health/${patient_id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const createHealthAndMentalHealth = async (body) => {
  const API_URL = `${BASE_URL}/emss/health-and-mental-health`;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};
const updateHealthAndMentalHealth = async (body) => {
  const API_URL = `${BASE_URL}/emss/health-and-mental-health`;
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

// * discrimination
const getDiscrimination = async (patient_id) => {
  const API_URL = `${BASE_URL}/emss/discrimination/${patient_id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const createDiscrimination = async (body) => {
  const API_URL = `${BASE_URL}/emss/discrimination`;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};
const updateDiscrimination = async (body) => {
  const API_URL = `${BASE_URL}/emss/discrimination`;
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

// * safety

const getSafety = async (patient_id) => {
  const API_URL = `${BASE_URL}/emss/safety/${patient_id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const createSafety = async (body) => {
  const API_URL = `${BASE_URL}/emss/safety`;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};
const updateSafety = async (body) => {
  const API_URL = `${BASE_URL}/emss/safety`;
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

// social functioning
const getSocialFunctioning = async (patient_id) => {
  const API_URL = `${BASE_URL}/emss/social-functioning/${patient_id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const createSocialFunctioning = async (body) => {
  const API_URL = `${BASE_URL}/emss/social-functioning`;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};
const updateSocialFunctioning = async (body) => {
  const API_URL = `${BASE_URL}/emss/social-functioning`;
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};
// problems in environment
const getProblemsInEnvironment = async (patient_id) => {
  const API_URL = `${BASE_URL}/emss/problems-in-environment/${patient_id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const createProblemsInEnvironment = async (body) => {
  const API_URL = `${BASE_URL}/emss/problems-in-environment`;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};
const updateProblemsInEnvironment = async (body) => {
  const API_URL = `${BASE_URL}/emss/problems-in-environment`;
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};
export {
  getActivityLogs,
  // interview
  interview,
  getInterview,
  updateInterview,
  createInterview,
  // address
  getRegions,
  getProvince,
  getMunicipality,
  getBarangay,
  getPatientAddress,
  createPatientAddress,
  updatePatientAddress,
  // family composition
  getFamilyComposition,
  getFamilyInfo,
  createFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
  // mswd classification
  getMswdClassification,
  createMswdClassification,
  updateMswdClassification,
  // monthly expenses
  getMonthlyExpenses,
  createMonthlyExpenses,
  updateMonthlyExpenses,
  // medical data
  getMedicalData,
  createMedicalData,
  updateMedicalData,
  // health and mental health
  getHealthAndMentalHealth,
  createHealthAndMentalHealth,
  updateHealthAndMentalHealth,
  // discrimination
  getDiscrimination,
  createDiscrimination,
  updateDiscrimination,
  // safety
  getSafety,
  createSafety,
  updateSafety,
  // social functioning
  getSocialFunctioning,
  createSocialFunctioning,
  updateSocialFunctioning,
  // problems in environment
  getProblemsInEnvironment,
  createProblemsInEnvironment,
  updateProblemsInEnvironment,
};
