import { useSelector, useDispatch } from 'react-redux';
import { addTask, TaskListChangeReset, selectTaskListChange } from '../store/changeFlagSlice';

function useTodo() {
    const dispatch = useDispatch();

    return {
        // todos: useSelector(selectTodo),
        taskListChange: useSelector(selectTaskListChange),
        addTask: () => dispatch(addTask()),
        TaskListChangeReset: () => dispatch(TaskListChangeReset()),
    };
}

export default useTodo;