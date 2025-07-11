// features/sectionSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Safe parse helper
const loadFromLocalStorage = (key, fallback = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

const initialState = {
  sectionList: loadFromLocalStorage("sections"),
};

const sectionSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    saveSection: (state, action) => {
      const exists = state.sectionList.some(
        (s) => s.value === action.payload.value
      );
      if (!exists) {
        state.sectionList.push(action.payload);
        localStorage.setItem("sections", JSON.stringify(state.sectionList));
      }
    },
  },
});

export const { saveSection } = sectionSlice.actions;
export default sectionSlice.reducer;
