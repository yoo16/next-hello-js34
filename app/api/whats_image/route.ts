import { whatsImage } from "@/app/services/GeminiService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    // formData を取得
    const formData = await req.formData();
    // formData から画像ファイルを取得
    const imageFile = formData.get('image') as File;
    // Gemini API に画像を送信して内容を説明させる
    const text = await whatsImage(imageFile);
    // レスポンスデータ生成
    const data = { message: text };
    // レスポンス
    return NextResponse.json(data);
}