'use client'

import React from 'react'

export default function page() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Face API</h1>
            <div className="flex justify-center gap-4 m-5">
                <a href="/face/camera" className="px-3 py-2 rounded bg-sky-500 text-white">WebCamera</a>
                <a href="/face/landmark" className="px-3 py-2 rounded bg-sky-500 text-white">ランドマーク</a>
                <a href="/face/mask" className="px-3 py-2 rounded bg-sky-500 text-white">マスク画像</a>
            </div>
        </div>
    )
}
