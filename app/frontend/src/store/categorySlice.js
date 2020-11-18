import { createSlice } from '@reduxjs/toolkit'

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
export const selectCategory = ({ category }) => category
export default categorySlice.reducer