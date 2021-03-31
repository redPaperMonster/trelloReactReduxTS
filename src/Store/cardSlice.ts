import { columnActions } from './columnSlice';
import { createSlice } from '@reduxjs/toolkit';
import { CardDataType } from '.';
import { CardType } from './store';

const initialState: CardDataType = {
    data: []
}

export const cardSlice = createSlice({
    name: 'cardState',
    initialState,
    reducers: {
        updateCard: (state, action) => {
            state.data = state.data.map((i: CardType) => {
                if (i.id === action.payload.id) {
                    return action.payload;
                }
                return i;
            })
        },
        addCard: (state, action) => {
            state.data.push(action.payload);
        },
        deleteCard: (state, action) => {
            state.data = state.data.filter((i: CardType) => i.id !== action.payload)
        },
        deleteCardByColumnId: (state, action) => {
            state.data = state.data.filter((i: CardType) => i.columnId !== action.payload)
        }
    },
    extraReducers: {
        [columnActions.deleteColumn.type]: (state, action) => {
            state.data = state.data.filter((i: CardType) => i.columnId !== action.payload)
        },
        [columnActions.deleteColumn.type]: (state, action) => {
            cardSlice.caseReducers.deleteCardByColumnId(state, action)
        },
    }
});
export const cardActions = cardSlice.actions;

export default cardSlice.reducer;
