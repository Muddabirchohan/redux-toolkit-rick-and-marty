import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colors: {
    header: "#ebfbff",
    body: "#fff",
    footer: "#003333",
    textColor: "black"
  },
  mobile: "768px",
  darkmode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkTheme(state) {
      state.colors.header = "#324B50";
      state.colors.body = "black";
      state.colors.textColor = "#fff";

      state.darkmode = true;
    },
    setDefaultTheme(state) {
      state.colors.header = "#ebfbff";
      state.colors.body = "#fff";
      state.colors.textColor = "black";
      state.darkmode = false;
    },
  },
});

export const { setDarkTheme, setDefaultTheme } = themeSlice.actions;

export const theme = (state: any) => state.theme




export default themeSlice.reducer;
