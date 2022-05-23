import React from "react";
import "./TodoForm.css";
import { useDispatch, useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { useCallback, useEffect, useRef, useState } from "react";
import { saveTodo } from "../../features/todoSlice";
import { saveSection } from "../../features/todoSlice";

// const savedSections = JSON.parse(localStorage.getItem("sections"));

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
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
const TodoForm = () => {
  const textareaRef = useRef(null);
  const [sectionValue, setSectionValue] = useState("");
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const sections = useSelector((state) => state.todos.sections);
  console.log("sections : ", sections);
  // useEffect(() => {
  //   localStorage.setItem("sections", JSON.stringify(sections));
  // }, [sections]);

  ///////////////////////////////////////////////////////
  const handleChange = useCallback((inputValue) => {
    setSectionValue(inputValue);
  }, []);

  //////////////////////////////////////////////////////

  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [todo]);
  ///////////////////////////////////////////////////////
  // const DoesExists = (sectionArray, sectionName) => {
  //   return sectionArray.some((section) => section === sectionName);

  //   //return sectionArray.includes({ name: sectionName });
  // };
  //////////////////////////////////////////////////////
  const handleCreateNewSection = useCallback(
    (inputValue) => {
      if (todo !== "") {
        const newValue = inputValue.toLowerCase().trim();
        console.log("newValue: ", newValue);
        // setSections([...sections, { value: newValue, label: newValue }]);
        dispatch(
          saveSection({
            value: newValue,
            label: newValue,
          })
        );

        console.log(newValue);
      } else console.log("you have to write the todo first!");

      setSectionValue("");
    },
    [todo, dispatch]
  );

  const addTodo = (e) => {
    e.preventDefault();
    if (todo === "" || sectionValue === "") {
      console.log("One of the fields is empty!");
    } else {
      console.log(`adding ${todo} in ${sectionValue}...`);
      dispatch(
        saveTodo({
          id: Date.now(),
          section: sectionValue,
          todo: todo,
          done: false,
        })
      );
    }
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
          isDisabled={false}
          isClearable={true}
          isSearchable={true}
          hideSelectedOptions={false}
          onChange={handleChange}
          onCreateOption={handleCreateNewSection}
          placeholder={"choose a section"}
        />
        <button className="btn">Enter </button>
      </form>
    </div>
  );
};

export default TodoForm;
