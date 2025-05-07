"use client"

import React, { useState } from 'react'

export default function Counter() {
    const [count, setCount] = useState(0);

    function handleIncrement() {
        setCount(count + 1);
    }

    function handleDecrement() {
        setCount(count - 1);
    }

    function handleReset() {
        setCount(0);
    }

    return (
        <main className="flex justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-80 text-center space-y-6">
                <p className="text-4xl font-semibold text-sky-600">{count}</p>
                <div className="flex justify-between gap-4">
                    <button
                        className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-xl transition"
                        onClick={handleIncrement}
                    >
                        +1
                    </button>
                    <button
                        className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-xl transition"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                    <button
                        className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-xl transition"
                        onClick={handleDecrement}
                    >
                        -1
                    </button>
                </div>
            </div>
        </main>
    );
}
