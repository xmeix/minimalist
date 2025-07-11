// features/todoSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: [],
  removedList: [],
  sections: [], // May be removed if managed separately
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    saveTodo: (state, action) => {
      state.todoList.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.removedList.push(action.payload);
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload.id
      );
    },
    saveSection: (state, action) => {
      const exists = state.sections.some(
        (s) => s.value === action.payload.value
      );
      if (!exists) state.sections.push(action.payload);
    },
    removeSection: (state, action) => {
      const sectionValue = action.payload?.value;

      state.sections = state.sections.filter(
        (section) => section?.value !== sectionValue
      );

      const removedTodos = state.todoList.filter(
        (todo) => todo?.section?.value === sectionValue
      );

      state.removedList.push(...removedTodos);

      state.todoList = state.todoList.filter(
        (todo) => todo?.section?.value !== sectionValue
      );
    },
  },
});

export const { saveTodo, removeTodo, saveSection, removeSection } =
  todoSlice.actions;
export default todoSlice.reducer;
