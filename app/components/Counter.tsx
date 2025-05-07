"use client"

// rfc と入力
// useState をインポート
import React, { use, useState } from 'react'
// import { useState } from 'react'

export default function Counter() {
    // state
    const [count, setCount] = useState(0);

    return (
        <div>
            <p className="text-center">{count}</p>
            <div>
                <button className="bg-sky-600 px-3 py-2 text-white rounded-xl">+1</button>
            </div>
        </div>
    )
}
