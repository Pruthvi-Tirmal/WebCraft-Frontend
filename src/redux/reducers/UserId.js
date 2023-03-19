import { createSlice } from "@reduxjs/toolkit";

const UserIdSlice = createSlice({
    name: "userId",
    initialState: {
        state: ""
    },
    reducers: {
        setId: (state, { payload }) => {
            state = payload
        }
    }
})

export const userIdActions = UserIdSlice.actions;
export const userIdReducer = UserIdSlice.reducer;