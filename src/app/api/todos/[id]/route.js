import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { completed } = await request.json();

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { completed },
    });

    return Response.json(updatedTodo, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to update todo" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.todo.delete({ where: { id } });

    return Response.json({ message: "Todo deleted" }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to delete todo" }, { status: 500 });
  }
}
