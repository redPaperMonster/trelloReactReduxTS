import { selectComments } from './';
import { createSlice, current } from '@reduxjs/toolkit';
import { ColumnType, RootState, CardDataType } from '.';

const initialState: CardDataType = {
    data: [
        { id: `11`, columnId: `1234-TODO`, title: "TODO from store", description: "TODO column" }]
}

export const cardSlice = createSlice({
    name: 'cardState',
    initialState,
    reducers: {
        updateCard: (state, action) => {
            const newData = state.data.map((i: ColumnType) => {
                if (i.id === action.payload.id) {
                    return action.payload;
                }
                return i;
            })
            return { ...state, data: newData }

        },
        addCard: (state, action) => {
            return { ...state, data: [...state.data, action.payload] }
        },
        deleteCard: (state, action) => {
            return { ...state, data: [...state.data.filter((i: ColumnType) => i.id !== action.payload)] }
        },
    },
});

export const { updateCard, addCard, deleteCard } = cardSlice.actions;

export const selectCards = (state: RootState) => state.cards.data;

export default cardSlice.reducer;
