



const getPatients = async () => {
  const API_URL = "http://172.16.1.46:4000/emss/patients";
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.error) {
    console.log(data.error);
  }
  return data;
};

const getPatientByID = async (patient_id) => {
  const API_URL = `http://172.16.1.46:4000/emss/patients/${patient_id}`;
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.error) {
    console.log(data.error);
  }
  return data;
};

const createPatient = async (req) => {
  const API_URL = "http://172.16.1.46:4000/emss/patients";
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
  const data = await response.json();
  if (data.error) {
    console.log(data.error);
  }
  console.log(data);
  return data;
};

const updatePatient = async (body) => {
  const API_URL = `http://172.16.1.46:4000/emss/patients`;
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (data.error) {
    console.log(data.error);
  }
  console.log(data);
  return data;
};

const searchPatient = async (body) => {
  const params = new URLSearchParams(body).toString();
  const API_URL = `http://172.16.1.46:4000/emss/search-patient/${params}`;
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.error) {
    console.log(data.error);
  }
  return data;
};

export {
  getPatients,
  getPatientByID,
  createPatient,
  updatePatient,
  searchPatient,
};
