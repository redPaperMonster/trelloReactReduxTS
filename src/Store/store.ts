import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import columnReducer from './columnSlice';
import cardReducer from './cardSlice';
import commentReducer from './commentSlice';
import userReducer from './userSlice';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfigColumns = {
    key: 'columnData',
    storage,
}

const persistConfigCards = {
    key: 'cardsData',
    storage,
}

const persistConfigComments = {
    key: 'commentsData',
    storage,
}
const persistConfigUserName = {
    key: 'userName',
    storage,
}

const persistedColumnReducer = persistReducer(persistConfigColumns, columnReducer);
const persistedCardReducer = persistReducer(persistConfigCards, cardReducer);
const persistedCommentReducer = persistReducer(persistConfigComments, commentReducer);
const persistedUserReducer = persistReducer(persistConfigUserName, userReducer);

export const store = configureStore({
    reducer: {
        columns: persistedColumnReducer,
        cards: persistedCardReducer,
        comments: persistedCommentReducer,
        userName: persistedUserReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;

export type ColumnType = {
    id: string,
    title: string,
    description: string
}
export type ColumnDataType = {
    data: Array<ColumnType>
}

export type CardType = {
    id: string,
    columnId: string,
    title: string,
    description: string
}

export type CardDataType = {
    data: Array<CardType>
}

export type CommentType = {
    id: string,
    cardId: string,
    text: string,
    author: string
}

export type CommentDataType = {
    data: Array<CommentType>
}

