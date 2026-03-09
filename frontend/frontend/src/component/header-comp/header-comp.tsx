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
                                backgroundColor: "#000000",
                                color: "white",
                                fontWeight: "900",
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
                    >
                        Home
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            router.push('/music');
                            handleMenuClose();
                        }}
                    >
                        Music
                    </MenuItem>

                    {user ? (
                        <MenuItem
                            sx={{ color: "red" }}
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
                        >
                            Sign In
                        </MenuItem>
                    )}
                </Menu>
            </Box>
        </header >
    )
}
