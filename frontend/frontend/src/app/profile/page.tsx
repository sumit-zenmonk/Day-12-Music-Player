"use client"

import styles from "./home.module.css"
import { RootState } from "@/redux/store"
import { useRouter } from "next/navigation"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useSelector } from "react-redux"

import {
    Avatar,
    Box,
    Button,
    Card,
    Typography
} from "@mui/material"
import HeaderComp from "@/component/header-comp/header-comp";

export default function ProfileComp() {
    const { user, loading } = useSelector((state: RootState) => state.authReducer)
    const router = useRouter()

    if (loading) {
        return <Box className={styles.container}>Loading...</Box>;
    }

    return (
        <Box className={styles.container}>
            <Box className={styles.Contentlayer}>
                {user ? (
                    <Box className={styles.cardWrapper}>
                        <Avatar
                            src={user.photo || undefined}
                        >
                            {!user.photo && <PersonOutlineOutlinedIcon />}
                        </Avatar>

                        {/* <Box className={styles.infoRow}>
            <span className={styles.label}>UID:</span>
            <span className={styles.value}>{user.uid}</span>
          </Box> */}

                        <Box className={styles.infoRow}>
                            <span className={styles.label}>Name:</span>
                            <span className={styles.value}>{user.name || user.email}</span>
                        </Box>

                        <Box className={styles.infoRow}>
                            <span className={styles.label}>Email:</span>
                            <span className={styles.value}>{user.email}</span>
                        </Box>

                        <Button
                            variant="contained"
                            className={styles.playbtn}
                            onClick={() => router.push('/')}
                        >
                            Let's Play
                        </Button>
                    </Box>
                ) : (
                    <Typography>Credentials not found</Typography>
                )}
            </Box>
        </Box>
    )
}