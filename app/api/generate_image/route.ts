import { generateImage } from "@/app/services/GeminiService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { text } = await req.json();;
    // Gemini API に画像を送信して内容を説明させる
    const url = await generateImage(text);
    // レスポンスデータ生成
    const data = {
        message: text,
        url: url,
    };
    // レスポンス
    return NextResponse.json(data);
}