import React, { useState } from 'react'

export default function MemoList() {
    // useState で text を管理
    const [text, setText] = useState<string>('')

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