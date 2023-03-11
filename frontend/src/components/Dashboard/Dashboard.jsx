import React, { useState } from "react";
import TodoList from "../TodoList";
import TaskList from "../TaskList";

const Dashboard = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleTodoClick = (todoid) => {
    setSelectedTodo(todoid);
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-white">
      <div className="h-[90%] w-[90%]  bg-black-900 text-white-50">
        <div className="flex h-full w-full justify-center ">
          {/* todo title  */}
          <div className=" h-full  w-1/3">
            <h2 className="text-3xl">Todo Container</h2>
            <div className=" todolist h-[80%] w-full  overflow-y-scroll border-2 border-white-50 ">
              {/* <TodoList /> */}
              <TodoList handleTodoClick={handleTodoClick} />
            </div>
          </div>

          <div className="h-full  w-2/3 border-2 border-white-50 ">
            <h2 className="text-3xl">Task Container</h2>
            {selectedTodo && <TaskList todoId={selectedTodo} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
