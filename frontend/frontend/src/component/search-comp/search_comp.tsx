"use client"
import { Box, InputAdornment, TextField } from "@mui/material"
import { useState } from "react"
import styles from "./search_comp.module.css";
import SearchIcon from '@mui/icons-material/Search';
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { searchMusic } from "@/redux/feature/search_music/searchMusicSlice";

export default function SearchMusicComp() {
    const [currMusic, setCurrMusic] = useState<string>();
    const dispatch = useDispatch<AppDispatch>()
    const { name } = useSelector(
        (state: RootState) => state.searchMusicReducer
    )

    const handleMusicSearch = () => {
        dispatch(searchMusic(currMusic));
    }

    return (
        < Box className={styles.search_box} >
            {/* Search Bar */}
            <SearchIcon />
            <TextField
                fullWidth
                // label="Search Music"
                placeholder="Search Music"
                // variant="outlined"
                value={name}
                onKeyDown={(e) => e.key === 'Enter' && handleMusicSearch()}
                onChange={(e) => setCurrMusic(e.target.value)}
            />
        </Box >
    )
}