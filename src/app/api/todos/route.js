import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const todos = await prisma.todo.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(todos, { status: 200 });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return Response.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title } = await request.json();

    if (!title) {
      return Response.json({ error: "Title is required" }, { status: 400 });
    }

    const newTodo = await prisma.todo.create({
      data: {
        title,
        userId: session.user.id,
      },
    });

    return Response.json(newTodo, { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return Response.json({ error: "Failed to create todo" }, { status: 500 });
  }
}
