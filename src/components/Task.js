import React, { useState } from "react";
import { useSearchContext, useUserContext } from "./Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck as regularIcon } from "@fortawesome/free-regular-svg-icons";
import EditTask from "./EditTask";
import moment from "moment";
import dayjs from "dayjs";

const Task = () => {
  const [data, setData] = useUserContext();
  const [search, setSearch] = useSearchContext();

  const handleDelete = (id) => {
    return setData(data.filter((user) => user.id !== id));
  };

  const handleEdit = (id) => {
    return setData(
      data.map((task) =>
        task.id === id ? { ...task, edit: !task.edit } : task
      )
    );
  };

  const handleStatus = (id) => {
    return setData(
      data.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };

  const handleSort = data.sort((a, b) => {
    const prioritySort = { high: 1, low: 2 };
    let aDate = a.date.format("YYYY-MM-DD");
    let bDate = b.date.format("YYYY-MM-DD");
    if (aDate === bDate) {
      return prioritySort[a.priority] - prioritySort[b.priority];
    } else {
      return moment.utc(aDate).diff(moment.utc(bDate));
    }
  });

  return (
    <>
      {search ? (
        <div
          key={search.task.id}
          className="bg-purple-400 flex justify-between items-center text-white px-5 py-2 rounded-lg mb-4 text-md"
        >
          <p className="text-lg">{search.task.title}</p>
          <p className="text-sm italic text-gray-100 text-left">
            {search.task.description}
          </p>
          <div>
            <FontAwesomeIcon
              className="edit-icon"
              icon={faPenToSquare}
              onClick={() => handleEdit(search.task.id)}
            />
            <FontAwesomeIcon
              className="delete-icon"
              icon={faTrash}
              onClick={() => handleDelete(search.task.id)}
            />
            <FontAwesomeIcon
              className="status-icon"
              icon={search.task.status ? faCircleCheck : regularIcon}
              onClick={() => handleStatus(search.task.id)}
            />
          </div>
        </div>
      ) : (
        handleSort.map((user) => (
          <div
            key={user.id}
            className="bg-purple-400 flex justify-between items-center text-white px-5 py-2 rounded-lg mb-4 text-md"
          >
            <p className="text-lg">{user.title}</p>
            <p className="text-sm italic text-gray-100 text-left">
              {user.description}
            </p>
            <div>
              <FontAwesomeIcon
                className="edit-icon"
                icon={faPenToSquare}
                onClick={() => handleEdit(user.id)}
              />
              <FontAwesomeIcon
                className="delete-icon"
                icon={faTrash}
                onClick={() => handleDelete(user.id)}
              />
              <FontAwesomeIcon
                className="status-icon"
                icon={user.status ? faCircleCheck : regularIcon}
                onClick={() => handleStatus(user.id)}
              />
            </div>
          </div>
        ))
      )}
      {data.map(
        (user) =>
          user.edit == true && (
            <>
              <EditTask key={user.id} task={user} id={user.id} />
            </>
          )
      )}
    </>
  );
};

export default Task;
