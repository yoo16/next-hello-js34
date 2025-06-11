'use client';

import { useState } from 'react';
import Loading from '@/app/components/Loading';
import Image from 'next/image';
import KeywordInput from '@/app/components/KeywordInput';

export default function ImageGenerateForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");
    const [keywords, setKeywords] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (keywords.length === 0) return;

        setIsLoading(true);

        // キーワードをカンマ区切りの文字列に変換
        const text = keywords.join(', ');
        // /api/generate_image エンドポイントにPOSTリクエストを送信
        try {
            const response = await fetch('/api/generate_image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });
            // JSONレスポンスを取得
            const data = await response.json();
            // 画像のURLを設定
            if (data.url) setPreviewUrl(data.url);
            setIsLoading(false);
        } catch (error) {
            console.error("Error generating image:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold">画像を教えて！</h2>

            <KeywordInput keywords={keywords} setKeywords={setKeywords} />

            <button
                onClick={handleSubmit}
                className="mt-4 px-6 py-3 bg-sky-600 text-white rounded-xl shadow hover:bg-sky-700 cursor-pointer"
                disabled={keywords.length === 0 || isLoading}
            >
                画像生成
            </button>

            {previewUrl && (
                <div className="flex flex-col items-center justify-center p-2 text-center">
                    <Image
                        src={previewUrl}
                        alt="Preview"
                        width={300}
                        height={300}
                        unoptimized
                        className="rounded shadow mt-1"
                    />
                    <a
                        href={previewUrl}
                        download
                        className="mt-2 inline-block px-4 py-2 bg-sky-600 text-white rounded hover:bg-green-700"
                    >
                        ダウンロード
                    </a>
                </div>
            )}
            {isLoading && <Loading />}
        </div>
    );
}