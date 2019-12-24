import React, { useEffect, useState, Button } from "react";
import { navigate } from "@reach/router";
import './main.css'

function TodoList() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const requestTodo = async () => {
      const response = await fetch("/api/todo");
      const { data } = await response.json();
      setTodo(data);
    };
    requestTodo();
  }, []);

  let tags = [];

  function getTags() {
    todo.forEach(tag => {
      if (tags.indexOf(tag.attributes.tag) == -1) {
        tags.push(tag.attributes.tag);
      }
    });
  }

  getTags();

  const gotoAddTask = () => navigate('/add');
  const gotoDelete = id => navigate('/delete/' + id);
  const gotoDone = id => navigate('/done/' + id);
  const gotoUndo = id => navigate('/undo/' + id);
  const gotoEdit = id => navigate('/edit/' + id);

  let categories = tags.map(item => 
                              <option>
                                {item}
                              </option>);

  let todoData = todo.map(task => 
                            <div>
                              <span class={task.attributes.status}>{task.attributes.body}</span>
                              {task.attributes.status == "done"
                                ? <button onClick={() => gotoUndo(task.id)}>Undo</button>
                                : <button onClick={() => gotoDone(task.id)}>Done</button>
                              }
                              <button onClick={() => gotoEdit(task.id)}>Edit</button>
                              <button onClick={() => gotoDelete(task.id)}>Delete</button>
                            </div>);

  return (
    <div>
        <button onClick={gotoAddTask}>Add new task</button>
        <br />
        <select>
          {categories}
        </select>
        {todoData}
    </div>
  )
}

export default TodoList;