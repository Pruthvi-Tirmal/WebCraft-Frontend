
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "Users",
    initialState: {
        state: []
    },
    reducers: {
        setData: (state, action) => {
            return [
                ...action.payload
            ]
        }
    }
})

export const usersActions = userSlice.actions;
export const userReducer = userSlice.reducer; 