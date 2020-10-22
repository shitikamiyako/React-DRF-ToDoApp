import { useSelector, useDispatch } from 'react-redux';
import { setAllTasks, resetTasks,  selectAll_tasks } from '../store/filterSlice';

function useFilter () {

    const dispatch = useDispatch();

    return {
        all_tasks: useSelector(selectAll_tasks),
        setAllTasks: (tasks) => dispatch(setAllTasks(tasks)),
        resetTasks: () => dispatch(resetTasks()),
        // filter_tasks: useSelector(selectFilterTasks),
        // setVisibilityFilter: () => dispatch(setVisibilityFilter()),
        // setCategoryFilterTasks: () => dispatch(setCategoryFilterTasks()),
    };
}

export default useFilter;