// ルーティングとApiのエンドポイントを置く
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
    GET_CATEGORY_READ_ONLY_LIST_SEARCH: `${ROOT_URL}category/api/readonly?owner__username=`,
    ADD_CATEGORY: `${ROOT_URL}category/api/`,
    DELETE_CATEGORY: `${ROOT_URL}category/api/`,
};