import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    return Response.json(todos, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title } = await request.json();
    if (!title)
      return Response.json({ error: "Title is required" }, { status: 400 });

    const newTodo = await prisma.todo.create({
      data: { title },
    });

    return Response.json(newTodo, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Failed to create todo" }, { status: 500 });
  }
}
