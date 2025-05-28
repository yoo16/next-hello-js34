import { NextRequest, NextResponse } from "next/server";

// http://localhost:3000/api/gemini
export async function GET(req: NextRequest) {
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) return;

    const data = { message: API_KEY };
    return NextResponse.json(data);
}