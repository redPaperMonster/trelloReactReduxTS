import { userActions } from './userSlice';
import { createSlice, nanoid } from '@reduxjs/toolkit';
import { ColumnDataType, ColumnType } from '../Utils';

const initialState: ColumnDataType = {
    data: [
        { id: nanoid(), title: "TODO", description: "TODO column" },
        { id: nanoid(), title: "In Progress", description: "in progress column" },
        { id: nanoid(), title: "Testing", description: "testing column" },
        { id: nanoid(), title: "Done", description: "done column" }]
}

export const columnSlice = createSlice({
    name: 'columnState',
    initialState,
    reducers: {
        updateColumn: (state, action) => {
            state.data = state.data.map((i: ColumnType) => {
                if (i.id === action.payload.id) {
                    return action.payload;
                }
                return i;
            })
        },
        addColumn: (state, action) => {
            state.data.push(action.payload);
        },
        deleteColumn: (state, action) => {
            state.data = state.data.filter((i: ColumnType) => i.id !== action.payload)
        },
    },
    extraReducers: {
        [userActions.resetStore.type]: (state) => {
            state.data = initialState.data;
        },
    }
});

export const columnActions = columnSlice.actions;

export default columnSlice.reducer;
