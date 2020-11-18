import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // アラートを配列にする
    alerts: [],
//   open: false,
//   type: "",
//   message: "",
};

export const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        createAlert: (state, action) => {
            return {
                ...state,
                alerts:[
                ...state.alerts,
                    { message: action.payload.message, type: action.payload.type },
                ],
            }
        },
        // setShow: (state) => {
        //     return {
        //         ...state,
        //         open: true,
        //     };
        // },
        // closeShow: (state) => {
        //     return {
        //         ...state,
        //         open: false,
        //         type: null,
        //         alertMessage: [],
        //     };
        // },
    },
    // extraReducers: builder => {
    //     builder.addCase(createAlert.pending, (state, action) => { })
    //     builder.addCase(createAlert.fulfilled, (state, action) => {
    //         state.alerts.push({
    //             message: action.payload.message,
    //             type: action.payload.type
    //         });
    //     },)
    //     builder.addCase(createAlert.rejected, (state, action) => {
    //         state.alerts.push({
    //             message: action.payload.message,
    //             type: action.payload.type
    //         });
    //     },)
    // },
});

// 上記Reducerのactionのexport
export const { createAlert } = alertSlice.actions;
// export const { setAlert, setShow, closeShow } = alertSlice.actions;
// useSelectorで使う、現在の各stateの状態を取得するSelectorのexport
// export const selectOpen = ({ alert }) => alert.open;
// export const selectType = ({ alert }) => alert.type;
export const selectAlerts = ({ notifications }) => notifications.alerts;
// export const selectMessage = ({ alert }) => alert.message;
// Reducerのexport
export default alertSlice.reducer;




    // closeAlert(state, action) {
    // return {
    //     ...state,
    //     open: false,
    //     type: "primary",
    //     alertMessage: [],
    // };
    // },
    // setAlert(state, action) {
    //   return {
    //     ...state,
    //     open: true,
    //     type: action.payload.type,
    //     alertMessage: action.payload.alertMessage,
    //   };
    // },

    // errorAlert(state, action) {
    //   return {
    //     ...state,
    //     open: true,
    //     type: 'danger',
    //     alertMessage: action.payload.alertMessage,
    //   };
    // },