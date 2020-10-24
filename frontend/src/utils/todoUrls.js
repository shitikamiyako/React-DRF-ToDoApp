// ルーティングとApiのエンドポイントを置く

// export const ROOT_URL = 'http://localhost:8000/user/api/';
const ROOT_URL = "http://localhost:8000/";

export const TodoUrls = {
    GET_TASK_LIST: `${ROOT_URL}todo/api/`,
    GET_TASK_LIST_Last: `${ROOT_URL}todo/api/?page=`,
    GET_TASK_READ_ONLY_LIST: `${ROOT_URL}todo/api/readonly`,
    GET_TASK_READ_ONLY_LIST_SEARCH: `${ROOT_URL}todo/api/readonly?owner__username=`,
    TEST_URL: `/todo/api/readonly?owner__username=`,
    GET_TASK: `${ROOT_URL}todo/api/`,
    ADD_TASK: `${ROOT_URL}todo/api/`,
    PUT_TASK: `${ROOT_URL}todo/api/`,
    PATCH_TASK: `${ROOT_URL}todo/api/`,
    REACTION: `${ROOT_URL}todo/api/action/`,
    GET_CATEGORY_LIST: `${ROOT_URL}category/api/`,
    ADD_CATEGORY: `${ROOT_URL}category/api/`,
    DELETE_CATEGORY: `${ROOT_URL}category/api/`,
    // TOKEN_VERIFY: `${ROOT_URL}dj-rest-auth/token/verify/`,
    // TOKEN_REFRESH: `${ROOT_URL}dj-rest-auth/token/refresh/`,
    // RESET_PASSWORD: `${ROOT_URL}dj-rest-auth/password/reset/`,
    // RESET_PASSWORD: `${ROOT_URL}dj-rest-auth/password/reset/`,
    // RESET_PASSWORD_CONFIRM: `${ROOT_URL}dj-rest-auth/password/reset/confirm/`,
    // USER_ACTIVATION: `${ROOT_URL}dj-rest-auth/registration/verify-email/`,
    // USER_PROFILE: `${ROOT_URL}dj-rest-auth/user/`
};