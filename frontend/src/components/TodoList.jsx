import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

import { MdCalendarToday } from "react-icons/md";

const TodoList = ({ handleTodoClick }) => {
  const { isSignedIn } = useContext(UserContext);
  const [todos, setTodos] = useState(null);

  // Getting Todos
  const getTodos = async () => {
    const { data } = await axios
      .get("/todo/getTodos")
      .catch((error) => error.response);

    if (!data.success) {
      return toast(data.message, { type: "error" });
    }
    setTodos(data.todos);
  };

  useEffect(() => {
    if (!isSignedIn) {
      return;
    }
    getTodos();
  }, [setTodos, isSignedIn]);
  return (
    <div>
      <h2>Todo List</h2>
      {isSignedIn && todos && todos.length > 0 ? (
        <ul className="flex w-full flex-col items-center justify-center gap-5 border-2">
          {todos.map((todo, i) => (
            <div key={i} onClick={() => handleTodoClick(todo._id)}>
              <li>
                <div className=" flex w-[25rem] cursor-pointer  flex-row justify-between rounded-3xl border-2  shadow-xl ">
                  {/* CARD  */}
                  <div className="ml-3 w-2/3 p-2 ">
                    <h1 className=" text-2xl font-bold">{todo.title}</h1>
                    <div
                      title="Created at"
                      className="mt-1 flex w-[100%] flex-row items-center gap-2 break-words border-t-2 border-gray-500 pt-1 "
                    >
                      <MdCalendarToday />
                      <span>
                        {new Date(todo.createdAt).toDateString()}
                        {", "}
                        {new Date(todo.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  {/* for task count */}
                  <div className="flex w-[25%] items-center justify-center rounded-3xl bg-black">
                    <span>
                      {todo.tasks.filter((e) => e.isCompleted).length}
                    </span>
                    / <span>{todo.tasks.length}</span>
                  </div>
                </div>
              </li>
            </div>
          ))}
        </ul>
      ) : (
        <h2 className="text-xl text-gray-300">No Todo Available</h2>
      )}
    </div>
  );
};

export default TodoList;
