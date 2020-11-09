// ルーティングとApiのエンドポイントを置く

// export const ROOT_URL = 'http://localhost:8000/user/api/';
const ROOT_URL = "http://localhost:8000/";

export const AuthUrls = {
  LOGIN: `${ROOT_URL}dj-rest-auth/login/`,
  LOGOUT: `${ROOT_URL}dj-rest-auth/logout/`,
  SIGNUP: `${ROOT_URL}dj-rest-auth/registration/`,
  // CHANGE_PASSWORD: `${ROOT_URL}dj-rest-auth/password/change/`,
  // RESET_PASSWORD: `${ROOT_URL}dj-rest-auth/password/reset/`,
  // RESET_PASSWORD_CONFIRM: `${ROOT_URL}dj-rest-auth/password/reset/confirm/`,
  // USER_ACTIVATION: `${ROOT_URL}dj-rest-auth/registration/verify-email/`,
  GET_USER_DATA: `${ROOT_URL}dj-rest-auth/user/`,
  GET_USER_LIST: `${ROOT_URL}user/api/readonly`,
  GET_LIST_USER_GROUP: `${ROOT_URL}user/api/UserGroup/`,
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


    // メンバー追加、及び削除の際のURLの書き方例
    // const testURl = AuthUrls.JOIN_USER_GROUP + id + '/'

//     const testAction = async () => {
//       console.log(id)
//       const data = {
//           'id': id,
//       }
//       const response = await axios.post(testURl, data)
//       console.log(response);
//       addMember()
//   }