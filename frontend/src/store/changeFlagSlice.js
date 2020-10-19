import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    taskListChange: false,
    category_filter_apply: false,
    is_Completed_filter_apply: false
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

        TaskListChangeReset: (state) => {
            return {
                ...state,
                taskListChange: false,
            }
        },

        Apply_Category_filter: (state) => {
            return {
                ...state,
                category_filter_apply: true,

            }
        },

        Apply_is_Completed_filter: (state) => {
            return {
                ...state,
                is_Completed_filter_apply: true,

            }
        },

        Unfiltered: (state) => {
            return {
                ...state,
                category_filter_apply: false,
                is_Completed_filter_apply: false,
            }
        },



    }
})

export const { addTask, TaskListChangeReset, Apply_Category_filter, Apply_is_Completed_filter, Unfiltered } = changeFlagSlice.actions
export const selectTaskListChange = ({ flag }) => flag.taskListChange
export const selectCategoryFilterApply = ({ flag }) => flag.category_filter_apply
export const selectIs_Completed_FilterApply = ({ flag }) => flag.is_Completed_filter_apply
export default changeFlagSlice.reducer
