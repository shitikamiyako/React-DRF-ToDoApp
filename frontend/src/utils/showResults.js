// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// export default (async function showResults(data) {
//     await sleep(500);
//     window.alert(`You submitted:\n\n${JSON.stringify(data, null, 2)}`);
// });

// import { createAsyncThunk } from '@reduxjs/toolkit';

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// export default createAsyncThunk(
//     'alerts/createAlert',
//     async (data) => {
//         dispatch(startProgress("ログイン中です"));
//         try {
//             const response = await sleep(500);
//             console.log(response);
//             const resultAction = await dispatch(createAlert())
//             if (createAlert)
//             dispatch(loginUser());
//             dispatch(createAlert({
//                 message: "ログインに成功しました",
//                 type: "success"
//             })
//             );
//             // ログイン後のリダイレクト処理
//             // history.push("/");
//         } catch (error) {
//             console.log(error);
//             dispatch(createAlert({
//                 message: "ログインに失敗しました",
//                 type: "danger"
//             })
//             );

//         } finally {
//             dispatch(stopProgress());
//         }
//         window.alert(`You submitted:\n\n${JSON.stringify(data, null, 2)}`);
//     };

// )

