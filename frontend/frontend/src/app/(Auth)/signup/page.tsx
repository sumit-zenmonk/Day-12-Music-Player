"use client"

import styles from "./signup.module.css"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema, SignupSchemaType } from "@/types/signup"
import { googleLogin, signupUser } from "@/redux/feature/Auth/authAction"
import { useRouter } from "next/navigation"
import MusicNoteIcon from '@mui/icons-material/MusicNote';

import {
    Box,
    Button,
    Card,
    Divider,
    InputLabel,
    TextField,
    Typography
} from "@mui/material"
import Image from "next/image"

export default function SignupForm() {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignupSchemaType>({
        resolver: zodResolver(signupSchema)
    })
    const onSubmit = async (data: SignupSchemaType) => {
        try {
            await dispatch(signupUser({ email: data.email, password: data.password }))
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
            <Card className={styles.formWrapper} elevation={3}>
                <Box className={styles.header}>
                    <MusicNoteIcon fontSize='large' className='logo'
                        onClick={() => router.replace('/')} sx={{
                            '&:hover': {
                                cursor: "grab"
                            },
                        }} />
                    <Typography variant="h5" className={styles.title}>
                        Join Us !
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

                    <Box className={styles.field}>
                        <InputLabel htmlFor="confirmpassword" sx={{ color: "white", fontWeight: 600, fontSize: ".8rem" }}>
                            Confirm Password
                        </InputLabel>
                        <TextField
                            id="confirmpassword"
                            // label="Confirm Password"
                            type="password"
                            fullWidth
                            {...register("confirmPassword")}
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
                        {errors.confirmPassword && (
                            <span className={styles.error}>
                                {errors.confirmPassword.message}
                            </span>
                        )}
                    </Box>

                    <Button
                        variant="contained"
                        type="submit"
                        className={styles.button}
                    >
                        Signup
                    </Button>


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

                    <Box className={styles.loginBox}>
                        <Typography className={styles.haveAcc}>Already have Account ?</Typography>
                        <Button
                            variant="text"
                            className={styles.anchorbutton}
                            onClick={() => router.replace("/login")}
                        >
                            Login
                        </Button>
                    </Box>
                </form>
            </Card>

            <Typography className={styles.privacyContent}>
                This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
            </Typography>
        </Box>
    )
}