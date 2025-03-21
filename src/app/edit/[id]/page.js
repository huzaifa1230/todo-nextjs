"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditTodo({ params }) {
  const router = useRouter();
  //   const { id } = params;
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [todo, setTodo] = useState(null);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the todo item
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/todos`);

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const todos = await response.json();
        const todoItem = todos.find((item) => item.id === id);

        if (!todoItem) {
          throw new Error("Todo not found");
        }

        setTodo(todoItem);
        setTitle(todoItem.title);
        setCompleted(todoItem.completed);
        setError(null);
      } catch (err) {
        setError("Failed to load todo. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTodo();
    }
  }, [id]);

  // Update todo
  const handleUpdateTodo = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      // First update the title if it changed
      if (title !== todo.title) {
        const titleResponse = await fetch(`/api/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        });

        if (!titleResponse.ok) {
          throw new Error("Failed to update todo title");
        }
      }

      // Then update the completed status if it changed
      if (completed !== todo.completed) {
        const completedResponse = await fetch(`/api/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed }),
        });

        if (!completedResponse.ok) {
          throw new Error("Failed to update todo status");
        }
      }

      // Navigate back to dashboard
      router.push("/");
    } catch (err) {
      setError("Failed to update todo. Please try again.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center bg-gray-900 text-gray-200 min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 bg-gray-900 text-gray-100 min-h-screen">
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <Link href="/" className="text-purple-400 hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl bg-gray-900 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-400 pt-6">
        Edit Todo
      </h1>

      <form onSubmit={handleUpdateTodo} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Task Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 bg-gray-700 border-gray-600 rounded"
          />
          <label
            htmlFor="completed"
            className="ml-2 block text-sm text-gray-300"
          >
            Mark as completed
          </label>
        </div>

        <div className="flex space-x-2 pt-4">
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            Update Todo
          </button>
          <Link
            href="/"
            className="bg-gray-700 text-gray-200 px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
