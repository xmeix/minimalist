import React from "react";
import "./App.css";
import Header from "./components/header/Header";
//import History from "./components/History/History";
import TodoForm from "./components/todoForm/TodoForm";
import TodoList from "./components/todoList/TodoList";
function App() {
  return (
    <div className="App">
      <Header /> 
      <TodoForm /> 
      <TodoList /> 
    </div>
  );
}

export default App;
