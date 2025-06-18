'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CameraPage() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xeeeeee);

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.set(0, 0, 5);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 1, 1);
        scene.add(light);

        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(),
            new THREE.MeshStandardMaterial({ color: 0x0077ff })
        );
        cube.position.x = -1.5;

        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 32, 32),
            new THREE.MeshStandardMaterial({ color: 0xff7700 })
        );
        sphere.position.x = 1.5;

        scene.add(cube);
        scene.add(sphere);

        // 移動状態フラグ
        const keysPressed: Record<string, boolean> = {};

        const handleKeyDown = (e: KeyboardEvent) => {
            keysPressed[e.key] = true;
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            keysPressed[e.key] = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // アニメーション
        const moveSpeed = 0.05;
        const animate = () => {
            requestAnimationFrame(animate);

            // キー状態に応じた移動処理
            if (keysPressed['1']) camera.position.z -= moveSpeed;
            if (keysPressed['2']) camera.position.z += moveSpeed;
            if (keysPressed['3']) camera.position.x -= moveSpeed;
            if (keysPressed['4']) camera.position.x += moveSpeed;
            if (keysPressed['5']) camera.position.y += moveSpeed;
            if (keysPressed['6']) camera.position.y -= moveSpeed;

            camera.lookAt(0, 0, 0);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            const width = mountRef.current!.clientWidth;
            const height = mountRef.current!.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('resize', handleResize);
            mountRef.current?.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return (
        <div ref={mountRef} className="relative w-full h-screen">
            <div className="absolute top-4 left-4 bg-white bg-opacity-80 p-4 rounded shadow text-sm text-gray-800">
                <h2 className="font-bold mb-2">🎮 カメラ操作ガイド</h2>
                <ul className="list-disc ml-5 space-y-1">
                    <li><kbd className="px-1 py-0.5 border rounded">1</kbd>：前進（Z-）</li>
                    <li><kbd className="px-1 py-0.5 border rounded">2</kbd>：後退（Z+）</li>
                    <li><kbd className="px-1 py-0.5 border rounded">3</kbd>：左移動（X-）</li>
                    <li><kbd className="px-1 py-0.5 border rounded">4</kbd>：右移動（X+）</li>
                    <li><kbd className="px-1 py-0.5 border rounded">5</kbd>：上昇（Y+）</li>
                    <li><kbd className="px-1 py-0.5 border rounded">6</kbd>：下降（Y-）</li>
                </ul>
            </div>
        </div>
    );
}