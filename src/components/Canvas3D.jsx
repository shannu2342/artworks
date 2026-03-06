import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Sparkles, Environment, MeshTransmissionMaterial, ContactShadows, Points, PointMaterial } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Create abstract flying particles
function ParticleField() {
    const count = 1000;
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            arr[i] = (Math.random() - 0.5) * 50; // Spread wide
        }
        return arr;
    }, [count]);

    const pointsRef = useRef();

    useFrame((state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.05;
            pointsRef.current.rotation.x -= delta * 0.02;
        }
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial transparent color="#ffffff" size={0.08} sizeAttenuation={true} depthWrite={false} fog={true} />
        </Points>
    );
}

function SceneObjects() {
    const group = useRef();
    const mainObject = useRef();
    const orbRef1 = useRef();
    const orbRef2 = useRef();

    const { viewport } = useThree();

    useFrame((state, delta) => {
        const scrollY = window.scrollY;
        // We expect the page to be quite long now (approx 6-7 viewport heights)
        const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
        const scrollProgress = scrollY / maxScroll;

        // The main crystal rotates and moves through the scene
        if (mainObject.current) {
            mainObject.current.rotation.y += delta * 0.4;
            mainObject.current.rotation.z += delta * 0.2;

            // Shift it right for the hero section, then move center as we scroll down
            const xOffset = THREE.MathUtils.lerp(3, 0, scrollProgress * 3);
            mainObject.current.position.x = xOffset;

            // Move down a bit, but also let the camera fly past
            mainObject.current.position.y = THREE.MathUtils.lerp(0, -5, scrollProgress);
            // Scale it up as we scroll
            mainObject.current.scale.setScalar(THREE.MathUtils.lerp(1, 1.8, scrollProgress));
        }

        // Dynamic floating orbs passing by
        if (orbRef1.current) {
            orbRef1.current.position.y += Math.sin(state.clock.elapsedTime) * 0.01;
            orbRef1.current.position.x = -4 + scrollProgress * 10;
            orbRef1.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 2;
        }

        if (orbRef2.current) {
            orbRef2.current.position.y -= Math.cos(state.clock.elapsedTime * 1.5) * 0.01;
            orbRef2.current.position.x = 4 - scrollProgress * 15;
            orbRef2.current.position.z = Math.sin(state.clock.elapsedTime * 0.8) * -3;
        }

        // Camera movement: deep dramatic zoom and tilt through the scene
        state.camera.position.z = THREE.MathUtils.lerp(7, -8, scrollProgress);
        state.camera.position.y = THREE.MathUtils.lerp(0, -3, scrollProgress);
        // Add a slight tilt to the camera based on scroll
        state.camera.rotation.z = THREE.MathUtils.lerp(0, Math.PI * 0.1, scrollProgress);
        state.camera.rotation.x = THREE.MathUtils.lerp(0, Math.PI * 0.05, scrollProgress);
    });

    return (
        <group ref={group}>
            <fog attach="fog" args={['#020202', 5, 30]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 20, 10]} intensity={3} color="#ff00ff" />
            <directionalLight position={[-10, -20, -10]} intensity={3} color="#00ffff" />
            <pointLight position={[0, 0, -5]} intensity={5} color="#8a2be2" distance={20} />

            <Stars radius={150} depth={50} count={10000} factor={6} saturation={1} fade speed={3} />
            <ParticleField />
            <Sparkles count={500} size={5} color="#00ffff" opacity={0.6} speed={0.8} scale={20} />

            {/* Main Glass Crystal */}
            <Float speed={3} rotationIntensity={2} floatIntensity={4}>
                <mesh ref={mainObject} position={[3, 0, 0]}>
                    {/* Detailed shape */}
                    <octahedronGeometry args={[2.5, 1]} />
                    <MeshTransmissionMaterial
                        backside
                        thickness={3}
                        roughness={0.1}
                        transmission={1}
                        ior={1.8}
                        chromaticAberration={1}
                        anisotropy={1}
                        color="#ffffff"
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                    />
                </mesh>
            </Float>

            {/* Orbiting Orbs */}
            <Float speed={4} floatIntensity={10}>
                <mesh ref={orbRef1} position={[-4, 2, -2]}>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={3} />
                </mesh>
            </Float>

            <Float speed={5} floatIntensity={12}>
                <mesh ref={orbRef2} position={[4, -2, -5]}>
                    <sphereGeometry args={[0.8, 32, 32]} />
                    <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={3} />
                </mesh>
            </Float>

            <Environment preset="night" />
        </group>
    );
}

export default function Canvas3D() {
    return (
        <div id="canvas-container">
            <Canvas
                camera={{ position: [0, 0, 7], fov: 75 }}
                gl={{ antialias: true, alpha: false }}
            >
                <SceneObjects />
            </Canvas>
        </div>
    );
}
