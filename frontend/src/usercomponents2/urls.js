// ルーティングとApiのエンドポイントを置く

// export const ROOT_URL = 'http://localhost:8000/user/api/';
const ROOT_URL = "http://localhost:8000/";

export const AuthUrls = {
  LOGIN: `${ROOT_URL}dj-rest-auth/login/`,
  LOGOUT: `${ROOT_URL}dj-rest-auth/logout/`,
  // SIGNUP: `${ROOT_URL}dj-rest-auth/registration/`,
  // CHANGE_PASSWORD: `${ROOT_URL}dj-rest-auth/password/change/`,
  // RESET_PASSWORD: `${ROOT_URL}dj-rest-auth/password/reset/`,
  // RESET_PASSWORD_CONFIRM: `${ROOT_URL}dj-rest-auth/password/reset/confirm/`,
  // USER_ACTIVATION: `${ROOT_URL}dj-rest-auth/registration/verify-email/`,
  // USER_PROFILE: `${ROOT_URL}dj-rest-auth/user/`
};
