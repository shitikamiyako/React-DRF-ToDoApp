// React Routerによるルーティング及び、各コンポーネントをレンダリングする最上位コンポーネント

// 基本インポート
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Axios from 'axios';

// Redux関連のインポート
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './modules';

// 各ページのコンポーネント
import Todo from "./todocomponents/todo";
import LoginPage from "./usercomponents/loginpage";

export const store = createStore(reducer);

// 各ページへのルーティング及びレンダリング指示
const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/login' component={LoginPage}/>
                    <Route exact path='/todo' component={Todo}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default App;