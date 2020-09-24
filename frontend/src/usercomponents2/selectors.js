// storeの中のstateのうちAuthのstateだけ参照したい


import { createSelector } from "reselect";
import store from '../store/index';
const authenticatedSelector = (state) => state.authenticated;
const tokenSelector =  (state) => state.token;

const getstore = store;

export const getAuthState = createSelector
(
    [authenticatedSelector, tokenSelector],
    getstore.getState(authenticatedSelector, tokenSelector)

);