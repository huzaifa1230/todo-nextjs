import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();

    // Check which properties are being updated
    const updateData = {};
    if (data.completed !== undefined) {
      updateData.completed = data.completed;
    }
    if (data.title !== undefined) {
      updateData.title = data.title;
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateData,
    });

    return Response.json(updatedTodo, { status: 200 });
  } catch (error) {
    console.error("Error updating todo:", error);
    return Response.json({ error: "Failed to update todo" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.todo.delete({ where: { id } });

    return Response.json({ message: "Todo deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return Response.json({ error: "Failed to delete todo" }, { status: 500 });
  }
}
