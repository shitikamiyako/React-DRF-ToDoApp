// ルーティングとApiのエンドポイントを置く

// export const ROOT_URL = 'http://localhost:8000/user/api/';
const ROOT_URL = "http://localhost:8000/";
const ROOT_URL_TWITTER = "http://127.0.0.1:8000/";

export const AuthUrls = {
  LOGIN: `${ROOT_URL}dj-rest-auth/login/`,
  TEST: `${ROOT_URL}api/login/social/`,
  LOGIN_TWITTER_POST: `${ROOT_URL_TWITTER}dj-rest-auth/twitter/`,
  LOGIN_TWITTER: `${ROOT_URL_TWITTER}dj-rest-auth/twitter/getToken`,
  LOGIN_TWITTER_CALLBACK: `${ROOT_URL_TWITTER}dj-rest-auth/twitter/receiveRedirect`,
  LOGOUT: `${ROOT_URL}dj-rest-auth/logout/`,
  SIGNUP: `${ROOT_URL}dj-rest-auth/registration/`,
  // CHANGE_PASSWORD: `${ROOT_URL}dj-rest-auth/password/change/`,
  // RESET_PASSWORD: `${ROOT_URL}dj-rest-auth/password/reset/`,
  // RESET_PASSWORD_CONFIRM: `${ROOT_URL}dj-rest-auth/password/reset/confirm/`,
  // USER_ACTIVATION: `${ROOT_URL}dj-rest-auth/registration/verify-email/`,
  GET_USER_DATA: `${ROOT_URL}dj-rest-auth/user/`,
  GET_USER_LIST: `${ROOT_URL}user/api/readonly`,
};
