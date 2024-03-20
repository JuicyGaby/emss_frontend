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

export { createDailyActivityReport };
