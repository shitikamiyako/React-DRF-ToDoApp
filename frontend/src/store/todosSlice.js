import { createSlice } from '@reduxjs/toolkit'


// addとtoggleの部分は書き直し予定
const todosSlice = createSlice({
    name:'todos',
    initialState: [],
    reducers: {
        getTaskList: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },


        resetTaskList: () => {
            return []
        },

        toggleTask(state, action) {
            const task = state.find(task => task.id === action.payload)
            if (task) {
                task.is_Completed = !task.is_Completed
            }
        }
    }
})

export const { getTaskList, resetTaskList, toggleTask } = todosSlice.actions
// const { tasks } = useSelector(state => state.tasks)のuseSelectorの引数に相当するものを書きたい
export const selectTasks = ({ todos }) => todos
// export const selectTodo = ({ todos }) => todos.test
export default todosSlice.reducer
