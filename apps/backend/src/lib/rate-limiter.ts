import rateLimit from 'express-rate-limit';

const error = 'Error: Too many attempts, please try again later.';
const message = { statusDesc: error };
const standardHeaders = true;
const legacyHeaders = false;
const windowMs = 15 * 60 * 1000;

const limiter = {
  windowMs,
  message,
  standardHeaders,
  legacyHeaders,
};

/** strict limiter for authentication routes | prevents brute force, bot registration, and malicious activity */
export const authenticationLimiter = rateLimit({
  ...limiter,
  max: 10,
});

/** less strict limiter for users already registered for basic api usage */
export const minimalLimiter = rateLimit({
  ...limiter,
  max: 200,
});
