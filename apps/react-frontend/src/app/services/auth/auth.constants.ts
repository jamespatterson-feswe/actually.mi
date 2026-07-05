export const BASE_URL = 'http://localhost:8080';

export const PATHS = {
  GET: {
    USER: `${BASE_URL}/auth/mi`,
  },
  POST: {
    LOGIN: `${BASE_URL}/auth/login`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    REGISTER: `${BASE_URL}/auth/register`,
  },
};
