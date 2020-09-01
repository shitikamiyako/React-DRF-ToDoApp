// 行うアクションを定数として定義する
const setToken = 'SET_TOKEN';

const initialState = {
    jwt: ''
}

// reducer
export default function reducer(state = initialState, action) {
    // switchとcaseで定義したアクションによって処理を切り替える
    switch (action.type) {
        case SET_TOKEN:
            return {
                localStorage.setItem('REACT_TOKEN_AUTH', data.token);
            }
        default:
            return state;
    }
}

// action-creator
export function setToken(token) {
    return { type: SET_TOKEN };
}

