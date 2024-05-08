import { BASE_URL } from "@/utils/constants";

export const generateMonthlyReport = async (body) => {
  // post
  const API_URL = `${BASE_URL}/emss/generate-monthly-report`;
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

export const getMonthlyDarEntries = async (body) => {
  const API_URL = `${BASE_URL}/emss/get-monthly-dar-entries`;
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

export const getMonthlySwaEntries = async (body) => {
  const API_URL = `${BASE_URL}/emss/get-monthly-swa-entries`;
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
