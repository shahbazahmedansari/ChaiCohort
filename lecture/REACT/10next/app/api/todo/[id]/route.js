import { NextResponse } from "next/server";

import Todo from "@/models/Todo";
import connectToDatabase from "@/lib/mongodb";

export async function GET(request, context) {
  try {
    const { id } = await context.params;
    await connectToDatabase();

    
  } catch (error) {

  }
}