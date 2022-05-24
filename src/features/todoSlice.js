import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: [],
  removedList: [],
  sections: [],
};

// if (localStorage.getItem("todos")) {
//   initialState.todoList = JSON.parse(localStorage.getItem("todos"));
// } else {
//   initialState.todoList = [];
// }

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    saveTodo: (state, action) => {
      state.todoList.push(action.payload);
      // console.log(state.todoList);
      // localStorage.setItem("todos", JSON.stringify(state.todoList));
    },
    removeTodo: (state, action) => {
      //console.log(action.payload);
      state.removedList.push(action.payload);

      state.todoList.splice(
        state.todoList.findIndex((todo) => todo.id === action.payload.id),
        1
      );
    },
    saveSection: (state, action) => {
      state.sections.push(action.payload);
    },
    removeSection: (state, action) => {
      state.sections.splice(
        state.sections.findIndex(
          (section) => section.value === action.payload.value
        ),
        1
      );
      state.todoList
        .filter((todo) => todo.section.value === action.payload.value)
        .map((todo) => state.removedList.push(todo));

      state.todoList
        .filter((todo) => todo.section.value === action.payload.value)
        .map((todo) =>
          state.todoList.splice(
            state.todoList.findIndex((todo) => todo),
            1
          )
        );

      // state.todoList.splice(
      //   state.sections.findIndex(
      //     (section) => section.value === action.payload.value
      //   ),
      //   1
      // );
    },
  },
});

export const { saveTodo, removeTodo, saveSection, removeSection } =
  todoSlice.actions;

export default todoSlice.reducer;
