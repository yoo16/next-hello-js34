// rfc で作成
import React from 'react'

export default function AIBot() {
    return (
        <div className="mx-auto max-w-2xl p-6 bg-white rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold">教えて！Gemini!</h2>
            <div className="text-left p-3 bg-gray-100 rounded shadow text-sm whitespace-pre-wrap">
            </div>
            <button
                className="px-6 py-3 bg-sky-600 text-white rounded-xl shadow hover:bg-sky-700 cursor-pointer">
                教えて!Gemini!
            </button>
        </div>
    )
}