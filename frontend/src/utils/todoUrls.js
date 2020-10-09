// ルーティングとApiのエンドポイントを置く

// export const ROOT_URL = 'http://localhost:8000/user/api/';
const ROOT_URL = "http://localhost:8000/";

export const TodoUrls = {
    GET_TASK_LIST: `${ROOT_URL}todo/api/`,
    ADD_TASK: `${ROOT_URL}todo/api/`,
    TOKEN_VERIFY: `${ROOT_URL}dj-rest-auth/token/verify/`,
    TOKEN_REFRESH: `${ROOT_URL}dj-rest-auth/token/refresh/`,
    // RESET_PASSWORD: `${ROOT_URL}dj-rest-auth/password/reset/`,
    // RESET_PASSWORD_CONFIRM: `${ROOT_URL}dj-rest-auth/password/reset/confirm/`,
    // USER_ACTIVATION: `${ROOT_URL}dj-rest-auth/registration/verify-email/`,
    // USER_PROFILE: `${ROOT_URL}dj-rest-auth/user/`
};