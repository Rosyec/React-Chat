import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginWithFacebook, loginWithGoogle } from "../firebase/firebase.auth";
import { login } from "./slices/LoginSlice";

export const loginUserFacebook = createAsyncThunk("login/facebook", 
async (_, thunkApi) => {
    try {
        const user = await loginWithFacebook();
        if (!user) return;
        localStorage.setItem('user', JSON.stringify(user));
        thunkApi.dispatch(login(user));
    } catch (error) {
        console.log(error);
    }
});

export const loginUserGoogle = createAsyncThunk("login/google", 
async (_, thunkApi) => {
    try {
        const user = await loginWithGoogle();
        if (!user) return;
        localStorage.setItem('user', JSON.stringify(user));
        thunkApi.dispatch(login(user));
    } catch (error) {
        console.log(error);
    }
});

export {};
