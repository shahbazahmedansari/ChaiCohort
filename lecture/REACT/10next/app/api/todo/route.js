import { NextResponse } from "next/server";

import Todo from "@/models/Todo";
import connectToDatabase from "@/lib/mongodb";


export async function GET() {
  try {
    await connectToDatabase();
    const Todos = await Todo.find({}).sort({ createdAt: -1 });
    return NextResponse.json(Todos);
  } catch (error) {
    NextResponse.json({ error: "Failed to fetch todo" }, {
      status: 500
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }

    await connectToDatabase();

    const todo = await Todo.create({ title });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    NextResponse.json({ error: "Failed to create todo" }, {
      status: 500
    });
  }
}