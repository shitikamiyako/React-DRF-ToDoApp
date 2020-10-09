import { createSlice } from '@reduxjs/toolkit'

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}
const filterSlice = createSlice({
    name: 'visibilityFilters',
    initialState: VisibilityFilters.SHOW_ALL,
    reducers: {
        setVisibilityFilter(state, action) {
            return action.payload
        }
    }

})

export const { setVisibilityFilter } = filterSlice.actions
export const selectFilter = ({ visibilityFilter }) => visibilityFilter.state
export default filterSlice.reducer