import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginSliceState {
  displayName: string | null;
  email: string | null;
  uid: string | null;
  photoURL: string | null;
  token?: string | null;
}

const initialState: LoginSliceState = {
    displayName: null,
    email: null,
    uid: null,
    photoURL: null
};

export const LoginSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginSliceState>) => {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
      state.uid = action.payload.uid;
      state.token = action.payload.token;
    }
  },
});

export const { login } = LoginSlice.actions;
