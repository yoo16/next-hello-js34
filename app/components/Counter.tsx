"use client"

// rfc と入力
// useState をインポート
import React, { use, useState } from 'react'
// import { useState } from 'react'

export default function Counter() {
    // state
    const [count, setCount] = useState(0);

    function handelIcrement() {
        // alert('+1');
        setCount(count + 1);
    }

    function handelDecrement() {
        setCount(count - 1);
    }

    return (
        <div>
            <p className="text-center">{count}</p>
            <div>
                <button
                    className="bg-sky-600 px-3 py-2 text-white rounded-xl"
                    onClick={handelIcrement}
                >+1
                </button>
                <button
                    className="bg-sky-600 px-3 py-2 text-white rounded-xl"
                    onClick={handelDecrement}
                >-1
                </button>
            </div>
        </div>
    )
}
