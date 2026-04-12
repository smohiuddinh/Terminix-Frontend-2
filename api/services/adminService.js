import api from "../axios";
import API_ROUTE from "../endpoints";

export const addContactRequest = (data) =>
  api.post(API_ROUTE.admin.addContacts, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: api.defaults.headers.common.Authorization,
    },
    timeout: 30000,
  });

export const addUserRequest = (data) =>
  api.post(API_ROUTE.admin.addUser, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: api.defaults.headers.common.Authorization,
    },
    timeout: 30000,
  });

const buildQueryString = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return query ? `&${query}` : "";
};

export const getAllContactsRequest = (params = {}) =>
  api.get(
    `${API_ROUTE.admin.getAllContacts}?${buildQueryString(params)}`,
    { withCredentials: true }
  );

export const getAllIntOrgRequest = (params = {}) =>
  api.get(
    `${API_ROUTE.admin.getAllIntOrg}?${buildQueryString(params)}`,
    { withCredentials: true }
  );

export const getAllUserRequest = (params = {}) =>
  api.get(
    `${API_ROUTE.user.getAllUsers}?${buildQueryString(params)}`,
    { withCredentials: true }
  );

