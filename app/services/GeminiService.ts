import {
    GoogleGenAI,
    Modality,
} from '@google/genai';

import { fileToBase64, saveImage, uploadImageInfo } from '@/app/repositories/ImageRepository';

const API_KEY = process.env.GEMINI_API_KEY;

/**
 * 画像を Gemini に送って内容を説明させる
 * @param imagePath - サーバ上の画像ファイルのパス
 */
export async function whatsImage(file: File): Promise<string> {
    const { base64, mimeType } = await fileToBase64(file);

    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const contents = [
        {
            parts: [
                {
                    inlineData: {
                        mimeType,
                        data: base64,
                    },
                },
                { text: "この材料でレシピを考えて。イタリアンで。" },
            ],
        },
    ];

    // Gemini API リクエストを送信
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        config: { maxOutputTokens: 1024 },
        contents,
    });

    const text = response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    return text;
}

export async function generateImage(text: string) {
    // 画像生成のためのプロンプトを作成
    const prompt = `次のキーワードで画像生成して。画像内に文字、サイン、説明書きなどは一切含めないで。\n\nキーワード: ${text}`;

    // GeminiAPIにリクエストを送信
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: prompt,
        config: { 
            responseModalities: [Modality.TEXT, Modality.IMAGE]
        },
    });

    // レスポンスから画像データを取得
    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts) return "";

    // ファイルパスとURLを取得し、画像ファイルをサーバ保存
    const { filePath, url } = uploadImageInfo();
    for (const part of parts) {
        if (part.inlineData?.data) {
            await saveImage(filePath, part.inlineData.data);
            return url;
        }
    }
    return "";
}