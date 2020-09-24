// LoginFormのonsubmitに用意する関数案
// asyncとaxiosで非同期処理する
// try-catchじゃなくて、await/catchにしたほうが良さそうだけどとりあえず前者でまずはハンドリングする

import axios from "axios";
import { AuthUrls } from "./urls";
import history from "./historyUtils";
import Cookies from 'js-cookie';


const loginUrl = AuthUrls.LOGIN;
var csrftoken = Cookies.get('csrftoken');
console.log(csrftoken);
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.withCredentials = true

export default (async function Login(values) {
    try{
        await axios.post(loginUrl, values);
        dispatch(loginUser());
        history.push("/");
    } catch(error) {
        const processedError = processServerError(error.response.data);
        throw new


    }
})


// 例外処理

function processServerError(error) {

// 定義するべきエラー
    // csrftokenなしエラー
    // username、passwordエラーはnonFieldErrorsをresponseからキャッチしたらログイン失敗のエラーメッセージをコンポーネントにパスしたい



// function submit(values) {
//     return sleep(1000).then(() => { // simulate server latency
//         if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
//             throw new SubmissionError({
//                 username: 'User does not exist',
//                 _error: 'Login failed!',
//             });
//         } else if (values.password !== 'redux-form') {
//             throw new SubmissionError({
//                 password: 'Wrong password',
//                 _error: 'Login failed!',
//             });
//         } else {
//             window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
//         }
//     });
// }

// export default submit;