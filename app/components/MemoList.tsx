import React, { useState } from 'react'

export default function MemoList() {
    // useState で text を管理
    const [text, setText] = useState<string>('')

    // text を更新する関数
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
        console.log(event.target.value)
    }
    // 質問項目：change イベントを追加して
    <input
        type="text"
        placeholder="入力してください"
        value={text}
        onChange={handleChange}
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    return (
        <div className="flex justify-center mt-10">
            <div className="flex space-x-4">
                <input
                    type="text"
                    placeholder="入力してください"
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    追加
                </button>
            </div>
        </div>
    )
}