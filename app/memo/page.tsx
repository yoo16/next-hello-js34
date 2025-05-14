import React from 'react'
import MemoList from '../components/MemoList'

export default function page() {
    return (
        <div>
            <h1 className="text-2xl font-bold">Memo</h1>
            <MemoList />
        </div>
    )
}