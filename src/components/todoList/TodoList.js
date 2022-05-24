import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSection, removeTodo } from "../../features/todoSlice";
import "./TodoList.css";

const TodoList = () => {
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
  const todoList = useSelector((state) => state.todos.todoList);
  const sectionList = useSelector((state) => state.todos.sections);
  const dispatch = useDispatch();

  const handleRemoveTodo = (todo) => {
    console.log(todo);
    dispatch(removeTodo(todo));
    return;
  };
  const handleRemoveSection = (section) => {
    console.log(section);
    dispatch(removeSection(section));
    return;
  };

  return (
    <div className="todoList">
      {/* {
        todoList.map(todo => todo.section.value)
       }  */}
      {sectionList.map((section, i) => (
        <div className="liste" key={i}>
          <div
            className="sectionName"
            onClick={() => handleRemoveSection(section)}
            style={{
              backgroundColor:
                aestheticColors[
                  Math.floor(Math.random() * aestheticColors.length)
                ],
            }}
          >
            {section.value}
          </div>
          <div className="todos">
            {todoList
              .filter(
                (todo) => todo.section.value === section.value.toLowerCase()
              )
              .map((todo, j) => (
                <div
                  className="todo"
                  key={j}
                  onClick={() => handleRemoveTodo(todo)}
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
