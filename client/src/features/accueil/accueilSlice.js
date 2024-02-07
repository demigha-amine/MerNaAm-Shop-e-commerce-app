import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  annonces: [],
  filtre: { name: "", category: "", page: 1 },
  nbrPages: 1,
};

export const accueil = createSlice({
  name: "accueil",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.filtre = { name: "", category: "", page: 1 };
    },
    setAnnonces: (state, action) => {
      state.annonces = action.payload.annonces;
      state.nbrPages = action.payload.nbrPages;
    },
    setFiltre: (state, action) => {
      state.filtre = { ...state.filtre, ...action.payload };
    },
  },
});

export const { setAnnonces, setFiltre, reset } = accueil.actions;
export default accueil.reducer;
