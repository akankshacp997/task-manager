import React from "react";
import TaskForm from "./TaskForm";
import Task from "./Task";
import tasklogo from "../assets/tasklogo.png";

const TaskWrapper = () => {
  return (
    <div className="TaskWrapper">
      <div className="flex justify-center mb-3">
        <img className="w-14 h-12 mr-3" src={tasklogo} />
        <h1 className="pt-3 font-bold ">Task Manager</h1>
      </div>
      <TaskForm />

      <Task />
    </div>
  );
};

export default TaskWrapper;
