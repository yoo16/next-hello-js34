'use client';

import { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';
import * as THREE from 'three';
import Loading from './Loading';

export default function FaceLandmark() {
    const webcamRef = useRef<Webcam>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    const width = 760;
    const height = 600;

    useEffect(() => {
        setIsLoading(true);

        const loadModels = async () => {
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        };
        loadModels().then(() => initThreeScene());

        setIsLoading(false);
    }, []);

    const initThreeScene = () => {
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(0, width, height, 0, -1000, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(width, height);
        containerRef.current?.appendChild(renderer.domElement);

        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;

        animate();
    };

    const animate = async () => {
        const video = webcamRef.current?.video as HTMLVideoElement;
        if (video && video.readyState === 4) {
            const result = await faceapi
                .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks();

            if (result) {
                const dims = { width, height };
                const resized = faceapi.resizeResults(result, dims);
                const points = resized.landmarks.positions;

                // ランドマーク描画のためにシーンをクリア
                sceneRef.current?.clear();

                points.forEach((pt) => {
                    const geometry = new THREE.CircleGeometry(3, 16);
                    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                    const circle = new THREE.Mesh(geometry, material);
                    circle.position.set(pt.x, height - pt.y, 0); // Y軸反転
                    sceneRef.current?.add(circle);
                });
            }
        }

        rendererRef.current?.render(sceneRef.current!, cameraRef.current!);
        requestRef.current = requestAnimationFrame(animate);
    };

    return (
        <div style={{ position: 'relative', width, height }}>
            {isLoading && <Loading />}

            <Webcam
                ref={webcamRef}
                audio={false}
                videoConstraints={{ width, height, facingMode: 'user' }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 0,
                }}
            />
            <div
                ref={containerRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width,
                    height,
                    zIndex: 10,
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
}