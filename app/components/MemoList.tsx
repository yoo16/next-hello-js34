"use client"

import { useState } from 'react'

export default function MemoList() {
    const [text, setText] = useState<string>('')
    const [memos, setMemos] = useState<string[]>([])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
        console.log(event.target.value)
    }

    const handleAddMemo = () => {
        setMemos([...memos, text])
        setText('')
        console.log('メモが追加されました:', text)
        console.log('前回の memos:', memos)
    }

    return (
        <main className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
            <div className="w-full max-w-xl space-y-6">
                {/* 入力フォーム */}
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="入力してください"
                        className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleChange}
                        value={text}
                    />
                    <button
                        onClick={handleAddMemo}
                        disabled={!text}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        追加
                    </button>
                </div>

                {/* メモの一覧表示 */}
                <div className="space-y-3">
                    {memos.map((memo, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-xl shadow border border-gray-200"
                        >
                            {memo}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
