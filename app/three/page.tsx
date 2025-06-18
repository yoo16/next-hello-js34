import React from 'react'

export default function page() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Three.js</h1>
            <div className="flex flex-col md:flex-row gap-4">
                <a href="/three/camera" className="px-3 py-2 rounded bg-sky-500 text-white">Camera</a>
                <a href="/three/planet" className="px-3 py-2 rounded bg-sky-500 text-white">Planets</a>
            </div>
        </div>
    )
}
