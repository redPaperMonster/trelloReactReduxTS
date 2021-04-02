import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import columnReducer from './columnSlice';
import cardReducer from './cardSlice';
import commentReducer from './commentSlice';
import userReducer from './userSlice';
import { persistStore, persistReducer } from 'redux-persist'
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

const persistedUserReducer = persistReducer(persistConfigUserName, userReducer);
const persistedColumnReducer = persistReducer(persistConfigColumns, columnReducer);
const persistedCardReducer = persistReducer(persistConfigCards, cardReducer);
const persistedCommentReducer = persistReducer(persistConfigComments, commentReducer);

export const store = configureStore({
    reducer:
    {
        userName: persistedUserReducer,
        columns: persistedColumnReducer,
        cards: persistedCardReducer,
        comments: persistedCommentReducer,

    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;


