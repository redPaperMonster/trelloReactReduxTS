import { createSlice, current } from '@reduxjs/toolkit';
import { ColumnType, RootState, ColumnDataType } from '.';

//`${new Date().getTime()}-TODO`
const initialState: ColumnDataType = {
    data: [
        { id: `1234-TODO`, title: "TODO from store", description: "TODO column" },
        { id: `4567-In Progress`, title: "In Progress", description: "in progress column" },
        { id: `8910-Testing`, title: "Testing", description: "testing column" },
        { id: `3123123-Done`, title: "Done", description: "done column" }]
}

export const columnSlice = createSlice({
    name: 'columnState',
    initialState,
    reducers: {
        updateColumn: (state, action) => {
            console.log(`current(state)`, current(state))
            const newData = state.data.map((i: ColumnType) => {
                if (i.id === action.payload.id) {
                    return action.payload;
                }
                return i;
            })
            return { ...state, data: newData }
        },
        addColumn: (state, action) => {
            return { ...state, data: [...state.data, action.payload] }
        },
        deleteColumn: (state, action) => {
            return { ...state, data: [...state.data.filter((i: ColumnType) => i.id !== action.payload)] }
        },
    },
});

export const { updateColumn, addColumn, deleteColumn } = columnSlice.actions;

export const selectColumns = (state: RootState) => state.columns.data;

export default columnSlice.reducer;
