import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageNationNext: "",
  pageNationPrevious: "",
  pageNationLastNumber: 0,
  pageNationCurrent: 1,
  contentsAllCount: 0,
  // get_task_listUrl
  //   items: []
};

const pageNationSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    // 次のペジネーションリクエストするためのURLを管理
    get_pageNationNext: (state, action) => {
      return {
        ...state,
        pageNationNext: action.payload,
      };
    },

    // 現在のページから見て、前のペジネーションリクエストするためのURLを管理
    get_pageNationPrevious: (state, action) => {
      return {
        ...state,
        pageNationPrevious: action.payload,
      };
    },

    // ペジネーションの数を管理する
    get_pageNationLastNumber: (state, action) => {
      return {
        ...state,
        pageNationLastNumber: action.payload,
      };
    },
    // 現在のページ番号を管理
    get_pageNationCurrent: (state, action) => {
      return {
        ...state,
        pageNationCurrent: action.payload,
      };
    },

    // データの取得数を管理
    get_contentsAllCount: (state, action) => {
      return {
        ...state,
        contentsAllCount: action.payload,
      };
    },

    // State Reset
    resetItem: () => {
      return initialState;
    },
  },
});

export const {
  get_pageNationNext,
  get_pageNationPrevious,
  get_pageNationLastNumber,
  get_pageNationCurrent,
  get_contentsAllCount,
  resetItem,
} = pageNationSlice.actions;
export const selectPageNationNext = ({ page }) => page.pageNationNext;
export const selectPageNationPrevious = ({ page }) => page.pageNationPrevious;
export const selectPageNationLastNumber = ({ page }) =>
  page.pageNationLastNumber;
export const selectPageNationCurrent = ({ page }) => page.pageNationCurrent;
export const selectPageNationAllCount = ({ page }) => page.pageNationAllCount;
export default pageNationSlice.reducer;
