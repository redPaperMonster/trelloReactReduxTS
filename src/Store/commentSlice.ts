import { cardActions, columnActions } from '.';
import { createSlice, current } from '@reduxjs/toolkit';
import { RootState, CommentType, CommentDataType } from '.';

const initialState: CommentDataType = {
    data: []
}

export const commentSlice = createSlice({
    name: 'commentState',
    initialState,
    reducers: {
        updateComment: (state, action) => {
            state.data = state.data.map((i: CommentType) => {
                if (i.id === action.payload.id) {
                    return action.payload;
                }
                return i;
            })
        },
        addComment: (state, action) => {
            state.data.push(action.payload);
        },
        deleteComment: (state, action) => {
            state.data = state.data.filter((i: CommentType) => i.id !== action.payload)
        },
    },

    extraReducers: {
        [cardActions.deleteCard.type]: (state, action) => {
            state.data = state.data.filter((i: CommentType) => i.cardId !== action.payload)
        },

        [cardActions.deleteCardByColumnId.type]: (state, action) => {
            const q = state.data.filter((i: CommentType) => i.cardId !== action.payload)
            state.data = state.data.filter((i: CommentType) => i.cardId !== action.payload)
        },
    }
});

export const commentActions = commentSlice.actions;

export default commentSlice.reducer;

