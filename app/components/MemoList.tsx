"use client"

// useState をインポート 
import { useState } from 'react'

export default function MemoList() {
    // useState で text を管理
    const [text, setText] = useState<string>('')
    // useState で memos を管理
    const [memos, setMemos] = useState<string[]>([])

    // text を更新する関数
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // text を更新
        setText(event.target.value)
        // コンソールに入力された値を表示
        console.log(event.target.value)
    }

    // memos を更新する関数
    const handleAddMemo = () => {
        // memos に text を追加
        setMemos([...memos, text])
        // text を空にする
        setText('')

        console.log('メモが追加されました:', memos)
    }

    return (
        <div className="flex justify-center mt-10">
            <div className="flex space-x-4">
                <input
                    type="text"
                    placeholder="入力してください"
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={handleChange}
                    value={text}
                />
                <button
                    onClick={handleAddMemo}
                    disabled={!text}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    追加
                </button>
            </div>
        </div>
    )
}