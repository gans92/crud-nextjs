import styles from '@/styles/index.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";


export default function Home() {

  type Todo = {
    id: number;
    name: string;
    status: boolean;
  };

  const Todos = () => {
    return (
      <div className={styles.todos}>
        {todos.map((todo: Todo) => {
          return (
            <div key={todo.id} className={styles.todo}>
              <button
                onClick={() => modifyStatusTodo(todo)}
                className={styles.checkbox}
                style={{ backgroundColor: todo.status ? "#A879E6" : "white" }}
              ></button>
              <p>{todo.name}</p>
              <button onClick={() => handleWithEditButtonClick(todo)}>
                <AiOutlineEdit size={20} color={"#64697b"}></AiOutlineEdit>
              </button>
              <button onClick={() => deleteTodo(todo)}>
                <AiOutlineDelete size={20} color={"#64697b"}></AiOutlineDelete>
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  async function handleWithNewButton() {
    setInputVisibility(!inputVisibility);
  }
  async function handleWithEditButtonClick(todo: any) {
    setSelectedTodo(todo);
    setInputVisibility(true);
  }

  async function getTodos() {
    const response = await axios.get("http://localhost:3000/api/todos");
    setTodos(response.data);
    console.log(response.data);
  }

  async function createTodo() {
    const response = await axios.post("http://localhost:3000/api/todos", {
      name: inputValue,
    });
    getTodos();
    setInputVisibility(!inputVisibility);
    setInputValue("");
  }

  async function editTodo() {
    const response = await axios.put("http://localhost:3000/api/todos", {
      id: selectedTodo?.id,
      name: inputValue,
    });
    getTodos();
    setInputVisibility(false);
    setInputValue("");
  }

  async function deleteTodo(todo: Todo) {
    const response = await axios.delete(
      `http://localhost:3000/api/todos/`,
      {
        data: {
          id: todo.id,
        },
      }
    );
    getTodos();
  }

  async function modifyStatusTodo(todo: Todo) {
    const response = await axios.put("http://localhost:3000/api/todos", {
      id: todo.id,
      status: !todo.status,
    });
    getTodos();
  }

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisibility, setInputVisibility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <div className={styles.App}>
      <header className={styles.container}>
        <div className={styles.header}>
          <h1>TodoList</h1>
        </div>
        <Todos/>
        <input
          value={inputValue}
          style={{ display: inputVisibility ? "block" : "none" }}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          className={styles.inputName}
        ></input>
        <button
          onClick={ inputVisibility ? selectedTodo ? editTodo : createTodo : handleWithNewButton
          }
          className={styles.newTaskButton}
        >
          {inputVisibility ? "Confirm" : "+ New task"}
        </button>
      </header>
    </div>
    </>
  );
}
