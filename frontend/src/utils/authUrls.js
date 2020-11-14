// ルーティングとApiのエンドポイントを置く
const ROOT_URL = "http://localhost:8000/";

export const AuthUrls = {
  LOGIN: `${ROOT_URL}dj-rest-auth/login/`,
  LOGOUT: `${ROOT_URL}dj-rest-auth/logout/`,
  SIGNUP: `${ROOT_URL}dj-rest-auth/registration/`,
  CHANGE_PASSWORD: `${ROOT_URL}dj-rest-auth/password/change/`,
  GET_USER_DATA: `${ROOT_URL}dj-rest-auth/user/`,
  DELETE_USER: `${ROOT_URL}user/api/`,
  GET_USER_LIST: `${ROOT_URL}user/api/readonly`,
  GET_USER_LIST_SEARCH: `${ROOT_URL}user/api/readonly?username=`,
  GET_USER_LIST_RANDOM: `${ROOT_URL}user/api/readonly_random`,
  GET_LIST_USER_GROUP: `${ROOT_URL}user/api/UserGroup/`,
  GET_LIST_USER_GROUP_JOINED: `${ROOT_URL}user/api/UserGroup_joined/`,
  CREATE_USER_GROUP: `${ROOT_URL}user/api/UserGroup_add/`,
  GET_LIST_USER_GROUP_Last: `${ROOT_URL}user/api/UserGroup/?page=`,
  GET_OR_EDIT_USER_GROUP: `${ROOT_URL}user/api/UserGroup/`,
  GET_READONLY_USER_GROUP: `${ROOT_URL}user/api/UserGroup_readonly/`,
  GET_READONLY_USER_GROUP_SEARCH: `${ROOT_URL}user/api/UserGroup_readonly?owner__username=`,
  JOIN_USER_GROUP: `${ROOT_URL}user/api/UserGroup_join/`,
  LEAVE_USER_GROUP: `${ROOT_URL}user/api/UserGroup_leave/`,
  ADD_MEMBER_USER_GROUP: `${ROOT_URL}user/api/UserGroup_memberAdd/`,
  DELETE_MEMBER__USER_GROUP: `${ROOT_URL}user/api/UserGroup_memberDelete/`,
};