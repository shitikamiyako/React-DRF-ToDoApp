import { useSelector, useDispatch } from 'react-redux';
import { addTask, getTaskList, toggleTask, selectTasks } from '../store/todosSlice';

function useTodo() {
    const dispatch = useDispatch();

    return {
        // todos: useSelector(selectTodo),
        tasks: useSelector(selectTasks),
        getTaskList: (tasks) => dispatch(getTaskList(tasks)),
        toggleTask: () => dispatch(toggleTask()),
    };
}

export default useTodo;