import { createSlice } from '@reduxjs/toolkit'

let nextTodoId = 0

const initialState = {
    taskListChange: false,
};

// addとtoggleの部分は書き直し予定
const changeFlagSlice = createSlice({
    name:'flag',
    initialState,
    reducers: {

        addTask: (state) => {
            return {
                ...state,
                taskListChange: true,

            }
        },

        TaskListChangeReset: (state) => {
            return {
                ...state,
                taskListChange: false,
            }
        },



    }
})

export const { addTask, TaskListChangeReset } = changeFlagSlice.actions
export const selectTaskListChange = ({ flag }) => flag.taskListChange
export default changeFlagSlice.reducer
