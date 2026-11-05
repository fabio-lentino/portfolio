import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type SceneProps = {
  compact: boolean;
  reduced: boolean;
};

function StudioEnvironment() {
  const { gl, scene, invalidate } = useThree();

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = pmrem.fromScene(room, 0.04);

    scene.environment = target.texture;
    scene.environmentIntensity = 0.9;
    invalidate();

    return () => {
      scene.environment = null;
      target.dispose();
      room.dispose();
      pmrem.dispose();
    };
  }, [gl, scene, invalidate]);

  return null;
}

function ChromeKnot({ compact }: { compact: boolean }) {
  const knot = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (knot.current) {
      knot.current.rotation.y = time * 0.16;
      knot.current.rotation.z = Math.sin(time * 0.22) * 0.16;
    }

    if (inner.current) {
      inner.current.rotation.x = -time * 0.22;
      inner.current.rotation.y = time * 0.14;
    }
  });

  return (
    <group>
      <mesh ref={knot} castShadow>
        <torusKnotGeometry
          args={[1.02, 0.31, compact ? 128 : 220, compact ? 22 : 36, 2, 3]}
        />
        <meshPhysicalMaterial
          color="#c9cbc9"
          metalness={1}
          roughness={0.17}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.35}
        />
      </mesh>

      <mesh ref={inner} scale={0.58}>
        <icosahedronGeometry args={[1, compact ? 0 : 1]} />
        <meshBasicMaterial
          color="#c6ff4d"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>
    </group>
  );
}

function Orbitals({ compact }: { compact: boolean }) {
  const group = useRef<THREE.Group>(null);
  const satelliteA = useRef<THREE.Mesh>(null);
  const satelliteB = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (group.current) {
      group.current.rotation.y = time * 0.08;
      group.current.rotation.x = Math.sin(time * 0.15) * 0.08;
    }

    if (satelliteA.current) {
      satelliteA.current.position.x = Math.cos(time * 0.5) * 2.05;
      satelliteA.current.position.z = Math.sin(time * 0.5) * 2.05;
      satelliteA.current.position.y = Math.sin(time * 0.8) * 0.2;
    }

    if (satelliteB.current) {
      satelliteB.current.position.x = Math.cos(time * 0.34 + Math.PI) * 2.55;
      satelliteB.current.position.z = Math.sin(time * 0.34 + Math.PI) * 2.55;
      satelliteB.current.position.y = Math.cos(time * 0.62) * 0.35;
    }
  });

  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2.6, 0.25, 0]}>
        <torusGeometry args={[2.02, 0.005, 8, 180]} />
        <meshBasicMaterial color="#c6ff4d" transparent opacity={0.42} />
      </mesh>
      <mesh rotation={[Math.PI / 1.7, -0.3, 0.4]}>
        <torusGeometry args={[2.52, 0.004, 8, 180]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
      </mesh>
      <mesh rotation={[0.35, 0.4, Math.PI / 2.4]}>
        <torusGeometry args={[2.9, 0.003, 8, 180]} />
        <meshBasicMaterial color="#c6ff4d" transparent opacity={0.12} />
      </mesh>

      <mesh ref={satelliteA}>
        <sphereGeometry args={[0.055, 18, 18]} />
        <meshBasicMaterial color="#c6ff4d" />
        <pointLight color="#c6ff4d" intensity={2.2} distance={2} />
      </mesh>

      {!compact ? (
        <mesh ref={satelliteB}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.75} />
        </mesh>
      ) : null}
    </group>
  );
}

function FloatingSpheres({ compact }: { compact: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (group.current) {
      group.current.rotation.y = Math.sin(time * 0.18) * 0.16;
      group.current.position.y = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <mesh position={[1.72, 1.36, 0.55]}>
        <sphereGeometry args={[0.18, 40, 40]} />
        <meshPhysicalMaterial
          color="#d9dbd8"
          metalness={1}
          roughness={0.12}
          envMapIntensity={1.5}
        />
      </mesh>
      <mesh position={[-1.78, -1.18, 0.6]}>
        <sphereGeometry args={[0.11, 32, 32]} />
        <meshPhysicalMaterial
          color="#b9bcb8"
          metalness={1}
          roughness={0.2}
          envMapIntensity={1.3}
        />
      </mesh>
      {!compact ? (
        <mesh position={[1.42, -1.65, -0.6]}>
          <sphereGeometry args={[0.07, 24, 24]} />
          <meshPhysicalMaterial
            color="#e6e7e3"
            metalness={1}
            roughness={0.1}
            envMapIntensity={1.6}
          />
        </mesh>
      ) : null}
    </group>
  );
}

function SceneContent({ compact, reduced }: SceneProps) {
  const root = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useEffect(() => {
    if (reduced) return;

    function onPointerMove(event: PointerEvent) {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [reduced]);

  useFrame(() => {
    if (!root.current || reduced) return;

    const targetY = pointer.current.x * 0.32;
    const targetX = pointer.current.y * 0.2;
    const ease = compact ? 0.035 : 0.045;

    root.current.rotation.y += (targetY - root.current.rotation.y) * ease;
    root.current.rotation.x += (targetX - root.current.rotation.x) * ease;
  });

  const scale = useMemo(() => (size.width < 520 ? 0.92 : 1), [size.width]);

  return (
    <group ref={root} scale={scale}>
      <StudioEnvironment />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={2.6} color="#ffffff" />
      <directionalLight position={[-5, -1, 2]} intensity={0.7} color="#a9c7ff" />
      <pointLight position={[-3.2, 2.4, 3.4]} intensity={16} color="#c6ff4d" distance={12} />
      <pointLight position={[3.4, -3, -2.5]} intensity={8} color="#7e96ff" distance={12} />

      <ChromeKnot compact={compact} />
      <Orbitals compact={compact} />
      <FloatingSpheres compact={compact} />
    </group>
  );
}

export default function HeroScene() {
  const compact = useMediaQuery("(max-width: 767px)");
  const reduced = usePrefersReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px 0px", threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none h-full w-full"
      aria-hidden="true"
    >
      <Canvas
        frameloop={reduced ? "demand" : inView ? "always" : "never"}
        dpr={compact ? [1, 1.2] : [1, 1.65]}
        camera={{ position: [0, 0, compact ? 6.6 : 6.9], fov: compact ? 42 : 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMappingExposure = 1.05;
        }}
      >
        <Suspense fallback={null}>
          <SceneContent compact={compact} reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
