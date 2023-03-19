import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: 0,
}

const userNavigateSlice = createSlice({
    name: "usernavigate",
    initialState,
    reducers: {
        setMark: (state, { payload }) => {
            state.id = payload.id;
        }
    }

})

export const userNavigateActions = userNavigateSlice.actions;
export default userNavigateSlice.reducer;