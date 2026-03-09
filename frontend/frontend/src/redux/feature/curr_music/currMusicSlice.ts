"use client"

import { MusicMetaDataType } from "@/redux/feature/curr_music/currMusictype";
import { createSlice } from "@reduxjs/toolkit"

const initialState: MusicMetaDataType = {
    index: 0,
    id: '',
    title: '',
    duration: 0,
    streamUrl: '',
    artworkUrl: '',
    localAudio: '',
    localArt: '',
}

const CurrMusicSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        selectCurrMusic: (state, action) => {
            return action.payload;
        }
    },
});

export const { selectCurrMusic } = CurrMusicSlice.actions;
export default CurrMusicSlice.reducer