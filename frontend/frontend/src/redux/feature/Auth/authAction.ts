"use client"

import { createAsyncThunk } from "@reduxjs/toolkit"
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut
} from "firebase/auth"
import { auth } from "@/lib/firebase"
import { User } from "./authtype"
import { saveUserToDB } from "@/lib/firebaseStore/userService/userService"

const mapUser = (user: any): User => ({
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    photo: user.photoURL
})

export const signupUser = createAsyncThunk(
    "auth/signup",
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await saveUserToDB(res.user)
            return mapUser(res.user)
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            await saveUserToDB(res.user)
            return mapUser(res.user)
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const googleLogin = createAsyncThunk(
    "auth/google",
    async (_, { rejectWithValue }) => {
        try {
            const provider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);
            await saveUserToDB(res.user)
            return mapUser(res.user)
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth)
            return null;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)