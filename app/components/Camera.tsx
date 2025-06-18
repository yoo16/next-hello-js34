'use client';

import { useRef, useState } from 'react';
import Webcam from 'react-webcam';

export default function Camera() {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [label, setLabel] = useState('📸 カメラ起動中です！');

    const width = 760;
    const height = 600;

    const handleCapture = () => {
        const screenshot = webcamRef.current?.getScreenshot();
        if (!screenshot || !canvasRef.current) return;

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const image = new Image();
        image.onload = () => {
            // 背景画像
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(image, 0, 0, width, height);

            // オーバーレイ文字
            ctx.font = 'bold 32px sans-serif';
            ctx.fillStyle = 'white';
            ctx.shadowColor = 'black';
            ctx.shadowBlur = 8;
            ctx.fillText(label, 20, 50);

            // 画像として保存
            const dataURL = canvasRef.current!.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'snapshot.png';
            link.click();
        };
        image.src = screenshot;
    };

    return (
        <div>
            <div className="flex py-2">
                <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="表示する文字を入力"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded"
                />

                <button
                    onClick={handleCapture}
                    className="ml-4 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600" 
                >
                    💾 画像を保存
                </button>
            </div>

            {/* カメラとテキストオーバーレイ */}
            <div style={{ position: 'relative', width, height }}>
                <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/png"
                    videoConstraints={{ width, height, facingMode: 'user' }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width,
                        height,
                        zIndex: 0,
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        zIndex: 1,
                        color: 'white',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        textShadow: '0 0 10px black',
                    }}
                >
                    {label}
                </div>

                {/* 保存用 Canvas（非表示） */}
                <canvas
                    ref={canvasRef}
                    width={width}
                    height={height}
                    style={{ display: 'none' }}
                />
            </div>

        </div>
    );
}