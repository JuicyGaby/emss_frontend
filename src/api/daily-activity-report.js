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
export {
  createDailyActivityReport,
  getDailyActivityReport,
  getDailyActivityReportById,
  updateDailyActivityReport,
};
