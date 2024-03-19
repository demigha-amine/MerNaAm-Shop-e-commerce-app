import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (_, action) => {
      console.log("slice");
      console.log(action.payload);
      return action.payload;
    },
    deconnexion: () => {
      return "";
    },
  },
});

export const { setUser, deconnexion } = authSlice.actions;
export default authSlice.reducer;
