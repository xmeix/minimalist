// components/todoList/TodoList.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSection, removeTodo } from "../../features/todoSlice";
import "./TodoList.css";

const aestheticColors = [
  "#a39193",
  "#aa6f73",
  "#eea990",
  "#f6e0b5",
  "#DDA033",
  "#E2532F",
  "#E0D8C3",
  "#0D97AC",
  "#CC9966",
  "#B6B47D",
  "#7D80B6",
  "#7DB6B4",
  "#7DB697",
];

const TodoList = () => {
  const todoList = useSelector((state) => state.todos.todoList);
  const sectionList = useSelector((state) => state.todos.sections);
  const dispatch = useDispatch();

  return (
    <div className="todoList">
      {sectionList.map((section, i) => (
        <div className="liste" key={section.value}>
          <div
            className="sectionName"
            onClick={() => dispatch(removeSection(section))}
            style={{
              backgroundColor: aestheticColors[i % aestheticColors.length],
            }}
          >
            {section.label}
          </div>
          <div className="todos">
            {todoList
              .filter((todo) => todo?.section?.value === section.value)
              .map((todo) => (
                <div
                  className="todo"
                  key={todo.id}
                  onClick={() => dispatch(removeTodo(todo))}
                >
                  {todo.todo}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
