import { useSelector, useDispatch } from 'react-redux';
import { createAlert, selectAlerts} from '../Store/alertSlice';
// import { setAlert, setShow, closeShow, selectOpen, selectType, selectMessage, selectAlertMessage} from '../store/alertSlice';



function useAlert() {
    const dispatch = useDispatch();

    return {
        alerts: useSelector(selectAlerts),
        // open: useSelector(selectOpen),
        // type: useSelector(selectType),
        // message: useSelector(selectMessage),
        createAlert: (alert) => dispatch(createAlert(alert)),
        // setShow: () => dispatch(setShow()),
        // closeShow: () => dispatch(closeShow()),
    };
}

export default useAlert;
