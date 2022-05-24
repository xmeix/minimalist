import { useSelector } from "react-redux";
import "./History.css";

const History = () => {
  const removedList = useSelector((state) => state.todos.removedList);

  return (
    <div className="history">
      <div className="historyTitle">Removed Todos</div>
      <div className="removedTodos">
        {removedList.map((todo, j) => (
          <div className="removedTodo" key={j}>
            {todo.todo}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
