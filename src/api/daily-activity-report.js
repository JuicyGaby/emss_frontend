const createDailyActivityReport = async (body) => {
  const API_URL = `http://localhost:3000/daily-activity-report`;
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
const darCreatePatient = async (body) => {
  const API_URL = `http://localhost:3000/dar-create-patient`;
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

const getDailyActivityReport = async () => {
  const API_URL = `http://localhost:3000/daily-activity-report`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const getDailyActivityReportById = async (id) => {
  const API_URL = `http://localhost:3000/daily-activity-report/${id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const updateDailyActivityReport = async (body) => {
  const API_URL = `http://localhost:3000/daily-activity-report`;
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
//  DAR NOTES

const createDarNote = async (body) => {
  const API_URL = `http://localhost:3000/dar-notes`;
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
const getDarNotes = async (id) => {
  const API_URL = `http://localhost:3000/user-dar-notes/${id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const getDarNoteById = async (id) => {
  const API_URL = `http://localhost:3000/dar-notes/${id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const updateDarNote = async (body) => {
  const API_URL = `http://localhost:3000/dar-notes`;
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
const deleteDarNote = async (id) => {
  const API_URL = `http://localhost:3000/dar-notes/${id}`;
  const response = await fetch(API_URL, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

// SWA
const createSwaItem = async (body) => {
  const API_URL = `http://localhost:3000/swa`;
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
const getSwaServices = async () => {
  const API_URL = `http://localhost:3000/swa`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

const getDarSwa = async () => {
  const API_URL = `http://localhost:3000/dar_swa`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const getDarSwaId = async (id) => {
  const API_URL = `http://localhost:3000/dar_swa/${id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const getDarSwaByDate = async (date) => {
  const API_URL = `http://localhost:3000/dar_swa_by_date/${date}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

// SWA NOTES

const createSwaNote = async (body) => {
  const API_URL = `http://localhost:3000/swa-notes`;
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
const getSwaNotes = async (id) => {
  const API_URL = `http://localhost:3000/swa-notes/${id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const getSwaNoteById = async (id) => {
  const API_URL = `http://localhost:3000/swa-note/${id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const updateSwaNote = async (body) => {
  const API_URL = `http://localhost:3000/swa-note`;
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
const deleteSwaNote = async (id) => {
  const API_URL = `http://localhost:3000/swa-note/${id}`;
  const response = await fetch(API_URL, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};
const createSwaServicesItem = async (body) => {
  const API_URL = `http://localhost:3000/swa-services`;
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

// DAR SERVICES
const getDarServices = async () => {
  const API_URL = `http://localhost:3000/dar-services`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const getDarServicesByDarId = async (id) => {
  const API_URL = `http://localhost:3000/dar-services/${id}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const createDarServicesItem = async (body) => {
  const API_URL = `http://localhost:3000/dar-services`;
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

export {
  createDailyActivityReport,
  getDailyActivityReport,
  getDailyActivityReportById,
  updateDailyActivityReport,
  getDarServices,
  darCreatePatient,
  createDarNote,
  getDarNotes,
  getDarNoteById,
  updateDarNote,
  deleteDarNote,
  getDarServicesByDarId,
  createDarServicesItem,
  createSwaItem,
  getSwaServices,
  getDarSwa,
  getDarSwaId,
  createSwaNote,
  getSwaNotes,
  getSwaNoteById,
  updateSwaNote,
  deleteSwaNote,
  createSwaServicesItem,
  getDarSwaByDate,
};
