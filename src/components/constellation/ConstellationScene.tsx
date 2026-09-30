import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Line } from '@react-three/drei'
import * as THREE from 'three'
import { constellation, type ConstellationNode } from '@/data/constellation'
import { constellationEdges, nodeById } from '@/lib/constellation'

const SCALE = 2.7

const radiusFor = (kind: string) => {
  if (kind === 'core') return 0.3
  if (kind === 'product') return 0.23
  return 0.15
}

function seededRandom(seed: number) {
  let t = seed >>> 0
  return () => {
    t = (t + 0x6d2b79f5) >>> 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function Starfield() {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const random = seededRandom(42)
    const count = 700
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 16 + random() * 42
      const theta = random() * Math.PI * 2
      const phi = Math.acos(2 * random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.012
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} sizeAttenuation color="#8a94a8" transparent opacity={0.45} depthWrite={false} />
    </points>
  )
}

interface NodeProps {
  node: ConstellationNode
  active: string | null
  activeSet: Set<string> | null
  onHover: (id: string | null) => void
  onSelect: (node: ConstellationNode) => void
}

function Node({ node, active, activeSet, onHover, onSelect }: NodeProps) {
  const mesh = useRef<THREE.Mesh>(null)
  const isCore = node.kind === 'core'
  const pos = new THREE.Vector3(
    node.position.x * SCALE,
    node.position.y * SCALE,
    node.position.z * SCALE,
  )

  const dimmed = activeSet !== null && !activeSet.has(node.id)
  const highlighted = active === node.id || (activeSet !== null && activeSet.has(node.id))

  useFrame(() => {
    if (!mesh.current) return
    const target = highlighted ? 1.18 : 1
    mesh.current.scale.lerp(new THREE.Vector3(target, target, target), 0.15)
  })

  return (
    <group position={pos}>
      {isCore ? (
        <mesh>
          <torusGeometry args={[0.46, 0.008, 16, 64]} />
          <meshBasicMaterial color="#e0a458" transparent opacity={0.35} />
        </mesh>
      ) : null}
      <mesh
        ref={mesh}
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover(node.id)
          document.body.style.cursor = isCore ? 'default' : 'pointer'
        }}
        onPointerOut={() => {
          onHover(null)
          document.body.style.cursor = 'default'
        }}
        onClick={(e) => {
          e.stopPropagation()
          if (!isCore) onSelect(node)
        }}
      >
        <sphereGeometry args={[radiusFor(node.kind), 32, 32]} />
        <meshBasicMaterial
          color={highlighted ? '#e0a458' : isCore ? '#e0a458' : node.kind === 'service' ? '#97a0b3' : '#e9ebf1'}
          transparent
          opacity={dimmed ? 0.18 : 1}
        />
      </mesh>
    </group>
  )
}

interface SceneProps {
  active: string | null
  onHover: (id: string | null) => void
  onSelect: (node: ConstellationNode) => void
}

function Scene({ active, onHover, onSelect }: SceneProps) {
  const edges = useMemo(() => constellationEdges(), [])
  const activeNode = active ? nodeById(active) : undefined
  const activeSet = useMemo(() => {
    if (!activeNode) return null
    return new Set([activeNode.id, ...activeNode.connections])
  }, [activeNode])

  return (
    <>
      <ambientLight intensity={0.6} />
      <Starfield />

      {edges.map(([a, b]) => {
        const na = nodeById(a)!
        const nb = nodeById(b)!
        const connected = activeSet !== null && activeSet.has(a) && activeSet.has(b)
        const dim = activeSet !== null && !connected
        return (
          <Line
            key={`${a}|${b}`}
            points={[
              [na.position.x * SCALE, na.position.y * SCALE, na.position.z * SCALE],
              [nb.position.x * SCALE, nb.position.y * SCALE, nb.position.z * SCALE],
            ]}
            color={connected ? '#e0a458' : '#3a4150'}
            transparent
            opacity={dim ? 0.08 : 0.9}
            lineWidth={1}
          />
        )
      })}

      {constellation.map((node) => (
        <Node
          key={node.id}
          node={node}
          active={active}
          activeSet={activeSet}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.35}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(Math.PI * 2) / 3}
      />
    </>
  )
}

export function ConstellationScene({
  active,
  onHover,
  onSelect,
}: {
  active: string | null
  onHover: (id: string | null) => void
  onSelect: (node: ConstellationNode) => void
}) {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 8.5], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      className="!bg-transparent"
    >
      <Scene active={active} onHover={onHover} onSelect={onSelect} />
    </Canvas>
  )
}
