"use client"

import { createSlice } from "@reduxjs/toolkit"
import music_data from "../../../../tracks.json";
import { MusicMetaDataType } from "./currMusictype";

const initialState: MusicMetaDataType[] = music_data as MusicMetaDataType[];

const AllMusicSlice = createSlice({
    name: "all_music",
    initialState,
    reducers: {},
});

export default AllMusicSlice.reducer