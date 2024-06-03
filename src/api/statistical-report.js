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
export const getSocialWorkerMonthlyDarEntries = async (body) => {
  const API_URL = `${BASE_URL}/emss/get-social-worker-monthly-dar-entries`;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const { darEntries, report } = await response.json();
  return { darEntries, report };
};
export const getSocialWorkerMonthlySwaEntries = async (body) => {
  const API_URL = `${BASE_URL}/emss/get-social-worker-monthly-swa-entries`;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const { swaEntries, report } = await response.json();
  return { swaEntries, report };
};
export const getMonthlyStatisticalReport = async (body) => {
  const API_URL = `${BASE_URL}/emss/get-monthly-statistical-report`;
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
export const generateSourceOfReferralDarItems = async (body) => {
  const API_URL = `${BASE_URL}/emss/generate-source-of-referral-dar-items`;
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
