import { createSlice } from '@reduxjs/toolkit'

export const VisibilityFilters = {
    // // すべて表示
    // SHOW_ALL: 'SHOW_ALL',
    // // 完了したタスクを表示
    // SHOW_COMPLETED: 'SHOW_COMPLETED',
    // // 未完了のタスクを表示
    // SHOW_ACTIVE: 'SHOW_ACTIVE',
    // // 追加日でソート
    // SORT_ADD_DATETIME: 'SORT_ADD_DATETIME',
    // // 優先順位でソート
    // SORT_TASK_ORDER: 'SORT_TASK_ORDER',
    // // カテゴリーでソート
    // SORT_CATEGORY: 'SORT_CATEGORY',

    all_tasks: [],
    filter_tasks: []

}
const filterSlice = createSlice({
    name: 'filter',
    initialState: [],
    reducers: {
        setVisibilityFilter(state, action) {
            return action.payload
        },

        setAllTasks:(state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },

        resetTasks: () => {
            return []
        },

        setCategoryFilterTasks(state, action) {
            return {
                filter_tasks: [
                    ...state,
                    ...action.payload
                ]
            };
        }
    }

})

export const { setVisibilityFilter, setAllTasks, resetTasks, setCategoryFilterTasks } = filterSlice.actions
export const selectAll_tasks = ({ filter }) => filter
export const selectFilterTasks = ({ filter }) => filter.filter_tasks
export default filterSlice.reducer