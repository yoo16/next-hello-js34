'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type Planet = {
    name: string;
    orbitRadius: number;
    size: number;
    orbitPeriod: number;
    color: number;
};

export default function PlanetScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [planetsData, setPlanetsData] = useState<Planet[]>([]);
    const planetsListRef = useRef<
        {
            name: string;
            mesh: THREE.Mesh;
            orbitRadius: number;
            orbitPeriod: number;
        }[]
    >([]);

    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

    const zoom = useRef({
        active: false,
        from: new THREE.Vector3(),
        to: new THREE.Vector3(),
        lookAt: new THREE.Vector3(),
        progress: 0,
    });

    const defaultCameraPos = new THREE.Vector3(0, 150, 250);
    const defaultLookAt = new THREE.Vector3(0, 0, 0);

    useEffect(() => {
        fetch('/api/planets')
            .then(res => res.json())
            .then(data => setPlanetsData(data));
    }, []);

    useEffect(() => {
        if (planetsData.length === 0) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1500);
        camera.position.copy(defaultCameraPos);
        camera.lookAt(defaultLookAt);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current?.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const sun = new THREE.Mesh(
            new THREE.SphereGeometry(10, 32, 32),
            new THREE.MeshBasicMaterial({ color: 0xff5500 })
        );
        scene.add(sun);

        const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambient);

        const pointLight = new THREE.PointLight(0xffffff, 1.5, 0);
        pointLight.position.copy(sun.position);
        scene.add(pointLight);

        const planetList: typeof planetsListRef.current = [];

        planetsData.forEach(data => {
            const geometry = new THREE.SphereGeometry(data.size, 32, 32);
            const material = new THREE.MeshPhongMaterial({ color: data.color });
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            // 軌道リング
            const segments = 128;
            const orbitPoints = Array.from({ length: segments + 1 }, (_, i) => {
                const angle = (i / segments) * Math.PI * 2;
                return new THREE.Vector3(
                    data.orbitRadius * Math.cos(angle),
                    0,
                    data.orbitRadius * Math.sin(angle)
                );
            });
            const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
            const orbitLine = new THREE.LineLoop(
                orbitGeometry,
                new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true })
            );
            scene.add(orbitLine);

            planetList.push({ name: data.name, mesh, orbitRadius: data.orbitRadius, orbitPeriod: data.orbitPeriod });
        });

        planetsListRef.current = planetList;

        function animate() {
            requestAnimationFrame(animate);
            const elapsed = performance.now() / 1000;

            planetList.forEach(p => {
                const angle = (elapsed / p.orbitPeriod) * Math.PI * 2;
                p.mesh.position.x = p.orbitRadius * Math.cos(angle);
                p.mesh.position.z = p.orbitRadius * Math.sin(angle);
            });

            if (zoom.current.active && cameraRef.current) {
                zoom.current.progress += 0.02;
                if (zoom.current.progress >= 1) {
                    zoom.current.progress = 1;
                    zoom.current.active = false;
                }
                cameraRef.current.position.lerpVectors(
                    zoom.current.from,
                    zoom.current.to,
                    zoom.current.progress
                );
                cameraRef.current.lookAt(zoom.current.lookAt);
            }

            renderer.render(scene, camera);
        }

        animate();

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [planetsData]);

    const zoomToPlanet = (name: string) => {
        const target = planetsListRef.current.find(p => p.name === name);
        if (!target || !cameraRef.current) return;

        zoom.current.active = true;
        zoom.current.from.copy(cameraRef.current.position);
        zoom.current.lookAt.copy(target.mesh.position);
        zoom.current.to.copy(target.mesh.position).add(new THREE.Vector3(0, 10, 20));
        zoom.current.progress = 0;
    };

    const resetZoom = () => {
        if (!cameraRef.current) return;
        zoom.current.active = true;
        zoom.current.from.copy(cameraRef.current.position);
        zoom.current.to.copy(defaultCameraPos);
        zoom.current.lookAt.copy(defaultLookAt);
        zoom.current.progress = 0;
    };

    return (
        <div className="relative">
            <div ref={containerRef} className="w-full h-screen" />
            <div className="absolute top-4 left-4 bg-black/50 p-3 rounded shadow">
                <ul className="space-y-1">
                    {planetsData.map(p => (
                        <li key={p.name}>
                            <button
                                className="text-white cursor-pointer"
                                onClick={() => zoomToPlanet(p.name)}
                            >
                                {p.name}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button className="px-2 py-1 border rounded text-white cursor-pointer" onClick={resetZoom}>
                            Reset
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
