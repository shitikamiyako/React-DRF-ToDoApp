import { useSelector, useDispatch } from 'react-redux';
import { selectProgress, selectShow, selectMessage, startProgress, stopProgress } from '../store/spinnerSlice';

// Sliceで定義した状態管理に対して、useSelectorとuseDispatchを使用したいので関数コンポーネントにし、実際に使うコンポーネントで呼び出せるようにする
function useSpinner() {
    // Sliceで定義したアクションをdispatchで呼び出せるようにする
    const dispatch = useDispatch();

    return {
        // Sliceで定義したstateをuseSelectorを用いて取得
        progress: useSelector(selectProgress),
        show: useSelector(selectShow),
        dialogMessage: useSelector(selectMessage),
        // 以下はアクションの呼び出し
        startProgress: (dialogMessage) => dispatch(startProgress({ dialogMessage })),
        stopProgress: () => dispatch(stopProgress()),
    };
}

export default useSpinner;