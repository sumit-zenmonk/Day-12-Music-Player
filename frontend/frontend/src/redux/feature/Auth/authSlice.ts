"use client"

import { createSlice } from "@reduxjs/toolkit"
import { AuthState } from "./authtype"
import {
    signupUser,
    loginUser,
    googleLogin,
    logoutUser
} from "./authAction"
import Cookies from 'js-cookie';

const initialState: AuthState = {
    user: null,
    loading: true,
    error: null,
    status: 'pending'
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
            state.status = "pending";
            Cookies.remove("uid")
        },
        resetAuthError: (state) => {
            state.error = null;
            state.status = "pending"
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.status = "pending"
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
                state.status = "succeed";
                Cookies.set("uid", action.payload.uid)
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.status = "rejected";
                state.user = null;
                state.error = action.payload as string;
                Cookies.remove("uid")
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.status = "pending"
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.status = "succeed";
                state.error = null;
                Cookies.set("uid", action.payload.uid)
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.status = "rejected";
                state.error = action.payload as string;
                Cookies.remove("uid")
            })
            .addCase(googleLogin.pending, (state) => {
                state.loading = true;
                state.status = "pending"
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
                state.status = "succeed";
                Cookies.set("uid", action.payload.uid)
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.loading = false;
                state.status = "rejected";
                state.error = action.payload as string;
                Cookies.remove("uid")
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.loading = false;
                state.error = null;
                state.status = "pending";
                Cookies.remove("uid")
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'rejected'
                Cookies.remove("uid");
                state.error = action.payload as string
            })
    }
})

export const { resetAuth, resetAuthError } = authSlice.actions;
export default authSlice.reducer