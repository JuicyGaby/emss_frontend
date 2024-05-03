import { BASE_URL } from "@/utils/constants";

const getUserByToken = async (token) => {
  const API_URL = "http://172.16.1.39:3014/api/get_user";
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      authorization: token,
    },
  });
  const data = await response.json();
  return data.user;
};

const getUsersBySystemId = async () => {
  const emssSystemId = 20;
  const API_URL = `http://vsmmcsys2:3010/api/get_system_access?id=${emssSystemId}`;
  const response = await fetch(API_URL, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};
const userLogin = async (reqBody) => {
  const API_URL = "http://172.16.1.39:3014/api/system_login";
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
  const data = await response.json();
  return data;
};
const getUserAccessRightsById = async (id) => {
  const API_URL = `${BASE_URL}/emss/getUserAccessRightsById/${id}`;
  const response = await fetch(API_URL, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export {
  getUserByToken,
  userLogin,
  getUserAccessRightsById,
  getUsersBySystemId,
};
