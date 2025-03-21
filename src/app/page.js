"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faCheck,
  faHourglass,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/todos");

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError("Failed to load todos. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();

    if (!newTodo.trim()) return;

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTodo }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const addedTodo = await response.json();
      setTodos([...todos, addedTodo]);
      setNewTodo("");
    } catch (err) {
      setError("Failed to add todo. Please try again.");
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Failed to delete todo. Please try again.");
      console.error(err);
    }
  };

  // Toggle todo completion status
  const handleToggleComplete = async (id, currentStatus) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (err) {
      setError("Failed to update todo. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo App</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleAddTodo} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
      </form>

      {loading ? (
        <div className="text-center py-4">Loading todos...</div>
      ) : (
        <ul className="space-y-2">
          {todos.length === 0 ? (
            <li className="text-center py-4 text-gray-500">
              No todos yet. Add one above!
            </li>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className={`flex items-center justify-between p-3  border  rounded ${
                  todo.completed ? "bg-gray-100" : "bg-white"
                }`}
              >
                <div className="flex items-center border-2 border-red-600">
                  <button
                    onClick={() =>
                      handleToggleComplete(todo.id, todo.completed)
                    }
                    className={`mr-3 ${
                      todo.completed ? "text-green-500" : "text-gray-400"
                    }`}
                    title={
                      todo.completed ? "Mark as incomplete" : "Mark as complete"
                    }
                  >
                    <FontAwesomeIcon
                      icon={todo.completed ? faCheck : faHourglass}
                    />
                  </button>
                  <span
                    className={
                      todo.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    {todo.title}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/edit/${todo.id}`}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
