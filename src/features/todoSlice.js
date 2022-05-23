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
      console.log(state.todoList);
      // localStorage.setItem("todos", JSON.stringify(state.todoList));
    },
    removeTodo: (state, action) => {
      console.log(action.payload);
      state.removedList.push(action.payload);
      const { id } = action.payload.id;
      state.todoList.splice(
        state.todoList.findIndex((todo) => todo.id === action.payload.id),
        1
      );

      const isItLast = state.todoList.indexOf(
        (todo) => todo.id === action.payload.id
      );
      console.log(isItLast);
      // if (isItLast === -1) {
      //   state.sections.splice(
      //     state.sections.findIndex(
      //       (section) => section.value === action.payload.section.value
      //     ),
      //     1
      //   );
      // }
    },
    saveSection: (state, action) => {
      state.sections.push(action.payload);
    },
  },
});

export const { saveTodo, removeTodo, saveSection } = todoSlice.actions;

export default todoSlice.reducer;
