const interview = async (body) => {
  const API_URL = "http://localhost:3000/interview";
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
  const API_URL = `http://localhost:3000/interview/${patient_id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const updateInterview = async (patient_id, body) => {
  console.log(patient_id, body);
  const API_URL = `http://localhost:3000/interview/${patient_id}`;
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log("updated", data);
  return data;
};

// * family composition
const getFamilyComposition = async (patient_id) => {
  const API_URL = `http://localhost:3000/family-composition/${patient_id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const createFamilyMember = async (body) => {
  const API_URL = "http://localhost:3000/family-composition";
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
const getFamilyInfo = async (patient_id) => {
  const API_URL = `http://localhost:3000/family-info/${patient_id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const updateFamilyMember = async (body) => {
  const API_URL = "http://localhost:3000/family-composition";
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
}




// * ph address

const getRegions = async () => {
  const API_URL = "http://localhost:3000/region";
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const getProvince = async (regionCode) => {
  const API_URL = `http://localhost:3000/province/${regionCode}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const getMunicipality = async (provinceCode) => {
  const API_URL = `http://localhost:3000/municipality/${provinceCode}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const getBarangay = async (municipalityCode) => {
  const API_URL = `http://localhost:3000/barangay/${municipalityCode}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

const updatePatientAddress = async (body) => {
  const API_URL = "http://localhost:3000/address";
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
  // interview
  interview,
  getInterview,
  updateInterview,
  // address
  getRegions,
  getProvince,
  getMunicipality,
  getBarangay,
  updatePatientAddress,
  // family composition
  getFamilyComposition,
  getFamilyInfo,
  createFamilyMember,
  updateFamilyMember,
};
