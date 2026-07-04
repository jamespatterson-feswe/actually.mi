const err = 'Error:';
const succ = 'Success:';
const missing = 'Missing 1 or more required fields:';

export const fields = '$fields$';

export const PATHS = {
  auth: '/auth',
  login: '/login',
  logout: '/logout',
  mi: '/mi',
  register: '/register',
};

export const STATIC_CONTENT = {
  PRISMA_CODES: {
    EXISTS: 'P2002',
  },
  LOGIN: {
    POST: {
      failure: `${err} Failed to query user data.`,
      incorrect_pw: `${err} Incorrect password.`,
      missing_fields: `${err} Login was unsuccessful. ${missing} ${fields}`,
      no_credentials: `${err} There is no user information for the login credentials.`,
      success: `${succ} Login was successful.`,
    },
  },
  LOGOUT: {
    POST: {
      success: `${succ} Logged out successfully.`,
    },
  },
  MI: {
    GET: {
      failure: `${err} There was an issue fetching the user data.`,
      not_found: `${err} No user data was found.`,
      success: `${succ} User was found.`,
    },
    PUT: {
      failure: `${err} There was an issue updating the user data.`,
      malicious_email: `${err} Malicious email attempted, try again.`,
      not_found: `${err} No user data was found to be able to update.`,
      same_pw: `${err} Cannot use the same password as previously entered.`,
      success: `${succ} User was updated.`,
      update_failure: `${err} There was an issue updating the user, try again.`,
    },
  },
  REGISTER: {
    POST: {
      failure: `${err} Failed to register user.`,
      invalid_email: `${err} Not a valid email address`,
      malicious_email: `${err} Malicious email attempted, try again.`,
      missing_fields: `${err} Failed to register user. ${missing} ${fields}`,
      user_exists: `${err} User already exists in system.`,
    },
  },
};
