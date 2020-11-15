import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: [],
    reducers: {
        // setVisibilityFilter(state, action) {
        //     return action.payload
        // },

        setAllTasks:(state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },

        resetTasks: () => {
            return []
        },

        // setCategoryFilterTasks(state, action) {
        //     return {
        //         filter_tasks: [
        //             ...state,
        //             ...action.payload
        //         ]
        //     };
        // }
    }

})

export const { setAllTasks, resetTasks } = filterSlice.actions
export const selectAll_tasks = ({ filter }) => filter
// export const selectFilterTasks = ({ filter }) => filter.filter_tasks
export default filterSlice.reducer