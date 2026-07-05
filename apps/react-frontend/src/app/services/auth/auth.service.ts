import { PATHS } from './auth.constants';

import axios from 'axios';

/**
 * @description To GET user data
 *
 * @function getCurrentUser
 * @returns { ADD_TYPE }
 */
export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await axios.get(PATHS.GET.USER, {
    withCredentials: true,
  });

  return user;
};

/**
 * @description To take user entered credentials and attempt to login the user
 *
 * @function login
 * @param { string } email A string value of a valid email addressed entered by the user
 * @param { string } password A string value of a valid password entered by the user
 * @returns { ADD_TYPE }
 */
export const login = async (email: string, password: string) => {
  const { data } = await axios.post(
    PATHS.POST.LOGIN,
    { email, password },
    {
      withCredentials: true,
    },
  );

  return data;
};

/**
 * @description To take user entered credentials and information and attempt to register the new user
 *
 * @function register
 * @param { string } username A string value of a valid username entered by the user
 * @param { string } email A string value of a valid email addressed entered by the user
 * @param { string } password A string value of a valid password entered by the user
 * @returns { ADD_TYPE }
 */
export const register = async (
  username: string,
  email: string,
  password: string,
) => {
  const { data } = await axios.post(
    PATHS.POST.REGISTER,
    { username, email, password },
    {
      withCredentials: true,
    },
  );

  return data;
};

/**
 * @description To logout the current logged in user
 *
 * @function logout
 * @returns { ADD_TYPE }
 */
export const logout = async () => {
  const { data } = await axios.post(
    PATHS.POST.LOGOUT,
    {},
    {
      withCredentials: true,
    },
  );

  return data;
};
