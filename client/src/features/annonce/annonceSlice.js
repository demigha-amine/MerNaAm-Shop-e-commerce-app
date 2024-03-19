import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listAnnonce: [],
  form: {
    _id: "",
    nomProduit: "",
    categorie: "",
    prix: "",
    qteDispo: "",
    description: "",
    file: "",
  },
};

export const annonceSlice = createSlice({
  name: "annonce",
  initialState,
  reducers: {
    resetAnnonce: (state) => {
      state.listAnnonce = [];
    },
    setAnnonce: (state, action) => {
      state.listAnnonce = action.payload;
    },
    addAnnonce: (state, action) => {
      state.listAnnonce.unshift(action.payload);
    },
    removeAnnonce: (state, action) => {
      state.listAnnonce = state.listAnnonce.filter(
        (elt) => elt._id !== action.payload
      );
    },
    updateAnnonce: (state, action) => {
      const tmp = state.listAnnonce.filter(
        (elt) => elt._id !== action.payload._id
      );
      tmp.unshift(action.payload);
      state.listAnnonce = tmp;
    },

    resetForm: (state) => {
      state.form = {
        _id: "",
        nomProduit: "",
        categorie: "",
        prix: "",
        description: "",
        file: "",
        qteDispo: "",
      };
    },

    updateForm: (state, action) => {
      state.form = action.payload;
    },
  },
});

export const {
  setAnnonce,
  addAnnonce,
  removeAnnonce,
  updateAnnonce,
  resetAnnonce,
  resetForm,
  updateForm,
} = annonceSlice.actions;
export default annonceSlice.reducer;
