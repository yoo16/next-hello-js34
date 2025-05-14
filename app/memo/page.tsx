import React from 'react'
import MemoList from '../components/MemoList'

export default function Page() {
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    📝 簡易メモアプリ
                </h1>
                <MemoList />
            </div>
        </div>
    )
}
