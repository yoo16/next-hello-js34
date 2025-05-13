import React from 'react'
import Image from 'next/image'

export default function ProfilePage() {
    return (
        <section className="flex flex-col items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl w-2/3 space-y-6">
                <h1 className="text-center text-3xl font-bold mb-8 text-gray-600">Profile</h1>
                <div className="flex justify-center">
                    <div className="w-1/2 rounded-xl overflow-hidden shadow-md">
                        <Image
                            src="/profile.png"
                            alt="白石美優の写真"
                            width={192}
                            height={192}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
                <div className="border-b border-gray-100 p-6">
                    <p className="text-sm text-gray-500">名前</p>
                    <p className="text-lg font-semibold text-gray-800">白石 美優（しらいし みゆ）</p>
                </div>
                <div className="border-b border-gray-100 p-6">
                    <p className="text-sm text-gray-500">出身地</p>
                    <p className="text-lg text-gray-800">長野県 松本市</p>
                </div>
                <div className="border-b border-gray-100 p-6">
                    <p className="text-sm text-gray-500">趣味</p>
                    <ul className="list-disc list-inside text-gray-800 space-y-1">
                        <li>写真撮影（自然風景・ポートレート）</li>
                        <li>ガーデニング（季節の花を育てる）</li>
                        <li>クラシック音楽（ピアノ演奏）</li>
                    </ul>
                </div>
                <div className="border-b border-gray-100 p-6">
                    <p className="text-sm text-gray-500">紹介文</p>
                    <p className="text-base text-gray-800">
                        自然に囲まれた松本で育ちました。静かな時間が好きで、休日にはよくカメラを持って散歩に出かけます。
                        花や風景の美しさを写真に収めるのが癒しです。ピアノも10年以上続けており、クラシックを中心に楽しんでいます。
                    </p>
                </div>
            </div>
        </section>
    )
}