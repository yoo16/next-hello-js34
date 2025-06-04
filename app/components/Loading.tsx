import React from 'react'

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
            <div className="rounded-lg p-6 flex flex-col items-center bg-white">
                <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-lg text-gray-800">Loading...</p>
            </div>
        </div>
    );
}
