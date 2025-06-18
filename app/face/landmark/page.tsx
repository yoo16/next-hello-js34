'use client';

import FaceLandmark from '@/app/components/FaceLandmark';

export default function Page() {
    return (
        <div>
            <div className="flex justify-center gap-4 m-5">
                <a href="/face/camera" className="px-3 py-2 rounded bg-sky-500 text-white">WebCamera</a>
                <a href="/face/landmark" className="px-3 py-2 rounded bg-sky-500 text-white">ランドマーク</a>
                <a href="/face/mask" className="px-3 py-2 rounded bg-sky-500 text-white">マスク画像</a>
            </div>
            <FaceLandmark />
        </div>
    );
}