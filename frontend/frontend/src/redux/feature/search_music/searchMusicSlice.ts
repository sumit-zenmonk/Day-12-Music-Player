"use client"

import { createSlice } from "@reduxjs/toolkit"
import { MusicSearchType } from "./searchMusictype";

const initialState: MusicSearchType = {
    name: ""
}

const SearchMusicSlice = createSlice({
    name: "searchMusic",
    initialState,
    reducers: {
        searchMusic: (state, action) => {
            state.name = action.payload
        }
    },
});

export const { searchMusic } = SearchMusicSlice.actions;
export default SearchMusicSlice.reducer