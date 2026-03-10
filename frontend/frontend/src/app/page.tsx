"use client";

import styles from "./music.module.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { selectCurrMusic } from "@/redux/feature/curr_music/currMusicSlice";
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Button, Dialog, AppBar, Toolbar, IconButton } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { formatDuration } from "@/utils/time";
import SearchMusicComp from "@/component/search-comp/search_comp";
import { useEffect, useState } from "react";
import { MusicMetaDataType } from "@/redux/feature/all_tracks/currMusictype";
import HeaderComp from "@/component/header-comp/header-comp";
import Slider from "react-slick";
import Image from "next/image";
import { ApiCallService } from "../../services/http";
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import FooterComp from "@/component/footer-comp/footer";

export default function MusicListComp() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const musicData = useSelector((state: RootState) => state.allMusicReducer)
  const { name } = useSelector(
    (state: RootState) => state.searchMusicReducer
  )
  const [musicListArray, setMusicListArray] = useState<MusicMetaDataType[]>(musicData);
  const { id } = useSelector((state: RootState) => state.currMusicReducer)
  const [catImgs, setCatImgs] = useState<any>();
  const [openScreen, setOpenScreen] = useState(false);
  const sliderSettings = {
    // dots: true,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 6 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 5 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 3 }
      }
    ]
  };

  useEffect(() => {
    const fetchImages = async () => {
      const data = await ApiCallService(`https://api.thecatapi.com/v1/images/search?limit=10`, 'GET', undefined, undefined);
      setCatImgs(data);
    }
    fetchImages();
  }, [])

  const handleSelectedMusic = (music_id: string, index: number) => {
    const music = musicData.filter((music) => music.id == music_id);
    if (!music || !music.length) {
      enqueueSnackbar("music not available right now ?", { variant: "error" })
      return;
    }
    dispatch(selectCurrMusic({ ...music[0], index: index }));
    router.push(`/${music_id}`);
  };

  useEffect(() => {
    if (!name.trim()) {
      setMusicListArray(musicData)
      return;
    }

    const newSearchFilter = musicData.filter((music: MusicMetaDataType) => music.title.toLowerCase().includes(name.toLowerCase()))
    if (newSearchFilter && newSearchFilter.length) {
      setMusicListArray(newSearchFilter);
      enqueueSnackbar("tracks loaded", { variant: "success" });
    } else {
      setMusicListArray(musicData)
      enqueueSnackbar("Didn't found similar", { variant: "warning" });
    }
  }, [name])

  return (
    <Box className={styles.container}>
      <HeaderComp />

      <Dialog
        maxWidth="md"
        open={openScreen}
        onClose={() => setOpenScreen(false)}
        className={styles.dialogfullScreen}
      >
        <Box className={styles.listWrapper}>
          {musicListArray.map((song: MusicMetaDataType, index: number) => (
            <Box
              key={song.id}
              className={`${styles.musicCard} ${song.id === id ? styles.activeCard : ""}`}
              onClick={() => handleSelectedMusic(song.id, index)}
              sx={{ cursor: "pointer" }}
            >
              <Box className={styles.thumbBox}>
                <Image
                  src={song.localArt}
                  width={60}
                  height={60}
                  className={styles.thumbImg}
                  alt={song.title}
                />
              </Box>

              <Box className={styles.contentBox}>
                <Typography className={styles.titleText}>
                  {song.title}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Dialog>

      <Box className={styles.content}>
        <Box className={styles.sliderBoxes}>
          <Box className={styles.sliderBox}>
            <Typography sx={{ color: "white" }} className={styles.contentHeading}>
              Trending Songs
            </Typography>

            <Slider {...sliderSettings} className={styles.slidercomp}>
              {musicListArray.map((song: MusicMetaDataType, index: number) => (
                <Box
                  key={song.id}
                  className={styles.songRow}
                  onClick={() => handleSelectedMusic(song.id, index)}
                  // onDoubleClick={() => handleSelectedMusic(song.id, index)}
                  sx={{ cursor: "pointer" }}
                  style={
                    song.id == id
                      ? { color: "rgb(183, 234, 255)", border: "2px solid #00c3ff" }
                      : {}
                  }
                >
                  <Box className={styles.artworkContainer}>
                    <Image
                      src={song.localArt}
                      width={100}
                      height={100}
                      className={styles.artwork}
                      alt={song.title}
                    />
                  </Box>

                  <Box className={styles.songInfo}>
                    {<Typography className={styles.songTitle}>{song.title}</Typography>}
                  </Box>
                </Box>
              ))}
            </Slider>
            <Button onClick={() => setOpenScreen(true)} className={styles.sliderSeeMoreButton} endIcon={<LaunchIcon alignmentBaseline="baseline" />}>Show all </Button>
          </Box>

          <Box className={styles.sliderBox}>
            <Typography sx={{ color: "white" }} className={styles.contentHeading}>
              Popular Artists
            </Typography>

            <Slider {...sliderSettings} className={styles.slidercomp}>
              {catImgs && catImgs.map((cat: any) => (
                <Box key={cat.id} className={styles.songRow}>
                  <Box className={styles.artworkContainer}>
                    <Image
                      src={cat.url}
                      width={200}
                      height={200}
                      className={styles.popularArtists}
                      alt="Thumbnail"
                    />
                  </Box>

                  <Box className={styles.songInfo}>
                    {<Typography className={styles.songTitle}>{cat.id}</Typography>}
                  </Box>
                </Box>
              ))}
            </Slider>
          </Box>

          <Box className={styles.sliderBox}>
            <Typography sx={{ color: "white" }} className={styles.contentHeading}>
              Follow Songs
            </Typography>

            <Slider {...sliderSettings} className={styles.slidercomp}>
              {musicListArray.map((song: MusicMetaDataType, index: number) => (
                <Box
                  key={song.id}
                  className={styles.songRow}
                  onClick={() => handleSelectedMusic(song.id, index)}
                  // onDoubleClick={() => handleSelectedMusic(song.id, index)}
                  sx={{ cursor: "pointer" }}
                  style={
                    song.id == id
                      ? { color: "rgb(183, 234, 255)", border: "2px solid #00c3ff" }
                      : {}
                  }
                >
                  <Box className={styles.artworkContainer}>
                    <Image
                      src={song.localArt}
                      width={100}
                      height={100}
                      className={styles.artwork}
                      alt={song.title}
                    />
                  </Box>

                  <Box className={styles.songInfo}>
                    {<Typography className={styles.songTitle}>{song.title}</Typography>}
                  </Box>
                </Box>
              ))}
            </Slider>
            <Button onClick={() => setOpenScreen(true)} className={styles.sliderSeeMoreButton} endIcon={<LaunchIcon alignmentBaseline="baseline" />}>Show all </Button>
          </Box>

          <Box className={styles.sliderBox}>
            <Typography sx={{ color: "white" }} className={styles.contentHeading}>
              Join New Artists
            </Typography>

            <Slider {...sliderSettings} className={styles.slidercomp}>
              {catImgs && catImgs.map((cat: any) => (
                <Box key={cat.id} className={styles.songRow}>
                  <Box className={styles.artworkContainer}>
                    <Image
                      src={cat.url}
                      width={200}
                      height={200}
                      className={styles.popularArtists}
                      alt="Thumbnail"
                    />
                  </Box>

                  <Box className={styles.songInfo}>
                    {<Typography className={styles.songTitle}>{cat.id}</Typography>}
                  </Box>
                </Box>
              ))}
            </Slider>
          </Box>

        </Box>
        <FooterComp />
      </Box>
    </Box>
  );
}