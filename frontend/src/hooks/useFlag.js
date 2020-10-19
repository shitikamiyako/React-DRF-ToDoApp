import { useSelector, useDispatch } from 'react-redux';
import { addTask, TaskListChangeReset, Apply_Category_filter, Apply_is_Completed_filter, Unfiltered, selectCategoryFilterApply, selectIs_Completed_FilterApply,  selectTaskListChange } from '../store/changeFlagSlice';

function useTodo() {
    const dispatch = useDispatch();

    return {
        category_filter_apply: useSelector(selectCategoryFilterApply),
        is_Completed_filter_apply: useSelector(selectIs_Completed_FilterApply),
        taskListChange: useSelector(selectTaskListChange),
        Apply_Category_filter: () => dispatch(Apply_Category_filter()),
        Apply_is_Completed_filter: () => dispatch(Apply_is_Completed_filter()),
        Unfiltered: () => dispatch(Unfiltered()),
        addTask: () => dispatch(addTask()),
        TaskListChangeReset: () => dispatch(TaskListChangeReset()),
    };
}

export default useTodo;