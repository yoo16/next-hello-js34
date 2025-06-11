'use client';

import { useRef, useState } from 'react';
import Loading from '@/app/components/Loading';
import Image from 'next/image';

export default function ImageUploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);

        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;
        try {
            setIsLoading(true);
            setMessage('');

            // formDataを作成して画像を追加
            const formData = new FormData();
            formData.append('image', file);

            // APIに画像を送信
            const response = await fetch('/api/whats_image', {
                method: 'POST',
                body: formData,
            });
            // レスポンスを取得
            const data = await response.json();
            // 結果を設定
            setMessage(data.message);
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold">画像を教えて！</h2>

            <input type="file" accept="image/*" className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
            />

            {/* 画像を選択ボタン */}
            <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-black rounded shadow hover:bg-gray-400"
                onClick={() => fileInputRef.current?.click()}
            >
                画像を選択
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
                    <button
                        onClick={handleSubmit}
                        className="mt-4 px-6 py-3 bg-sky-600 text-white rounded-xl hover:bg-sky-700 cursor-pointer"
                        disabled={!file || isLoading}
                    >
                        画像を送信
                    </button>
                </div>
            )}

            {message && (
                <div className="text-left p-3 bg-gray-100 rounded shadow text-sm whitespace-pre-wrap">
                    <div>{message}</div>
                </div>
            )}

            {isLoading && <Loading />}
        </div>
    );
}