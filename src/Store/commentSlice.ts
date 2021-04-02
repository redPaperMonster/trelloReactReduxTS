import { cardActions } from '.';
import { userActions } from './userSlice';
import { createSlice } from '@reduxjs/toolkit';
import { CommentDataType, CommentType } from '../Utils';

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
            //console.log(`action.payload`, action.payload)
            state.data = state.data.filter((i: CommentType) => i.cardId !== action.payload)
        },

        [userActions.resetStore.type]: (state) => {
            state.data = initialState.data;
        },
    }
});

export const commentActions = commentSlice.actions;

export default commentSlice.reducer;

