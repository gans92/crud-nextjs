import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getTodos();
    case "POST":
      return createTodo();
      case "PUT":
      return updateTodo();
      case "DELETE":
      return deleteTodo();
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }

  async function getTodos() {
    const todos = await prisma.todo.findMany();
    return res.status(200).json(todos);
  }

  async function createTodo() {
    const { name } = req.body;
    const todo = await prisma.todo.create({
      data: {
        name,
      },
    });
    return res.status(201).json(todo);
  }

  async function updateTodo() {
    const { id, name, status } = req.body;
    const todo = await prisma.todo.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        status,
      },
    });
    return res.status(200).json(todo);
  }

  async function deleteTodo() {
    const { id } = req.body;
    
    await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json({ message: "Todo with id " + id + " deleted"});
  }
}

export default handler;