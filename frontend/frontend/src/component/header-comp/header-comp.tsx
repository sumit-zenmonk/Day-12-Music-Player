"use client"
import { usePathname, useRouter } from 'next/navigation';
import { Box, Button, Menu, MenuItem } from "@mui/material"
import { logoutUser } from '@/redux/feature/Auth/authAction';
import { AppDispatch, persistor, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import './header-comp.css'
import { useState } from "react";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SearchMusicComp from '../search-comp/search_comp';

export default function HeaderComp() {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>()
    const { user, error, loading, status } = useSelector(
        (state: RootState) => state.authReducer
    )
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleLogOut = async () => {
        await dispatch(logoutUser()).unwrap();
        localStorage.clear();
        router.replace("/login")
    }

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <header className="header">
            <Box
                className="left-container"
            >
                <MusicNoteIcon fontSize='large' className='logo'
                    onClick={() => router.replace('/')} sx={{
                        '&:hover': {
                            cursor: "grab"
                        },
                    }} />
            </Box>

            <Box className="right-container">
                <Button
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                    onClick={handleMenuOpen}
                >
                    Menu
                </Button>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    slotProps={{
                        paper: {
                            sx: {
                                backgroundColor: "rgb(29, 29, 29)",
                                color: "rgba(0, 162, 255, 0.98)",
                                fontWeight: "900",
                                borderRadius: "20px",
                                textAlign: "center"
                            }
                        }
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            router.push('/');
                            handleMenuClose();
                        }}
                        sx={{
                            fontWeight: "700",
                            border: "2px solid transparent",
                            borderRadius: "20px",
                            '&:hover': {
                                border: "2px solid white"
                            },
                        }}
                    >
                        Home
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            router.push('/music');
                            handleMenuClose();
                        }}
                        sx={{
                            fontWeight: "700",
                            border: "2px solid transparent",
                            borderRadius: "20px",
                            '&:hover': {
                                border: "2px solid white"
                            },
                        }}
                    >
                        Music
                    </MenuItem>

                    {user ? (
                        <MenuItem
                            sx={{
                                color: "red",
                                fontWeight: "700",
                                border: "2px solid transparent",
                                borderRadius: "20px",
                                '&:hover': {
                                    border: "2px solid white"
                                },
                            }}
                            onClick={async () => {
                                await handleLogOut();
                                handleMenuClose();
                            }}
                        >
                            Log Out
                        </MenuItem>
                    ) : (
                        <MenuItem
                            onClick={() => {
                                router.push('/login');
                                handleMenuClose();
                            }}
                            sx={{
                                fontWeight: "700",
                                border: "2px solid transparent",
                                borderRadius: "20px",
                                '&:hover': {
                                    border: "2px solid white"
                                },
                            }}
                        >
                            Sign In
                        </MenuItem>
                    )}
                </Menu>
            </Box>
        </header >
    )
}
