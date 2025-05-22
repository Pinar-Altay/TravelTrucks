import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  AC: false,
  TV: false,
  bathroom: false,
  gas: false,
  kitchen: false,
  microwave: false,
  radio: false,
  refrigerator: false,
  water: false,
  automatic: false,
  vehicleType: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    // Burayı değiştirdim ⬇️
    // clearFilters: () => initialState,
    resetFilters: () => initialState,
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
