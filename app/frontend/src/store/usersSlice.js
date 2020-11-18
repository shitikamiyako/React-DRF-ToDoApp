import { createSlice } from '@reduxjs/toolkit'


// addとtoggleの部分は書き直し予定
const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        getUserList: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },


        resetUserList: () => {
            return []
        },

        // toggleTask(state, action) {
        //     const task = state.find(task => task.id === action.payload)
        //     if (task) {
        //         task.is_Completed = !task.is_Completed
        //     }
        // }
    }
})

export const { getUserList, resetUserList,  } = usersSlice.actions
export const selectUsers = ({ users }) => users
export default usersSlice.reducer