"use client"

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../feature/Auth/authSlice";
import currMusicReducer from "../feature/curr_music/currMusicSlice";
import allMusicReducer from "../feature/all_tracks/allMusicSlice";
import searchMusicReducer from "../feature/search_music/searchMusicSlice";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ['searchMusicReducer',],
};

const rootReducer = combineReducers({
    authReducer: authReducer,
    currMusicReducer: currMusicReducer,
    allMusicReducer: allMusicReducer,
    searchMusicReducer: searchMusicReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
