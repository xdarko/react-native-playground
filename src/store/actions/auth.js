import { LOGIN_ATTEMPT } from './types';

export const loginAttempt = authData => ({
  type: LOGIN_ATTEMPT,
  authData
});
