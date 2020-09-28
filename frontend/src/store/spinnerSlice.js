import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    progress: false,
    show: false,
    dialogMessage: "テストメッセージです"
};

export const spinnerSlice = createSlice({
    name: 'spinner',
    initialState,
    reducers: {
        startProgress(state, action) {
            return {
                ...state, progress: true, show: true, dialogMessage: action.payload.dialogMessage
            }
        },
        stopProgress(state) {
            return {
                ...state, progress: false, show: false, dialogMessage: ""
            }
        },
    },
});

// 上記Reducerのactionのexport
export const { startProgress, stopProgress } = spinnerSlice.actions;
// 現在のprogressの状態を取得するSelectorのexport
export const selectProgress = ({ spinner }) => spinner.progress;
export const selectShow = ({ spinner }) => spinner.show;
export const selectMessage = ({ spinner }) => spinner.dialogMessage;
// Reducerのexport
export default spinnerSlice.reducer;


