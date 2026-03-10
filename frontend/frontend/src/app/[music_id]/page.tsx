// import { useParams } from "next/navigation";
"use client"

import { AppDispatch, RootState } from "@/redux/store";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "./specific_music.module.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { enqueueSnackbar } from "notistack";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { selectCurrMusic } from "@/redux/feature/curr_music/currMusicSlice";
import { formatDuration, formatTime } from "@/utils/time";
import { getRandomIndex } from "@/utils/random_num";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import HeaderComp from "@/component/header-comp/header-comp";

export default function Page() {
    // const params = useParams();
    // const music_id = params?.music_id;
    const {
        title,
        duration,
        localAudio,
        localArt,
        index,
        id
    } = useSelector((state: RootState) => state.currMusicReducer)
    const musicData = useSelector((state: RootState) => state.allMusicReducer)
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);
    const [audioDuration, setAudioDuration] = useState(0);
    const dispatch = useDispatch<AppDispatch>();
    const [musicFlow, setMusicFlow] = useState<number>(1);

    const togglePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return;
        const newTime = Number(e.target.value);
        audioRef.current.currentTime = newTime;
        setTrackProgress(newTime);
    };

    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                event.preventDefault();
                setIsPlaying(prev => !prev);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleNavigation = (toggle: number) => {
        const total_tracks = musicData.length - 1;
        if (toggle == 0) {
            if (index == 0) {
                dispatch(selectCurrMusic({ ...musicData[total_tracks], index: total_tracks }));
            } else {
                dispatch(selectCurrMusic({ ...musicData[index - 1], index: index - 1 }));
            }
        } else if (toggle == 1) {
            if (index == total_tracks) {
                dispatch(selectCurrMusic({ ...musicData[0], index: 0 }));
            } else {
                dispatch(selectCurrMusic({ ...musicData[index + 1], index: index + 1 }));
            }
            setMusicFlow(1);
        } else if (toggle == 2) {
            const randomIdx = getRandomIndex(total_tracks);
            dispatch(selectCurrMusic({ ...musicData[randomIdx], index: randomIdx }));
            setMusicFlow(2);
        }
    }

    return (
        <Box className={styles.mainContainer}>
            <HeaderComp />
            <Box className={styles.content}>
                <audio
                    ref={audioRef}
                    src={localAudio}
                    preload="auto"
                    onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
                    onTimeUpdate={(e) => setTrackProgress(e.currentTarget.currentTime)}
                    onEnded={() => handleNavigation(musicFlow)}
                    autoPlay
                />
                <Box className={styles.playerCard}>
                    <Box className={styles.imageContainer}>
                        <Image
                            src={localArt}
                            alt="music art"
                            width={100}
                            height={100}
                            className={styles.image}
                        />
                    </Box>
                    <Box className={styles.infoContainer}>
                        <Typography className={styles.title}>{title}</Typography>

                        <Box className={styles.timeReport}>
                            <Typography > {formatTime(trackProgress)}</Typography>
                            <Typography>{formatDuration(duration)}</Typography>
                        </Box>

                        <input
                            className={styles.slider}
                            type="range"
                            value={trackProgress}
                            min={0}
                            max={audioDuration || duration || 0}
                            onChange={handleProgressChange}
                        />
                        <Box className={styles.buttonContainer}>
                            <Button
                                className={styles.playButton}
                                onClick={() => handleNavigation(0)}
                            >
                                <SkipPreviousIcon />
                            </Button>
                            <Button
                                className={styles.playButton}
                                onClick={togglePlayPause}
                            >
                                {isPlaying ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />}
                            </Button>
                            <Button
                                className={styles.playButton}
                                onClick={() => handleNavigation(1)}
                            >
                                <SkipNextIcon />
                            </Button>
                        </Box>

                        <Button
                            className={styles.playButton}
                            onClick={() => handleNavigation(2)}
                        >
                            <ShuffleIcon />
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}