import React from 'react'
import Link from 'next/link'

export default function Header() {
    return (
        <header className="bg-pink-300 p-4 shadow">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">HAL Next</h1>
                <nav className="space-x-4">
                    <Link href="/" className="text-white hover:underline">Home</Link>
                    <Link href="/counter" className="text-white hover:underline">Counter</Link>
                    <Link href="/profile" className="text-white hover:underline">Profile</Link>
                </nav>
            </div>
        </header>
    )
}
