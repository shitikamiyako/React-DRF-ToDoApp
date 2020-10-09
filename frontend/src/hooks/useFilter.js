import { useSelector, useDispatch } from 'react-redux';
import { setVisibilityFilter, selectFilter } from '../store/filterSlice';

function useFilter () {

    const dispatch = useDispatch();

    return {
        filter: useSelector(selectFilter),
        setVisibilityFilter: () => dispatch(setVisibilityFilter()),
    };
}

export default useFilter;