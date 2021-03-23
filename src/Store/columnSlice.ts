import { createSlice, current } from '@reduxjs/toolkit';
import { ColumnType, RootState } from './store';

//`${new Date().getTime()}-TODO`
const initialState: Array<ColumnType> = [
    { id: `1234-TODO`, title: "TODO from store", description: "TODO column" },
    { id: `4567-In Progress`, title: "In Progress", description: "in progress column" },
    { id: `8910-Testing`, title: "Testing", description: "testing column" },
    { id: `3123123-Done`, title: "Done", description: "done column" }]

export const columnSlice = createSlice({
    name: 'column',
    initialState,
    reducers: {
        updateColumn: (state, action) => {
            const newState = state.map((i) => {
                if (i.id === action.payload.id) {
                    return action.payload;
                }
                return i;
            })
            return newState;
        },
        addColumn: (state, action) => {
            return [...state, action.payload]
        },
        deleteColumn: (state, action) => {
            return state.filter((i) => i.id !== action.payload)
        }

    },
});

export const { updateColumn, addColumn, deleteColumn } = columnSlice.actions;

export const selectColumns = (state: RootState) => state.columns;

export default columnSlice.reducer;
