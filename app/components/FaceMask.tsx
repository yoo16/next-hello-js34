'use client';

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';
import * as THREE from 'three';
import Loading from './Loading';

export default function MaskWithThreeJS() {
    const webcamRef = useRef<Webcam>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const maskMeshRef = useRef<THREE.Mesh | null>(null);
    const maskImages = [1, 2, 3, 4, 5].map(n => `${n}.png`);

    const [maskImage, setMaskImage] = useState('1.png');
    const [isLoading, setIsLoading] = useState(true);

    const width = 760;
    const height = 600;
    const maskWidth = 600;
    const maskHeight = 600;

    useEffect(() => {
        setIsLoading(true);
        const loadModels = async () => {
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        };
        loadModels().then(() => initThreeScene(maskImage));
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (sceneRef.current && maskMeshRef.current) {
            loadMaskTexture(maskImage);
        }
    }, [maskImage]);

    const initThreeScene = (initialMask: string) => {
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(0, width, height, 0, -1000, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(width, height);
        containerRef.current?.appendChild(renderer.domElement);

        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;

        // 初期マスク読み込み
        const geometry = new THREE.PlaneGeometry(maskWidth, maskHeight);
        const material = new THREE.MeshBasicMaterial({ transparent: true });
        const maskMesh = new THREE.Mesh(geometry, material);
        scene.add(maskMesh);
        maskMeshRef.current = maskMesh;

        loadMaskTexture(initialMask);
        animate();
    };

    const loadMaskTexture = (filename: string) => {
        const loader = new THREE.TextureLoader();
        loader.load(`/mask/${filename}`, (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            if (maskMeshRef.current) {
                const material = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,
                });
                maskMeshRef.current.material = material;
            }
        });
    };

    const animate = async () => {
        const video = webcamRef.current?.video as HTMLVideoElement;
        if (video && video.readyState === 4) {
            const result = await faceapi
                .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks();

            if (result && maskMeshRef.current) {
                const dims = { width, height };
                const resized = faceapi.resizeResults(result, dims);
                const nose = resized.landmarks.getNose()[0];
                const leftEye = resized.landmarks.getLeftEye();
                const rightEye = resized.landmarks.getRightEye();

                maskMeshRef.current.position.set(nose.x, height - nose.y, 0);
                maskMeshRef.current.rotation.z = -getFaceAngle(leftEye, rightEye);
            }
        }

        rendererRef.current?.render(sceneRef.current!, cameraRef.current!);
        requestRef.current = requestAnimationFrame(animate);
    };

    const getFaceAngle = (leftEye: faceapi.Point[], rightEye: faceapi.Point[]) => {
        const left = leftEye[0];
        const right = rightEye[3];
        return Math.atan2(right.y - left.y, right.x - left.x);
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
            <div ref={containerRef} style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width,
                height,
                zIndex: 10,
                pointerEvents: 'none',
            }} />
            <div style={{ position: 'absolute', top: height + 10 }}>
                {maskImages.map((filename, n) => {
                    // const filename = `${n}.png`;
                    return (
                        <button
                            key={n}
                            onClick={() => setMaskImage(filename)}
                            className={`mr-2 rounded-lg overflow-hidden border ${maskImage === filename ? 'border-blue-500' : 'border-gray-300'
                                }`}
                        >
                            <Image
                                src={`/mask/${filename}`}
                                alt={`mask ${n}`}
                                width={64}
                                height={64}
                                className="object-contain"
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}