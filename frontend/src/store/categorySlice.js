import { createSlice } from '@reduxjs/toolkit'

// let nextTodoId = 0

// const initialState = {
//     tasks: [],
// };

// addとtoggleの部分は書き直し予定
const categorySlice = createSlice({
    name: 'category',
    initialState: [],
    reducers: {
        getCategoryList: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },


        resetCategoryList: () => {
            return []
        },

    }
})

export const { getCategoryList, resetCategoryList } = categorySlice.actions
// const { tasks } = useSelector(state => state.tasks)のuseSelectorの引数に相当するものを書きたい
export const selectCategory = ({ category }) => category
// export const selectTodo = ({ todos }) => todos.test
export default categorySlice.reducer