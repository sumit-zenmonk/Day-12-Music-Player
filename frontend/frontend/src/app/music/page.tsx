"use client";

import styles from "./music.module.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { selectCurrMusic } from "@/redux/feature/curr_music/currMusicSlice";
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { formatDuration } from "@/utils/time";
import SearchMusicComp from "@/component/search-comp/search_comp";
import { useEffect, useState } from "react";
import { MusicMetaDataType } from "@/redux/feature/all_tracks/currMusictype";

export default function MusicListComp() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const musicData = useSelector((state: RootState) => state.allMusicReducer)
    const { name } = useSelector(
        (state: RootState) => state.searchMusicReducer
    )
    const [musicListArray, setMusicListArray] = useState<MusicMetaDataType[]>(musicData);
    const { id } = useSelector((state: RootState) => state.currMusicReducer)

    const handleSelectedMusic = (music_id: string, index: number) => {
        const music = musicData.filter((music) => music.id == music_id);
        if (!music || !music.length) {
            enqueueSnackbar("music not available right now ?", { variant: "error" })
            return;
        }
        dispatch(selectCurrMusic({ ...music[0], index: index }));
        router.push(`/music/${music_id}`);
    };

    useEffect(() => {
        if (name.trim()) {
            setMusicListArray(musicData)
        }
        const newSearchFilter = musicData.filter((music: MusicMetaDataType) => music.title.includes(name))
        if (newSearchFilter && newSearchFilter.length) {
            setMusicListArray(newSearchFilter);
            enqueueSnackbar("filtered", { variant: "success" });
        } else {
            enqueueSnackbar("Didn't found similar", { variant: "warning" });
        }
    }, [name])

    return (
        <Box className={styles.container}>
            <Box className={styles.header}>
                <SearchMusicComp />
            </Box>

            <List className={styles.listContainer}>
                {musicListArray.map((song, index) => (
                    <ListItem
                        key={song.id}
                        className={styles.songRow}
                        onClick={() => handleSelectedMusic(song.id, index)}
                        sx={{ cursor: 'pointer' }}
                        style={song.id === id ? { color: 'rgb(183, 234, 255)', border: '2px solid #00c3ff' } : {}}
                    >

                        <Box className={styles.playIcon}>
                            <PlayArrowIcon />
                        </Box>

                        <ListItemAvatar className={styles.artworkContainer}>
                            <Avatar
                                variant="square"
                                src={song.localArt}
                                className={styles.artwork}
                                alt={song.title}
                            />
                        </ListItemAvatar>

                        <ListItemText
                            className={styles.songInfo}
                            primary={<Typography className={styles.songTitle}>{song.title}</Typography>}
                            secondary={<Typography className={styles.songSource}>Local Track</Typography>}
                        />

                        <Box className={styles.duration}>
                            <AccessTimeIcon className={styles.clockIcon} />
                            <Typography component="span">{formatDuration(song.duration)}</Typography>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
