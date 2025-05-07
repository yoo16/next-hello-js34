"use client"

// rfc と入力
// useState をインポート
import React, { use, useState } from 'react'
// import { useState } from 'react'

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p className="text-center">{count}</p>
        </div>
    )
}
