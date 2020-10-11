import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    taskListChange: false,
    taskID: null,
};

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

        // deleteTask: (state) => {
        //     return {
        //         ...state,
        //         taskListChange: true,

        //     }
        // },

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
