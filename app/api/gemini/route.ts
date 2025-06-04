import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// http://localhost:3000/api/gemini
export async function POST(req: NextRequest) {
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) return;

    // Google GenAI を生成
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    // プロンプト内容
    // const prompt = 'Geminiは何食べたい？';
    // JSONから text を取得
    const body = await req.json();
    const prompt = body.text;
    // const prompt = 'Geminiは何食べたい？';
    // Geminiに送信するコンテンツを作成
    const contents = [
        {
            parts: [
                {
                    text: prompt,
                },
            ],
        },
    ];
    // GeminiAPIにリクエスト
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        config: { responseMimeType: 'text/plain' },
        contents,
    });
    // レスポンスからテキストを取得
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    // レスポンスをJSON形式で返す
    const data = { message: text };
    return NextResponse.json(data);
}