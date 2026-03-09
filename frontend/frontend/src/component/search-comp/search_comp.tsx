"use client"
import { Box, InputAdornment, MenuItem, Select, TextField } from "@mui/material"
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
                // value={name}
                onKeyDown={(e) => e.key === 'Enter' && handleMusicSearch()}
                onChange={(e) => setCurrMusic(e.target.value)}
            />
            <Select
                labelId="category_lableId"
                id="category_id"
                label="category"
                className={styles.SelectMenu}
                defaultValue={10}
                sx={{
                    color: "white",
                    fontWeight: "900",
                    "& .MuiSelect-icon": {
                        color: "white",
                    },
                    ".MuiOutlinedInput-notchedOutline": { border: "1px solid white" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "rgb(130, 236, 255)" },
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            backgroundColor: "#1a1a1a",
                            padding: "8px",
                        },
                    },
                }}
            >
                <MenuItem value={10} className={styles.MenuItem}>All</MenuItem>
                <MenuItem value={20} className={styles.MenuItem}>Romantic</MenuItem>
                <MenuItem value={30} className={styles.MenuItem}>Pop Up</MenuItem>
                <MenuItem value={40} className={styles.MenuItem}>Hip Up</MenuItem>
                <MenuItem value={50} className={styles.MenuItem}>Bottom Up</MenuItem>
            </Select>
        </Box >
    )
}