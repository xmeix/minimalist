// components/todoForm/TodoForm.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { saveTodo, saveSection } from "../../features/todoSlice";
import "./TodoForm.css";

const styles = {
  option: (provided, state) => ({
    ...provided,
    fontWeight: state.isSelected ? "bold" : "normal",
    color: "black",
    fontSize: "13px",
    textAlign: "center",
    backgroundColor: state.isSelected
      ? "rgba(197, 194, 194, 0.377)"
      : "transparent",
    "&:hover": {
      backgroundColor: "rgba(197, 194, 194, 0.377)",
      cursor: "pointer",
    },
    "&:focus": {
      backgroundColor: "rgba(197, 194, 194, 0.377)",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "black",
    fontSize: "13px",
    fontWeight: "bold",
  }),
  control: (provided, state) => ({
    ...provided,
    width: 200,
    fontSize: "13px",
    textAlign: "center",
    border: state.isFocused
      ? "2px solid rgba(211, 211, 211, 0.507)"
      : "1px solid rgba(211, 211, 211, 0.507)",
    boxShadow: state.isFocused
      ? "rgba(211, 211, 211, 0.507)"
      : " rgba(211, 211, 211, 0.507)",
    "&:hover": {
      border: "2px solid rgba(211, 211, 211, 0.507)",
      boxShadow: " rgba(211, 211, 211, 0.507)",
      cursor: "pointer",
    },
  }),
};

const TodoForm = () => {
  const textareaRef = useRef(null);
  const dispatch = useDispatch();
  const [sectionValue, setSectionValue] = useState(null); // should be object or null
  const [todo, setTodo] = useState("");

  const sections = useSelector((state) => state.todos.sections); // adjust if using sectionSlice

  const handleChange = useCallback((newValue) => {
    setSectionValue(newValue);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [todo]);

  const handleCreateNewSection = useCallback(
    (inputValue) => {
      if (todo.trim() === "") {
        console.log("You must write the todo first!");
        return;
      }

      const newValue = inputValue.toLowerCase().trim();
      const existingSection = sections.find(
        (section) => section.value === newValue
      );

      if (!existingSection) {
        dispatch(
          saveSection({
            value: newValue,
            label: newValue,
          })
        );
        console.log("Section created:", newValue);
      } else {
        console.log("Section already exists:", newValue);
      }

      setSectionValue({ value: newValue, label: newValue });
    },
    [todo, dispatch, sections]
  );

  const addTodo = (e) => {
    e.preventDefault();

    if (!todo.trim() || !sectionValue) {
      alert("Both fields are required!");
      return;
    }

 

    dispatch(
      saveTodo({
        id: Date.now(),
        section: sectionValue,
        todo: todo.trim(),
        done: false,
      })
    );

    setTodo("");
    setSectionValue(null);
  };

  return (
    <div className="todoform">
      <form onSubmit={addTodo}>
        <textarea
          className="inp1"
          style={{ resize: "vertical" }}
          placeholder="write down your task..."
          rows={1}
          value={todo}
          ref={textareaRef}
          onChange={(e) => setTodo(e.target.value)}
        />
        <CreatableSelect
          className="select"
          value={sectionValue}
          options={sections}
          styles={styles}
          isClearable
          isSearchable
          onChange={handleChange}
          onCreateOption={handleCreateNewSection}
          placeholder={"choose a section"}
        />
        <button className="btn">Enter</button>
      </form>
    </div>
  );
};

export default TodoForm;
