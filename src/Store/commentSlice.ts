import { createSlice } from '@reduxjs/toolkit';
import { RootState, CommentType, CommentDataType } from '.';

const initialState: CommentDataType = {
    data: [
        { id: `1234-TODO`, cardId: `11`, text: "dddd", author: "somebody" }]
}

export const commentSlice = createSlice({
    name: 'commentState',
    initialState,
    reducers: {
        updateComment: (state, action) => {
            const newData = state.data.map((i: CommentType) => {
                if (i.id === action.payload.id) {
                    return action.payload;
                }
                return i;
            })
            return { ...state, data: newData }

        },
        addComment: (state, action) => {
            return { ...state, data: [...state.data, action.payload] }
        },
        deleteComment: (state, action) => {
            return { ...state, data: [...state.data.filter((i: CommentType) => i.id !== action.payload)] }
        },
    },
});

export const { updateComment, addComment, deleteComment } = commentSlice.actions;

export const selectComments = (state: RootState) => state.comments.data;

export default commentSlice.reducer;

