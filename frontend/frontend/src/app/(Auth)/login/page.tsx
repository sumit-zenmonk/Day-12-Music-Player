"use client"

import styles from "./login.module.css"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginSchemaType } from "@/types/login"
import { googleLogin, loginUser } from "@/redux/feature/Auth/authAction"
import { useRouter } from "next/navigation"
import GoogleIcon from '@mui/icons-material/Google';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

import {
    Box,
    Button,
    Card,
    TextField,
    Typography,
    Divider,
    InputLabel
} from "@mui/material"
import Image from "next/image"

export default function LoginForm() {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginSchemaType) => {
        try {
            await dispatch(loginUser(data))
            router.replace("/")
        } catch (error) {
            console.error(error)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            await dispatch(googleLogin()).unwrap()
            router.replace("/")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Box className={styles.container}>
            <Card className={styles.formWrapper} elevation={4}>
                <Box className={styles.header}>
                    <Box >
                        <MusicNoteIcon fontSize='large' className='logo'
                            onClick={() => router.replace('/')} sx={{
                                '&:hover': {
                                    cursor: "grab"
                                },
                            }} />
                    </Box>
                    <Typography variant="h5" className={styles.title}>
                        Welcome Back
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <Box className={styles.field}>
                        <InputLabel htmlFor="email" sx={{ color: "white", fontWeight: 600, fontSize: ".8rem" }}>
                            Email
                        </InputLabel>
                        <TextField
                            id="email"
                            // label="Email"
                            type="email"
                            fullWidth
                            {...register("email")}
                            slotProps={{
                                inputLabel: { sx: { color: 'white', '&.Mui-focused': { color: 'white' } } },
                                input: {
                                    sx: {
                                        height:"40px",
                                        color: 'white',
                                        '& input::placeholder': { color: 'white', opacity: 1 },
                                    },
                                },
                            }}
                        />
                        {errors.email && (
                            <span className={styles.error}>
                                {errors.email.message}
                            </span>
                        )}
                    </Box>

                    <Box className={styles.field}>
                        <InputLabel htmlFor="password" sx={{ color: "white", fontWeight: 600, fontSize: ".8rem" }}>
                            Password
                        </InputLabel>
                        <TextField
                            id="password"
                            // label="Password"
                            type="password"
                            fullWidth
                            {...register("password")}
                            slotProps={{
                                inputLabel: { sx: { color: 'white', '&.Mui-focused': { color: 'white' } } },
                                input: {
                                    sx: {
                                        height:"40px",
                                        color: 'white',
                                        '& input::placeholder': { color: 'white', opacity: 1 },
                                    },
                                },
                            }}
                        />
                        {errors.password && (
                            <span className={styles.error}>
                                {errors.password.message}
                            </span>
                        )}
                    </Box>

                    <Button
                        variant="contained"
                        type="submit"
                        className={styles.loginbutton}
                    >
                        Login
                    </Button>
                </form>

                <Divider className={styles.divider}>OR</Divider>

                <Button
                    variant="outlined"
                    className={styles.providerLoginBox}
                    onClick={handleGoogleLogin}
                >
                    {/* <GoogleIcon /> */}
                    <Image
                        src={'/google.png'}
                        alt="google icon"
                        width={25}
                        height={25}
                    />
                    <Typography>
                        Login with Google
                    </Typography>
                </Button>

                <Button
                    variant="outlined"
                    className={styles.providerLoginBox}
                    onClick={handleGoogleLogin}
                >
                    {/* <GoogleIcon /> */}
                    <Image
                        src={'/microsoft.png'}
                        alt="google icon"
                        width={25}
                        height={25}
                    />
                    <Typography>
                        Login with microsoft
                    </Typography>
                </Button>

                <Button
                    variant="outlined"
                    className={styles.providerLoginBox}
                    onClick={handleGoogleLogin}
                >
                    <Box>
                        {/* <GoogleIcon /> */}
                        <Image
                            src={'/github.png'}
                            alt="google icon"
                            width={25}
                            height={25}
                        />
                    </Box>
                    <Typography>
                        Login with github
                    </Typography>
                </Button>

                <Box className={styles.signupBox}>
                    <Typography className={styles.noAcc}>Don't have Account ?</Typography>
                    <Button
                        variant="text"
                        className={styles.anchorbutton}
                        onClick={() => router.replace("/signup")}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Card>

            <Typography className={styles.privacyContent}>
                This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
            </Typography>
        </Box>
    )
}