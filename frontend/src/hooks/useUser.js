import { useSelector, useDispatch } from 'react-redux';
import { getUserList, resetUserList, selectUsers} from '../Store/usersSlice';

function useUser() {
    const dispatch = useDispatch();

    return {
        users: useSelector(selectUsers),
        getUserList: (users) => dispatch(getUserList(users)),
        resetUserList: () => dispatch(resetUserList()),
    };
}

export default useUser;