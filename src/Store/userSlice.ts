import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: ""
}
export const userSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {
        setUserName: (state, action) => {
            state.name = action.payload;
            return state;
        },
        resetStore: (state, action) => {
            state.name = "";
            return state;
        }
    },
}
);

export const userActions = userSlice.actions;

export default userSlice.reducer;
