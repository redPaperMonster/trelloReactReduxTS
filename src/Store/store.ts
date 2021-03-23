import { configureStore } from '@reduxjs/toolkit';
import columnReducer from './columnSlice';

export type ColumnType = {
    id: string,
    title: string,
    description: string
}

export const store = configureStore({
    reducer: {
        columns: columnReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;