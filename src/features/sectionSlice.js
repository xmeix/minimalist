import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sectionList: [],
};

if (localStorage.getItem("sections")) {
  initialState.sectionList = JSON.parse(localStorage.getItem("sections"));
} else {
  initialState.sectionList = [];
}

const sectionSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    saveSection: (state, action) => {
      state.sectionList.push(action.payload);
      console.log("sections: ",state.sectionList);
      localStorage.setItem("sections", JSON.stringify(state.sectionList));
    },
  },
});


export const { saveSection } = sectionSlice.actions;

export default sectionSlice.reducer;
