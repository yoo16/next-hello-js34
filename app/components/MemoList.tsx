"use client"

import { useEffect, useState } from 'react'
import { addMemo, loadMemos } from '../services/MemoService'


export default function MemoList() {
    // テキストボックスの状態(State)を管理するためのuseStateフック
    const [text, setText] = useState<string>('')
    // メモのリストの状態(State)を管理するためのuseStateフック
    const [memos, setMemos] = useState<string[]>([])
    // メッセージの状態(State)を管理するためのuseStateフック
    const [message, setMessage] = useState<string>('メモを入力してください')

    // 初回レンダリング時にメモをAPIから取得するための処理
    useEffect(() => {
        const fetchMemos = async () => {
            const result = await loadMemos();
            setMessage(result?.message);
            setMemos(result?.memos);
        }
        fetchMemos();
    }, []);

    // useEffectフックを使って、message を3秒後に消す
    // トースト通知（Toast Notification）
    useEffect(() => {
        const timer = setTimeout(() => {
            // メッセージを空にする
            setMessage('')
        }, 3000)
        return () => clearTimeout(timer)
    }, [message])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
        console.log(event.target.value)
    }

    // async/await で非同期通信
    const handleAddMemo = async () => {
        // memosの状態を更新
        setMemos([...memos, text])
        // テキストボックスを空にする
        setText('')
        // addMemo() でAPIにメモを送信（非同期処理）
        const result = await addMemo(text)
        // メッセージを表示
        setMessage(result.message)
    }

    const handleRemoveMemo = async (index: number) => {
        // メモを削除する処理
        if (confirm('本当に削除しますか？')) {
            // メモのリストを更新
            setMemos(memos.filter((_, i) => i !== index));
        }
    }

    return (
        <main className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
            <div className="w-full max-w-xl space-y-6">
                {message &&
                    (
                        <div className="text-center bg-green-200 text-green-800 p-3 rounded">
                            {message}
                        </div>
                    )
                }
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
                {/* メモがない時「メモがありません」メッセージ */}
                {memos.length === 0 && (
                    <div className="text-gray-500 text-center">
                        メモがありません
                    </div>
                )}

                {/* メモの一覧表示 */}
                <div className="space-y-3">
                    {memos.map((memo, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-xl shadow border border-gray-200"
                        >
                            {/* 削除ボタン追加 */}
                            <button
                                onClick={() => handleRemoveMemo(index)}
                                className="bg-red-500 text-white px-3 py-2 text-xs mr-4 rounded"
                            >
                                削除
                            </button>
                            {memo}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
