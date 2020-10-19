import { useSelector, useDispatch } from 'react-redux';
import { setVisibilityFilter, setAllTasks, resetTasks, setCategoryFilterTasks, selectAll_tasks, selectFilterTasks } from '../store/filterSlice';

function useFilter () {

    const dispatch = useDispatch();

    return {
        all_tasks: useSelector(selectAll_tasks),
        filter_tasks: useSelector(selectFilterTasks),
        setVisibilityFilter: () => dispatch(setVisibilityFilter()),
        setAllTasks: (tasks) => dispatch(setAllTasks(tasks)),
        setCategoryFilterTasks: () => dispatch(setCategoryFilterTasks()),
        resetTasks: () => dispatch(resetTasks()),
    };
}

export default useFilter;