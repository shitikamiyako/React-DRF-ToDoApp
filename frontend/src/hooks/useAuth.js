import { useSelector, useDispatch } from 'react-redux';
import { selectAuthenticated, loginUser, logoutUser } from '../Store/authSlice';

// Sliceで定義した状態管理に対して、useSelectorとuseDispatchを使用したいので関数コンポーネントにし、実際に使うコンポーネントで呼び出せるようにする
function useAuth() {
    // Sliceで定義したアクションをdispatchで呼び出せるようにする
    const dispatch = useDispatch();

    return {
        // Sliceで定義したstate(progress)をuseSelectorを用いて取得
        authenticated: useSelector(selectAuthenticated),
        // 以下はアクションの呼び出し
        loginUser: () => dispatch(loginUser()),
        logoutUser: () => dispatch(logoutUser()),
    };
}

export default useAuth;