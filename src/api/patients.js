const getPatients = async (req, res) => {
  const API_URL = "http://localhost:3000/patients";
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
  const API_URL = `http://localhost:3000/patients/${patient_id}`;
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

const createPatient = async (req, res) => {
  const API_URL = "http://localhost:3000/patients";
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
    console.log(body);
  // const API_URL = `http://localhost:3000/patients/${req.id}`;
  // const response = await fetch(API_URL, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(req),
  // });
  // const data = await response.json();
  // if (data.error) {
  //   console.log(data.error);
  // }
  // console.log(data);
  // return data;
};

export { getPatients, getPatientByID, createPatient, updatePatient };
